import React from "react";
import { createRoot } from "react-dom/client";
import CreateReactScript from "./Utils/CreateReactScript";
import Base from "./Components/Tailwind/Base";

const CourseDetails = ({ course }) => {
  return <>
    <section className="mt-16 bg-slate-100">
      <div className="flex flex-col p-[5%]  items-start max-w-6xl mx-auto ">
        <div className="flex flex-col">
          <div className="flex flex-col w-full">
            <div
              $name="Curso: Coaching y Liderazgo Personal: ‘Encendete más’"
              className="text-3xl not-italic font-semibold tracking-tight leading-tight text-[color:var(--Woodsmoke-900,#2B384F)] max-md:max-w-full"
            >
              <span className="text-slate-700">
                Curso: {course.name}
              </span>
            </div>
            <div
              className="mt-2 text-lg not-italic leading-8 text-[color:var(--Woodsmoke-800,#2E405E)] max-md:max-w-full"
            >
              {course.summary}
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
    <section className="p-[5%] max-w-6xl mx-auto">
      <div className="flex flex-col px-6 rounded bg-slate-100 min-w-[240px] w-[377px] max-md:px-5">
        <div className="flex gap-10 justify-between items-center pt-8 pb-6 w-full font-medium leading-none uppercase border-b border-solid border-b-[#CFD8E8]">
          <div className="self-stretch my-auto text-2xl not-italic tracking-wide text-[#2B384F]">
            S/.{Number(course.price).toFixed(2)}
          </div>
          <div className="flex gap-2.5 justify-center items-center self-stretch px-3 py-2 my-auto text-sm not-italic whitespace-nowrap rounded-3xl bg-[#FFF0FA] text-[#FF27B9]">
            OFERTA
          </div>
        </div>

        <div className="flex flex-col py-6 w-full text-sm tracking-normal leading-relaxed border-b border-solid border-b-[#CFD8E8]">
          <div className="flex gap-10 justify-between items-center w-full">
            <div className="flex gap-2 items-center self-stretch my-auto text-[#2E405E]">
              <i className="fas fa-clock w-6"></i>
              <div className="self-stretch my-auto not-italic">
                Duración del curso
              </div>
            </div>
            <div className="self-stretch my-auto not-italic text-[#5375A4] text-nowrap">
              {course.long_duration}
            </div>
          </div>

          <div className="flex gap-10 justify-between items-center mt-3 w-full">
            <div className="flex gap-2 items-center self-stretch my-auto text-[#2E405E]">
              <i className="fas fa-users w-6"></i>
              <div className="self-stretch my-auto not-italic">
                Estudiantes matriculados
              </div>
            </div>
            <div className="self-stretch my-auto not-italic text-[#5375A4] text-nowrap">
              {course.students} estudiantes
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center py-6 w-full text-base font-medium tracking-normal leading-none text-white uppercase">
          <div className="flex gap-2 justify-center items-center px-6 py-4 w-full rounded-3xl bg-[#2E405E] max-md:px-5">
            <div className="self-stretch my-auto">
              Quiero el curso
            </div>
            <i className="mdi mdi-arrow-top-right"></i>
          </div>
        </div>

        <div className="flex flex-col pt-6 pb-8 w-full">
          <div className="text-base not-italic font-medium tracking-normal leading-none uppercase text-[#07090D]">
            Este curso incluye:
          </div>
          <div className="flex flex-col mt-6 w-full text-sm tracking-normal leading-relaxed text-[#4E5566]">
            <div className="flex gap-3 items-center w-full">
              <i className="fas fa-clock w-6"></i>
              <div className="flex-1 shrink self-stretch my-auto not-italic basis-0">
                Acceso de por vida
              </div>
            </div>

            <div className="flex gap-3 items-start mt-4 w-full leading-6">
              <i className="fas fa-book w-6"></i>
              <div className="flex-1 shrink not-italic basis-0">
                Archivo de ejercicios gratuitos y recursos descargables
              </div>
            </div>
            <div className="flex gap-3 items-start mt-4 w-full">
              <i className="fas fa-trophy w-6"></i>
              <div className="flex-1 shrink not-italic basis-0">
                Certificado de finalización para compartir
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <CourseDetails {...properties} />
  </Base>);
})
