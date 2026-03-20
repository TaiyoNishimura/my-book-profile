import styles from "./Stars.module.css";

type StarsProps = {
  rating: number;
};

export default function Stars({ rating }: StarsProps) {
  return (
    <span className={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${styles.star} ${i <= rating ? styles.starActive : styles.starInactive}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}
