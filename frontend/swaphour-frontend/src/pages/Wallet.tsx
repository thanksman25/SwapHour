import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import apiClient from '../lib/apiClient';
import type { User, WalletTransaction } from '../types';
import './Wallet.css';

function fetchProfile(): Promise<User> {
  return apiClient.get<{ status: string; data: User }>('/users/profile').then((r) => r.data.data);
}

function fetchTransactions(): Promise<WalletTransaction[]> {
  return apiClient
    .get<{ status: string; data: WalletTransaction[] }>('/wallet/transactions')
    .then((r) => r.data.data ?? [])
    .catch(() => []); // Endpoint mungkin belum ada
}

const TX_TYPE_MAP: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  credit:  { label: 'Kredit Masuk',    icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,  color: 'var(--color-completed)' },
  debit:   { label: 'Debit Keluar',    icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>,  color: 'var(--color-rejected)'  },
  hold:    { label: 'Saldo Ditahan',   icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 15 15"/></svg>, color: 'var(--color-pending)'   },
  release: { label: 'Saldo Dilepas',   icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,  color: 'var(--color-active)'    },
};

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function Wallet() {
  const pageRef = useRef<HTMLDivElement>(null);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });

  const { data: transactions = [], isLoading: txLoading } = useQuery({
    queryKey: ['wallet-transactions'],
    queryFn: fetchTransactions,
    staleTime: 2 * 60 * 1000,
  });

  const balance = Number(profile?.credit_hours ?? 0);

  // GSAP Entrance Animations
  useEffect(() => {
    if (profileLoading || !pageRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate header text
      tl.from('.wallet-page h1, .wallet-page > div:first-child p', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      })
      // Animate balance card
      .from('.wallet-balance-card', {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.2)'
      }, '-=0.25')
      // Animate system credit info card
      .from('.wallet-info', {
        y: 20,
        opacity: 0,
        duration: 0.5
      }, '-=0.3')
      // Animate individual list items inside info grid
      .from('.info-item', {
        y: 15,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4
      }, '-=0.25')
      // Animate transaction section header and card list
      .from('.wallet-page h2, .wallet-tx-list', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      }, '-=0.3')
      // Animate actual transactions if any
      .from('.wallet-tx-item', {
        x: -15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.45
      }, '-=0.2');
    }, pageRef);
    return () => ctx.revert();
  }, [profileLoading]);

  return (
    <div className="wallet-page" ref={pageRef}>
      {/* Header */}
      <div>
        <h1>Wallet</h1>
        <p className="text-muted">Pantau saldo dan riwayat transaksi jam kredit kamu.</p>
      </div>

      {/* Balance card */}
      <div className="wallet-balance-card">
        <div className="wallet-balance-card__bg" />
        <div className="wallet-balance-card__content">
          <div className="wallet-balance-card__left">
            <p className="wallet-balance-card__label">Saldo Jam Kredit</p>
            {profileLoading ? (
              <div className="skeleton" style={{ height: 56, width: 140, borderRadius: 8 }} />
            ) : (
              <div className="wallet-balance-card__amount">
                <span className="amount-num">{balance.toFixed(1)}</span>
                <span className="amount-unit">jam</span>
              </div>
            )}
            <p className="wallet-balance-card__sub">
              1 jam kredit = 1 jam keahlian siapapun
            </p>
          </div>
          <div className="wallet-balance-card__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="wallet-info card">
        <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2v1" /><path d="M12 7a5 5 0 1 1-4.9 6" />
          </svg>
          Cara Kerja Sistem Kredit SwapHour
        </h3>
        <div className="wallet-info__grid">
          {[
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8v12"/><path d="M11.5 8c0-3-3-3-3-3s-3 0-3 3 3 3 3 3h3v-3z"/><path d="M12.5 8c0-3 3-3 3-3s3 0 3 3-3 3-3 3h-3v-3z"/></svg>, title: 'Mulai dengan 5 Jam', desc: 'Setiap akun baru mendapat 5 jam kredit gratis untuk mulai.' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2z"/></svg>, title: 'Request Skill', desc: 'Gunakan kredit untuk meminta keahlian dari provider.' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>, title: 'Saldo Ditahan', desc: 'Kredit ditahan saat request pending, dikembalikan jika ditolak.' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>, title: 'Dapatkan Kredit', desc: 'Terima request skill dari orang lain dan saldo kamu bertambah.' },
          ].map((item) => (
            <div key={item.title} className="info-item">
              <span className="info-item__icon" style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
              <div>
                <div className="info-item__title">{item.title}</div>
                <div className="info-item__desc text-muted">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="wallet-info__cta">
          <Link to="/skills" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            Jelajahi Katalog Skill →
          </Link>
        </div>
      </div>

      {/* Transaction history */}
      <div>
        <h2 style={{ marginBottom: 16 }}>Riwayat Transaksi</h2>
        <div className="card wallet-tx-list">
          {txLoading ? (
            <div style={{ padding: 20 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 56, marginBottom: 8, borderRadius: 8 }} />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <h3>Belum ada riwayat transaksi</h3>
              <p className="text-muted">Transaksi akan muncul di sini setelah kamu mulai swap.</p>
            </div>
          ) : (
            transactions.map((tx) => {
              const typeInfo = TX_TYPE_MAP[tx.type] ?? { label: tx.type, icon: '•', color: 'inherit' };
              const isPositive = tx.type === 'credit' || tx.type === 'release';
              return (
                <div key={tx.id} className="wallet-tx-item">
                  <div className="tx-icon" style={{ background: typeInfo.color + '18', color: typeInfo.color }}>
                    {typeInfo.icon}
                  </div>
                  <div className="tx-info">
                    <div className="tx-label">{typeInfo.label}</div>
                    <div className="tx-desc text-muted text-sm">{tx.description}</div>
                    <div className="tx-date text-xs text-muted">{formatDate(tx.created_at)}</div>
                  </div>
                  <div className="tx-amount-col">
                    <span
                      className="tx-amount"
                      style={{ color: isPositive ? 'var(--color-completed)' : 'var(--color-rejected)' }}
                    >
                      {isPositive ? '+' : '-'}{Math.abs(Number(tx.amount)).toFixed(1)} jam
                    </span>
                    <span className="tx-balance-after text-xs text-muted">
                      Saldo: {Number(tx.balance_after).toFixed(1)} jam
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
