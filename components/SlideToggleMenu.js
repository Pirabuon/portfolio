import { useState } from "react";

import styles from "../styles/SlideToggleMenu.module.css";

function SlideToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.slideToggleMenu}>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        <div className={isOpen ? styles.closeIcon : styles.hamburgerIcon}>
          <span className={styles.iconBar}></span>
          <span className={styles.iconBar}></span>
          <span className={styles.iconBar}></span>
        </div>
      </button>
      <nav className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/abnormal">abnormal</a>
          </li>
          <li>
            <a href="/blog">blog</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SlideToggleMenu;
