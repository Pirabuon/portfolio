import styles from "../styles/SlideToggleMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import ShareButton from "./Share";
import GridMenu from "./GridMenu";

import { useEffect, useState } from 'react';

function StickyMenu() {
  const router = useRouter();

    const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  
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
                src="https://valaakam.com/wp-content/uploads/2023/04/home.png"
                style={{ width: "20px", height: "auto" }}
              />
              Home
            </Link>
          </li>
          <li>
            <img
              src="https://valaakam.com/wp-content/uploads/2023/04/flash.png"
              style={{ width: "20px", height: "auto" }}
            />
            Flash news <GridMenu/>
          </li>
          <li>
            <img
              src="https://valaakam.com/wp-content/uploads/2023/04/menu.png"
              style={{ width: "20px", height: "auto" }}
            />
            Categories
          </li>
          <li>
            <ShareButton
        text="Good to share !"
        url={url}
      />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StickyMenu;
