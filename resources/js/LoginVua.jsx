import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';


const LoginVua = () => {

const [isLogin, setIsLogin] = useState(true);

return (
<>
    <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center'>

        <div className='max-w-2xl mx-auto'>
            <h1 className='text-3xl'>
                <b>¡Ahora puedes ser una Vuá lover!</b>
            </h1>
            <div className='flex flex-wrap justify-around py-3'>
                <li className='mt-2 text-[15px] sm:text-lg font-light'>
                    Guarda tus fórmulas únicas
                </li>
                <li className='mt-2 text-[15px] sm:text-lg font-light'>
                    Beneficios en tu cumpleaños
                </li>
                <li className='mt-2 text-[15px] sm:text-lg font-light'>
                    Recibe las promos del mes primero
                </li>
            </div>
        </div>

        <div
            className="flex overflow-hidden rounded-3xl mt-6 max-w-3xl mx-auto flex-col justify-center items-center px-[5%] py-11 text-lg tracking-normal leading-none bg-white">
            <div className="flex flex-col">
                <div
                    className="grid grid-cols-2 gap-5 text-base lg:text-xl px-3 py-2.5 font-semibold text-center bg-white rounded-xl border border-[#404040]">
                    <a onClick={()=> setIsLogin(true)}
                        className={`cursor-pointer px-[5%] py-6 rounded-lg ${isLogin ? 'bg-red-200 text-white' : 'text-neutral-700'}`}>
                        INICIA SESIÓN</a>

                    <a onClick={()=> setIsLogin(false)}
                        className={`cursor-pointer px-[5%] py-6 rounded-lg ${!isLogin ? 'bg-red-200 text-white' : 'text-neutral-700'}`}>
                        REGÍSTRATE</a>
                </div>
                {isLogin ? (

                <div>
                    <form className="mt-9 mb-4">

                        <input type="email" id="email" placeholder="E-mail"
                            className="w-full px-8 focus:ring-0 focus:border-0 py-4 whitespace-nowrap bg-lime-50 rounded-xl border  border-[#404040] text-[#404040]"
                            required />

                        <input type="password" id="password" placeholder="Contraseña"
                            className="w-full px-8 focus:ring-0 focus:border-0 py-4 mt-4 whitespace-nowrap bg-lime-50 rounded-xl border  border-[#404040] text-[#404040]"
                            required />

                        <button type="submit"
                            className="self-center rounded-full px-20 py-4 mt-11 max-w-full font-semibold text-center text-white whitespace-nowrap bg-[#A191B8]">
                            INGRESAR
                        </button>
                    </form>

                    <a href="#" className="text-base tracking-normal text-[#404040]">
                        ¿Olvidaste tu contraseña?
                    </a>

                    <p className="mt-4 text-base tracking-normal text-border-[#404040]">
                        ¿Necesitas ayuda? <a href="#" className="underline">Contáctanos</a>
                    </p>
                </div>

                ) : (


                <div>
                    <form className="mt-9 mb-4">
                        <input type="text" id="fullname" placeholder="Nombre completo"
                            className="w-full px-8 focus:ring-0 focus:border-0 py-4 whitespace-nowrap bg-lime-50 rounded-xl border  border-[#404040] text-[#404040]"
                            required />


                        <input type="email" id="email" placeholder="E-mail"
                            className="w-full px-8 focus:ring-0 focus:border-0 py-4 mt-4 whitespace-nowrap bg-lime-50 rounded-xl border  border-[#404040] text-[#404040]"
                            required />


                        <input type="password" id="password" placeholder="Contraseña"
                            className="w-full px-8 focus:ring-0 focus:border-0 py-4 mt-4 whitespace-nowrap bg-lime-50 rounded-xl border  border-[#404040] text-[#404040]"
                            required />

                        <div className='flex flex-row gap-3 mt-4 items-center'>
                            <span className='text-3xl'>🎂</span>
                            <input type="date" id="fullname" placeholder="Cumpleaños"
                                className="w-full px-8 focus:ring-0 focus:border-0 py-4  whitespace-nowrap bg-lime-50 rounded-xl border  border-[#404040] text-[#404040]"
                                required />
                        </div>

                        <label>
                            <input type="checkbox" className="py-4 mt-5" />
                            <span className='pl-3 leading-7'>Quiero recibir ofertas exclusivas y novedades de Vuá</span>
                        </label>

                        <button type="submit"
                            className="self-center rounded-full px-20 py-4 mt-11 max-w-full font-semibold text-center text-white whitespace-nowrap bg-[#A191B8]">
                            ¡SER VUÁ LOVER!
                        </button>
                    </form>



                </div>



                )}
            </div>
        </div>

    </section>
</>
);
};

CreateReactScript((el, properties) => {
createRoot(el).render(
<Base {...properties}>
<LoginVua {...properties} />
</Base>
);
});
