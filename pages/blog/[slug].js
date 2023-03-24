import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/post.module.css";

export default function Post(props) {
  const router = useRouter();
  return (
    <>
      <p>
        <Link href="/blog">
          <small>&laquo; back to all blog posts</small>
        </Link>
      </p>
      <h2 className={styles.title}>{props.post.title.rendered}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: props.post.content.rendered }}
      ></div>
      <button className={styles.button} onClick={() => router.push("/blog")}>
        Click me to programmatically navigate or redirect
      </button>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://valaakam.com/wp-json/wp/v2/posts");
  const posts = await res.json();
  const thePaths = posts.map((post) => {
    return { params: { slug: post.slug } };
  });

  return {
    paths: thePaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const res = await fetch(
    `https://valaakam.com/wp-json/wp/v2/posts?slug=${slug}&_fields=title,content`
  );
  const post = await res.json();

  return {
    props: {
      post: post[0],
    },
    revalidate: 10,
  };
}
