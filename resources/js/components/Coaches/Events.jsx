import React from "react";
import EventCard from "../Events/EventCard";

const Events = ({ events }) => {
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