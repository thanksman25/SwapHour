import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { clearAuth } from "../../lib/auth";
import apiClient from "../../lib/apiClient";
import type { User, Notification } from "../../types";
import NotifBadge from "../ui/NotifBadge";
import "./Header.css";

function fetchProfile(): Promise<User> {
  return apiClient.get<{ status: string; data: User }>("/users/profile").then((r) => r.data.data);
}

function fetchUnreadCount(): Promise<number> {
  return apiClient
    .get<{ status: string; data: Notification[] }>("/notifications")
    .then((res) => res.data.data.filter((n) => !n.is_read).length)
    .catch(() => 0);
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: fetchUnreadCount,
    refetchInterval: 30000,
    staleTime: 30000,
  });

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path === "/skills/new") return "Post a New Skill";
    if (path.startsWith("/skills/")) return "Detail Skill";
    if (path === "/skills") return "Katalog Skill";
    if (path === "/swaps") return "Swap Saya";
    if (path === "/notifications") return "Notifikasi";
    if (path === "/wallet") return "Wallet";
    if (path === "/profile/edit") return "Settings";
    return "SwapHour";
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const balance = profile ? Number(profile.credit_hours).toFixed(1) : "0.0";
  const userInitial = profile?.name ? profile.name[0].toUpperCase() : "U";

  return (
    <header className="header" ref={headerRef}>
      {/* Page Title */}
      <h2 className="header__title">{getPageTitle()}</h2>

      {/* Right Controls */}
      <div className="header__controls">
        {/* Balance hours badge */}
        <Link to="/wallet" className="header__balance">
          <svg className="header__balance-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="var(--color-accent)" strokeWidth="1.5" />
            <path d="M5.5 5.5h5L8 8 5.5 5.5zM5.5 10.5h5L8 8 5.5 10.5z" fill="var(--color-accent)" />
          </svg>
          <span className="header__balance-value">{balance}h</span>
        </Link>

        {/* Notification Bell */}
        <Link to="/notifications" className="header__notif-btn" title="Notifikasi">
          <span className="notif-icon-wrap">
            🔔
            <NotifBadge count={unreadCount} />
          </span>
        </Link>

        {/* User avatar & dropdown */}
        <div className="header__avatar-container">
          <button
            className="header__avatar-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Menu Akun"
          >
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} className="header__avatar-img" />
            ) : (
              <div className="header__avatar-placeholder">{userInitial}</div>
            )}
          </button>

          {/* Account Dropdown Menu */}
          <div
            className="header__dropdown"
            style={{
              opacity: dropdownOpen ? 1 : 0,
              visibility: dropdownOpen ? "visible" : "hidden",
              transform: dropdownOpen
                ? "translateY(0) scale(1)"
                : "translateY(-8px) scale(0.97)",
              pointerEvents: dropdownOpen ? "auto" : "none",
            }}
          >
            <div className="header__dropdown-info">
              <div className="dropdown-info-name">{profile?.name ?? "Pengguna"}</div>
              <div className="dropdown-info-email text-muted">{profile?.email ?? "user@swaphour.com"}</div>
            </div>
            
            <div className="dropdown-divider" />
            
            <Link
              to="/profile/edit"
              className="dropdown-link"
              onClick={() => setDropdownOpen(false)}
            >
              <span>👤</span> Edit Profil
            </Link>
            
            <div className="dropdown-divider" />
            
            <button className="dropdown-link dropdown-logout" onClick={handleLogout}>
              <span>⟵</span> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
