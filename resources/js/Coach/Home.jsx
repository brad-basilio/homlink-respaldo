import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import BaseAdminto from '../Components/Adminto/Base';
import SimpleCounter from '../Components/Counter/SimpleCounter';

const Home = ({session}) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12">
        <h4 className='mb-2'>Solicitudes</h4>
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Visitas' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Total' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Atendidas' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Pendientes' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='No se pudo concretar' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Observadas' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Contacto sin accion' quantity={0} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <h4 className='mb-2'>Acuerdos</h4>
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Total' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Aprobadas' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Pendientes' quantity={0} />
        </div>
        <div className="col-xl-3 col-md-4 col-sm-6">
          <SimpleCounter title='Terminadas' quantity={0} />
        </div>
        <div className="col-xl-5 col-md-8 col-sm-12">
          <SimpleCounter title='Sesiones' quantity={0} />
        </div>
        <div className="col-xl-7 col-md-12">
          <SimpleCounter title='Pagos' quantity={0} />
        </div>
        <div className="col-12">
          <SimpleCounter title='Solicitudes pendientes' quantity={0} />
        </div>
      </div>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title="Dashboard">
    <Home {...properties} />
  </BaseAdminto>);
})