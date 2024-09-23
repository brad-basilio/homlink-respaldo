import React from "react"
import bgHeader from './images/header.png'

const AboutHeader = () => {
  return <section className="flex relative flex-col justify-center items-center w-full bg-zinc-800 bg-opacity-40 mt-16">
    <img className="absolute top-0 left-0 w-full h-full object-cover object-center" src={bgHeader} alt="" />
    <div className="p-[10%] backdrop-blur-sm bg-[rgba(0,0,0,.25)] text-center">
      <h1 className="text-3xl md:text-6xl text-white font-bold">
        Descubre el Poder de Tu Transformación
      </h1>
      <div
        className="mt-6 md:text-lg text-white"
      >
        En Transciende, te guiamos en el camino hacia el crecimiento personal y profesional. Nuestro enfoque en el desarrollo integral te permitirá alcanzar tus metas, superar tus límites y transformar tu vida en la mejor versión de ti mismo.
      </div>
    </div>
  </section>
}

export default AboutHeader