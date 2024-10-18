import React from "react"
import ReactModal from "react-modal"

const ScalpType = ({ test, setTest }) => {

  const onTypeClicked = (scalp_type) => {
    setTest(old => ({ ...old, scalp_type }))
  }

  return <>
    <section className="p-[5%] py-[15%] md:py-[10%] lg:py-[5%] bg-white text-center text-[#404040]">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl mb-4">Tu <b>cuero cabelludo</b> es:</h1>
        <div className="flex justify-evenly text-sm w-full mb-4">
          <figure className="flex flex-col gap-4">
            <button className="w-28 py-2 rounded border border-1-[#C5B8D4] bg-[#C5B8D4] text-white font-bold" onClick={() => onTypeClicked('dry')}>Seco</button>
            <span className="text-4xl">🍂</span>
          </figure>
          <figure className="flex flex-col gap-4">
            <button className="w-28 py-2 rounded border border-1-[#9577B9] text-[#9577B9] font-bold" onClick={() => onTypeClicked('normal')}>Normal</button>
            <span className="text-4xl">🍃</span>
          </figure>
          <figure className="flex flex-col gap-4">
            <button className="w-28 py-2 rounded border border-1-[#9577B9] text-[#9577B9] font-bold" onClick={() => onTypeClicked('oily')}>Graso</button>
            <span className="text-4xl">💧</span>
          </figure>
        </div>
        <p className="text-sm mb-4">Conoce tu tipo de cuero cabelludo <button className="underline" onClick={() => {/* Open modal */}}>aquí </button></p>
      </div>
    </section>
    <ReactModal>

    </ReactModal>
  </>
}

export default ScalpType