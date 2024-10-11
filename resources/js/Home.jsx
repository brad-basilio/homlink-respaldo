import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Banner from './Components/Home/Banner';
import Highlights from './Components/Home/Highlights';
import HowItWorks from './Components/Home/HowItWorks';
import Routine from './Components/Home/Routine';

const Home = () => {
  return (
    <>
      <Banner/>
      <hr className='h-4 bg-transparent border-none'/>
      <Highlights/>
      <HowItWorks/>
      <Routine/>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})