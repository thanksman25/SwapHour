import { getUser } from '../lib/auth';
import type { SwapRequest, SwapStatus } from '../types';
import './SwapCard.css';

interface SwapCardProps {
  swap: SwapRequest;
  mode: 'incoming' | 'outgoing';
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onComplete?: (id: string) => void;
  onRate?: (swap: SwapRequest) => void;
  isLoading?: boolean;
}

const STATUS_MAP: Record<SwapStatus, { label: string; cls: string }> = {
  pending:   { label: 'Menunggu',    cls: 'badge-pending'   },
  active:    { label: 'Aktif',       cls: 'badge-active'    },
  completed: { label: 'Selesai',     cls: 'badge-completed' },
  rejected:  { label: 'Ditolak',     cls: 'badge-rejected'  },
  expired:   { label: 'Kedaluarsa',  cls: 'badge-expired'   },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function SwapCard({ swap, mode, onAccept, onReject, onComplete, onRate, isLoading }: SwapCardProps) {
  const statusInfo = STATUS_MAP[swap.status];
  const counterpart = mode === 'incoming' ? swap.requester : swap.provider;
  const counterpartLabel = mode === 'incoming' ? 'Dari' : 'Kepada';
  const myCompleted = mode === 'incoming' ? swap.provider_completed : swap.requester_completed;

  const currentUser = getUser();
  const alreadyRated = swap.ratings?.some((r: any) => r.rater_id === currentUser?.id);

  return (
    <div className="swap-card card">
      {/* Top Row */}
      <div className="swap-card__top">
        <div className="swap-card__skill-info">
          <span className="badge badge-primary">{swap.skill?.category ?? '—'}</span>
          <h4 className="swap-card__title">{swap.skill?.title ?? 'Skill tidak diketahui'}</h4>
        </div>
        <span className={`badge ${statusInfo.cls}`}>{statusInfo.label}</span>
      </div>

      {/* Details row */}
      <div className="swap-card__meta">
        <div className="swap-card__meta-item">
          <span className="meta-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <span className="text-muted" style={{ fontSize: 13 }}>{counterpartLabel}:</span>
          <span className="meta-value">
            {counterpart?.name ?? 'Pengguna'}
          </span>
        </div>
        <div className="swap-card__meta-item">
          <span className="meta-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <span className="text-muted" style={{ fontSize: 13 }}>Durasi:</span>
          <span className="meta-value">{swap.duration_hours} jam</span>
        </div>
        <div className="swap-card__meta-item">
          <span className="meta-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span className="text-muted" style={{ fontSize: 13 }}>Dibuat:</span>
          <span className="meta-value">{formatDate(swap.created_at)}</span>
        </div>
      </div>

      {/* Notes */}
      {swap.notes && (
        <p className="swap-card__notes text-muted">"{swap.notes}"</p>
      )}

      {/* Completion status for active */}
      {swap.status === 'active' && (
        <div className="swap-card__completion">
          <span className={`completion-dot ${myCompleted ? 'done' : ''}`} />
          <span className="text-muted" style={{ fontSize: 13 }}>
            {myCompleted ? 'Kamu sudah konfirmasi selesai' : 'Menunggu konfirmasi selesai dari kamu'}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="swap-card__actions">
        {/* Provider actions for incoming pending */}
        {mode === 'incoming' && swap.status === 'pending' && (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onAccept?.(swap.id)}
              disabled={isLoading}
            >
              ✓ Terima
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onReject?.(swap.id)}
              disabled={isLoading}
            >
              ✕ Tolak
            </button>
          </>
        )}

        {/* Mark complete for active swaps */}
        {swap.status === 'active' && !myCompleted && (
          <button
            className="btn btn-outline btn-sm"
            onClick={() => onComplete?.(swap.id)}
            disabled={isLoading}
          >
            ✓ Tandai Selesai
          </button>
        )}

        {swap.status === 'active' && myCompleted && (
          <span className="swap-card__waiting-text">
            ⏳ Menunggu konfirmasi dari pihak lain
          </span>
        )}

        {swap.status === 'completed' && !alreadyRated && (
          <button
            className="btn btn-accent btn-sm"
            onClick={() => onRate?.(swap)}
          >
            ★ Beri Rating
          </button>
        )}

        {swap.status === 'completed' && alreadyRated && (
          <span className="swap-card__completed-text" style={{ color: 'var(--color-completed)', fontSize: 13, fontWeight: 600 }}>
            ✓ Selesai & Dinilai
          </span>
        )}
      </div>
    </div>
  );
}
