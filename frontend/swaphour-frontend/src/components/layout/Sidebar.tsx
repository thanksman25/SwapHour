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
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="1em" height="1em" viewBox="0 0 576 512" fill="currentColor" style={{ display: "block" }}>
        <path d="M575.8 225.5c0 10.5-8.5 19-19 19H504v216.7c0 28.3-22.9 51.3-51.3 51.3H368V344H208v168H123.3c-28.3 0-51.3-22.9-51.3-51.3V244.5H19.2c-10.5 0-19-8.5-19-19 0-4.7 1.8-9.2 5.1-12.7L253.1 7.1c15.2-16.1 40.5-16.1 55.8 0L570.8 212.8c3.2 3.5 5 8 5 12.7z"/>
      </svg>
    )
  },
  {
    to: "/wallet",
    label: "Wallet",
    icon: (
      <svg width="1em" height="1em" viewBox="0 0 640 640" fill="currentColor" style={{ display: "block" }}>
        <path d="M128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 256C576 220.7 547.3 192 512 192L136 192C122.7 192 112 181.3 112 168C112 154.7 122.7 144 136 144L520 144C533.3 144 544 133.3 544 120C544 106.7 533.3 96 520 96L128 96zM480 320C497.7 320 512 334.3 512 352C512 369.7 497.7 384 480 384C462.3 384 448 369.7 448 352C448 334.3 462.3 320 480 320z"/>
      </svg>
    )
  },
  {
    to: "/skills",
    label: "Exchange",
    icon: (
      <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor" style={{ display: "block" }}>
        <path d="M273 239c-9.4 9.4-24.6 9.4-33.9 0L161 161H448c13.3 0 24-10.7 24-24s-10.7-24-24-24H161l78.1-78.1c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L81.1 125.1c-14.1 14.1-14.1 36.8 0 50.9L205.1 300c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L273 239zM306.9 212c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l78.1 78.1H64c-13.3 0-24 10.7-24 24s10.7 24 24 24H351l-78.1 78.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l123.9-123.9c14.1-14.1 14.1-36.8 0-50.9L306.9 212z"/>
      </svg>
    )
  },
  {
    to: "/swaps",
    label: "Network",
    icon: (
      <svg width="1em" height="1em" viewBox="0 0 640 512" fill="currentColor" style={{ display: "block" }}>
        <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l74.7 0c19.1 0 36.8 5 52 13.8c-11.5 20.5-18 44.1-18 69.2l0 56.1c-15.9 8.2-34 12.8-53.3 12.8l-55.4 0C47.8 344 0 296.2 0 237.3zm458.7-106.7C517.6 192 565.3 239.8 565.3 298.7c0 58.9-47.8 106.7-106.7 106.7l-55.4 0c-19.3 0-37.4-4.7-53.3-12.8l0-56.1c0-25.1-6.5-48.7-18-69.2c15.2-8.8 32.9-13.8 52-13.8l74.7 0zM320 112a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM192 384c0-35.3 28.7-64 64-64l128 0c35.3 0 64 28.7 64 64l0 128-256 0 0-128z"/>
      </svg>
    )
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: (
      <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor" style={{ display: "block" }}>
        <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
      </svg>
    )
  },
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
