import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: "⏰",
    title: "Time Banking",
    description:
      "1 jam keahlianmu = 1 jam keahlian orang lain. Tidak ada yang lebih tinggi nilainya.",
  },
  {
    icon: "🤝",
    title: "Komunitas Setara",
    description:
      "Semua keahlian dihargai sama. Dari coding hingga memasak, semua bernilai.",
  },
  {
    icon: "🔒",
    title: "Aman & Terpercaya",
    description:
      "Setiap transaksi tercatat dan terverifikasi. Reputasi dibangun dari ulasan nyata.",
  },
  {
    icon: "🌍",
    title: "Tanpa Batas",
    description:
      "Terhubung dengan siapa saja, di mana saja. Tukar keahlian lintas kota dan budaya.",
  },
];

const Features = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const container = cardsRef.current;

    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" },
      );
    }

    if (container) {
      const cards = Array.from(container.querySelectorAll(".feature-card"));
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.4,
          ease: "power3.out",
        },
      );
    }
  }, []);

  return (
    <section className="features-section">
      <div className="features-container">
        <h2 ref={titleRef} className="features-title">
          Mengapa SwapHour?
        </h2>
        <div ref={cardsRef} className="features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
