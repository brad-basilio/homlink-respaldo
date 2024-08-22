import { Link } from '@inertiajs/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import Base from './Components/Base';
import Header from './Components/Home/Header';
import Benefits from './Components/Home/Benefits';

const Home = () => {
  return (
    <>
      <main className='flex flex-col'>
        <Header />
        <Benefits />
      </main>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base>
    <Home {...properties} />
  </Base>);
})