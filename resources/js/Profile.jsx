import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import 'tippy.js/dist/tippy.css';
import Base from './Components/Base';
import HtmlContent from './Utils/HtmlContent';

const Profile = ({ coach, country, resources }) => {

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8">
      <div className="md:w-2/3">
        <img
          className='w-full aspect-[8/3] object-cover object-center rounded-lg'
          src={`/api/cover/${coach.uuid}`}
          alt="Cover Photo"
        />
        <div className="flex gap-4 my-[5%] items-center">
          <img
            className='w-24 h-24 rounded-full object-cover object-center'
            src={`/api/profile/${coach.uuid}`}
            alt="Profile Photo"
          />
          <div>
            <h1 className="text-2xl font-bold">{coach.name} {coach.lastname}</h1>
            <p>{coach.title}</p>
          </div>
        </div>
        <div className="prose">
          <HtmlContent html={coach.description} />
        </div>

        <h3 className='text-lg font-bold mt-[5%] mb-[2.5%]'>Contenidos y temas</h3>


        <div id="accordion-flush" data-accordion="collapse" data-active-classes="text-gray-500 dark:text-gray-400" data-inactive-classes="text-gray-500 dark:text-gray-400">
          {
            resources.map((resource, i) => {
              return <>
                <h2 id={`accordion-heading-${i}`}>
                  <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200  dark:text-gray-400 gap-3" data-accordion-target={`#accordion-${i}`} aria-expanded="true" aria-controls={`accordion-${i}`}>
                    <span>{resource.name}</span>
                    <i data-accordion-icon className='text-lg rotate-180 shrink-0 fas fa-angle-down'></i>
                  </button>
                </h2>
                <div id={`accordion-${i}`} className="hidden" aria-labelledby={`accordion-heading-${i}`}>
                  <div className="py-5 border-b border-gray-200 prose">
                    <HtmlContent html={resource.description}/>
                  </div>
                </div>
              </>
            })
          }
        
        </div>

      </div>
      <div className="md:w-1/3 sticky top-[15%] h-max">
        <h2 className="text-xl font-semibold mb-4">Datos del Coach</h2>
        <h3 className='text-lg'>S/ 120.00</h3>
        <p className='mb-2'>
          <i className='fas fa-globe-americas w-6'></i>
          <b>Nacionalidad</b>: {country.name} - {coach.city}
        </p>
        <p className='mb-2'>
          <i className='fas fa-file-alt w-6'></i>
          <b>Resumen</b>: {coach.summary}
        </p>
        <button type="button" class="focus:outline-none text-white bg-[#ff5b5b] hover:bg-[#ff5b5bbb] focus:ring-4 focus:ring-[#ff5b5bdd] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
          Quiero mi coach
          <i className='fab fa-whatsapp ms-2'></i>
          </button>
      </div>
    </div>
  );
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Profile {...properties} />
  </Base>);
})