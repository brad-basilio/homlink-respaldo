import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import TailwindBase from '@Tailwind/Base';
import Header from './Components/Resources/Header';
import Sidebar from './Components/Resources/Sidebar';
import MainContent from './Components/Resources/MainContent';

const Resources = ({ specialties, archive }) => {

  const [resources, setResources] = useState([]);

  return (
    <>
      <main className='flex flex-col mt-[68px]'>
        <Header />
        <div className="flex gap-5 max-md:flex-col p-[5%]">
          <Sidebar specialties={specialties} archive={archive} setResources={setResources}/>
          <MainContent resources={resources}  />
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