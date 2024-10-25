import React, { useRef, useState } from "react"
import ReactModal from "react-modal";

import bgFooter from './images/footer.png'
import SubscriptionsRest from "../../Actions/SubscriptionsRest";
import Swal from "sweetalert2";
import Global from "../../Utils/Global";
import Tippy from "@tippyjs/react";
import HtmlContent from "../../Utils/HtmlContent";

const subscriptionsRest = new SubscriptionsRest();

const Footer = ({ socials, generals }) => {

  const emailRef = useRef()

  const [modalOpen, setModalOpen] = useState(null);
  const [saving, setSaving] = useState()

  const policyItems = [
    {
      title: 'Términos y condiciones',
      modalContent: generals.find(x => x.correlative == 'terms_conditions')?.description,
    },
    {
      title: 'Políticas de privacidad',
      modalContent: generals.find(x => x.correlative == 'privacy_policy')?.description,
    },
  ];

  const openModal = (index) => setModalOpen(index);
  const closeModal = () => setModalOpen(null);


  const onEmailSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    const request = {
      email: emailRef.current.value
    }
    const result = await subscriptionsRest.save(request);
    setSaving(false)

    if (!result) return

    Swal.fire({
      title: '¡Éxito!',
      text: `Te has suscrito correctamente al blog de ${Global.APP_NAME}.`,
      icon: 'success',
      confirmButtonText: 'Ok'
    })

    emailRef.current.value = null
  }

  return (
    <>
      <footer className="px-[5%] py-[10%] md:px-[10%] md:py-[7.5%] lg:py-[5%] bg-transparent text-white relative grid grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-6 text-sm">
        <div className="col-span-2 flex flex-col gap-4 md:flex-row-reverse items-start justify-evenly md:col-span-1">
          <ul className="flex flex-col gap-2">
            <li><a href="">Conversemos</a></li>
            <li><a href="">Preguntas frecuentes</a></li>
            <li><a href="">Terminos y condiciones</a></li>
            <li><a href="">Libro de reclamaciones</a></li>
          </ul>
          <img src="/assets/img/logo.svg" alt="Trasciende Logo" className="h-8 w-max" />
        </div>
        <div className="col-span-1 flex flex-col gap-4 md:flex-row items-start justify-evenly md:col-span-1">
          <ul className="flex flex-col gap-2">
            <li><a href="">Telefono</a></li>
            <li><a href="">Mail</a></li>
            <li><a href="">WhatsApp</a></li>
            <li><a href="">‎</a></li>
          </ul>
          <div className="flex items-end justify-start gap-2">
            {
              socials.map((social, index) => {
                return <a href={social.link} className={`text-xl bg-white text-[#f1d7c1] ${social.icon} w-8 h-8 pt-0.5 text-center rounded-full`}></a>
              })
            }
          </div>
        </div>
      </footer>

      {policyItems.map((item, index) => (
        <ReactModal
          key={index}
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
          <HtmlContent className='prose' html={item.modalContent} />
        </ReactModal>
      ))}
    </>
  );
};

export default Footer