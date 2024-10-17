import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"

const Routine = () => {
  return <section className="bg-white p-[5%] text-center md:p-[10%] md:pt-[5%] lg:px-[20%]">
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
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="mt-[5%]"
    >
      <SwiperSlide>
        <article className="bg-[#FBF5F1] rounded-lg">
          <img className="aspect-[3/4] object-cover object-center bg-[#d0cddc] rounded-t-xl" src="/assets/img/routine/shampoo.png" alt="Shampoo" />
          <div className="p-2">
            <h1 className="text-lg font-bold">Shampoo</h1>
            <p className="text-center text-sm">Personalizado desde S/69.90</p>
          </div>
        </article>
      </SwiperSlide>

      <SwiperSlide>
        <article className="bg-[#FBF5F1] rounded-lg">
          <img className="aspect-[3/4] object-cover object-center bg-[#d0cddc] rounded-t-xl" src="/assets/img/routine/conditioner.png" alt="Acondicionador" />
          <div className="p-2">
            <h1 className="text-lg font-bold">Acondicionador</h1>
            <p className="text-center text-sm">Personalizado desde S/69.90</p>
          </div>
        </article>
      </SwiperSlide>

      <SwiperSlide>
        <article className="bg-[#FBF5F1] rounded-lg">
          <img className="aspect-[3/4] object-cover object-center bg-[#d0cddc] rounded-t-xl" src="/assets/img/routine/leave-in-cream.png" alt="Crema de Peinar" />
          <div className="p-2">
            <h1 className="text-lg font-bold">Crema de Peinar</h1>
            <p className="text-center text-sm">Personalizado desde S/69.90</p>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>
  </section>
}

export default Routine 