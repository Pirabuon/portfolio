import Link from "next/link";

export default function Blog(props) {
  return (
    <>
    <div className="home">
    <div className="firstList">
<h2></h2>
      <div className="lister">
        {props.sciencePosts.map((post, index) => {
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
      </div>


      </div>
    </>
  );
}


export async function getStaticProps() {
  const scienceResponse = await fetch(
    "https://pirabu.com/wp-json/wp/v2/blog?_embed=true&per_page=4"
  );
  const scienceData = await scienceResponse.json();


  // modify the post data to include author name, category name, and formatted date
  const modifiedScienceData = scienceData.map((post) => ({
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
      sciencePosts: modifiedScienceData,
    },
    revalidate: 10, // update content every 10 seconds
  };
}
