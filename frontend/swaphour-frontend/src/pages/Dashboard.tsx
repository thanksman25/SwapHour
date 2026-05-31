import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import apiClient from "../lib/apiClient";
import type { User, SwapRequest, Notification, Skill } from "../types";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import "./Dashboard.css";

function fetchProfile(): Promise<User> {
  return apiClient
    .get<{ status: string; data: User }>("/users/profile")
    .then((r) => r.data.data);
}
function fetchMySwaps(): Promise<SwapRequest[]> {
  return apiClient
    .get<{ status: string; data: SwapRequest[] }>("/swaps")
    .then((r) => r.data.data ?? []);
}
function fetchNotifications(): Promise<Notification[]> {
  return apiClient
    .get<{ status: string; data: Notification[] }>("/notifications")
    .then((r) => r.data.data ?? []);
}
function fetchSkills(): Promise<Skill[]> {
  return apiClient
    .get<{ status: string; data: Skill[] }>("/skills")
    .then((r) => r.data.data ?? []);
}

/* ─── SVG Icon helpers ─── */
const IconSearch = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconSwap = () => (
  <svg width="22" height="22" viewBox="0 0 512 512" fill="currentColor">
    <path d="M273 239c-9.4 9.4-24.6 9.4-33.9 0L161 161H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H161l78.1-78.1c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L81.1 125.1c-14.1 14.1-14.1 36.8 0 50.9L205.1 300c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L273 239zM306.9 212c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l78.1 78.1H64c-13.3 0-24 10.7-24 24s10.7 24 24 24H351l-78.1 78.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l123.9-123.9c14.1-14.1 14.1-36.8 0-50.9L306.9 212z"/>
  </svg>
);
const IconBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconWallet = () => (
  <svg width="22" height="22" viewBox="0 0 640 640" fill="currentColor">
    <path d="M128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 256C576 220.7 547.3 192 512 192L136 192C122.7 192 112 181.3 112 168C112 154.7 122.7 144 136 144L520 144C533.3 144 544 133.3 544 120C544 106.7 533.3 96 520 96L128 96zM480 320C497.7 320 512 334.3 512 352C512 369.7 497.7 384 480 384C462.3 384 448 369.7 448 352C448 334.3 462.3 320 480 320z"/>
  </svg>
);

/* Stat icons */
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconDot = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" strokeDasharray="2 4"/>
  </svg>
);

/* Empty state icons */
const IconMailbox = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconBooks = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const QUICK_LINKS = [
  {
    to: "/skills",
    label: "Cari Skill",
    icon: <IconSearch />,
    desc: "Jelajahi katalog keahlian",
    color: "#2D9E6F",
    glow: "rgba(45,158,111,0.35)",
  },
  {
    to: "/swaps",
    label: "Swap Saya",
    icon: <IconSwap />,
    desc: "Request masuk & keluar",
    color: "#60A5FA",
    glow: "rgba(96,165,250,0.3)",
  },
  {
    to: "/notifications",
    label: "Notifikasi",
    icon: <IconBell />,
    desc: "Pemberitahuan terbaru",
    color: "#F0A500",
    glow: "rgba(240,165,0,0.3)",
  },
  {
    to: "/wallet",
    label: "Wallet",
    icon: <IconWallet />,
    desc: "Saldo & riwayat transaksi",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.3)",
  },
];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  pending: { label: "Menunggu", cls: "badge-pending" },
  active: { label: "Aktif", cls: "badge-active" },
  completed: { label: "Selesai", cls: "badge-completed" },
  rejected: { label: "Ditolak", cls: "badge-rejected" },
  expired: { label: "Kedaluarsa", cls: "badge-expired" },
};

export default function Dashboard() {
  const pageRef = useRef<HTMLDivElement>(null);
  const creditNumRef = useRef<HTMLSpanElement>(null);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });

  const { data: swaps = [], isLoading: swapsLoading } = useQuery({
    queryKey: ["swaps"],
    queryFn: fetchMySwaps,
    staleTime: 2 * 60 * 1000,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 30 * 1000,
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 5 * 60 * 1000,
  });

  const pendingCount = swaps.filter((s) => s.status === "pending").length;
  const activeCount = swaps.filter((s) => s.status === "active").length;
  const completedCount = swaps.filter((s) => s.status === "completed").length;
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // FIX: Tunggu profile loading selesai sebelum filter skill, dan fallback ke user.user_id
  const mySkills =
    profile && !profileLoading && skills.length > 0
      ? skills.filter((s) => s.user_id === profile.id).slice(0, 3)
      : [];

  // 1. Animasi statis — jalankan sekali saat mount
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".dash-greeting", { y: 30, opacity: 0, duration: 0.6 })
        .from(".dash-title", { y: 24, opacity: 0, duration: 0.55 }, "-=0.35")
        .from(".dash-subtitle", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          ".dash-credit-card",
          { x: 60, opacity: 0, duration: 0.7, ease: "back.out(1.5)" },
          "-=0.5",
        )
        .from(
          ".dash-quick-wrapper",
          { y: 30, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        );

      // Floating animation kartu kredit — loop selamanya
      gsap.to(".dash-credit-card", {
        y: -6,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Stat cards — animasikan setelah data swap selesai load
  useEffect(() => {
    if (swapsLoading) return;
    gsap.fromTo(
      ".dash-stat-card",
      { y: 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
    );
  }, [swapsLoading]);

  // 3. Recent items — animasikan setelah data tersedia
  useEffect(() => {
    if (swapsLoading || skillsLoading) return;
    gsap.fromTo(
      ".recent-swap-item",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power3.out" },
    );
  }, [swapsLoading, skillsLoading]);

  // 4. Credit counter — jalankan saat profile tersedia
  useEffect(() => {
    if (!creditNumRef.current || !profile) return;
    const target = Number(profile.credit_hours ?? 0);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: "power2.out",
      onUpdate() {
        if (creditNumRef.current) {
          creditNumRef.current.innerText = obj.val.toFixed(1);
        }
      },
    });
  }, [profile]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Selamat Pagi";
    if (h < 17) return "Selamat Siang";
    return "Selamat Malam";
  };

  const STAT_CARDS = [
    {
      icon: <IconClock />,
      num: pendingCount,
      label: "Menunggu",
      color: "var(--color-pending)",
      glow: "rgba(245,158,11,0.3)",
    },
    {
      icon: <IconZap />,
      num: activeCount,
      label: "Aktif",
      color: "var(--color-active)",
      glow: "rgba(96,165,250,0.3)",
    },
    {
      icon: <IconCheck />,
      num: completedCount,
      label: "Selesai",
      color: "var(--color-completed)",
      glow: "rgba(52,211,153,0.3)",
    },
    {
      icon: <IconDot />,
      num: unreadCount,
      label: "Notif Baru",
      color: "var(--gold-400)",
      glow: "rgba(240,165,0,0.3)",
    },
  ];

  return (
    <div className="dashboard" ref={pageRef}>
      {/* ─── HERO ─── */}
      <div className="dashboard__hero">
        <div className="dashboard__hero-text">
          <p className="dash-greeting">
            {greeting()},{" "}
            <span className="name-accent">{profile?.name || JSON.parse(localStorage.getItem("user") || "{}")?.name || "Pengguna"}</span>!
          </p>
          <h1 className="dash-title">
            Dashboard <span className="text-gold-gradient">SwapHour</span>
          </h1>
          <p className="dash-subtitle text-muted">
            Kelola pertukaran keahlian dan saldo jam kredit kamu.
          </p>
        </div>

        {/* Credit card */}
        <div className="dash-credit-card card card-gold">
          <div className="credit-card__orb credit-card__orb--1" />
          <div className="credit-card__orb credit-card__orb--2" />

          <div className="credit-card__row">
            <div>
              <p className="credit-card__label">Saldo Jam Kredit</p>
              {profileLoading ? (
                <div
                  className="skeleton"
                  style={{
                    height: 52,
                    width: 130,
                    borderRadius: 10,
                    marginTop: 6,
                  }}
                />
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
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="rgba(240,165,0,0.3)"
                  strokeWidth="2"
                />
                <path d="M16 12h16L24 22 16 12z" fill="rgba(240,165,0,0.8)" />
                <path d="M16 36h16L24 26l-8 10z" fill="rgba(240,165,0,0.6)" />
                <circle cx="24" cy="24" r="3" fill="#F0A500" />
              </svg>
            </div>
          </div>

          <hr className="divider-gold" style={{ margin: "14px 0 10px" }} />

          <div className="credit-card__footer">
            <span className="text-muted" style={{ fontSize: 12 }}>
              Profil {profile?.profile_completion ?? 0}% lengkap
            </span>
            {(profile?.profile_completion ?? 0) < 80 && (
              <span className="credit-card__warn">
                ⚠ min. 80% untuk request
              </span>
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
              <div
                key={i}
                className="skeleton"
                style={{ height: 100, borderRadius: 20 }}
              />
            ))
          : STAT_CARDS.map((s) => (
              <div
                key={s.label}
                className="dash-stat-card card"
                style={{ "--stat-glow": s.glow } as React.CSSProperties}
              >
                <span
                  className="stat-svg-icon"
                  style={{ color: s.color }}
                >
                  {s.icon}
                </span>
                <div className="stat-number" style={{ color: s.color }}>
                  {s.num}
                </div>
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
            <div key={link.to} className="dash-quick-wrapper">
              <Link
                to={link.to}
                className="dash-quick-card card"
                style={{ "--card-glow": link.glow } as React.CSSProperties}
              >
                <div
                  className="quick-icon-wrap"
                  style={{ background: link.color + "20", color: link.color }}
                >
                  {link.icon}
                </div>
                <div className="quick-text">
                  <div className="quick-label">{link.label}</div>
                  <div className="quick-desc text-muted">{link.desc}</div>
                </div>
                <span className="quick-arrow" style={{ color: link.color }}>
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM TWO COLUMNS ─── */}
      <div className="dashboard__two-col">
        {/* Recent Activity */}
        <div className="dashboard__section">
          <div className="section-head">
            <h2>Aktivitas Terbaru</h2>
            <Link to="/swaps" className="section-more">
              Lihat semua →
            </Link>
          </div>

          {swapsLoading ? (
            <div className="card">
              <LoadingSkeleton variant="row" count={3} />
            </div>
          ) : swaps.length === 0 ? (
            <div className="card empty-state">
              <span className="empty-icon">
                <IconMailbox />
              </span>
              <h3>Belum ada aktivitas</h3>
              <p className="text-muted text-sm">
                Mulai dengan mencari skill yang kamu butuhkan.
              </p>
              <Link
                to="/skills"
                className="btn btn-primary btn-sm"
                style={{ marginTop: 12 }}
              >
                Jelajahi Katalog →
              </Link>
            </div>
          ) : (
            <div className="recent-swap-list card">
              {swaps.slice(0, 5).map((swap) => {
                const s = STATUS_MAP[swap.status] ?? {
                  label: swap.status,
                  cls: "badge-pending",
                };
                return (
                  <div key={swap.id} className="recent-swap-item">
                    <div
                      className="recent-icon"
                      style={{
                        color:
                          swap.status === "pending"
                            ? "var(--color-pending)"
                            : swap.status === "active"
                              ? "var(--color-active)"
                              : swap.status === "completed"
                                ? "var(--color-completed)"
                                : "var(--color-rejected)",
                      }}
                    >
                      {swap.status === "pending" ? (
                        <IconClock />
                      ) : swap.status === "active" ? (
                        <IconZap />
                      ) : swap.status === "completed" ? (
                        <IconCheck />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      )}
                    </div>
                    <div className="recent-info">
                      <span className="recent-title">
                        {swap.skill?.title ?? "Skill"}
                      </span>
                      <span className="text-muted text-sm">
                        {swap.duration_hours} jam kredit
                      </span>
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
            <h2>Skill Saya</h2>
            <Link to="/skills/new" className="section-more">
              + Tambah Skill
            </Link>
          </div>

          {skillsLoading || profileLoading ? (
            <div className="card">
              <LoadingSkeleton variant="row" count={3} />
            </div>
          ) : mySkills.length === 0 ? (
            <div className="card empty-state">
              <span className="empty-icon">
                <IconBooks />
              </span>
              <h3>Belum ada skill</h3>
              <p className="text-muted text-sm">
                Tambahkan keahlian kamu untuk mulai berbagi.
              </p>
              <Link
                to="/skills/new"
                className="btn btn-primary btn-sm"
                style={{ marginTop: 12 }}
              >
                + Tambah Skill Baru
              </Link>
            </div>
          ) : (
            <div className="recent-swap-list card">
              {mySkills.map((skill) => (
                <div key={skill.id} className="recent-swap-item">
                  <div
                    className="recent-icon"
                    style={{ color: "var(--gold-400)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <div className="recent-info">
                    <span className="recent-title">{skill.title}</span>
                    <span className="text-muted text-sm">
                      {skill.category} • {skill.duration_hours} jam
                    </span>
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
