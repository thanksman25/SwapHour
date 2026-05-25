import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Footer />
    </main>
  );
};

export default LandingPage;
