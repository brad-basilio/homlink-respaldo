import React from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import { CarritoProvider } from "./context/CarritoContext";
import Footer from "./components/Tailwind/Footer";
import Header from "./components/Tailwind/Header";
import TestimonioSection from "./components/Home/TestimonioSection";
import HomeSeccionTestimonios from "./components/Tailwind/CambioGerencia/HomeSeccionTestimonios";


// Componente para la tarjeta de caso de éxito
const CaseCard = ({ slug,title, image, description }) => {
    return (
        <a href={`/casos-de-exito/${slug}`} className="relative block group overflow-hidden rounded-lg shadow-lg font-paragraph">
            {/* Imagen de fondo */}
            <img
                src={`/api/success_story/media/${image}`}
                alt={title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay oscuro por defecto - solo muestra título y botón */}
            <div className="absolute inset-0 font-paragraph italic  bg-black/50 flex items-end justify-end p-6 transition-all duration-300 group-hover:hidden group-hover:opacity-0 z-10">
                <div className="flex gap-2">
                    <h3 className="text-white text-xl font-medium mb-2 leading-tight">
                        {(title || "").replace(/\*/g, "")}
                    </h3>

                    <div className="flex justify-end">
                        <a  href={`/casos-de-exito/${slug}`} className="bg-accent transition-colors h-10 w-10 duration-300 rounded-lg p-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Overlay azulado en hover - muestra título, descripción y botón */}
            <div className="absolute inset-0 bg-constrast  opacity-0 flex items-end  justify-end p-6  group-hover:bg-opacity-80 group-hover:opacity-100 transition-all duration-500 z-[999]">
                <div className="flex  gap-4 w-full">
                    <div>
                        <h3 className="text-white italic text-2xl line-clamp-2 font-medium mb-2 leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                             {(title || "").replace(/\*/g, "")}
                        </h3>
                        {description && (
                            <p className="text-white/90 line-clamp-1 text-sm mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                        <a  href={`/casos-de-exito/${slug}`} className="bg-accent  transition-colors w-10 h-10 duration-300 rounded-lg p-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </a>
    );
};

const CasosDeExito = ({ testimonios, landing, successStories }) => {
    return (
        <>
            <Header />
            <section className="w-full bg-white font-paragraph px-[5%] py-16 md:py-20">
                {/* Título de la sección */}

                <div className="text-center mb-12 lg:mb-16 px-[5%] mx-auto">
                    <div className="flex w-full justify-center  mb-4">
                        <div className=" mr-2">
                            <span>
                                <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
                                    <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
                                    <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
                                    <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
                                    <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
                                </svg>

                            </span>
                        </div>
                        <h3 className="uppercase text-neutral-dark text-sm lg:text-lg font-bold">Casos de éxito</h3>
                    </div>
                    <h2 className="text-4xl lg:text-[52px] font-medium mb-6 leading-tight italic">

                        Nuestros <span className="text-constrast">casos de éxito</span><br className="hidden lg:block" /> más destacados

                    </h2>

                </div>


                {/* Grid de casos de éxito */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {successStories?.map((caso) => (
                        <CaseCard
                            key={caso?.id}
                            title={caso?.name}
                            slug={caso?.slug}
                            image={caso?.image}
                            description={caso?.summary}
                        />
                    ))}
                </div>


            </section>
            <HomeSeccionTestimonios testimonios={testimonios} data={landing} />
            <Footer />
        </>
    );
};


CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <CasosDeExito {...properties} />
            </Base>
        </CarritoProvider>
    );
});

