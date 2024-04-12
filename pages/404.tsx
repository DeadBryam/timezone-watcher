import styles from "@/styles/pages/404.module.css";

function FourOhFour(): JSX.Element {
  return (
    <div className={styles.container}>
      <p>404</p>
      <small>↑, ↑, ↓, ↓, ←, →, ←, →, B, A</small>
    </div>
  );
}

export default FourOhFour;
