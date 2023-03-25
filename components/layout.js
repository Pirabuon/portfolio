import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <div>
        <Link
          className={
            router.pathname == "/blog" || router.pathname == "/blog/[slug]"
              ? "active"
              : ""
          }
          href="/blog"
        >
          <h1 className="siteTitle">Valaakam</h1>
        </Link>
        <nav className="header-nav">
          <ul>
            <li>
              <Link
                className={
                  router.pathname == "/" || router.pathname == "/blog/[slug]"
                    ? "active"
                    : ""
                }
                href="/blog"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className={router.pathname == "/about" ? "active" : ""}
                href="/about"
              ></Link>
            </li>
            <li>
              <Link
                className={
                  router.pathname == "/blog" ||
                  router.pathname == "/blog/[slug]"
                    ? "active"
                    : ""
                }
                href="/blog"
              ></Link>
            </li>
          </ul>
        </nav>
      </div>
      {children}
      <div className="site-footer">
        <p>Footer text, all rights reserved &copy;</p>
      </div>
    </>
  );
}
