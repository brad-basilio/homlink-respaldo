import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Sales from './Components/Dashboard/Sales';
import Information from './Components/Dashboard/Information';
import Formulas from './Components/Dashboard/Formulas';
import Logout from './Actions/Logout';


const MyAccount = ({ session, formulas }) => {
  const [activeComponent, setActiveComponent] = useState('formulas');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'formulas':
        return <Formulas items={formulas} />;
      case 'sales':
        return <Sales />;
      case 'informacion':
        return <Information />;
      default:
        return <Formulas />;
    }
  };


  return (
    <>
      <section className='px-[5%] md:px-[7.5%] lg:px-[10%] py-[5%] bg-[#F9F3EF] text-[#404040]'>


        <h2 className='text-2xl font-bold mb-4'>
          ¡Bienvenid@, {session.name.split(' ')[0]}! ✨
        </h2>



        <div className='flex flex-col md:flex-row gap-5'>

          <div className='w-full md:w-1/3 lg:w-1/4 md:bg-[#EFBEC1] rounded-xl'>
            <ul className='text-center md:text-start text-[#404040] md:text-white grid sm:grid-cols-2 md:flex md:flex-col gap-2 text-sm font-light tracking-wider md:p-4'>
              <li className={`px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer ${activeComponent === 'formulas' && 'bg-[#EFBEC1] md:bg-[#ffffff33] text-white'}`}
                onClick={() => setActiveComponent('formulas')} >Fórmulas creadas</li>

              <li className={`px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer ${activeComponent === 'sales' && 'bg-[#EFBEC1] md:bg-[#ffffff33] text-white'}`}
                onClick={() => setActiveComponent('sales')} >Mis compras</li>

              <li className={`px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer ${activeComponent === 'informacion' && 'bg-[#EFBEC1] md:bg-[#ffffff33] text-white'}`}
                onClick={() => setActiveComponent('informacion')} >Información personal</li>

              <li className='px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer' onClick={Logout}>Cerrar sesión</li>
            </ul>
          </div>

          <div className='bg-white p-4 w-full md:w-2/3 lg:w-3/4 rounded-xl'>

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
