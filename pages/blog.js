import Link from "next/link";

export default function Blog(props) {
  return (
    <>
      <h2>The Blog</h2>
      {props.posts.map((post, index) => {
        let featuredImageUrl =
          post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
            ?.medium?.source_url;
        if (!featuredImageUrl) {
          // use first image from post if no featured image available
          const matches = post.content.rendered.match(/<img.*?src="(.*?)"/);
          if (matches) {
            featuredImageUrl = matches[1];
          }
        }
        return (
          <div key={index}>
            <h3>
              <Link href={`/blog/${post.slug}`}>{post.title.rendered}</Link>
            </h3>
            {featuredImageUrl && (
              <img src={featuredImageUrl} alt={post.title.rendered} />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            ></div>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://valaakam.com/wp-json/wp/v2/posts?_embed=true"
  );
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
    revalidate: 10, // update content every 10 seconds
  };
}
