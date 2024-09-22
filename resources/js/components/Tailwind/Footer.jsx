import React, { useState } from "react"
import ReactModal from "react-modal";

import bgFooter from './images/footer.png'

const Footer = ({ items, summary, faqs }) => {
  const [modalOpen, setModalOpen] = useState(null);

  const policyItems = [
    {
      title: 'Términos y condiciones',
      modalContent: <p>Contenido sobre las políticas de uso...</p>,
    },
    {
      title: 'Políticas de privacidad',
      modalContent: <p>Contenido sobre las políticas de privacidad...</p>,
    },
    {
      title: 'Preguntas frecuentes',
      modalContent: (
        <div>
          <div className="flex flex-col gap-6 mt-4">
            {/* {faqs.map((item, index) => (
              <FAQItem
              
                question={item.name}
                answer={item.description}
                isOpen={index === 0}
              />
            ))} */}
          </div>
        </div>
      ),
    },
  ];

  const openModal = (index) => setModalOpen(index);
  const closeModal = () => setModalOpen(null);

  return (
    <>
      <img src={bgFooter} alt="" className="aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] object-cover object-center w-full" />
      <footer className=" p-[5%] pt-[calc(5%+64px)] bg-[#747D84] text-white relative">
        <form class="absolute left-1/4 right-[5%] bottom-[calc(100%-64px)] p-[5%] bg-amber-400 text-[color:var(--Woodsmoke-900,#2B384F)]">
          <div className="grid md:grid-cols-2 items-end gap-4">
            <h1 className="text-xl md:text-2xl">
              Mantente siempre <b>Informado</b> con nuestra newsletter
            </h1>
            <div>
              <input type="email" className="bg-transparent border-b border-b-[color:var(--Woodsmoke-900,#2B384F)] outline-none px-3 py-2 w-full placeholder-[color:var(--Woodsmoke-900,#2B384F)]" placeholder="Correo electrónico" />
              <button className="mt-4 px-3 py-2 ">
                Enviar
                <i className="mdi mdi-arrow-top-right ms-1"></i>
              </button>
            </div>
          </div>
        </form>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 items-start justify-start">
            <img src="/assets/img/logo.svg" alt="" className="h-8" />
            <p className="text-sm max-w-md">
              Donec ac sapien bibendum, fringilla erat ut, elementum est. Sed condimentum leo lacus, in maximus dui pulvinar vel.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <a href="/">Inicio</a>
              <a href="/courses">Cursos y Talleres</a>
              <a href="/about">Nosotros</a>
              <a href="/blogs">Blog</a>
              <a href="/contact">Contacto</a>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-2">
                <p>+51 945 622 983</p>
                <p>soporte@trasciende.com</p>
                <p>De lunes a viernes - 10 am a 7pm</p>
                <div>
                  <p>Calle Nicanor Rocca de Vergallo</p>
                  <p>493 Magdalena del Mar</p>
                  <p>Lima - Perú</p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <a href="" className="me-2 text-4xl"><i className="fab fa-instagram"></i></a>
                <a href="" className="me-2 text-4xl"><i className="fab fa-instagram"></i></a>
                <a href="" className="me-2 text-4xl"><i className="fab fa-instagram"></i></a>
                <a href="" className="me-2 text-4xl"><i className="fab fa-instagram"></i></a>
                <a href="" className="me-2 text-4xl"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </section>
        <hr className="my-[5%]" />
        <section className="flex flex-col lg:flex-row gap-4 justify-between text-center lg:text-start">
          <p>
            Copyright © 2023 Trasciende. Reservados todos los derechos.
          </p>
          <div className="flex flex-col justify-center lg:justify-between md:flex-row gap-4">
            <button onClick={() => openModal(0)}>Terminos de servicios</button>
            <button onClick={() => openModal(1)}>Políticas de privacidad</button>
          </div>
        </section>
      </footer>

      {policyItems.map((item, index) => (
        <ReactModal

          isOpen={modalOpen === index}
          onRequestClose={closeModal}
          contentLabel={item.title}
          className="absolute left-1/2 -translate-x-1/2 bg-white p-6 rounded shadow-lg w-[95%] max-w-lg my-8"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        >
          <button onClick={closeModal} className="float-right text-gray-500 hover:text-gray-900">
            Cerrar
          </button>
          <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
          <div>{item.modalContent}</div>
        </ReactModal>
      ))}
    </>
  );
};

export default Footer