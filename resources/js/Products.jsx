import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import SelectProduct from './Components/Product/SelectProduct';
import SelectColor from './Components/Product/SelectColor';
import SelectPlan from './Components/Product/SelectPlan';
import Thankyu from './Components/Product/Thankyu';


const Products = () => {
  
  
  // Páginas
  const pages = [
    { component: SelectProduct, name: 'Select Product' },
    { component: SelectColor, name: 'Select Color' },
    { component: SelectPlan, name: 'Select Plan' },
    { component: Thankyu, name: 'Thank You' }
  ];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);


  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const CurrentPageComponent = pages[currentPageIndex].component;



  return (
    <>
      <CurrentPageComponent goToNextPage={goToNextPage} />
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Base {...properties}>
      <Products {...properties} />
    </Base>
  );
});