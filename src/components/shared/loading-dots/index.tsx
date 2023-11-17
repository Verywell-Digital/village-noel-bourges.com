import styles from "./loading-dots.module.css";

interface LoadingDotsProps {
  color?: string;
}

const LoadingDots = ({ color = "#000" }: LoadingDotsProps) => {
  const loadingClassName = styles.loading ? styles.loading : "";
  return (
    <span className={` inline-flex justify-center ${loadingClassName}`}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
