import { Link } from '@inertiajs/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import Base from './Components/Tailwind/Base';
import Header from './Components/Home/Header';
import Benefits from './Components/Home/Benefits';
import Banner from './Components/Home/Banner';
import Testimonies from './Components/Home/Testimonies';
import Blogs from './Components/Home/Blogs';
import Contact from './Components/Home/Contact';

const Home = ({benefits}) => {
  console.log(benefits)
  return (
    <>
      <main className='flex flex-col'>
        <Header />
        <Benefits benefits={benefits} />
        <Banner />
        <Testimonies />
        <Blogs />
        <Contact />
      </main>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base>
    <Home {...properties} />
  </Base>);
})