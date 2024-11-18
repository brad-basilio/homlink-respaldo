import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import SelectProduct from './Components/Product/SelectProduct';
import SelectColor from './Components/Product/SelectColor';
import SelectPlan from './Components/Product/SelectPlan';
import Checkout from './Components/Product/Checkout';


const Formula = ({ user_formula, items, colors, publicKey, session, bundles, planes }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null)

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  // Páginas
  const pages = [
    { component: <SelectProduct items={items} goToNextPage={goToNextPage} bundles={bundles} />, name: 'Select Product' },
    { component: <SelectColor colors={colors} goToNextPage={goToNextPage} />, name: 'Select Color' },
    { component: <SelectPlan goToNextPage={goToNextPage} setSelectedPlan={setSelectedPlan} bundles={bundles} planes={planes} />, name: 'Select Plan' },
    { component: <Checkout formula={user_formula} publicKey={publicKey} selectedPlan={selectedPlan} goToNextPage={goToNextPage} bundles={bundles} planes={planes} session={session} />, name: 'Checkout' }
  ];

  const CurrentPageComponent = pages[currentPageIndex].component;

  return CurrentPageComponent
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Formula {...properties} />
  </Base>);
});