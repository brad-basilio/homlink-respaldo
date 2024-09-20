import React from "react"

const Indicators = () => {
  return <section className='p-[5%] bg-amber-400'>
    <div class="flex flex-wrap gap-10 items-center justify-center font-semibold  text-[color:var(--Woodsmoke-950,#07090D)]">
      <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 text-center max-md:w-full">
        <div
          class="text-xl not-italic tracking-tight leading-tight text-nowrap"
        >
          Profesionales capacitados
        </div>
        <div
          $name="420+"
          class="mt-6 text-7xl not-italic tracking-tighter leading-tight max-md:text-4xl"
        >
          420+
        </div>
      </div>
      <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 text-center max-md:w-full">
        <div
          class="text-xl not-italic tracking-tight leading-tight text-nowrap"
        >
          Retorno de inversión
        </div>
        <div
          class="mt-6 text-7xl not-italic tracking-tighter leading-tight max-md:text-4xl"
        >
          99%
        </div>
      </div>
      <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 text-center max-md:w-full">
        <div
          class="text-xl not-italic tracking-tight leading-tight text-nowrap"
        >
          Empresas que confian
        </div>
        <div
          class="mt-6 text-7xl not-italic tracking-tighter leading-tight max-md:text-4xl"
        >
          36+
        </div>
      </div>
    </div>
  </section>
}

export default Indicators