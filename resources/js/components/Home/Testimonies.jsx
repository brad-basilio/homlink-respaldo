import React, { useState } from "react"
import testimonieImage from './images/testimonieImage.png'
import HtmlContent from "../../Utils/HtmlContent"

const Testimonies = ({ testimonies, background = 'amber-400' }) => {
  const [currentTestimony, setCurrentTestimony] = useState(testimonies[0])

  return (
    <section className={`grid md:grid-cols-5 gap-8 bg-${background}`}>
      <div className="col-span-full md:col-span-2 w-full flex items-center justify-center order-last md:order-first">
        <div className="relative flex grow justify-center md:justify-start p-[5%] pb-0 md:p-0 md:px-[5%]  md:h-[calc(100%+64px)] md:-mt-16">
          <img
            src={testimonieImage}
            alt="testimony"
            className="object-contain md:object-cover object-right-bottom w-full max-w-md"
            style={{ aspectRatio: 1.125 }}
          />
        </div>
      </div>

      <div className="col-span-full md:col-span-3 p-[5%] w-full flex flex-col items-center order-first md:order-last">
        <div className="flex flex-col justify-center items-center max-w-full text-center md:text-left">
          <div className="text-2xl font-semibold tracking-tight leading-snug text-gray-900">
            Lo que dicen nuestros alumnos
          </div>
          <div className="mt-2 text-sm leading-5 text-center text-gray-700">
            Conoce las experiencias de quienes han confiado en Trasciende. Sus testimonios muestran cómo lograron superar retos y alcanzar sus metas con nuestra guía.
          </div>
        </div>

        <div className="self-stretch mt-8 text-xl md:text-2xl font-medium tracking-tighter text-center text-gray-900">
          <HtmlContent html={currentTestimony.description.replace(/\*(.*?)\*/g, '<span class="font-bold text-pink-500">$1</span>')} />
        </div>

        <div className="flex flex-col mt-8 w-64 max-w-full items-center md:items-start">
          <div className="text-base font-semibold leading-6 text-center w-full text-gray-900">
            <span className="text-pink-600">{currentTestimony.name},</span>{" "}
            <span>{currentTestimony.country}</span>
          </div>

          <div className="flex gap-8 items-center mt-16 max-md:mt-10">
            {testimonies.map((testimony, index) => (
              <div
                key={index}
                className={`relative flex ${`w-[${testimony.id === currentTestimony.id ? '72px' : '60px'}]`} rounded-full cursor-pointer transition-transform duration-300 ${testimony.id === currentTestimony.id ? 'scale-110 border-4 border-b-[#db2777] border-r-[#db2777]' : 'hover:scale-105'}`}
                onClick={() => setCurrentTestimony(testimony)}
              >
                <img
                  src={`/api/testimonies/media/${testimony.image}`}
                  alt="testimony"
                  className="object-cover object-center rounded-full p-1"
                  style={{ aspectRatio: 1 }}
                  onError={e => e.target.src = `https://ui-avatars.com/api/?name=${testimony.name}&color=7F9CF5&background=EBF4FF`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonies