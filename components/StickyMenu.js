import styles from "../styles/SlideToggleMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import ShareButton from "./Share";

function StickyMenu() {
  const router = useRouter();
  const currentUrl = window.location.href;
  const currentTitle = document.title;
  
  return (
    <div className={styles.stickMenuHolder}>
      <div className="stickMenu">
        <ul>
          <li>
            <Link
              className={
                router.pathname == "/blog" || router.pathname == "/blog/[slug]"
                  ? "active"
                  : ""
              }
              href="/"
            >
              <img
                src="https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp"
                style={{ width: "20px", height: "auto" }}
              />
              Name
            </Link>
          </li>
          <li>
            <img
              src="https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp"
              style={{ width: "20px", height: "auto" }}
            />
            Name
          </li>
          <li>
            <img
              src="https://www.meilleurservice.com/images/cat_22-03-2023_43cat_21-09-2022_43friend.webp"
              style={{ width: "20px", height: "auto" }}
            />
            Name
          </li>
          <li>
            <ShareButton
              text={currentTitle}
              url={currentUrl}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StickyMenu;
