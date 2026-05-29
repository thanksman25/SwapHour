
interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  center?: boolean;
}

const Spinner = ({ size = "md", center = false }: SpinnerProps) => {
  return (
    <div className={`ui-spinner-wrapper ${center ? "ui-spinner--center" : ""}`}>
      <div className={`ui-spinner ui-spinner--${size}`} />
    </div>
  );
};

export default Spinner;
