import { useTheme } from "../../context/ThemeContext";
import logoPng from "../../assets/logo.png";

interface LogoProps {
  size?: number;
  className?: string;
  forceTheme?: 'dark' | 'light';
}

export default function Logo({ size = 32, className, forceTheme }: LogoProps) {
  // We just use logoPng for now since it's the actual SwapHour logo
  return (
    <img
      src={logoPng}
      alt="SwapHour"
      width={size}
      height={size}
      className={className}
      style={{ width: "auto", height: `${size}px`, objectFit: "contain" }}
    />
  );
}
