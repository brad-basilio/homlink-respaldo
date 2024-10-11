import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

const Routine = () => {
  return <section className="bg-white p-[5%] text-center">
    <h1 className="text-2xl text-center text-[#404040] font-bold">
      Rutina capilar personalizada
    </h1>
    <Swiper
      spaceBetween={'5%'}
      slidesPerView={2} // Muestra 2 slides en móvil
      breakpoints={{
        1024: {
          slidesPerView: 3, // Muestra 3 slides en escritorio
        },
      }}
      loop={true}
      className="mt-[5%]"
    >
      <SwiperSlide>
        <article className="bg-[#FBF5F1]">
          <img className="aspect-[3/4]" src="/assets/img/routine/shampoo.png" alt="Shampoo" />
          <h1 className="text-lg font-bold mt-2">Shampoo</h1>
          <p className="text-center text-sm">Personalizado desde S/69.90</p>
        </article>
      </SwiperSlide>

      <SwiperSlide>
        <article className="bg-[#FBF5F1]">
          <img className="aspect-[3/4]" src="/assets/img/routine/conditioner.png" alt="Acondicionador" />
          <h1 className="text-lg font-bold mt-2">Acondicionador</h1>
          <p className="text-center text-sm">Personalizado desde S/69.90</p>
        </article>
      </SwiperSlide>

      <SwiperSlide>
        <article className="bg-[#FBF5F1]">
          <img className="aspect-[3/4]" src="/assets/img/routine/leave-in-cream.png" alt="Crema de Peinar" />
          <h1 className="text-lg font-bold mt-2">Crema de Peinar</h1>
          <p className="text-center text-sm">Personalizado desde S/69.90</p>
        </article>
      </SwiperSlide>
    </Swiper>
  </section>
}

export default Routine 