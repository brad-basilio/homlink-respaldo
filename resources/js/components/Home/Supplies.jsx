import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

const Supplies = () => {

  const supplies = [
    { image: 'hyaluronic-acid.png', title: 'Ácido hialurónico', description: 'Hidratación' },
    { image: 'rosemary-oil.png', title: 'Aceite de Romero', description: 'Crecimiento' },
    { image: 'biotin.png', title: 'Biotina', description: 'Fortaleza' },
    { image: 'calendula.png', title: 'Caléndula', description: 'Anticaspa' },
    { image: 'shea-butter.png', title: 'Manteca de Karite', description: 'Cabello Sano' },
    { image: 'coconut-oil.png', title: 'Aceite de coco', description: 'Restaura' },
  ];


  return <section className="px-[5%] py-[10%] bg-[#FBF5F1] text-[#404040] text-center">
    <h1 className="text-2xl font-bold mb-4">Ingredientes naturales</h1>
    <p className="mb-4">Tu fórmula única cumplirá tus objetivos
      gracias a ingredientes como:</p>
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      breakpoints={{
        320: { // Para mobile (3 slides)
          slidesPerView: 3,
        },
        768: { // Para tablet (4 slides)
          slidesPerView: 4,
        },
        1024: { // Para pantallas grandes (5 slides)
          slidesPerView: 5,
        },
        1280: { // Para pantallas extra grandes (6 slides)
          slidesPerView: 6,
        },
      }}
    >
      {supplies.map((supplie, index) => (
        <SwiperSlide key={index} className="py-4">
          <article className="w-full bg-white p-2 rounded-lg relative">
            <div className="w-full aspect-[5/4]">
              <img className="w-full aspect-square object-contain object-right-top absolute -top-4 -right-4" src={`/assets/img/supplies/${supplie.image}`} alt={supplie.title} />
            </div>
            <div className="h-12 line-clamp-3 text-start">
              <h4 className="text-xs font-bold">{supplie.title}</h4>
              <p className="text-xs">{supplie.description}</p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>

    <a href="/supplies" className="underline text-sm">Ver más ingredientes</a>
  </section>
}

export default Supplies