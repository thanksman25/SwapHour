import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gsap } from 'gsap';
import apiClient from '../lib/apiClient';
import type { Skill, User } from '../types';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import './SkillDetail.css';

function fetchSkillById(id: string): Promise<Skill> {
  return apiClient.get<{ status: string; data: Skill }>(`/skills/${id}`).then((r) => r.data.data);
}

function fetchProfile(): Promise<User> {
  return apiClient.get<{ status: string; data: User }>('/users/profile').then((r) => r.data.data);
}

function StarRating({ rating, total }: { rating: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span className="stars" style={{ fontSize: 18 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} style={{ color: s <= Math.round(rating) ? 'var(--color-accent)' : '#4b5563' }}>★</span>
        ))}
      </span>
      <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
        {rating > 0 ? `${rating.toFixed(1)} (${total} ulasan)` : 'Belum ada ulasan'}
      </span>
    </div>
  );
}

export default function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const pageRef = useRef<HTMLDivElement>(null);

  const { data: skill, isLoading: skillLoading, isError } = useQuery({
    queryKey: ['skill', id],
    queryFn: () => fetchSkillById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: submitSwap, isPending: isSubmitting } = useMutation({
    mutationFn: () =>
      apiClient.post('/swaps', {
        skill_id: id,
        notes: notes.trim() || undefined,
      }),
    onSuccess: () => {
      setSuccessMsg('✅ Permintaan swap berhasil dikirim! Provider akan segera merespons.');
      setErrorMsg('');
      queryClient.invalidateQueries({ queryKey: ['swaps'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message ?? 'Gagal mengirim permintaan.';
      setErrorMsg(msg);
      setSuccessMsg('');
    },
  });

  const isLoading = skillLoading || profileLoading;
  const balance = Number(profile?.credit_hours ?? 0);
  const duration = Number(skill?.duration_hours ?? 0);
  const canAfford = balance >= duration;
  const profileOk = (profile?.profile_completion ?? 0) >= 80;
  const isOwnSkill = skill?.user_id === profile?.id;

  // GSAP Entry Animation
  useEffect(() => {
    if (isLoading || !pageRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.breadcrumb', { y: -12, opacity: 0, duration: 0.45 })
        .from('.skill-detail__card', { y: 35, opacity: 0, duration: 0.65 }, '-=0.25')
        .from('.swap-panel', { x: 35, opacity: 0, duration: 0.65, ease: 'back.out(1.2)' }, '-=0.45')
        .from('.skill-detail__meta-top, .skill-detail__title, .skill-detail__provider, .divider, h3, p', {
          y: 15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06
        }, '-=0.35');
    }, pageRef);
    return () => ctx.revert();
  }, [isLoading]);

  if (isError) {
    return (
      <div className="skill-detail" ref={pageRef}>
        <div className="card empty-state">
          <span className="empty-icon">⚠️</span>
          <h3>Skill tidak ditemukan</h3>
          <Link to="/skills" className="btn btn-primary" style={{ marginTop: 12 }}>← Kembali ke Katalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-detail" ref={pageRef}>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/skills" className="breadcrumb-link">Katalog</Link>
        <span className="breadcrumb-sep">›</span>
        <span>{isLoading ? '...' : skill?.title}</span>
      </nav>

      <div className="skill-detail__layout">
        {/* Main content */}
        <div className="skill-detail__main">
          {isLoading ? (
            <div className="card">
              <LoadingSkeleton variant="text" count={5} />
            </div>
          ) : skill ? (
            <div className="card skill-detail__card">
              {/* Category + duration */}
              <div className="skill-detail__meta-top">
                <span className="badge badge-primary">{skill.category}</span>
                <span className="skill-detail__duration">⏱ {skill.duration_hours} jam kredit</span>
              </div>

              <h1 className="skill-detail__title">{skill.title}</h1>

              {/* Provider info */}
              <div className="skill-detail__provider">
                <div className="detail-avatar">
                  {skill.user?.avatar_url ? (
                    <img src={skill.user.avatar_url} alt={skill.user.name} />
                  ) : (
                    <span>{skill.user?.name?.[0]?.toUpperCase() ?? '?'}</span>
                  )}
                </div>
                <div>
                  <div className="detail-provider-name">{skill.user?.name ?? 'Pengguna'}</div>
                  {skill.user?.average_rating !== undefined && (
                    <StarRating rating={skill.user.average_rating} total={0} />
                  )}
                </div>
              </div>

              <hr className="divider" style={{ margin: '20px 0' }} />

              {/* Description */}
              <h3 style={{ marginBottom: 10 }}>Tentang Skill Ini</h3>
              {skill.description ? (
                <p style={{ lineHeight: 1.8, color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap' }}>
                  {skill.description}
                </p>
              ) : (
                <p className="text-muted">Provider belum menambahkan deskripsi.</p>
              )}
            </div>
          ) : null}
        </div>

        {/* Sidebar: swap panel */}
        <aside className="skill-detail__sidebar">
          <div className="card swap-panel">
            <h3 className="swap-panel__title">Request Swap</h3>

            {/* Balance info */}
            <div className="balance-info">
              <div className="balance-row">
                <span className="text-muted">Saldo kamu</span>
                {profileLoading ? (
                  <div className="skeleton" style={{ height: 20, width: 80 }} />
                ) : (
                  <span className="balance-value">{balance.toFixed(1)} jam</span>
                )}
              </div>
              <div className="balance-row">
                <span className="text-muted">Biaya skill ini</span>
                <span className="cost-value">{skillLoading ? '...' : `${duration} jam`}</span>
              </div>
              <hr className="divider" />
              <div className="balance-row">
                <span className="text-muted">Sisa saldo</span>
                <span
                  className="balance-after"
                  style={{ color: canAfford ? 'var(--color-completed)' : 'var(--color-rejected)' }}
                >
                  {(balance - duration).toFixed(1)} jam
                </span>
              </div>
            </div>

            {/* Warnings */}
            {!canAfford && !isLoading && (
              <div className="swap-panel__warning">
                ⚠️ Saldo tidak mencukupi. Selesaikan swap lain untuk mendapat kredit.
              </div>
            )}

            {!profileOk && !isLoading && (
              <div className="swap-panel__warning swap-panel__warning--profile">
                ⚠️ Profil kamu baru {profile?.profile_completion ?? 0}%. Lengkapi profil minimal 80% untuk request.
              </div>
            )}

            {isOwnSkill && (
              <div className="swap-panel__warning">
                🚫 Ini adalah skill milik kamu sendiri.
              </div>
            )}

            {/* Notes textarea */}
            {!isOwnSkill && (
              <div className="notes-field">
                <label htmlFor="swap-notes" className="notes-label">Catatan (opsional)</label>
                <textarea
                  id="swap-notes"
                  className="input notes-textarea"
                  placeholder="Tuliskan kebutuhan spesifik kamu kepada provider..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            )}

            {/* Success / error messages */}
            {successMsg && <div className="swap-panel__success">{successMsg}</div>}
            {errorMsg && <div className="swap-panel__error">❌ {errorMsg}</div>}

            {/* Submit button */}
            {!successMsg && !isOwnSkill && (
              <button
                className="btn btn-accent btn-full btn-lg"
                onClick={() => submitSwap()}
                disabled={isSubmitting || !canAfford || !profileOk || isLoading}
              >
                {isSubmitting ? '⏳ Mengirim...' : '✉ Kirim Permintaan Swap'}
              </button>
            )}

            {successMsg && (
              <button
                className="btn btn-outline btn-full"
                onClick={() => navigate('/swaps')}
              >
                Lihat Swap Saya →
              </button>
            )}

            {isOwnSkill && (
              <button className="btn btn-ghost btn-full" disabled>
                Tidak bisa request skill sendiri
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
