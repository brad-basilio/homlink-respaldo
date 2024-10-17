import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"

const Testimonies = () => {
  const testimonies = [
    {
      testimony: 'Este champú ha transformado por completo mi cabello, ahora se ve más saludable y brillante.',
      name: 'María López',
      username: 'maria_healthyhair'
    },
    {
      testimony: 'Llevo usando este champú por un mes y el crecimiento de mi cabello es increíble. ¡Lo recomiendo 100%!',
      name: 'Carlos Ramírez',
      username: 'carlos_hairgrowth'
    },
    {
      testimony: 'He probado muchos productos, pero este champú es el único que realmente combate la caspa y deja mi cuero cabelludo limpio.',
      name: 'Ana Torres',
      username: 'ana_anticaspa'
    },
    {
      testimony: 'Mi cabello solía estar seco y sin vida, pero este champú lo ha revitalizado completamente.',
      name: 'Lucía Fernández',
      username: 'lucia_haircare'
    },
    {
      testimony: 'El aroma de este champú es increíble y me deja el cabello suave y manejable todo el día.',
      name: 'Diego Pérez',
      username: 'diego_softshine'
    },
    {
      testimony: 'Este champú ha sido una salvación para mi cabello teñido, mantiene el color vibrante por más tiempo.',
      name: 'Sofía García',
      username: 'sofia_colortreated'
    }
  ];

  return (
    <section className="p-[5%] py-[10%] md:pt-0 text-[#404040] bg-white">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mx-auto items-center"
      >
        {testimonies.map((testimony, index) => (
          <SwiperSlide key={index}>
            <div className="text-center max-w-md px-[15%] md:px-0 mx-auto">
              <div
                className="relative py-10"
                style={{
                  background: 'radial-gradient(circle, #f9edf1 0%, transparent 50%)',
                }}
              >
                <div className="text-lg font-bold relative">
                  <img
                    className="absolute -top-10 -left-12 w-12 h-12 object-contain object-center"
                    src="/assets/img/testimonies/quotes-initial.png"
                    alt="Opening quote"
                  />
                  {testimony.testimony}
                  <img
                    className="absolute -bottom-10 -right-12 w-12 h-12 object-contain object-center"
                    src="/assets/img/testimonies/quotes-final.png"
                    alt="Closing quote"
                  />
                </div>
              </div>
              <h1 className="text-xl text-[#DDABC6] font-bold">{testimony.name}</h1>
              <h3 className="text-[#DDABC6] font-extralight">@{testimony.username}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonies