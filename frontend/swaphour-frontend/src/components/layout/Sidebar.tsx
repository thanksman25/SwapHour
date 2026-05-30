import { NavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../../lib/auth";
import Logo from "../ui/Logo";
import "./Sidebar.css";



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
        <Logo size={32} />
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
          to="/settings"
          className={({ isActive }) =>
            `sidebar__footer-link ${isActive ? "sidebar__footer-link--active" : ""}`
          }
        >
          <span className="sidebar__footer-icon">
            {/* Gear berlubang — ikon settings yang beda dari sliders profil */}
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </span>
          <span>Settings</span>
        </NavLink>

        <button className="sidebar__footer-link sidebar__logout-btn" onClick={handleLogout}>
          <span className="sidebar__footer-icon">
            {/* Pintu keluar — lebih jelas secara semantik */}
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
