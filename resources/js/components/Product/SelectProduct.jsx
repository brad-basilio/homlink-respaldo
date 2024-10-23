import React from "react"

const SelectProduct = ({ goToNextPage }) => {
  

  return <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center'>
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl md:text-3xl'>
        <b>¡Selecciona tus productos personalizados!</b>
      </h1>
      <p className='mt-2 text-[15px] sm:text-lg font-light'>
        Para mejores resultados arma una rutina completa ✨
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 sm:mt-8 lg:mt-10">
        
        <div>
            <div className="flex flex-col w-full whitespace-nowrap max-md:mt-6">
                <div className="flex overflow-hidden flex-col px-[5%] py-8 text-3xl tracking-normal leading-none text-center bg-white rounded-2xl border border-neutral-700 text-neutral-700">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fc0047bf6c22e22b0cfa9f1c42528743800012893a0d701f60708a4b3683010?placeholderIfAbsent=true&apiKey=72fae0f4c808496790606e16dad566da" className="object-contain aspect-[0.90] w-full" alt="Shampoo product image" />
                    <h2 className="self-center mt-4 text-2xl">Shampoo</h2>
                </div>
                <div className="mt-4 flex gap-5 justify-between items-center self-center py-1  text-3xl text-black bg-lime-50 rounded-xl border border-black w-[70%] px-4">
                    <button aria-label="Decrease quantity" className="text-xl lg:text-2xl">-</button>
                    <span className="text-xl lg:text-2xl">2</span>
                    <button aria-label="Increase quantity" className="text-xl lg:text-2xl">+</button>
                </div>
            </div>
        </div>

        <div>
            <div className="flex flex-col w-full whitespace-nowrap max-md:mt-6">
                <div className="flex overflow-hidden flex-col px-[5%] py-8 text-3xl tracking-normal leading-none text-center bg-white rounded-2xl border border-neutral-700 text-neutral-700">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fc0047bf6c22e22b0cfa9f1c42528743800012893a0d701f60708a4b3683010?placeholderIfAbsent=true&apiKey=72fae0f4c808496790606e16dad566da" className="object-contain aspect-[0.90] w-full" alt="Shampoo product image" />
                    <h2 className="self-center mt-4 text-2xl">Shampoo</h2>
                </div>
                <div className="mt-4 flex gap-5 justify-between items-center self-center py-1  text-3xl text-black bg-lime-50 rounded-xl border border-black w-[70%] px-4">
                    <button aria-label="Decrease quantity" className="text-xl lg:text-2xl">-</button>
                    <span className="text-xl lg:text-2xl">2</span>
                    <button aria-label="Increase quantity" className="text-xl lg:text-2xl">+</button>
                </div>
            </div>
        </div>

        <div>
            <div className="flex flex-col w-full whitespace-nowrap max-md:mt-6">
                <div className="flex overflow-hidden flex-col px-[5%] py-8 text-3xl tracking-normal leading-none text-center bg-white rounded-2xl border border-neutral-700 text-neutral-700">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fc0047bf6c22e22b0cfa9f1c42528743800012893a0d701f60708a4b3683010?placeholderIfAbsent=true&apiKey=72fae0f4c808496790606e16dad566da" className="object-contain aspect-[0.90] w-full" alt="Shampoo product image" />
                    <h2 className="self-center mt-4 text-2xl">Shampoo</h2>
                </div>
                <div className="mt-4 flex gap-5 justify-between items-center self-center py-1  text-3xl text-black bg-lime-50 rounded-xl border border-black w-[70%] px-4">
                    <button aria-label="Decrease quantity" className="text-xl lg:text-2xl">-</button>
                    <span className="text-xl lg:text-2xl">2</span>
                    <button aria-label="Increase quantity" className="text-xl lg:text-2xl">+</button>
                </div>
            </div>
        </div>

        <div>
            <div className="flex flex-col w-full whitespace-nowrap max-md:mt-6">
                <div className="flex overflow-hidden flex-col px-[5%] py-8 text-3xl tracking-normal leading-none text-center bg-white rounded-2xl border border-neutral-700 text-neutral-700">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fc0047bf6c22e22b0cfa9f1c42528743800012893a0d701f60708a4b3683010?placeholderIfAbsent=true&apiKey=72fae0f4c808496790606e16dad566da" className="object-contain aspect-[0.90] w-full" alt="Shampoo product image" />
                    <h2 className="self-center mt-4 text-2xl">Shampoo</h2>
                </div>
                <div className="mt-4 flex gap-5 justify-between items-center self-center py-1  text-3xl text-black bg-lime-50 rounded-xl border border-black w-[70%] px-4">
                    <button aria-label="Decrease quantity" className="text-xl lg:text-2xl">-</button>
                    <span className="text-xl lg:text-2xl">2</span>
                    <button aria-label="Increase quantity" className="text-xl lg:text-2xl">+</button>
                </div>
            </div>
        </div>

    </div>

    <div className='max-w-4xl mx-auto mt-5 sm:mt-8 lg:mt-10 px-[3%]'>
         
            <p className='mt-2 text-[15px] sm:text-lg font-light'>
                Descubre cómo ahorrar aún más al final 👀
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#EFBEC1] rounded-3xl mt-4 py-4 px-[5%]">
                <div className="text-2xl md:text-3xl font-bold text-white">
                    <h2>Elegiste 3 productos</h2>
                </div>
                <div className="flex flex-row text-white items-center gap-4">
                    <p className="text-base">Antes: S/209</p>         
                    <h2 className="text-2xl md:text-3xl font-bold">S/139.90</h2>       
                </div>
            </div>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto md:mx-[12.5%] mt-5 sm:mt-10">
      <button onClick={goToNextPage} className='bg-[#C5B8D4] text-white text-base px-[10%] tracking-widest py-3 sm:py-4 rounded-lg border border-white w-max font-semibold text-nowrap'>
          SIGUIENTE
      </button>
    </div>
    
  </section>
}

export default SelectProduct 