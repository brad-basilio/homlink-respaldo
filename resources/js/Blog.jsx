import React from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';

import BlogHeader from './Components/Blog/BlogHeader';
import Filter from './Components/Blog/Filter';
import Results from './Components/Blog/Results';

function Blog() {
  return <>
    <BlogHeader />
    <Filter />
    <Results />
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Blog {...properties} />
  </Base>);
})