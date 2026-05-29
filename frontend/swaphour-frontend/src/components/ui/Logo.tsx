import logoPng from "../../assets/logo.png";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className }: LogoProps) {
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
