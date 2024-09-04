import React from "react"
import EventCard from "./EventCard";

const Events = ({ events }) => {

  const eventsData = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc3f18395a84cfe0881b70e51a6d81bf8fa96d38545a7a57b3a717ab32614cca?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731",
      title: "2021: ¿Cómo volver a empezar?",
      description: "Únete a nuestro taller exclusivo donde expertos en liderazgo comparten sus conocimientos para ayudarte a convertirte en un líder efectivo y completo."
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/82de826dc736e9f5809258ce95a0320922b9c31ff69253d2dfe9c639ed5e93a5?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731",
      title: "Webinario de Habilidades Blandas",
      description: "Descubre cómo desarrollar y aplicar habilidades blandas para avanzar en tu carrera y vida personal en este evento virtual informativo."
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/08d4f5caabfef32d0e10c70b6f89a4fbe3d457962d9fc5c81ccf291bc6b2340d?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731",
      title: "Programa de Desarrollo Profesional",
      description: "Participa en nuestro programa de varios días diseñado para equiparte con las habilidades y el conocimiento necesarios para alcanzar el éxito en tu carrera."
    }
  ];
  return <>
    <section className="flex flex-col justify-center p-[5%] w-full bg-zinc-100">
      <div className="flex flex-col w-full">
        <header className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start w-full text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-cyan-950">
            Descubre la Agenda de Eventos y Talleres de Net Coaching
          </h2>
          <div className="flex flex-col justify-end text-base text-right text-cyan-950">
            <p className="leading-6">
              Explora nuestra emocionante variedad de eventos y talleres diseñados para tu crecimiento personal y profesional. Mantente actualizado con las oportunidades que Net Coaching tiene para ofrecer.
            </p>
            <a href="/events" className="flex gap-2 justify-center items-center self-center md:self-end px-6 py-4 mt-6 font-bold leading-tight bg-red-500 rounded-lg text-zinc-100">
              <span className="my-auto">Eventos & Programas</span>
              <i className="mdi mdi-calendar text-lg"></i>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-14 w-full">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  </>
}

export default Events