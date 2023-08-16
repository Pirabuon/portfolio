import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/post.module.css";

// Function to check if the link is internal or external
function isInternalLink(href) {
  return href.startsWith("/") || href.startsWith("#");
}

export default function Post(props) {
  const router = useRouter();
  const { title, content, author, date, featured_image_url, acf } = props.post;

  return (
    <>
      <button className={styles.btn}>
        <Link href="/blog">
          <small>&laquo; back</small>
        </Link>
      </button>
      <div className={styles.meta}>
        <p>{new Date(date).toLocaleDateString()} - {author.name}</p>
      </div>
      {featured_image_url && (
        <div className={styles.featuredImage}>
          <img src={featured_image_url} alt={title.rendered} />
        </div>
      )}
      <h2 className={styles.title}>{title.rendered}</h2>
        <p>{acf.poster}</p>

      <div
        className={styles.cont}
        dangerouslySetInnerHTML={{ __html: content.rendered }}
      ></div>
      <button className={styles.button} onClick={() => router.back()}>
        முன் செல்ல
      </button>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://pirabu.com/wp-json/wp/v2/blog?per_page=100");
  const totalPosts = Number(res.headers.get("X-WP-Total"));
  const totalPages = Number(res.headers.get("X-WP-TotalPages"));

  // Generate paths for all posts by iterating through all pages
  let paths = [];
  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(
      `https://pirabu.com/wp-json/wp/v2/blog?per_page=100&page=${page}`
    );
    const posts = await res.json();
    paths = paths.concat(
      posts.map((post) => {
        return { params: { slug: post.slug } };
      })
    );
  }

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const res = await fetch(
    `https://pirabu.com/wp-json/wp/v2/blog?slug=${slug}&_fields=title,content,author,date,featured_image_url,acf`
  );
  const post = await res.json();

  return {
    props: {
      post: post[0],
    },
    revalidate: 10,
  };
}
