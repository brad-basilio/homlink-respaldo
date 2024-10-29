import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import SelectProduct from './Components/Product/SelectProduct';
import SelectColor from './Components/Product/SelectColor';
import SelectPlan from './Components/Product/SelectPlan';
import Thankyu from './Components/Product/Thankyu';


const Formula = ({ items, colors }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  // Páginas
  const pages = [
    { component: <SelectProduct items={items} goToNextPage={goToNextPage} />, name: 'Select Product' },
    { component: <SelectColor colors={colors} goToNextPage={goToNextPage} />, name: 'Select Color' },
    { component: <SelectPlan goToNextPage={goToNextPage} />, name: 'Select Plan' },
    { component: <Thankyu goToNextPage={goToNextPage} />, name: 'Thank You' }
  ];

  const CurrentPageComponent = pages[currentPageIndex].component;

  return CurrentPageComponent
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Formula {...properties} />
  </Base>);
});