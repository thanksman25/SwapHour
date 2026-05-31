import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { clearAuth } from "../../lib/auth";
import apiClient from "../../lib/apiClient";
import type { User, Notification } from "../../types";
import NotifBadge from "../ui/NotifBadge";
import Logo from "../ui/Logo";
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

  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

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



  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const balance = profile ? Number(profile.credit_hours).toFixed(1) : "0.0";
  const userInitial = profile?.name ? profile.name[0].toUpperCase() : "U";

  return (
    <header className="header" ref={headerRef}>
      {/* Right Controls */}
      <div className="header__controls" style={{ marginLeft: 'auto' }}>
        {/* Balance hours text */}
        <Link to="/wallet" className="header__balance-text" title="Saldo Jam">
          {balance}h
        </Link>

        {/* Notification Bell */}
        <Link to="/notifications" className="header__notif-btn" title="Notifikasi">
          <span className="notif-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <NotifBadge count={unreadCount} />
          </span>
        </Link>

        {/* Help Question Icon */}
        <button className="header__help-btn" title="Bantuan / FAQ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>

        {/* User avatar & dropdown */}
        <div className="header__avatar-container">
          <button
            className="header__avatar-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Menu Akun"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass-bg)', border: '1px solid var(--glass-border-gold)', color: 'var(--color-gold)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
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
              <span className="dropdown-icon">
                {/* ikon kartu ID — lebih kontekstual dari sekedar user generik */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <path d="M2 10h20"/>
                  <path d="M6 15h4"/>
                  <path d="M14 15h4"/>
                </svg>
              </span>
              Edit Profil
            </Link>
            
            <div className="dropdown-divider" />
            
            <button className="dropdown-link dropdown-logout" onClick={handleLogout}>
              <span className="dropdown-icon">
                {/* Pintu keluar */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
