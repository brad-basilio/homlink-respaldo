import React from "react";

const CourseCard = ({ name, summary, image }) => (
  <div className="flex flex-col w-full mb-8">
    <h3 className="text-xl md:text-2xl font-semibold tracking-tight line-clamp-2 h-16 text-ellipsis text-[#2B384F]">
      {name}
    </h3>
    <p className="mt-3 md:mt-5 text-sm line-clamp-3 text-ellipsis text-[#2E405E] h-[60px]">
      {summary}
    </p>
    <img
      src={`/api/courses/media/${image}`}
      alt={name}
      className="mt-6 md:mt-10 w-full object-cover aspect-[0.952]"
      onError={e => e.target.src = `https://placehold.co/600x400?text=${name}`}
    />
  </div>
);

export default CourseCard