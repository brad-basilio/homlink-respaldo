import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Formule from './Components/Dashboard/Formule';
import Suscription from './Components/Dashboard/Suscription';
import Information from './Components/Dashboard/Information';


const MyAccount = () => {
  const [activeComponent, setActiveComponent] = useState('formulas');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'formulas':
        return <Formule />;
      case 'suscripciones':
        return <Suscription />;
      case 'informacion':
        return <Information />;
      default:
        return <Formule />;
    }
  };


  return (
    <>
      <section className='px-[3%] lg:px-[5%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-start'>


        <h2 className='text-3xl md:text-5xl'>
          <b>¡Bienvenida, Fabiana! ✨</b>
        </h2>



        <div className='flex flex-col lg:flex-row gap-5 mt-[3.5%]'>

          <div className='w-full lg:w-1/4 bg-[#EFBEC1] rounded-xl'>
            <div className='text-white flex flex-col gap-2 text-base font-semibold tracking-wider p-[5%] lg:p-[10%]'>
              <li className={`cursor-pointer ${activeComponent === 'formulas' && 'underline'}`}
                onClick={() => setActiveComponent('formulas')} >Fórmulas creadas</li>

              <li className={`cursor-pointer ${activeComponent === 'suscripciones' && 'underline'}`}
                onClick={() => setActiveComponent('suscripciones')} >Mis suscripciones</li>

              <li className={`cursor-pointer ${activeComponent === 'informacion' && 'underline'}`}
                onClick={() => setActiveComponent('informacion')} >Información personal</li>

              <li onClick={() => setActiveComponent('cerrar')}>Cerrar sesión</li>
            </div>
          </div>

          <div className='w-full lg:w-3/4 rounded-2xl bg-white overflow-hidden min-h-96 p-[5%] md:p-[2%]'>

            {renderComponent()}

          </div>

        </div>




      </section>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Base {...properties}>
      <MyAccount {...properties} />
    </Base>
  );
});
