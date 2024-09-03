import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import TailwindBase from '@Tailwind/Base';
import Header from './Components/Resources/Header';
import Sidebar from './Components/Resources/Sidebar';
import MainContent from './Components/Resources/MainContent';

const Resources = ({ resources }) => {

  const specialties = []
  resources.forEach(resource => {
    if (specialties.find(x => x.id == resource.specialty.id)) return
    specialties.push(resource.specialty)
  });

  return (
    <>
      <main className='flex flex-col mt-16'>
        <Header />
        <div className="flex gap-5 max-md:flex-col p-[5%]">
          <Sidebar specialties={specialties} />
          <MainContent resources={resources} />
        </div>
      </main>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<TailwindBase>
    <Resources {...properties} />
  </TailwindBase>);
})