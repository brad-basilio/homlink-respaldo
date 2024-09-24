'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import PostCard from '../Blog/PostCard'

const Articles = ({articles}) => {
  const swiperRef = useRef(null)

  return (
    <section className="flex overflow-hidden flex-col justify-center p-[5%] bg-slate-100">
      <div className="flex flex-col justify-center w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-6 justify-between items-center w-full max-md:max-w-full">
          <div className="self-stretch my-auto text-2xl sm:text-3xl md:text-4xl font-medium tracking-tighter text-slate-700 max-md:max-w-full">
            Últimas noticias sobre
            <span className="ms-1 font-bold">cursos y talleres</span>
          </div>
          <div className="flex gap-3 justify-center items-center self-stretch my-auto">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex relative shrink-0 self-stretch my-auto w-7 h-7 items-center justify-center bg-white rounded-full shadow-md"
              aria-label="Previous slide"
            >
              <i className='mdi mdi-arrow-left'></i>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex relative shrink-0 self-stretch my-auto w-7 h-7 items-center justify-center bg-white rounded-full shadow-md"
              aria-label="Next slide"
            >
              <i className='mdi mdi-arrow-right'></i>
            </button>
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        slidesPerView={2}
        spaceBetween={32}
        pagination={{
          type: 'progressbar',
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        className="mt-8 w-full"
      >
        {articles.map((item, index) => (
          <SwiperSlide key={index}>
            <PostCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='mt-6 sm:mt-8 md:mt-10'>
        <a className="rounded-full px-4 py-1.5 bg-[#2e405e] text-white text-sm sm:text-base transition-colors duration-300 hover:bg-[#1f2b3e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e405e] cursor-pointer">
          Ver todas las noticias
          <i className='mdi mdi-arrow-top-right ms-1'></i>
        </a>
      </div>
    </section>
  )
}

export default Articles