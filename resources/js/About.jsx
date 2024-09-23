import React from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import AboutHeader from './Components/About/AboutHeader';
import Testimonies from './Components/Home/Testimonies';
import History from './Components/About/History';
import Strengths from './Components/About/Strengths';

function About() {
  return <>
    <AboutHeader />
    <History />
    <Testimonies background='[#f5f7fa]' />
    <Strengths />
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <About {...properties} />
  </Base>);
})