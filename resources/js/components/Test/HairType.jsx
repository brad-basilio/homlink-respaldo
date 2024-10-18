import React from "react"

const HairType = ({ test, setTest }) => {
  const onTypeClicked = (hair_type) => {
    setTest(old => ({ ...old, hair_type }))
  }

  return <section className="p-[5%] py-[15%] md:py-[10%] lg:py-[5%] bg-white text-center text-[#404040]">
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
      <p className="text-sm mb-4">Conoce tu tipo de cabello aquí</p>
    </div>
  </section>
}

export default HairType