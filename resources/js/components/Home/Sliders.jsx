import React from "react"

const Sliders = () => {
  return <section className='relative h-screen pt-16'>
    <img className='absolute top-0 left-0 w-full h-full object-cover' src="https://placehold.co/720" alt="" />
    <div className='absolute bottom-0 bg-black bg-opacity-20'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 justify-between items-center p-[5%] md:py-[2.5%]">
        <div className="lg:col-span-3 flex flex-col justify-center self-stretch my-auto font-medium max-md:max-w-full">
          <div
            className="text-4xl tracking-tighter leading-10 text-white max-md:max-w-full"
          >
            <span className="">Inspirar</span>{" "}
            <span className="font-bold text-white">hábitos saludables</span>
            <br />
            <span className="">en los demás en nuestra misión</span>
          </div>
          <div className="flex gap-2 justify-center items-center self-start px-6 py-4 mt-10 text-base tracking-normal leading-none uppercase bg-white rounded-3xl text-[color:var(--Woodsmoke-950,#07090D)] max-md:px-5">
            <div
              className="self-stretch my-auto not-italic"
            >
              CURSOS Y TALLERES
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4db8197bf3a6470650d565404f68c7e615b7461c1421fa51c0ec6b1cf135957?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
              backgroundsize="contain"
              className="flex relative shrink-0 self-stretch my-auto w-6"
              aspectratio={1}
              noWebp={true}
            />
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center self-stretch my-auto">
          <div className="flex gap-6 justify-center items-center w-full">
            <div
              className="flex flex-1 shrink gap-6 items-center self-stretch my-auto text-4xl font-medium tracking-tighter leading-tight text-white whitespace-nowrap min-w-[240px]"
            >
              01
            </div>
            <div className="flex gap-3 justify-center items-center self-stretch my-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c1c4e1b40282fb11d444f2839797270cb3cf72cc1504c5fdf9541f367d0a02e?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
                backgroundsize="contain"
                className="flex relative shrink-0 self-stretch my-auto w-7"
                aspectratio={1}
                noWebp={true}
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed2508deac6177affa290d84d314a5ee22025ec5493b78df30e016f5f5611855?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
                backgroundsize="contain"
                className="flex relative shrink-0 self-stretch my-auto w-7"
                aspectratio={1}
                noWebp={true}
              />
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/de8473b4b52a0acf4d032c7a5cdb487ea90c54152f47e8fee8418641ffd1d492?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
            backgroundsize="contain"
            className="flex relative mt-6 w-full"
            aspectratio={0}
            noWebp={true}
          />
          <div
            className="mt-6 text-sm leading-5 text-white"
          >
            Donec ac sapien bibendum, fringilla erat ut, elementum est. Sed
            condimentum leo lacus, in maximus dui pulvinar vel. Curabitur est leo,
            consectetur malesuada orci ac, feugiat commodo orci. Phasellus sed
            sapien urna.
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Sliders