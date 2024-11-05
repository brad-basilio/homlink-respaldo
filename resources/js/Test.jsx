import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import { Local } from 'sode-extend-react';
import Main from './Components/Test/Main';
import Treatment from './Components/Test/Treatment';
import HairType from './Components/Test/HairType';
import ScalpType from './Components/Test/ScalpType';
import HairGoals from './Components/Test/HairGoals';
import Fragrance from './Components/Test/Fragrance';
import Email from './Components/Test/Email';
import ProgressBar from './Components/Test/components/ProgressBar';

const Test = ({ hasTreatment, scalpType, hairType, hairGoals, fragrances }) => {

  console.log(hasTreatment)

  const vuaTest = Local.get('vua_test') ?? {}
  if (!hasTreatment.find(x => x.id == vuaTest.has_treatment)) vuaTest.has_treatment = null
  if (!scalpType.find(x => x.id == vuaTest.scalp_type)) vuaTest.scalp_type = null
  if (!hairType.find(x => x.id == vuaTest.hair_type)) vuaTest.hair_type = null
  if (!hairGoals.find(x => vuaTest.hair_goals?.some(item => item == x.id))) vuaTest.hair_goals = null
  if (!fragrances.find(x => x.id == vuaTest.fragrance)) vuaTest.fragrance = null

  const [test, setTest] = useState(vuaTest);
  const [firstTime, setFirstTime] = useState(true);

  // Páginas
  const pages = {
    'has_started': <Main test={test} setTest={setTest} setFirstTime={setFirstTime} />,
    'has_treatment': <Treatment test={test} setTest={setTest} values={hasTreatment} />,
    'scalp_type': <ScalpType test={test} setTest={setTest} values={scalpType}/>,
    'hair_type': <HairType test={test} setTest={setTest} values={hairType}/>,
    'hair_goals': <HairGoals test={test} setTest={setTest} values={hairGoals} />,
    'fragrance': <Fragrance test={test} setTest={setTest} values={fragrances}/>,
    'email': <Email test={test} setTest={setTest} />
  };

  const pageOrder = Object.keys(pages);

  const getCurrentPageIndex = () => {
    if (firstTime) return 0
    for (let i = 0; i < pageOrder.length; i++) {
      if (test[pageOrder[i]] === null || typeof test[pageOrder[i]] === 'undefined') {
        return i;
      }
    }
    return pageOrder.length;
  };

  const getCurrentPage = () => {
    const currentPageIndex = getCurrentPageIndex();
    if (currentPageIndex === 0 && !test.has_started) return pages.has_started;
    if (currentPageIndex < pageOrder.length) return pages[pageOrder[currentPageIndex]];
    return location.href = '/test/result';
  };

  const handleBack = () => {
    const currentPageIndex = getCurrentPageIndex();
    if (currentPageIndex > 0) {
      const previousPageKey = pageOrder[currentPageIndex - 1];
      setTest(prevTest => {
        const newTest = { ...prevTest };
        delete newTest[previousPageKey];
        return newTest;
      });
    }
  };

  useEffect(() => {
    Local.set('vua_test', test)
  }, [test])

  const percent = (getCurrentPageIndex() / pageOrder.length) * 100

  return (
    <>
      {
        (getCurrentPageIndex() > 0 && getCurrentPageIndex() != pageOrder.length) &&
        <div className='bg-white px-[5%] md:px-[7.5%] lg:px-[10%] pt-[5%]'>
          <ProgressBar width={`${percent}%`} />
        </div>
      }
      {getCurrentPage()}
      {
        (getCurrentPageIndex() > 0 && getCurrentPageIndex() != pageOrder.length) &&
        <section className='bg-white px-[5%] md:px-[7.5%] lg:px-[10%] pb-[5%]'>
          <button
            className='h-10 w-10 bg-[#DBCEEB] text-white rounded-full'
            onClick={handleBack}
          >
            <i className='mdi mdi-arrow-left'></i>
          </button>
        </section>
      }
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Base {...properties}>
      <Test {...properties} />
    </Base>
  );
});