import React from 'react';

const Formulas = ({ items }) => (
  <div>
    <h2 className='text-xl border-b pb-2 mb-4 font-bold'>
      Tus fórmulas 🫧
    </h2>

    <div className='flex flex-col gap-12 pb-4 items-center relative'>
      {
        items.length == 0 && <div className='mx-auto text-center'>
          <h1 className='text-2xl font-bold mb-4'>Ups!</h1>
          <p className='text-sm mb-4'>Al parecer no tienes formulas</p>
          <button href="/test" className='rounded-full px-3 py-2 text-white bg-[#A191B8] text-sm'>CREA TU FORMULA</button>
        </div>
      }
      {
        items.map((item, index) => {
          return <div className='relative w-full'>
            <div className='relative bg-[#F7F7E7] p-4 rounded-xl w-full pb-8'>
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <span className='text-lg font-bold'>Fórmula {index + 1}</span>
                <small>Creado el {moment(item.created_at).format('ll')}</small>
              </div>
              <div className='text-sm mt-2'>
                <div>
                  <b>🧐 Tratamiento</b>:{' '}
                  {item.has_treatment.description}
                </div>
                <div>
                  <b>👀 Cuero cabelludo</b>: {' '}
                  {item.scalp_type.description}
                </div>
                <div>
                  <b>✅ Tipo de cabello</b>:{' '}
                  {item.hair_type.description}
                </div>
                <div>
                  <b>💡 Objetivos</b>:{' '}
                  {item.hair_goals.map(x => x.description).join(', ')}
                </div>
                <div>
                  <b>🫙 Fragancia</b>:{' '}
                  {item.fragrance.name}
                </div>
              </div>
              <button
                className='absolute -bottom-4 bg-[#A191B8] text-sm text-white px-4 py-2 rounded-full'>
                VOLVER A COMPRAR <i className='mdi mdi-arrow-top-right'></i>
              </button>
            </div>
          </div>
        })
      }

      {/* <div className='flex flex-col lg:flex-row gap-4 md:gap-2 lg:gap-5 bg-[#F7F7E7] p-[6%] md:p-[3%] rounded-2xl relative pb-10 '>
        <div className='flex flex-col gap-1 w-full md:w-3/4 items-start justify-center'>
          <h2 className='text-xl'>
            <b>Tripack personalizado:</b>
          </h2>
          <div className='flex flex-wrap gap-1 text-sm mt-2'>
            <span>👥 Mujer</span><span>🧐 Tratamiento: Si / No</span><span>👀 Cuero cabelludo: Normal</span>
            <span>✅Tipo de cabello: Crespo </span><span>💡3 objetivos: Hidratación profunda, Prevención caída,
              Protección del color</span>
            <span>💡Fragancia: Sweet Pear</span>
          </div>
        </div>
        <div
          className='flex flex-wrap xl:flex-col gap-y-0 gap-x-3 md:gap-y-3 w-full lg:w-1/4 text-base font-semibold justify-start xl:justify-center mt-3'>
          <div className='flex flex-row gap-2 items-center'>
            <div className='w-full'>
              <h2>Shampoo:</h2>
            </div>
            <div className='w-auto flex flex-row justify-center items-center'>
              <div className='w-8 h-8 rounded-full bg-[#F5F0ED] border border-[#404040]'></div>
            </div>
          </div>

          <div className='flex flex-row gap-2 items-center'>
            <div className='w-full'>
              <h2>Acondicionador:</h2>
            </div>
            <div className='w-auto flex flex-row justify-center items-center'>
              <div className='w-8 h-8 rounded-full bg-[#B2E3ED] border border-[#404040]'></div>
            </div>
          </div>

          <div className='flex flex-row gap-2 items-center'>
            <div className='w-full'>
              <h2>Crema:</h2>
            </div>
            <div className='w-auto flex flex-row justify-center items-center'>
              <div className='w-8 h-8 rounded-full bg-[#F7C2C6] border border-[#404040]'></div>
            </div>
          </div>
        </div>
        <div
          className='bg-[#A191B8] absolute left-[5%] bottom-0 -mb-3 sm:-mb-7 rounded-2xl text-white text-xs md:text-base font-semibold tracking-wider px-[3%] py-3'>
          <a>VOLVER A COMPRAR</a></div>
      </div>

      <div
        className='flex flex-col lg:flex-row gap-4 md:gap-2 lg:gap-5 bg-[#F7F7E7] p-[6%] md:p-[3%] rounded-2xl relative pb-10'>
        <div className='flex flex-col gap-1 w-full md:w-3/4 items-start justify-center'>
          <h2 className='text-xl'>
            <b>Tripack personalizado:</b>
          </h2>
          <div className='flex flex-wrap gap-1 text-sm mt-2'>
            <span>👥 Mujer</span><span>🧐 Tratamiento: Si / No</span><span>👀 Cuero cabelludo: Normal</span>
            <span>✅Tipo de cabello: Crespo </span><span>💡3 objetivos: Hidratación profunda, Prevención caída,
              Protección del color</span>
            <span>💡Fragancia: Sweet Pear</span>
          </div>
        </div>
        <div
          className='flex flex-wrap xl:flex-col gap-y-0 gap-x-3 md:gap-y-3 w-full lg:w-1/4 text-base font-semibold justify-start xl:justify-center mt-3'>
          <div className='flex flex-row gap-2 items-center'>
            <div className='w-full'>
              <h2>Shampoo:</h2>
            </div>
            <div className='w-auto flex flex-row justify-center items-center'>
              <div className='w-8 h-8 rounded-full bg-[#F5F0ED] border border-[#404040]'></div>
            </div>
          </div>

          <div className='flex flex-row gap-2 items-center'>
            <div className='w-full'>
              <h2>Acondicionador:</h2>
            </div>
            <div className='w-auto flex flex-row justify-center items-center'>
              <div className='w-8 h-8 rounded-full bg-[#B2E3ED] border border-[#404040]'></div>
            </div>
          </div>

          <div className='flex flex-row gap-2 items-center'>
            <div className='w-full'>
              <h2>Crema:</h2>
            </div>
            <div className='w-auto flex flex-row justify-center items-center'>
              <div className='w-8 h-8 rounded-full bg-[#F7C2C6] border border-[#404040]'></div>
            </div>
          </div>
        </div>
        <div
          className='bg-[#A191B8] absolute left-[5%] bottom-0 -mb-3 sm:-mb-7 rounded-2xl text-white text-xs md:text-base font-semibold tracking-wider px-[3%] py-3'>
          <a>VOLVER A COMPRAR</a></div>
      </div> */}

    </div>
  </div>
);

export default Formulas;
