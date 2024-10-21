import React, { useState } from "react"
import ReactModal from "react-modal"

ReactModal.setAppElement('#app');

const HairType = ({ test, setTest }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const onTypeClicked = (hair_type) => {
    setTest(old => ({ ...old, hair_type }))
  }

  return <>
    <section className="p-[5%] py-[15%] md:py-[10%] lg:py-[5%] bg-white text-center text-[#404040]">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl mb-4">Naturalmente, ¿Cuál es tu <br /><b>tipo de cabello?</b></h1>
        <div className="flex justify-evenly text-sm w-full mb-4 gap-2">
          <button className="border border-1-[#C5B8D4] rounded-lg bg-[#C5B8D4] text-white font-bold w-32"
            onClick={() => onTypeClicked('coily')}>
            <img className="aspect-[4/3] rounded" src="/assets/img/test/coily.png" alt="Crespo" />
            <p className="p-2">CRESPO</p>
          </button>
          <button className="border border-1-[#9577B9] rounded-lg bg-white text-[#9577B9] font-bold w-32"
            onClick={() => onTypeClicked('wavy')}>
            <img className="aspect-[4/3] rounded" src="/assets/img/test/wavy.png" alt="Ondulado" />
            <p className="p-2">ONDULADO</p>
          </button>
          <button className="border border-1-[#9577B9] rounded-lg bg-white text-[#9577B9] font-bold w-32"
            onClick={() => onTypeClicked('straight')}>
            <img className="aspect-[4/3] rounded" src="/assets/img/test/straight.png" alt="Lacio" />
            <p className="p-2">LACIO</p>
          </button>
        </div>
        <p className="text-sm mb-4">Conoce tu tipo de cabello <button className="underline" onClick={() => setModalOpen(true)}>aquí </button></p>
      </div>
    </section>
    <ReactModal isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white p-10 rounded-2xl shadow-lg w-[95%] max-w-lg '
      overlayClassName={'fixed inset-0 bg-black bg-opacity-50 z-50'}
    >
      <span className="rounded-full px-4 py-2 bg-[#C5B8D4] text-white mx-auto block mb-4 w-max">¿Con cuál te identificas?</span>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <img className="p-[2.5%] md:p-[5%] aspect-square rounded-full" src="/assets/img/test/dry.png" alt="" />
          <span className="block my-2 w-max mx-auto px-3 py-1.5 rounded-full border text-sm">Crespo</span>
          <div className="text-[8px] text-start">
            Presenta bucles que comienzan en el cuero cabelludo en dirección hacia abajo hasta llegar a las puntas. Los rizos son abiertos, hidratados y con brillo. Suelen tener poca definición y son propensos al frizz.
          </div>
        </div>
        <div>
          <img className="p-[2.5%] md:p-[5%] aspect-square rounded-full" src="/assets/img/test/normal.png" alt="" />
          <span className="block my-2 w-max mx-auto px-3 py-1.5 rounded-full border text-sm">Ondulado</span>
          <ul className="text-[8px] text-start">
            <li className="flex gap-1">
              <i className="mdi mdi-circle-small font-bold"></i>
              Se mantiene bien el peinado.</li>
            <li className="flex gap-1">
              <i className="mdi mdi-circle-small font-bold"></i>
              Casi siempre presenta un buen aspecto.</li>
            <li className="flex gap-1">
              <i className="mdi mdi-circle-small font-bold"></i>
              Al tacto no es graso ni seco.</li>
            <li className="flex gap-1">
              <i className="mdi mdi-circle-small font-bold"></i>
              Tiene un aspecto brillante y sano.</li>
          </ul>
        </div>
        <div>
          <img className="p-[2.5%] md:p-[5%] aspect-square rounded-full" src="/assets/img/test/oily.png" alt="" />
          <span className="block my-2 w-max mx-auto px-3 py-1.5 rounded-full border text-sm">Lacio</span>
          <div className="text-[8px] text-start">
            <li className="flex gap-1">
              <i className="mdi mdi-circle-small font-bold"></i>
              Después del lavado, la grasa aparece enseguida.</li>
            <li className="flex gap-1">
              <i className="mdi mdi-circle-small font-bold"></i>
              No presenta el brillo.</li>
            <li className="flex gap-1">
              <i className="mdi mdi-circle-small font-bold"></i>
              Se ve sin firmeza y no tiene volumen.</li>
            <li className="flex gap-1">
              <i className="mdi mdi-circle-small font-bold"></i>
              Se pega al cuero cabelludo y tiende a que se adhiera con mayor facilidad el polvo.</li>
          </div>
        </div>
      </div>
    </ReactModal>
  </>
}

export default HairType