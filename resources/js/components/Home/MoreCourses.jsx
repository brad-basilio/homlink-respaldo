import React from "react";

const CourseCard = ({ title, description, imageUrl }) => (
  <div className="flex flex-col w-full mb-8">
    <h3 className="text-xl md:text-2xl font-semibold tracking-tight line-clamp-2 text-ellipsis text-[#2B384F]">
      {title}
    </h3>
    <p className="mt-3 md:mt-5 text-sm line-clamp-3 text-ellipsis text-[#2E405E]">
      {description}
    </p>
    <img
      src={imageUrl}
      alt={title}
      className="mt-6 md:mt-10 w-full object-cover aspect-[0.952]"
    />
  </div>
);

const MoreCourses = () => {
  const courses = [
    {
      title: "Duis ut metus egestas felis pretium venenatis sit amet",
      description: "Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f3dee07d62e6695e1e14fa0427ca56d209c9e0fa745b9f4350964583d4fdd03?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
    },
    {
      title: "Quisque tincidunt, nulla eget pharetra ultrices",
      description: "Donec ac sapien bibendum, fringilla erat ut, elementum est. Sed condimentum leo lacus, in maximus dui pulvinar vel.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1388f1eb4687cac9997d539468c85ee6120d33bb502936938a7e98fa94d0d1cb?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
    },
    {
      title: "Proin dapibus in mauris ac imperdiet",
      description: "Aenean eget luctus diam, rhoncus condimentum dui. Donec tellus ex, dapibus id libero eu, iaculis viverra lorem. Curabitur pretium volutpat elit id varius.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/61826b646e733a932c2dfd6977604fb5f6930c3b88f983698e92481985afbb61?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
    },
    {
      title: "Vestibulum ante ipsum primis in faucibus",
      description: "Nullam consequat purus vel lorem sagittis, at tincidunt nunc efficitur. Suspendisse potenti. Sed auctor, nunc nec ultricies lacinia, nunc nisl aliquam nisl.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f3dee07d62e6695e1e14fa0427ca56d209c9e0fa745b9f4350964583d4fdd03?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
    }
  ];

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

      <button className="flex gap-2 justify-center items-center self-center md:self-end px-6 py-4 mt-8 md:mt-14 text-base font-medium tracking-normal leading-none text-white uppercase rounded-3xl bg-[#2E405E] hover:bg-[#1E2A3E] transition-colors duration-300">
        <span>ver todos los cursos y diplomados</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/643ea0f33a8db17dee52456c11a9c641829b71963f029874b2d0f5223c7c6c18?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
          alt="Arrow outward"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};

export default MoreCourses;