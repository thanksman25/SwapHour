import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    );
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          ⏱ SwapHour
        </a>
        <div className="navbar-links">
          <a href="/login" className="nav-link">
            Masuk
          </a>
          <a href="/register" className="nav-link nav-link-register">
            Daftar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
