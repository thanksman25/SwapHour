import { useTheme } from "../../context/ThemeContext";
import logoPng from "../../assets/logo.png";

interface LogoProps {
  size?: number;
  className?: string;
  forceTheme?: 'dark' | 'light';
}

export default function Logo({ size = 32, className, forceTheme }: LogoProps) {
  // Using CSS mask to dynamically color the logo gold (var(--gold-400))
  // The aspect ratio of the logo is ~3.316 (325x98)
  return (
    <div
      className={className}
      role="img"
      aria-label="SwapHour Logo"
      style={{
        width: `${size * 3.316}px`,
        height: `${size}px`,
        backgroundColor: "var(--gold-400)",
        WebkitMask: `url(${logoPng}) no-repeat center`,
        WebkitMaskSize: "contain",
        mask: `url(${logoPng}) no-repeat center`,
        maskSize: "contain",
        display: "inline-block"
      }}
    />
  );
}
