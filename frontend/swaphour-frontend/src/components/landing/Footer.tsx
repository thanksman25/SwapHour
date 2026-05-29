import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import swapHourLogo from "../../assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.set(footerRef.current, { opacity: 1, y: 0 });

    gsap.from(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img
            src={swapHourLogo}
            alt="SwapHour"
            style={{ height: "26px", width: "auto" }}
          />
          <p className="footer-tagline">
            Tukar keahlian, bangun komunitas, tanpa uang tunai.
          </p>
        </div>

        <div className="footer-links">
          <a href="/register" className="footer-link">
            Daftar
          </a>
          <a href="/login" className="footer-link">
            Masuk
          </a>
        </div>

        <div className="footer-bottom">
          <p>© 2024 SwapHour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
