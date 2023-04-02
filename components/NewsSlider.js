import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import Link from "next/link";
import { useRouter } from "next/router";

SwiperCore.use([Autoplay]);

export default function App(props) {
  const router = useRouter();
  const [slides, setSlides] = useState([]);

  return (
    <Swiper
      slidesPerView={3}
      speed={1000}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      className="mySwiper specialPromo"
    >
      {props.posts.map((post, index) => {
        let featuredImageUrl =
          post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
            ?.medium?.source_url;
        if (!featuredImageUrl) {
          // use first image from post if no featured image available
          const matches =
            post.content.rendered.match(/<img.*?src="(.*?)"/);
          if (matches) {
            featuredImageUrl = matches[1];
          }
        }
        return (
          <SwiperSlide key={index}>
            <Link href={`/blog/${post.slug}`}>
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
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://valaakam.com/wp-json/wp/v2/posts?categories=7&per_page=80&_embed=true"
  );

  const data = await response.json();

  return {
    props: {
      posts: data,
    },
    revalidate: 10, // update content every 10 seconds
  };
}
