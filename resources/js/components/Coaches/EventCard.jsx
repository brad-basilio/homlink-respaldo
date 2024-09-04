import React from "react"

const EventCard = ({ image, name, date_time, type, description }) => {
  return (
    <div className="flex flex-col flex-1 shrink basis-0 h-auto max-md:max-w-full">
      <img
        loading="lazy"
        src={`/api/events/media/${image}`}
        alt={name}
        className="object-cover object-center w-full aspect-square max-md:max-w-full"
        onError={e => e.target.src = '/api/events/media/null'}
      />
      <div className="flex flex-col mt-4 w-full max-md:max-w-full">
        <h3 className="text-lg md:text-xl font-bold leading-snug text-cyan-950 max-md:max-w-full line-clamp-2 h-[52px]">
          {name}
        </h3>
        <p className="mt-2 text-red-500 flex flex-wrap gap-2 justify-between">
          <span className="text-cyan-950">{type}</span>
          <span>{moment(date_time).format('LL')}</span>
          </p>
        <p className="mt-2 text-base leading-relaxed text-cyan-950 max-md:max-w-full line-clamp-4">
          {description}
        </p>
      </div>
    </div>

  );
};

export default EventCard