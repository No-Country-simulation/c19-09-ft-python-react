"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import Card from "../Card/Card";
import { data } from "../../../public/data";

const ProductSlider = ({ category, topRated }) => {
  let products = [];

  if (topRated) {
    products = data.products.sort((a, b) => b.rating - a.rating).slice(0, 10); // Top 10 productos mejor rankeados
  } else {
    products = data.products.filter((product) => product.category === category);
  }

  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Navigation, Scrollbar]}
        spaceBetween={50}
        freeMode={true}
        navigation
        scrollbar={{ draggable: true }}
        slidesPerView={1.5}
        pagination={{ clickable: true }}
        grabCursor
        className="w-full"
        breakpoints={{
          768: {
            slidesPerView: 4.5,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className="w-full flex justify-center">
            <Card
              _id={product._id}
              image={product.image}
              title={product.title}
              price={product.price}
              stock={product.stock}
              category={product.category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
