import Link from "next/link";

function renderPosts(posts, category) {
  return (
    <>
      <h2>{category}</h2>
      <div className="lister">
        {posts.map((post, index) => {
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
            <Link href={`/blog/${post.slug}`} key={index}>
              <div className="postItem">
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

export default function Blog(props) {
  return (
    <>
      <div className="home">
        {renderPosts(props.sciencePosts, "Science")}
        {renderPosts(props.bioPosts, "Bio")}
        {renderPosts(props.abnormal, "Abnormal")}
        {renderPosts(props.puzzle, "Puzzle")}

        {/* Add more categories of posts here */}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const scienceResponse = await fetch(
    "https://valaakam.com/wp-json/wp/v2/posts?_embed=true&categories=7&per_page=4"
  );
  const scienceData = await scienceResponse.json();

  const bioResponse = await fetch(
    "https://valaakam.com/wp-json/wp/v2/posts?_embed=true&categories=8&per_page=4"
  );
  const bioData = await bioResponse.json();

  const abnormalResponse = await fetch(
    "https://valaakam.com/wp-json/wp/v2/posts?_embed=true&categories=9&per_page=4"
  );
  const abnormalData = await abnormalResponse.json();


  const puzzleResponse = await fetch(
    "https://valaakam.com/wp-json/wp/v2/posts?_embed=true&categories=10&per_page=4"
  );
  const puzzleData = await puzzleResponse.json();



  // modify the post data to include author name, category name, and formatted date
  const modifyPostData = (post) => ({
    ...post,
    author_name: post?._embedded?.author?.[0]?.name ?? "Unknown Author",
    category_name:
      post?._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Uncategorized",
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  const modifiedScienceData = scienceData.map(modifyPostData);
  const modifiedBioData = bioData.map(modifyPostData);
  const modifiedAbnormalData = abnormalData.map(modifyPostData);
  const modifiedPuzzleData = puzzleData.map(modifyPostData);

  return {
    props: {
      sciencePosts: modifiedScienceData,
      bioPosts: modifiedBioData,
      abnormalPosts: modifiedAbnormalData,
      puzzlePosts: modifiedPuzzleData,

      // Add more categories of posts here
    },
    revalidate: 10, // update content every 10 seconds
  };
}
