import { useState } from "react";
import Link from "next/link"; // Added import for Link component
import { useRouter } from "next/router"; // Added import for useRouter hook
import styles from "../styles/SlideToggleMenu.module.css";

export default function SlideToggleMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [slides, setSlides] = useState([
    {
      id: 1,
      href: "/science",
      label: "அறிவியல்",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/atom.png",
    },
    {
      id: 2,
      href: "/abnormal",
      label: "அமானுடம்",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/ufo.png",
    },
    {
      id: 3,
      href: "/history",
      label: "வரலாறு",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/history.png",
    },
    {
      id: 4,
      href: "/mystery",
      label: "வினோதங்கள்",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/mystery.png",
    },
    {
      id: 5,
      href: "/scholars",
      label: "மேதைகள்",
      imgUrl: "https://valaakam.com/wp-content/uploads/2023/04/einstein.png",
    },
  ]);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  
  function handleClick(id) {
    setIsOpen(false);
  }

  return (
    <div className={styles.slideToggleMenuGrid}>
          <li className={styles.hamburgerButton} onClick={toggleMenu}>
            <img
              src="https://valaakam.com/wp-content/uploads/2023/04/menu.png"
              style={{ width: "20px", height: "auto" }}
            />
            Categories
          </li>
      <nav className={`${styles.menuGrid} ${isOpen ? styles.isOpenGrid : ""}`}>
        <ul>
          {slides.map((slide) => (
            <li key={slide.id} onClick={() => handleClick(slide.id)}>
              <Link href={slide.href}>
                <a className={`${router.pathname === slide.href ? "active" : ""}`}>
                  <img src={slide.imgUrl} style={{ width: "20px", height: "auto" }} />
                  {slide.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
