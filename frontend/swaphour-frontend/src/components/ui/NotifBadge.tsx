interface NotifBadgeProps {
  count: number;
}

export default function NotifBadge({ count }: NotifBadgeProps) {
  if (count <= 0) return null;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 18,
        height: 18,
        borderRadius: 999,
        background: '#EF4444',
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        fontFamily: 'var(--font-body)',
        padding: '0 4px',
        lineHeight: 1,
        position: 'absolute',
        top: -5,
        right: -6,
      }}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
