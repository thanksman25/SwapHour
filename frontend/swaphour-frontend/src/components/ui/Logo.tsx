import { useTheme } from "../../context/ThemeContext";
import logoGold from "../../assets/swaphour_gold.svg";
import logoBlack from "../../assets/swaphour_black.svg";

interface LogoProps {
  size?: number;
  className?: string;
  forceTheme?: 'dark' | 'light';
}

export default function Logo({ size = 32, className, forceTheme }: LogoProps) {
  const { actualTheme } = useTheme();
  
  const resolvedTheme = forceTheme || actualTheme;
  const logoSrc = resolvedTheme === 'light' ? logoBlack : logoGold;

  return (
    <img
      src={logoSrc}
      alt="SwapHour"
      width={size}
      height={size}
      className={className}
      style={{ width: "auto", height: `${size}px`, objectFit: "contain" }}
    />
  );
}
