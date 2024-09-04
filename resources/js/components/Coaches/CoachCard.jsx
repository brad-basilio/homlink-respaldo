import Tippy from "@tippyjs/react"
import React from "react"

const CoachCard = ({ uuid, name, lastname, country, city, summary, specialties, experience, trained_hours, price }) => {
  return <>
    <a href={`/profile/${uuid}`}>
      <article className="flex flex-col w-full">
        <div className="flex flex-col w-full rounded-t-lg">
          <img
            loading="lazy"
            src={`/api/profile/${uuid}`}
            alt="Profile picture of Cameron Williamson"
            className="object-cover object-center w-full rounded-t-lg aspect-square"
          />
        </div>
        <div className="flex flex-col w-full text-cyan-950 border p-2 rounded-b-lg">
          <div className="flex flex-col gap-2 items-start w-full text-xs font-medium leading-tight text-cyan-950">
            <div className="flex flex-row w-full">
              <i className="fas fa-globe-americas me-1"></i>
              <span className="self-stretch my-auto truncate">{
                (country?.name || city)
                  ? `${country?.name}, ${city}`.trim()
                  : 'Sin nacionalidad'
              }</span>
            </div>
            <div className="flex flex-row w-full">
              <i className="fa fa-flag me-1"></i>
              <span className="self-stretch my-auto truncate">
                {
                  (experience > 0)
                    ? <>{experience} años de experiencia</>
                    : 'Sin experiencia'
                }
              </span>
            </div>
            <div className="flex flex-row w-full">
              <i className="fa fa-hourglass-half me-1"></i>
              <span className="self-stretch my-auto truncate">
                {trained_hours}h entrenadas
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-1 w-full text-sm">
            <Tippy content={`${name} ${lastname}`}>
              <h2 className="flex-1 shrink gap-2 w-full text-xl font-bold leading-tight truncate">
                {name} {lastname}
              </h2>
            </Tippy>
            <marquee className="mt-1 font-medium leading-tight text-red-500">
              {specialties.map(({ name }) => name).join(' | ').trim() || <i>- Sin especialidades -</i>}
            </marquee>
            <p className="mt-2 leading-5 line-clamp-3 text-ellipsis h-[60px]">
              {summary || <i>- Sin descripcion -</i>}
            </p>
          </div>
          <p className="mt-2 text-lg font-bold leading-snug">S/. {Number(price).toFixed(2)}</p>
        </div>
      </article>
    </a>
  </>
}

export default CoachCard