import { NavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../../lib/auth";
import "./Sidebar.css";

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
        stroke="url(#sidebarGold)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M10 6h12L16 14 10 6zM10 26h12L16 18l-6 8z"
        fill="url(#sidebarGreen)"
        opacity="0.9"
      />
      <circle cx="16" cy="16" r="2" fill="url(#sidebarGold)" />
      <path
        d="M7 13.5 L4 16 L7 18.5"
        stroke="url(#sidebarGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 13.5 L28 16 L25 18.5"
        stroke="url(#sidebarGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="sidebarGold"
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
          id="sidebarGreen"
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

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "⊞" },
  { to: "/wallet", label: "Wallet", icon: "💳" },
  { to: "/skills", label: "Exchange", icon: "⇌" },
  { to: "/swaps", label: "Network", icon: "👥" },
  { to: "/analytics", label: "Analytics", icon: "📈" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Brand logo */}
      <div className="sidebar__brand">
        <SwapHourLogo />
        <div className="sidebar__brand-text">
          <span className="brand-name">SwapHour</span>
          <span className="brand-tagline">Time is Currency</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
            }
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            <span className="sidebar__link-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer controls */}
      <div className="sidebar__footer">
        <NavLink to="/skills/new" className="sidebar__post-btn">
          <span className="post-btn-icon">+</span>
          <span className="post-btn-text">Post a Skill</span>
        </NavLink>

        <div className="sidebar__divider" />

        <NavLink
          to="/profile/edit"
          className={({ isActive }) =>
            `sidebar__footer-link ${isActive ? "sidebar__footer-link--active" : ""}`
          }
        >
          <span className="sidebar__footer-icon">⚙</span>
          <span>Settings</span>
        </NavLink>

        <button className="sidebar__footer-link sidebar__logout-btn" onClick={handleLogout}>
          <span className="sidebar__footer-icon">⟵</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
