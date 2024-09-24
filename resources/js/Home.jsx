import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Sliders from './Components/Home/Sliders';
import Indicators from './Components/Home/Indicators';
import Weare from './Components/Home/Weare';
import Courses from './Components/Home/Courses';
import MoreCourses from './Components/Home/MoreCourses';
import Testimonies from './Components/Home/Testimonies';
import Articles from './Components/Home/Articles';

const Home = ({ sliders, indicators, weare, courses, testimonies, articles }) => {
  return (
    <>
      <Sliders sliders={sliders} />
      <Indicators indicators={indicators} />
      <Weare weare={weare} />
      <Courses courses={courses.slice(0, 3)} />
      <MoreCourses courses={courses.slice(3, 7)} />
      <Testimonies testimonies={testimonies} />
      <Articles articles={articles} />
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})