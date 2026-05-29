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
          <span>📥</span>
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
          <span>📤</span>
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
          <span className="empty-icon">{tab === 'incoming' ? '📭' : '📤'}</span>
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
