import './LoadingSkeleton.css';

interface LoadingSkeletonProps {
  variant?: 'card' | 'row' | 'text' | 'circle';
  count?: number;
  height?: number;
  width?: string;
}

export default function LoadingSkeleton({
  variant = 'card',
  count = 1,
  height,
  width = '100%',
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (variant === 'card') {
    return (
      <>
        {items.map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-line skeleton" style={{ height: 14, width: '60%' }} />
            <div className="skeleton-line skeleton" style={{ height: 20, width: '85%', marginTop: 8 }} />
            <div className="skeleton-line skeleton" style={{ height: 12, width: '45%', marginTop: 6 }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <div className="skeleton" style={{ height: 24, width: 64, borderRadius: 999 }} />
              <div className="skeleton" style={{ height: 24, width: 56, borderRadius: 999 }} />
            </div>
            <div className="skeleton-line skeleton" style={{ height: 36, width: '100%', marginTop: 16, borderRadius: 10 }} />
          </div>
        ))}
      </>
    );
  }

  if (variant === 'row') {
    return (
      <>
        {items.map((_, i) => (
          <div key={i} className="skeleton-row">
            <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="skeleton" style={{ height: 14, width: '70%' }} />
              <div className="skeleton" style={{ height: 12, width: '45%' }} />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (variant === 'circle') {
    return (
      <>
        {items.map((_, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ width: height || 40, height: height || 40, borderRadius: '50%' }}
          />
        ))}
      </>
    );
  }

  // 'text'
  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ height: height || 16, width, borderRadius: 6, marginBottom: 8 }}
        />
      ))}
    </>
  );
}
