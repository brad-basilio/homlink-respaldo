import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Sliders from './Components/Home/Sliders';
import Indicators from './Components/Home/Indicators';
import Aboutus from './Components/Home/Aboutus';
import Courses from './Components/Home/Courses';
import MoreCourses from './Components/Home/MoreCourses';
import Testimonies from './Components/Home/Testimonies';
import News from './Components/Home/News';
import Subscribe from './Components/Home/Subscribe';

const Home = ({ sliders = [], benefits, resources, testimonies }) => {
  return (
    <>
      <Sliders />
      <Indicators />
      <Aboutus />
      <Courses />
      <MoreCourses />
      <Testimonies />
      <News />
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})