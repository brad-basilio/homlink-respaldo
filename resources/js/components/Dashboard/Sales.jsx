import React from 'react';

const Sales = ({ items }) => {
  console.log(items)
  return (
    <div>
      <h2 className='text-xl border-b pb-2 mb-4 font-bold'>
        Historial de compras 📃
      </h2>

      <div className='flex flex-col gap-12 pb-10 items-center p-0'>


        <div
          className='flex flex-col lg:flex-row gap-4 md:gap-2 lg:gap-5 bg-[#F7F7E7] p-[6%] md:p-[3%] rounded-2xl relative pb-10 '>
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
            <a>VOLVER A COMPRAR</a>
          </div>
        </div>

      </div>
    </div>
  )
};

export default Sales;
