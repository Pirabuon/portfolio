import { useState } from "react";

import styles from "../styles/SlideToggleMenu.module.css";

function SlideToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.slideToggleMenu}>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        {isOpen ? "Close" : "Menu"}
      </button>
      <nav className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">abnormal</a>
          </li>
          <li>
            <a href="/">blog</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SlideToggleMenu;
