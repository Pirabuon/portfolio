import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/post.module.css";

export default function Post(props) {
  const router = useRouter();
  const { title, content, author, date, featured_image_url } = props.post;

  // Replace the domain name in the featured image URL
  const valaakamImageUrl = featured_image_url?.replace(
    "https://edu.tamilclone.com/",
    "https://valaakam.com/"
  );

  // Extract the first image from the post content
  const firstImageUrl = content.rendered.match(/<img.+?src=(['"])(.+?)\1/)?.[2];

  return (
    <>
      <button className={styles.btn}>
        <Link href="/">
          <small>&laquo; back</small>
        </Link>
      </button>
      <div className={styles.meta}>
        <p>
          {new Date(date).toLocaleDateString()} - {author.name}
        </p>
      </div>
      {(featured_image_url || firstImageUrl) && (
        <div className={styles.featuredImage}>
          <img src={valaakamImageUrl || firstImageUrl} alt={title.rendered} />
        </div>
      )}
      <h2 className={styles.title}>{title.rendered}</h2>

      <div
        className={styles.cont}
        dangerouslySetInnerHTML={{ __html: content.rendered }}
      ></div>
      <button className={styles.button} onClick={() => router.push("/")}>
        Back
      </button>
    </>
  );
}



export async function getStaticPaths() {
  const res = await fetch("https://valaakam.com/wp-json/wp/v2/posts?per_page=100");
  const totalPosts = Number(res.headers.get("X-WP-Total"));
  const totalPages = Number(res.headers.get("X-WP-TotalPages"));

  // Generate paths for all posts by iterating through all pages
  let paths = [];
  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(
      `https://valaakam.com/wp-json/wp/v2/posts?per_page=100&page=${page}`
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
    `https://valaakam.com/wp-json/wp/v2/posts?slug=${slug}&_fields=title,content,author,date,featured_image_url`
  );
  const post = await res.json();

  return {
    props: {
      post: post[0],
    },
    revalidate: 10,
  };
}


