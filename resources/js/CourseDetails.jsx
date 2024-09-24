import React from "react";
import { createRoot } from "react-dom/client";
import CreateReactScript from "./Utils/CreateReactScript";
import Base from "./Components/Tailwind/Base";

const CourseDetails = ({ course }) => {
  return <>
    <section className="p-[5%] mt-16 bg-slate-100">
      <div class="flex flex-col items-start  w-full  ">
        <div class="flex flex-col max-w-full w-[872px]">
          <div class="flex flex-col w-full">
            <div
              $name="Curso: Coaching y Liderazgo Personal: ‘Encendete más’"
              class="text-3xl not-italic font-semibold tracking-tight leading-tight text-[color:var(--Woodsmoke-900,#2B384F)] max-md:max-w-full"
            >
              <span class="text-slate-700">
                Curso: {course.name}
              </span>
            </div>
            <div
              class="mt-2 text-lg not-italic leading-8 text-[color:var(--Woodsmoke-800,#2E405E)] max-md:max-w-full"
            >
              Mauris ac orci rhoncus, ultricies magna non, posuere odio. Nam nec
              viverra mauris.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-16 mx-auto w-full pt-[5%]">
          <div className="flex flex-col space-y-1">
            <h3 className="text-xs font-medium text-pink-500">Sesiones</h3>
            <p className="text-base font-semibold text-blue-900">{course.sessions}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-xs font-medium text-pink-500">Certificado</h3>
            <p className="text-base font-semibold text-blue-900">{course.certificate}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-xs font-medium text-pink-500">Duración</h3>
            <p className="text-base font-semibold text-blue-900">{course.duration}</p>
          </div>
        </div>
      </div>
    </section>
    <section className="p-[5%]">

    </section>
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <CourseDetails {...properties} />
  </Base>);
})