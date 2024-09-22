'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const News = () => {
  const swiperRef = useRef(null)

  const newsItems = [
    {
      title: 'Duis ut metus egestas felis pretium venenatis sit amet',
      description: 'Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e8e434687b44e327f11d5e1a2532b9c456ab8cb4f07bde804bf31c7ecf31dfad',
      category: 'Cursos y Talleres',
      date: '12 mayo, 2024',
    },
    {
      title: 'Duis ut metus egestas felis pretium venenatis sit amet',
      description: 'Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e8e434687b44e327f11d5e1a2532b9c456ab8cb4f07bde804bf31c7ecf31dfad',
      category: 'Cursos y Talleres',
      date: '12 mayo, 2024',
    },
    {
      title: 'Duis ut metus egestas felis pretium venenatis sit amet',
      description: 'Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e8e434687b44e327f11d5e1a2532b9c456ab8cb4f07bde804bf31c7ecf31dfad',
      category: 'Cursos y Talleres',
      date: '12 mayo, 2024',
    },
    {
      title: 'Duis ut metus egestas felis pretium venenatis sit amet',
      description: 'Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e8e434687b44e327f11d5e1a2532b9c456ab8cb4f07bde804bf31c7ecf31dfad',
      category: 'Cursos y Talleres',
      date: '12 mayo, 2024',
    },
    {
      title: 'Duis ut metus egestas felis pretium venenatis sit amet',
      description: 'Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e8e434687b44e327f11d5e1a2532b9c456ab8cb4f07bde804bf31c7ecf31dfad',
      category: 'Cursos y Talleres',
      date: '12 mayo, 2024',
    },
    {
      title: 'Duis ut metus egestas felis pretium venenatis sit amet',
      description: 'Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e8e434687b44e327f11d5e1a2532b9c456ab8cb4f07bde804bf31c7ecf31dfad',
      category: 'Cursos y Talleres',
      date: '12 mayo, 2024',
    },
    {
      title: 'Duis ut metus egestas felis pretium venenatis sit amet',
      description: 'Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e8e434687b44e327f11d5e1a2532b9c456ab8cb4f07bde804bf31c7ecf31dfad',
      category: 'Cursos y Talleres',
      date: '12 mayo, 2024',
    },
  ]

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
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/571ae00748971564576a142ad19a32f2ca1f08d8a4f130b706928b79edc79a49"
                alt="Previous"
                className="w-4 h-4 transform rotate-180"
              />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex relative shrink-0 self-stretch my-auto w-7 h-7 items-center justify-center bg-white rounded-full shadow-md"
              aria-label="Next slide"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e996e4779d1a329025c2d7876302b9c84b9074650224f85e7e5964f6298e5523"
                alt="Next"
                className="w-4 h-4"
              />
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
        {newsItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col self-stretch my-auto w-full mt-6">
              <div className="flex flex-col w-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight leading-tight text-[#2B384F] line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base leading-snug sm:leading-normal md:leading-relaxed text-[#2E405E] line-clamp-4">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-col mt-6 sm:mt-8 md:mt-10 w-full">
                <img src={item.image} alt={item.title} className="w-full object-cover h-40 sm:h-44 md:h-48" />
                <div className="flex justify-between items-center mt-4 sm:mt-5 md:mt-6 w-full">
                  <div className="flex gap-2 items-center text-sm sm:text-base font-semibold leading-snug text-[#2B384F]">
                    <span>{item.category}</span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0174721cd37a226a32e03731547bd1132cb737f3cc4d934878f9a014e71276a0"
                      alt="Arrow"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium leading-snug text-[#FF27B9]">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
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

export default News