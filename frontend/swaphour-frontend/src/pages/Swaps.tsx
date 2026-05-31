import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gsap } from 'gsap';
import apiClient from '../lib/apiClient';
import { getUser } from '../lib/auth';
import type { SwapRequest } from '../types';
import SwapCard from '../components/SwapCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import './Swaps.css';

function fetchMySwaps(): Promise<SwapRequest[]> {
  return apiClient.get<{ status: string; data: SwapRequest[] }>('/swaps').then((r) => r.data.data ?? []);
}

type TabType = 'incoming' | 'outgoing';

export default function Swaps() {
  const [tab, setTab] = useState<TabType>('incoming');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const currentUser = getUser();
  const pageRef = useRef<HTMLDivElement>(null);

  const { data: swaps = [], isLoading } = useQuery({
    queryKey: ['swaps'],
    queryFn: fetchMySwaps,
    staleTime: 2 * 60 * 1000,
  });

  const incoming = swaps.filter((s) => s.provider_id === currentUser?.id);
  const outgoing = swaps.filter((s) => s.requester_id === currentUser?.id);
  const listed   = tab === 'incoming' ? incoming : outgoing;

  const { mutate: respond } = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'accept' | 'reject' }) =>
      apiClient.patch(`/swaps/${id}/respond`, { action }),
    onMutate: ({ id }) => setLoadingId(id),
    onSettled: () => {
      setLoadingId(null);
      queryClient.invalidateQueries({ queryKey: ['swaps'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const { mutate: complete } = useMutation({
    mutationFn: (id: string) => apiClient.patch(`/swaps/${id}/complete`),
    onMutate: (id) => setLoadingId(id),
    onSettled: () => {
      setLoadingId(null);
      queryClient.invalidateQueries({ queryKey: ['swaps'] });
    },
  });

  // Rating Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState<SwapRequest | null>(null);
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [ratingSuccess, setRatingSuccess] = useState('');

  const { mutate: submitRating, isPending: isRatingSubmitting } = useMutation({
    mutationFn: () =>
      apiClient.post('/ratings', {
        swap_id: selectedSwap?.id,
        score,
        comment: comment.trim() || undefined,
      }),
    onSuccess: () => {
      setRatingSuccess('✓ Rating berhasil dikirim!');
      setRatingError('');
      queryClient.invalidateQueries({ queryKey: ['swaps'] });
      // Close modal after 1.5s
      setTimeout(() => {
        setIsModalOpen(false);
        setSelectedSwap(null);
        setScore(5);
        setComment('');
        setRatingSuccess('');
      }, 1500);
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message ?? 'Gagal mengirim rating.';
      setRatingError(msg);
      setRatingSuccess('');
    },
  });

  // Animasi masuk untuk swap cards setiap kali tab atau data berubah
  useEffect(() => {
    if (isLoading || !pageRef.current) return;
    const ctx = gsap.context(() => {
      // Animate header and tabs on initial mount
      gsap.fromTo('.swaps-header, .swaps-tabs', {
        y: 15,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Animate list of swap cards
      gsap.fromTo('.swap-card', {
        y: 20,
        opacity: 0,
        scale: 0.98
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }, pageRef);
    return () => ctx.revert();
  }, [tab, swaps.length, isLoading]);

  return (
    <div className="swaps-page" ref={pageRef}>
      {/* Header */}
      <div className="swaps-header">
        <div>
          <h1>Swap Saya</h1>
          <p className="text-muted">Kelola semua permintaan pertukaran keahlian kamu.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="swaps-tabs">
        <button
          id="tab-incoming"
          className={`swap-tab ${tab === 'incoming' ? 'swap-tab--active' : ''}`}
          onClick={() => setTab('incoming')}
        >
          <span className="tab-icon">
            {/* Kotak masuk — tray dengan panah turun */}
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="8 17 12 21 16 17"/>
              <line x1="12" y1="12" x2="12" y2="21"/>
              <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
            </svg>
          </span>
          Request Masuk
          {incoming.filter((s) => s.status === 'pending').length > 0 && (
            <span className="tab-badge">
              {incoming.filter((s) => s.status === 'pending').length}
            </span>
          )}
        </button>
        <button
          id="tab-outgoing"
          className={`swap-tab ${tab === 'outgoing' ? 'swap-tab--active' : ''}`}
          onClick={() => setTab('outgoing')}
        >
          <span className="tab-icon">
            {/* Panah keluar dari kotak — request yang dikirim */}
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </span>
          Request Keluar
          {outgoing.filter((s) => s.status === 'pending').length > 0 && (
            <span className="tab-badge">
              {outgoing.filter((s) => s.status === 'pending').length}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="swaps-list">
          <LoadingSkeleton variant="card" count={3} />
        </div>
      ) : listed.length === 0 ? (
        <div className="card empty-state">
          <span className="empty-icon">
            {tab === 'incoming' ? (
              // Kotak surat kosong
              <svg width="2.5em" height="2.5em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            ) : (
              // Panah kirim — belum ada yang dikirim
              <svg width="2.5em" height="2.5em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            )}
          </span>
          <h3>
            {tab === 'incoming'
              ? 'Belum ada request masuk'
              : 'Belum ada request keluar'}
          </h3>
          <p className="text-muted">
            {tab === 'incoming'
              ? 'Request akan muncul di sini saat orang lain meminta skill kamu.'
              : 'Cari skill di katalog dan mulai request pertama kamu.'}
          </p>
        </div>
      ) : (
        <div className="swaps-list">
          {listed.map((swap) => (
            <SwapCard
              key={swap.id}
              swap={swap}
              mode={tab}
              isLoading={loadingId === swap.id}
              onAccept={(id) => respond({ id, action: 'accept' })}
              onReject={(id) => respond({ id, action: 'reject' })}
              onComplete={(id) => complete(id)}
              onRate={(swap) => {
                setSelectedSwap(swap);
                setIsModalOpen(true);
                setScore(5);
                setComment('');
                setRatingError('');
                setRatingSuccess('');
              }}
            />
          ))}
        </div>
      )}

      {/* Rating Modal */}
      <div className={`modal-backdrop ${isModalOpen ? 'modal-backdrop--open' : ''}`} onClick={() => !isRatingSubmitting && setIsModalOpen(false)}>
        <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
          <div className="rating-modal__header">
            <h3>Beri Penilaian</h3>
            <button className="rating-modal__close" onClick={() => !isRatingSubmitting && setIsModalOpen(false)}>✕</button>
          </div>
          <p className="text-muted text-sm">
            Bagikan pengalaman kamu melakukan pertukaran skill <strong>{selectedSwap?.skill?.title}</strong> bersama partner.
          </p>

          <hr className="divider" />

          <div>
            <label className="rating-modal__label">Skor Rating ({score} Bintang)</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="rating-star-btn"
                  onClick={() => setScore(star)}
                  style={{ color: star <= score ? 'var(--color-accent)' : '#4b5563' }}
                  disabled={isRatingSubmitting || !!ratingSuccess}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="notes-field">
            <label htmlFor="rating-comment" className="rating-modal__label">Komentar / Ulasan (opsional)</label>
            <textarea
              id="rating-comment"
              className="input rating-modal__textarea"
              placeholder="Tuliskan ulasan singkat mengenai jalannya swap..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              disabled={isRatingSubmitting || !!ratingSuccess}
            />
          </div>

          {ratingError && <div className="swap-panel__error">❌ {ratingError}</div>}
          {ratingSuccess && <div className="swap-panel__success">{ratingSuccess}</div>}

          <div className="rating-modal__actions">
            <button
              className="btn btn-outline btn-full btn-sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isRatingSubmitting || !!ratingSuccess}
            >
              Batal
            </button>
            <button
              className="btn btn-accent btn-full btn-sm"
              onClick={() => submitRating()}
              disabled={isRatingSubmitting || !!ratingSuccess}
            >
              {isRatingSubmitting ? '⏳ Mengirim...' : 'Kirim Rating'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
