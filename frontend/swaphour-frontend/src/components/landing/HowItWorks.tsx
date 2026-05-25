import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Daftar",
    description: "Buat akun gratis dan lengkapi profilmu dalam hitungan menit.",
  },
  {
    number: "02",
    title: "Tawarkan Skill",
    description:
      "Tambahkan keahlian yang kamu miliki, dari desain hingga memasak.",
  },
  {
    number: "03",
    title: "Swap!",
    description:
      "Tukar jam keahlianmu dengan orang lain. 1 jam = 1 jam, semua setara.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
      const cards = Array.from(container.querySelectorAll(".step-card"));
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
    <section ref={sectionRef} className="how-section">
      <div className="how-container">
        <span className="section-label">Cara Kerja</span>
        <h2 ref={titleRef} className="how-title">
          Semudah 3 Langkah
        </h2>
        <p className="section-subtitle">
          Bergabung dan mulai tukar keahlian dalam hitungan menit.
        </p>
        <div ref={cardsRef} className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <span className="step-number">{step.number}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
