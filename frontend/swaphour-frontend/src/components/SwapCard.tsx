import type { SwapRequest, SwapStatus } from '../types';
import './SwapCard.css';

interface SwapCardProps {
  swap: SwapRequest;
  mode: 'incoming' | 'outgoing';
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onComplete?: (id: string) => void;
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

export default function SwapCard({ swap, mode, onAccept, onReject, onComplete, isLoading }: SwapCardProps) {
  const statusInfo = STATUS_MAP[swap.status];
  const counterpart = mode === 'incoming' ? swap.requester : swap.provider;
  const counterpartLabel = mode === 'incoming' ? 'Dari' : 'Kepada';
  const myCompleted = mode === 'incoming' ? swap.provider_completed : swap.requester_completed;

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
          <span className="meta-icon">👤</span>
          <span className="text-muted" style={{ fontSize: 13 }}>{counterpartLabel}:</span>
          <span className="meta-value">
            {counterpart?.name ?? 'Pengguna'}
          </span>
        </div>
        <div className="swap-card__meta-item">
          <span className="meta-icon">⏱</span>
          <span className="text-muted" style={{ fontSize: 13 }}>Durasi:</span>
          <span className="meta-value">{swap.duration_hours} jam</span>
        </div>
        <div className="swap-card__meta-item">
          <span className="meta-icon">📅</span>
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
      </div>
    </div>
  );
}
