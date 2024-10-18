import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Banner from './Components/Home/Banner';
import Highlights from './Components/Home/Highlights';
import HowItWorks from './Components/Home/HowItWorks';
import Routine from './Components/Home/Routine';
import Highlights2 from './Components/Home/Highlights2';
import Supplies from './Components/Home/Supplies';
import Testimonies from './Components/Home/Testimonies';
import CallToAction from './Components/Home/CallToAction';

const Home = () => {
  return (
    <>
      <Banner />
      <hr className='h-4 bg-transparent border-none' />
      <Highlights />
      <HowItWorks />
      <Routine />
      <Highlights2 />
      <Supplies />
      <Testimonies />
      <CallToAction/>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})