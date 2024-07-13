"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import Image from "next/image";

import { data } from "../../../public/data";
import Card from "../Card/Card";

const ProductSlider = ({ category, topRated }) => {
    let products = [];
  
    if (topRated) {
      products = data.products.sort((a, b) => b.rating - a.rating).slice(0, 10); // Top 10 productos mejor rankeados
    } else {
      products = data.products.filter(product => product.category === category);
    }

  return (
    <div className="w-full h-full "> 
      <Swiper
        modules={[Navigation, Scrollbar]}
        spaceBetween={50}
        freeMode={true}
        navigation
        scrollbar={{ draggable: true }}
        slidesPerView={1.5}
        pagination={{ clickable: true }}
        grabCursor
        className="w-full md:w-full"
        breakpoints={{
          768: {
            slidesPerView:4.5,
          },
        }}
      >
        {products.map((e) => (
          <SwiperSlide key={e.id} className="w-full  ">
           <Card
          key={e.id}
          _id={e._id}
          image={e.image}
          title={e.title}
          price={e.price}
          stock={e.stock}
          category={e.category} // Asegúrate de verificar también si category es undefined
        />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
