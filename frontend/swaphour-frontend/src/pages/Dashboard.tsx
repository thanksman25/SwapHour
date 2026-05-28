import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { gsap } from 'gsap';
import apiClient from '../lib/apiClient';
import type { User, SwapRequest, Notification, Skill } from '../types';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import './Dashboard.css';

function fetchProfile(): Promise<User> {
  return apiClient.get<{ status: string; data: User }>('/users/profile').then((r) => r.data.data);
}
function fetchMySwaps(): Promise<SwapRequest[]> {
  return apiClient.get<{ status: string; data: SwapRequest[] }>('/swaps').then((r) => r.data.data ?? []);
}
function fetchNotifications(): Promise<Notification[]> {
  return apiClient.get<{ status: string; data: Notification[] }>('/notifications').then((r) => r.data.data ?? []);
}
function fetchSkills(): Promise<Skill[]> {
  return apiClient.get<{ status: string; data: Skill[] }>('/skills').then((r) => r.data.data ?? []);
}

const QUICK_LINKS = [
  { to: '/skills',        label: 'Cari Skill',   icon: '◈', desc: 'Jelajahi katalog keahlian',    color: '#2D9E6F', glow: 'rgba(45,158,111,0.35)' },
  { to: '/swaps',         label: 'Swap Saya',    icon: '⇌', desc: 'Request masuk & keluar',       color: '#60A5FA', glow: 'rgba(96,165,250,0.3)' },
  { to: '/notifications', label: 'Notifikasi',   icon: '◐', desc: 'Pemberitahuan terbaru',        color: '#F0A500', glow: 'rgba(240,165,0,0.3)' },
  { to: '/wallet',        label: 'Wallet',       icon: '◎', desc: 'Saldo & riwayat transaksi',    color: '#A78BFA', glow: 'rgba(167,139,250,0.3)' },
];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'Menunggu',   cls: 'badge-pending'   },
  active:    { label: 'Aktif',      cls: 'badge-active'    },
  completed: { label: 'Selesai',    cls: 'badge-completed' },
  rejected:  { label: 'Ditolak',    cls: 'badge-rejected'  },
  expired:   { label: 'Kedaluarsa', cls: 'badge-expired'   },
};


export default function Dashboard() {
  const pageRef = useRef<HTMLDivElement>(null);
  const creditNumRef = useRef<HTMLSpanElement>(null);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });

  const { data: swaps = [], isLoading: swapsLoading } = useQuery({
    queryKey: ['swaps'],
    queryFn: fetchMySwaps,
    staleTime: 2 * 60 * 1000,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 30 * 1000,
    refetchInterval: 30000,
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
    staleTime: 5 * 60 * 1000,
  });

  const pendingCount   = swaps.filter((s) => s.status === 'pending').length;
  const activeCount    = swaps.filter((s) => s.status === 'active').length;
  const completedCount = swaps.filter((s) => s.status === 'completed').length;
  const unreadCount    = notifications.filter((n) => !n.is_read).length;

  const mySkills = skills.filter((s) => s.user_id === profile?.id).slice(0, 3);

  // Master GSAP timeline
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Hero text
      tl.from('.dash-greeting', { y: 30, opacity: 0, duration: 0.6 })
        .from('.dash-title',    { y: 24, opacity: 0, duration: 0.55 }, '-=0.35')
        .from('.dash-subtitle', { y: 16, opacity: 0, duration: 0.5  }, '-=0.3')

      // Credit card flies in from right
        .from('.dash-credit-card', { x: 60, opacity: 0, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.5')

      // Stats counter in
        .from('.dash-stat-card', { y: 40, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.08 }, '-=0.3')

      // Quick links cascade
        .from('.dash-quick-card', { y: 30, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1 }, '-=0.2')

      // Recent activity
        .from('.recent-swap-item', { x: -20, opacity: 0, duration: 0.4, stagger: 0.07 }, '-=0.2');

      // Floating animation on credit card
      gsap.to('.dash-credit-card', {
        y: -6, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5,
      });

      // Credit hours counter animation
      if (creditNumRef.current && profile) {
        const target = Number(profile.credit_hours ?? 0);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate() {
            if (creditNumRef.current) {
              creditNumRef.current.innerText = obj.val.toFixed(1);
            }
          }
        });
      }

    }, pageRef);
    return () => ctx.revert();
  }, [profileLoading, swapsLoading, skillsLoading, profile]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return '☀️ Selamat Pagi';
    if (h < 17) return '🌤 Selamat Siang';
    return '🌙 Selamat Malam';
  };

  const STAT_CARDS = [
    { icon: '⏳', num: pendingCount,   label: 'Menunggu',  color: 'var(--color-pending)',   glow: 'rgba(245,158,11,0.3)'  },
    { icon: '⚡', num: activeCount,    label: 'Aktif',     color: 'var(--color-active)',    glow: 'rgba(96,165,250,0.3)'  },
    { icon: '✦',  num: completedCount, label: 'Selesai',   color: 'var(--color-completed)', glow: 'rgba(52,211,153,0.3)'  },
    { icon: '◐',  num: unreadCount,    label: 'Notif Baru',color: 'var(--gold-400)',        glow: 'rgba(240,165,0,0.3)'   },
  ];

  return (
    <div className="dashboard" ref={pageRef}>

      {/* ─── HERO ─── */}
      <div className="dashboard__hero">
        <div className="dashboard__hero-text">
          <p className="dash-greeting">Halo, <span className="name-accent">{profile?.name ?? 'Pengguna'}</span>! {greeting()}</p>
          <h1 className="dash-title">Dashboard <span className="text-gold-gradient">SwapHour</span></h1>
          <p className="dash-subtitle text-muted">Kelola pertukaran keahlian dan saldo jam kredit kamu.</p>
        </div>

        {/* Credit card */}
        <div className="dash-credit-card card card-gold">
          <div className="credit-card__orb credit-card__orb--1" />
          <div className="credit-card__orb credit-card__orb--2" />

          <div className="credit-card__row">
            <div>
              <p className="credit-card__label">Saldo Jam Kredit</p>
              {profileLoading ? (
                <div className="skeleton" style={{ height: 52, width: 130, borderRadius: 10, marginTop: 6 }} />
              ) : (
                <div className="credit-card__amount">
                  <span ref={creditNumRef} className="credit-card__num">
                    {Number(profile?.credit_hours ?? 0).toFixed(1)}
                  </span>
                  <span className="credit-card__unit">jam</span>
                </div>
              )}
            </div>
            <div className="credit-card__icon-wrap">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="rgba(240,165,0,0.3)" strokeWidth="2"/>
                <path d="M16 12h16L24 22 16 12z" fill="rgba(240,165,0,0.8)"/>
                <path d="M16 36h16L24 26l-8 10z" fill="rgba(240,165,0,0.6)"/>
                <circle cx="24" cy="24" r="3" fill="#F0A500"/>
              </svg>
            </div>
          </div>

          <hr className="divider-gold" style={{ margin: '14px 0 10px' }} />

          <div className="credit-card__footer">
            <span className="text-muted" style={{ fontSize: 12 }}>
              Profil {profile?.profile_completion ?? 0}% lengkap
            </span>
            {(profile?.profile_completion ?? 0) < 80 && (
              <span className="credit-card__warn">⚠ min. 80% untuk request</span>
            )}
          </div>
          <div className="credit-bar">
            <div
              className="credit-bar__fill"
              style={{ width: `${profile?.profile_completion ?? 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── STATS ─── */}
      <div className="dashboard__stats">
        {swapsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 100, borderRadius: 20 }} />
            ))
          : STAT_CARDS.map((s) => (
              <div
                key={s.label}
                className="dash-stat-card card"
                style={{ '--stat-glow': s.glow } as React.CSSProperties}
              >
                <span className="stat-emoji">{s.icon}</span>
                <div className="stat-number" style={{ color: s.color }}>{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
      </div>

      {/* ─── QUICK LINKS ─── */}
      <div className="dashboard__section">
        <div className="section-head">
          <h2>Akses Cepat</h2>
          <div className="divider-gold" style={{ flex: 1, maxWidth: 200 }} />
        </div>
        <div className="dashboard__quick-grid">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="dash-quick-card card"
              style={{ '--card-glow': link.glow } as React.CSSProperties}
            >
              <div className="quick-icon-wrap" style={{ background: link.color + '20', color: link.color }}>
                <span className="quick-icon-sym">{link.icon}</span>
              </div>
              <div className="quick-text">
                <div className="quick-label">{link.label}</div>
                <div className="quick-desc text-muted">{link.desc}</div>
              </div>
              <span className="quick-arrow" style={{ color: link.color }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM TWO COLUMNS ─── */}
      <div className="dashboard__two-col">
        {/* Recent Activity */}
        <div className="dashboard__section">
          <div className="section-head">
            <h2>Aktivitas Terbaru</h2>
            <Link to="/swaps" className="section-more">Lihat semua →</Link>
          </div>

          {swapsLoading ? (
            <div className="card">
              <LoadingSkeleton variant="row" count={3} />
            </div>
          ) : swaps.length === 0 ? (
            <div className="card empty-state">
              <span className="empty-icon">📭</span>
              <h3>Belum ada aktivitas</h3>
              <p className="text-muted text-sm">Mulai dengan mencari skill yang kamu butuhkan.</p>
              <Link to="/skills" className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>
                Jelajahi Katalog →
              </Link>
            </div>
          ) : (
            <div className="recent-swap-list card">
              {swaps.slice(0, 5).map((swap) => {
                const s = STATUS_MAP[swap.status];
                return (
                  <div key={swap.id} className="recent-swap-item">
                    <div className="recent-icon">
                      {swap.status === 'pending' ? '⏳' : swap.status === 'active' ? '⚡' : swap.status === 'completed' ? '✦' : '✕'}
                    </div>
                    <div className="recent-info">
                      <span className="recent-title">{swap.skill?.title ?? 'Skill'}</span>
                      <span className="text-muted text-sm">{swap.duration_hours} jam kredit</span>
                    </div>
                    <span className={`badge ${s.cls}`}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* User Skills Preview */}
        <div className="dashboard__section">
          <div className="section-head">
            <h2>Skill Saya (3 Terbaru)</h2>
            <span className="section-more">Milik Kamu</span>
          </div>

          {skillsLoading || profileLoading ? (
            <div className="card">
              <LoadingSkeleton variant="row" count={3} />
            </div>
          ) : mySkills.length === 0 ? (
            <div className="card empty-state">
              <span className="empty-icon">📚</span>
              <h3>Belum ada skill</h3>
              <p className="text-muted text-sm">Tambahkan keahlian kamu untuk mulai berbagi.</p>
            </div>
          ) : (
            <div className="recent-swap-list card">
              {mySkills.map((skill) => (
                <div key={skill.id} className="recent-swap-item">
                  <div className="recent-icon" style={{ color: 'var(--gold-400)' }}>
                    ★
                  </div>
                  <div className="recent-info">
                    <span className="recent-title">{skill.title}</span>
                    <span className="text-muted text-sm">{skill.category} • {skill.duration_hours} jam</span>
                  </div>
                  <span className="badge badge-primary">Skill Saya</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
