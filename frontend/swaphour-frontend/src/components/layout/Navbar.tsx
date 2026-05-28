import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import NotifBadge from "../UI/NotifBadge";
import apiClient from "../../lib/apiClient";
import type { Notification } from "../../types";
import "./Navbar.css";

function fetchUnreadCount(): Promise<number> {
  return apiClient
    .get<{ status: string; data: Notification[] }>("/notifications")
    .then((res) => res.data.data.filter((n) => !n.is_read).length)
    .catch(() => 0);
}

function SwapHourLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        stroke="url(#logoGold)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M10 6h12L16 14 10 6zM10 26h12L16 18l-6 8z"
        fill="url(#logoGreen)"
        opacity="0.9"
      />
      <circle cx="16" cy="16" r="2" fill="url(#logoGold)" />
      <path
        d="M7 13.5 L4 16 L7 18.5"
        stroke="url(#logoGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 13.5 L28 16 L25 18.5"
        stroke="url(#logoGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="logoGold"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F5BC3A" />
          <stop offset="100%" stopColor="#F0A500" />
        </linearGradient>
        <linearGradient
          id="logoGreen"
          x1="16"
          y1="6"
          x2="16"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4ab882" />
          <stop offset="100%" stopColor="#2D9E6F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: "⊞" },
  { to: "/skills", label: "Katalog", icon: "◈" },
  { to: "/swaps", label: "Swap Saya", icon: "⇌" },
  { to: "/wallet", label: "Wallet", icon: "◎" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: fetchUnreadCount,
    refetchInterval: 30000,
    staleTime: 30000,
  });

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".navbar__logo",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "all",
        },
      );
      gsap.fromTo(
        ".navbar__link",
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.2,
          clearProps: "all",
        },
      );
      gsap.fromTo(
        ".navbar__user",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
          clearProps: "all",
        },
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar__gold-line" />

      <div className="navbar__inner container">
        <NavLink to="/dashboard" className="navbar__logo">
          <SwapHourLogo />
          <div className="navbar__logo-text">
            <span className="logo-name">SwapHour</span>
            <span className="logo-tagline">Time Banking</span>
          </div>
        </NavLink>

        <nav className="navbar__nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `navbar__link navbar__link--notif ${isActive ? "navbar__link--active" : ""}`
            }
          >
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span className="nav-icon">◐</span>
              <NotifBadge count={unreadCount} />
            </span>
            Notifikasi
          </NavLink>
        </nav>

        <div className="navbar__user">
          <div className="navbar__credit">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#F0A500" strokeWidth="1.5" />
              <path d="M5 4.5h4L7 7 5 4.5zM5 9.5h4L7 7 5 9.5z" fill="#F0A500" />
            </svg>
            <span className="credit-label">— jam</span>
          </div>

          <div
            className="navbar__avatar-wrap"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ cursor: "pointer" }}
          >
            <div className="navbar__avatar navbar__avatar--initials">
              <span>U</span>
            </div>

            <div
              className="navbar__dropdown"
              style={{
                opacity: dropdownOpen ? 1 : 0,
                visibility: dropdownOpen ? "visible" : "hidden",
                transform: dropdownOpen
                  ? "translateY(0) scale(1)"
                  : "translateY(-8px) scale(0.97)",
                pointerEvents: dropdownOpen ? "auto" : "none",
              }}
            >
              <div className="dropdown-header">
                <div className="dropdown-name">Pengguna</div>
                <div className="dropdown-email text-muted">
                  user@swaphour.com
                </div>
              </div>
              <div className="divider-gold" style={{ margin: "10px 0" }} />
              <NavLink
                to="/profile/edit"
                className="dropdown-item dropdown-item--profile"
                style={{ textDecoration: "none" }}
                onClick={() => setDropdownOpen(false)}
              >
                <span>👤</span> Edit Profil
              </NavLink>
              <div className="divider-gold" style={{ margin: "10px 0" }} />
              <button
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                <span>⟵</span> Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
