import React from "react"

const Filter = () => {
  return <section className="p-[5%]">
    <div class="flex flex-wrap gap-10 justify-between items-center w-full">
      <div
        class="self-stretch my-auto text-4xl not-italic tracking-tighter leading-10 text-[color:var(--Cerise-600,#EC008C)] w-[559px] max-md:max-w-full"
      >
        <span class=" text-slate-700">Todas las </span>{" "}
        <span class="font-bold text-pink-600">Publicaciones</span>
        <br />
        <span class=" text-slate-700">de nuestra newletter</span>
      </div>
      <div class="flex gap-2 justify-center items-center self-stretch px-6 py-4 my-auto text-base tracking-normal leading-none uppercase rounded-3xl bg-slate-100 text-[color:var(--Woodsmoke-950,#07090D)] max-md:px-5">
        <div class="self-stretch my-auto not-italic">
          Ordenar por Mes
        </div>
        <i className="mdi mdi-swap-vertical"></i>
      </div>
    </div>
    <div className="flex flex-wrap gap-10 justify-between items-center mt-[5%] w-full text-base font-medium">
      <label htmlFor="txt-search" className="px-6 py-4 flex justify-between gap-4 items-center self-stretch my-auto rounded-3xl bg-slate-100  text-neutral-800 ">
        <i className="fa fa-search"></i>
        <input
          id="txt-search"
          type="text"
          placeholder="Buscar publicación"
          className=" flex-1 bg-transparent border-none outline-none text-neutral-800"
        />
      </label>
      <div className="flex flex-wrap gap-3 items-center self-stretch my-auto uppercase min-w-[240px] text-slate-900 max-md:max-w-full">
        <button className="flex justify-center items-center px-6 py-4 my-auto rounded-3xl bg-slate-100 max-md:px-5">
          Categoría 1
        </button>
        <button className="flex justify-center items-center px-6 py-4 my-auto rounded-3xl bg-[color:var(--Woodsmoke-600,#405D89)] text-slate-100 max-md:px-5">
          Categoría 2
        </button>
        <button className="flex justify-center items-center px-6 py-4 my-auto rounded-3xl bg-slate-100 max-md:px-5">
          Categoría 3
        </button>
      </div>
    </div>
  </section>
}

export default Filter