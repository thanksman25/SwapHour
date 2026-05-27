import { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gsap } from 'gsap';
import apiClient from '../lib/apiClient';
import type { Notification } from '../types';
import './Notifications.css';

function fetchNotifications(): Promise<Notification[]> {
  return apiClient.get<{ status: string; data: Notification[] }>('/notifications').then((r) => r.data.data ?? []);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);
  if (mins < 1)   return 'Baru saja';
  if (mins < 60)  return `${mins} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days === 1) return 'Kemarin';
  return `${days} hari lalu`;
}

const TYPE_ICONS: Record<string, string> = {
  swap_request:   '📨',
  swap_accepted:  '✅',
  swap_completed: '🎉',
  swap_rejected:  '❌',
  default:        '🔔',
};

export default function Notifications() {
  const queryClient = useQueryClient();
  const pageRef = useRef<HTMLDivElement>(null);

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 30 * 1000,
    refetchInterval: 30000,
  });

  const { mutate: markRead } = useMutation({
    mutationFn: (id: string) => apiClient.patch(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const { mutate: markAllRead } = useMutation({
    mutationFn: async () => {
      const unread = notifications.filter((n) => !n.is_read);
      await Promise.all(unread.map((n) => apiClient.patch(`/notifications/${n.id}/read`)));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // GSAP animation when notifications load
  useEffect(() => {
    if (isLoading || !pageRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.notif-header h1, .notif-header p, .notif-header button', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08
      })
      .from('.notif-list', {
        y: 25,
        opacity: 0,
        duration: 0.6
      }, '-=0.25')
      .from('.notif-item', {
        x: -15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.45,
        clearProps: 'all'
      }, '-=0.3');
    }, pageRef);
    return () => ctx.revert();
  }, [isLoading, notifications.length]);

  return (
    <div className="notif-page" ref={pageRef}>
      {/* Header */}
      <div className="notif-header">
        <div>
          <h1>Notifikasi</h1>
          <p className="text-muted">
            {unreadCount > 0
              ? `${unreadCount} notifikasi belum dibaca`
              : 'Semua notifikasi sudah dibaca'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-outline btn-sm" onClick={() => markAllRead()}>
            ✓ Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* List */}
      <div className="notif-list card">
        {isLoading ? (
          <div style={{ padding: 20 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 68, marginBottom: 8, borderRadius: 10 }} />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔕</span>
            <h3>Belum ada notifikasi</h3>
            <p className="text-muted">Kamu akan mendapat notifikasi saat ada aktivitas swap.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notif-item ${!notif.is_read ? 'notif-item--unread' : ''}`}
              onClick={() => !notif.is_read && markRead(notif.id)}
            >
              {/* Unread dot */}
              <div className="notif-dot-wrap">
                {!notif.is_read && <span className="notif-dot" />}
              </div>

              {/* Icon */}
              <div className="notif-icon">
                {TYPE_ICONS[notif.type] ?? TYPE_ICONS.default}
              </div>

              {/* Content */}
              <div className="notif-content">
                <p className="notif-message">{notif.message}</p>
                <span className="notif-time text-muted text-xs">{timeAgo(notif.created_at)}</span>
              </div>

              {/* Mark read button */}
              {!notif.is_read && (
                <button
                  className="notif-read-btn"
                  onClick={(e) => { e.stopPropagation(); markRead(notif.id); }}
                  title="Tandai sudah dibaca"
                >
                  ✓
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
