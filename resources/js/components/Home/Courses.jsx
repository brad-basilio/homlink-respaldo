import React, { useState } from "react";

const Courses = () => {
  const [activeCourse, setActiveCourse] = useState(0);

  const courses = [
    {
      id: 0,
      title: "Curso Nunc tempus, ipsum nec ",
      sessions: "12 aulas 100% presencial",
      certificate: "Físico y virtual PDF",
      duration: "8h 23m",
      description:
        "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce non nibh ac lacus laoreet iaculis vel eu metus. Fusce a magna nec diam blandit hendrerit.",
    },
    {
      id: 1,
      title: "Sed commodo turpis et",
      sessions: "8 aulas online",
      certificate: "Solo PDF",
      duration: "6h",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
    },
    {
      id: 2,
      title: "Nunc suscipit leo orci, ac blandit enim aliquet non",
      sessions: "10 aulas mixtas",
      certificate: "Certificado físico",
      duration: "7h",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const toggleCourse = (id) => {
    if (id === activeCourse) return;
    setActiveCourse(id);
  };

  const VerticalTitle = ({ title }) => (
    <div className="hidden md:flex flex-col items-center overflow-hidden h-full">
      <div className="transform rotate-[270deg] origin-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px]">
        {title}
      </div>
    </div>
  );

  const titleContainer = ({ index, title }) => (
    <div
      className={`flex flex-col items-center justify-start p-4 w-full md:w-20 md:h-[300px]`}
    >
      <p className="text-lg mb-2">{index + 1}.</p>
      <div className="md:hidden truncate max-w-full">
        <p className="text-xs font-bold truncate">{title}</p>
      </div>
      <VerticalTitle title={title} />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row w-full bg-[#F8B62C]">
      <div className="flex flex-col md:flex-row w-full">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className={`md:flex cursor-pointer transition-all duration-300 ${activeCourse === course.id
                ? "w-full"
                : "w-full md:w-20 h-full md:h-auto"
              }`}
            onClick={() => toggleCourse(course.id)}
          >
            {titleContainer({ index, title: course.title })}

            {activeCourse === course.id && (
              <div className="flex flex-col bg-white p-[5%] w-full transition-all duration-300">
                <div className="text-lg font-semibold">
                  {index + 1}. {course.title}
                </div>
                <div className="mt-4 text-sm">
                  <strong>Sesiones:</strong> {course.sessions}
                </div>
                <div className="mt-2 text-sm">
                  <strong>Certificado:</strong> {course.certificate}
                </div>
                <div className="mt-2 text-sm">
                  <strong>Duración:</strong> {course.duration}
                </div>
                <p className="mt-4 text-sm">{course.description}</p>
                <img
                  className="aspect-[8/3] w-full object-cover object-center mt-4"
                  src="https://placehold.co/600x400"
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;