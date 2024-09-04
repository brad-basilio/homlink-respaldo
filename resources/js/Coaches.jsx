import React from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from '@Tailwind/Base';
import Header from './Components/Coaches/Header';
import Content from './Components/Coaches/Content';

function Coaches({ specialties, coaches, countries }) {
  return (<>
    <Header specialties={specialties} />
    <Content coaches={coaches} countries={countries}/>
  </>);
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Coaches {...properties} />
  </Base>);
})