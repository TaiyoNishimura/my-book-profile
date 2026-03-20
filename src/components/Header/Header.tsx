import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.headerLabel}>Book Profile</p>
      <h1 className={styles.headerTitle}>My Reading Journey</h1>
      <p className={styles.headerDescription}>
        読んだ本の記録と、そこから得た学びをまとめています。
      </p>
    </header>
  );
}
