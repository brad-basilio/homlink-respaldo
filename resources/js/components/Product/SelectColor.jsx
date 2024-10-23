import React from "react"

const SelectColor = ({ goToNextPage }) => {
  
  return <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center'>
         
         <div className='max-w-2xl mx-auto'>
            <h1 className='text-2xl md:text-3xl'>
                <b>¡Ahora selecciona el color!</b>
            </h1>
            <p className='mt-2 text-[15px] sm:text-lg font-light'>
                Elije tus colores favoritos para tu rutina ✨
            </p>
         </div>  

         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 sm:mt-8 lg:mt-10">
        
                    <div className="overflow-hidden w-full bg-white rounded-2xl ">
                        <div className="flex flex-row gap-2 items-center px-[2%]">
                            <div className="flex flex-col w-1/3 items-center justify-center py-[5%] h-52 sm:h-72">
                                <img className="object-contain aspect-[0.6] object-center w-full h-full" src="https://cdn.builder.io/api/v1/image/assets/TEMP/05da0ceb40e1489cd4a19a968efa1d9d187be446a5e3e341c9160b60ef62a5ef?placeholderIfAbsent=true&apiKey=72fae0f4c808496790606e16dad566da" alt="Shampoo product image"/>
                            </div>
                            <div className="flex flex-col w-2/3">
                                <div className="flex flex-wrap gap-3 items-end self-stretch my-auto ">
                                    <div className="flex flex-col items-start self-stretch">
                                        <h2 className="text-xl sm:text-2xl font-semibold tracking-normal leading-none text-neutral-700">Shampoo 1</h2>
                                        <p className="mt-2.5 text-lg font-light tracking-normal leading-none text-neutral-700">Selecciona tu color:</p>
                                        <div className="flex gap-1.5 md:gap-3 flex-wrap mt-5">
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full border border-black border-solid bg-stone-100" aria-label="Select stone color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-sky-200 rounded-full" aria-label="Select sky blue color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-red-200 rounded-full" aria-label="Select light red color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-orange-200 rounded-full" aria-label="Select light orange color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden w-full bg-white rounded-2xl ">
                        <div className="flex flex-row gap-2 items-center px-[2%]">
                            <div className="flex flex-col w-1/3 items-center justify-center py-[5%] h-52 sm:h-72">
                                <img className="object-contain aspect-[0.6] object-center w-full h-full" src="https://cdn.builder.io/api/v1/image/assets/TEMP/05da0ceb40e1489cd4a19a968efa1d9d187be446a5e3e341c9160b60ef62a5ef?placeholderIfAbsent=true&apiKey=72fae0f4c808496790606e16dad566da" alt="Shampoo product image"/>
                            </div>
                            <div className="flex flex-col w-2/3">
                                <div className="flex flex-wrap gap-3 items-end self-stretch my-auto ">
                                    <div className="flex flex-col items-start self-stretch">
                                        <h2 className="text-xl sm:text-2xl font-semibold tracking-normal leading-none text-neutral-700">Shampoo 1</h2>
                                        <p className="mt-2.5 text-lg font-light tracking-normal leading-none text-neutral-700">Selecciona tu color:</p>
                                        <div className="flex gap-1.5 md:gap-3 flex-wrap mt-5">
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full border border-black border-solid bg-stone-100" aria-label="Select stone color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-sky-200 rounded-full" aria-label="Select sky blue color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-red-200 rounded-full" aria-label="Select light red color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-orange-200 rounded-full" aria-label="Select light orange color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="overflow-hidden w-full bg-white rounded-2xl ">
                        <div className="flex flex-row gap-2 items-center px-[2%]">
                            <div className="flex flex-col w-1/3 items-center justify-center py-[5%] h-52 sm:h-72">
                                <img className="object-contain aspect-[0.6] object-center w-full h-full" src="https://cdn.builder.io/api/v1/image/assets/TEMP/05da0ceb40e1489cd4a19a968efa1d9d187be446a5e3e341c9160b60ef62a5ef?placeholderIfAbsent=true&apiKey=72fae0f4c808496790606e16dad566da" alt="Shampoo product image"/>
                            </div>
                            <div className="flex flex-col w-2/3">
                                <div className="flex flex-wrap gap-3 items-end self-stretch my-auto ">
                                    <div className="flex flex-col items-start self-stretch">
                                        <h2 className="text-xl sm:text-2xl font-semibold tracking-normal leading-none text-neutral-700">Shampoo 1</h2>
                                        <p className="mt-2.5 text-lg font-light tracking-normal leading-none text-neutral-700">Selecciona tu color:</p>
                                        <div className="flex gap-1.5 md:gap-3 flex-wrap mt-5">
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full border border-black border-solid bg-stone-100" aria-label="Select stone color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-sky-200 rounded-full" aria-label="Select sky blue color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-red-200 rounded-full" aria-label="Select light red color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-orange-200 rounded-full" aria-label="Select light orange color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                            <button className="flex shrink-0 w-9 h-9 md:w-11 md:h-11 bg-lime-100 rounded-full" aria-label="Select lime color"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default SelectColor 