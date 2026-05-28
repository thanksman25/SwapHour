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

const TX_TYPE_MAP: Record<string, { label: string; icon: string; color: string }> = {
  credit:  { label: 'Kredit Masuk',    icon: '⬆',  color: 'var(--color-completed)' },
  debit:   { label: 'Debit Keluar',    icon: '⬇',  color: 'var(--color-rejected)'  },
  hold:    { label: 'Saldo Ditahan',   icon: '⏳', color: 'var(--color-pending)'   },
  release: { label: 'Saldo Dilepas',   icon: '↩',  color: 'var(--color-active)'    },
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
          <div className="wallet-balance-card__icon">⏰</div>
        </div>
      </div>

      {/* How it works */}
      <div className="wallet-info card">
        <h3 style={{ marginBottom: 16 }}>💡 Cara Kerja Sistem Kredit SwapHour</h3>
        <div className="wallet-info__grid">
          {[
            { icon: '🎁', title: 'Mulai dengan 5 Jam', desc: 'Setiap akun baru mendapat 5 jam kredit gratis untuk mulai.' },
            { icon: '📤', title: 'Request Skill', desc: 'Gunakan kredit untuk meminta keahlian dari provider.' },
            { icon: '⏳', title: 'Saldo Ditahan', desc: 'Kredit ditahan saat request pending, dikembalikan jika ditolak.' },
            { icon: '💰', title: 'Dapatkan Kredit', desc: 'Terima request skill dari orang lain dan saldo kamu bertambah.' },
          ].map((item) => (
            <div key={item.title} className="info-item">
              <span className="info-item__icon">{item.icon}</span>
              <div>
                <div className="info-item__title">{item.title}</div>
                <div className="info-item__desc text-muted">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="wallet-info__cta">
          <Link to="/skills" className="btn btn-primary">
            📚 Jelajahi Katalog Skill →
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
              <span className="empty-icon">📋</span>
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
