import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const badge = el.querySelector(".hero-badge");
    const title = el.querySelector(".hero-title");
    const subtitle = el.querySelector(".hero-subtitle");
    const buttons = el.querySelector(".hero-buttons");
    const stats = el.querySelector(".hero-stats");

    gsap.set([badge, title, subtitle, buttons, stats], { opacity: 1, y: 0 });

    gsap.fromTo(
      [badge, title, subtitle, buttons, stats],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      },
    );
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          ✦ Platform Time Banking #1 di Indonesia
        </div>
        <h1 className="hero-title">
          Tukar Keahlian,
          <br />
          <span>Tanpa Uang Tunai</span>
        </h1>
        <p className="hero-subtitle">
          SwapHour menghubungkan orang-orang berbakat. 1 jam keahlianmu senilai
          1 jam keahlian siapa pun. Semua setara, semua berharga.
        </p>
        <div className="hero-buttons">
          <a href="/register" className="btn-primary">
            Mulai Gratis →
          </a>
          <a href="/login" className="btn-secondary">
            Masuk
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">10K+</span>
            <span className="hero-stat-label">Pengguna Aktif</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">50K+</span>
            <span className="hero-stat-label">Jam Ditukar</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">200+</span>
            <span className="hero-stat-label">Jenis Keahlian</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
