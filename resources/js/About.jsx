import React from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import AboutHeader from './Components/About/AboutHeader';
import Testimonies from './Components/Home/Testimonies';
import History from './Components/About/History';
import Strengths from './Components/About/Strengths';

const About = ({ testimonies, summary, aboutus, strengths }) => {
  const history = aboutus.find(x => x.name == 'Historia')?.description ?? 'Sin historia';
  const strength = aboutus.find(x => x.name == 'Fortaleza')?.description ?? 'Sin descripción';

  return <>
    <AboutHeader summary={summary} />
    <History history={history}/>
    <Testimonies testimonies={testimonies} background='gray-100' />
    <Strengths strength={strength} strengths={strengths} />
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <About {...properties} />
  </Base>);
})