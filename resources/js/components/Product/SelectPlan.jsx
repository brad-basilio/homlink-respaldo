import React from "react"

const SelectPlan = ({ goToNextPage }) => {


return <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center'>

    <div className='max-w-2xl mx-auto'>
        <h1 className='text-2xl lg:text-3xl'>
            <b>¡Elije la frecuencia de tu pedido!</b>
        </h1>
        <p className='mt-2 text-[15px] sm:text-lg font-light'>
            Conoce de qué manera puedes ahorrar en tu rutina
        </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 sm:mt-8 lg:mt-10">

        <div className="flex flex-row overflow-hidden px-[5%] py-7 sm:py-10 xl:py-14 bg-white rounded-2xl">
            <div className="flex flex-col w-1/2">
                <h2 className="text-lg sm:text-xl xl:text-2xl font-light tracking-normal text-start">
                    Suscripción <br />
                    <span className="text-xl sm:text-2xl xl:text-3xl font-semibold ">Cada 3 meses</span>
                </h2>
                <div className="px-[3%] py-2.5 mt-2 sm:mt-4 text-xs xl:text-sm font-semibold tracking-normal leading-none text-center border border-black rounded-3xl"
                    role="status" aria-label="Envío gratis Lima Metropolitana">
                    + Envío gratis Lima Met.
                </div>
            </div>
            <div className="flex flex-col w-1/2 text-end">
                <div className="self-end px-2.5 py-2 text-xs lg:text-base font-semibold tracking-normal leading-none text-white bg-[#C0AFD4] rounded-[54px]"
                    role="status" aria-label="10% de descuento">
                    -10%OFF🔥
                </div>
                <p className="mt-2 lg:mt-6 text-[40px] xl:text-5xl  font-black tracking-tight leading-none text-[#C0AFD4]">
                    S/99.90
                </p>
            </div>
        </div>

        <div className="flex flex-row overflow-hidden px-[5%] py-7 sm:py-10 xl:py-14 bg-white rounded-2xl">
            <div className="flex flex-col w-1/2">
                <h2 className="text-lg sm:text-xl xl:text-2xl font-light tracking-normal text-start">
                    Suscripción <br />
                    <span className="text-xl sm:text-2xl xl:text-3xl font-semibold ">Cada 3 meses</span>
                </h2>
                <div className="px-[3%] py-2.5 mt-2 sm:mt-4 text-xs xl:text-sm font-semibold tracking-normal leading-none text-center border border-black rounded-3xl"
                    role="status" aria-label="Envío gratis Lima Metropolitana">
                    + Envío gratis Lima Met.
                </div>
            </div>
            <div className="flex flex-col w-1/2 text-end">
                <div className="self-end px-2.5 py-2 text-xs lg:text-base font-semibold tracking-normal leading-none text-white bg-[#C0AFD4] rounded-[54px]"
                    role="status" aria-label="10% de descuento">
                    -10%OFF🔥
                </div>
                <p className="mt-2 lg:mt-6 text-[40px] xl:text-5xl  font-black tracking-tight leading-none text-[#C0AFD4]">
                    S/99.90
                </p>
            </div>
        </div>

        <div className="flex flex-row overflow-hidden px-[5%] py-7 sm:py-10 xl:py-14 bg-white rounded-2xl">
            <div className="flex flex-col w-1/2">
                <h2 className="text-lg sm:text-xl xl:text-2xl font-light tracking-normal text-start">
                    Suscripción <br />
                    <span className="text-xl sm:text-2xl xl:text-3xl font-semibold ">Cada 3 meses</span>
                </h2>
                <div className="px-[3%] py-2.5 mt-2 sm:mt-4 text-xs xl:text-sm font-semibold tracking-normal leading-none text-center border border-black rounded-3xl"
                    role="status" aria-label="Envío gratis Lima Metropolitana">
                    + Envío gratis Lima Met.
                </div>
            </div>
            <div className="flex flex-col w-1/2 text-end">
                <div className="self-end px-2.5 py-2 text-xs lg:text-base font-semibold tracking-normal leading-none text-white bg-[#C0AFD4] rounded-[54px]"
                    role="status" aria-label="10% de descuento">
                    -10%OFF🔥
                </div>
                <p className="mt-2 lg:mt-6 text-[40px] xl:text-5xl  font-black tracking-tight leading-none text-[#C0AFD4]">
                    S/99.90
                </p>
            </div>
        </div>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto lg:mx-[12.5%] mt-5 sm:mt-10">
        <button onClick={goToNextPage}
            className='bg-[#C5B8D4] text-white text-base px-[10%] tracking-widest py-3 sm:py-4 rounded-lg border border-white w-max font-semibold text-nowrap'>
            SIGUIENTE
        </button>
    </div>

</section>
}

export default SelectPlan
