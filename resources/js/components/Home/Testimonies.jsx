import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";

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

  return <section className="p-[5%] py-[10%] text-[#404040] bg-white">
    <Swiper
      loop={true}
      className="mx-auto"
    >
      {
        testimonies.map((testimony, index) => {
          return <SwiperSlide key={index}>
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-lg font-bold mb-4">{testimony.testimony}</h2>
              <h1 className="text-xl text-[#DDABC6]">{testimony.name}</h1>
              <h3 className="text-[#DDABC6]">@{testimony.username}</h3>
            </div>
          </SwiperSlide>
        })
      }
    </Swiper>
  </section>
}

export default Testimonies