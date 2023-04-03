import Link from "next/link";

export default function Blog(props) {
  return (
    <>
      <h2>அறிவியல்</h2>
        <div className="lister">
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
          <Link href={`/blog/${post.slug}`}>
            <div key={index} className="postItem">
              {featuredImageUrl && (
                <img
                  className="mainImg"
                  src={featuredImageUrl}
                  alt={post.title.rendered}
                />
              )}
              <div className="postCont">
                <h3>{post.title.rendered}</h3>
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                ></div>
              </div>
            </div>
          </Link>
        );
      })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://valaakam.com/wp-json/wp/v2/posts?categories=4&per_page=80&_embed=true"
  );
  const data = await response.json();

  // modify the post data to include author name, category name, and formatted date
  const modifiedData = data.map((post) => ({
    ...post,
    author_name: post?._embedded?.author?.[0]?.name ?? "Unknown Author",
    category_name:
      post?._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Uncategorized",
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  return {
    props: {
      posts: modifiedData,
    },
    revalidate: 10, // update content every 10 seconds
  };
}

