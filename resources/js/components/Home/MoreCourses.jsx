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

const MoreCourses = ({ courses }) => {
  return (
    <div className="p-[5%] flex flex-col justify-center bg-white">
      <h2 className="text-3xl md:text-4xl font-medium tracking-tighter leading-tight">
        <span className="text-slate-700">Más </span>
        <span className="font-bold text-pink-500">cursos y talleres </span>
        <span className="text-slate-700">para todos</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 md:mt-14">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>

      <a href="/courses" className="flex gap-2 justify-center items-center self-center md:self-end px-6 py-4 mt-8 md:mt-14 text-base font-medium tracking-normal leading-none text-white uppercase rounded-3xl bg-[#2E405E] hover:bg-[#1E2A3E] transition-colors duration-300">
        <span>ver todos los cursos y diplomados</span>
        <i className="mdi mdi-arrow-top-right"></i>
      </a>
    </div>
  );
};

export default MoreCourses;