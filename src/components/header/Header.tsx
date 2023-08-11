import { SiAib } from "react-icons/si";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <SiAib size="4rem" color="green" />
          </div>
          <h1>Shopping List</h1>
        </div>
      </div>
    </header>
  );
}
