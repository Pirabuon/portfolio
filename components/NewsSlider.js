import React, { useState } from "react";
import Link from "next/link";
import SwiperCore from 'swiper/core';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Autoplay, GrabCursor } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Autoplay, GrabCursor]);


SwiperCore.use([Navigation, Pagination, Autoplay, GrabCursor]);


export default function Blog(props) {
  const [swiper, setSwiper] = useState(null);

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  return (
    <>
      <h2>Blog Title Goes Here</h2>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <Swiper
            onSwiper={setSwiper}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
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
        </div>
        <div className="swiper-button-prev" onClick={goPrev}></div>
        <div className="swiper-button-next" onClick={goNext}></div>
      </div>
    </>
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
