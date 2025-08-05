import React, { useState } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";

import BlogHeader from "./components/Blog/BlogHeader";
import Filter from "./components/Blog/Filter";
import Results from "./components/Blog/Results";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import MaintenancePage from "./Utils/MaintenancePage";
import SliderInteractive from "./components/Tailwind/Sliders/SliderInteractive";
import FilterAgencia from "./components/Blog/FilterAgencia";
import FilterInfoproducto from "./components/Blog/FilterInfoproducto";
import ResultsInfoProducto from "./components/InfoProductos/ResultsInfoProducto";
import TextWithHighlight from "./Utils/TextWithHighlight";
function InfoProductos({ categories, productosRecientes, landing, sliders }) {
    const [filter, setFilter] = useState({
        category: null,
        search: null,
        sortOrder: "asc",
    });

    return (
        <div>
            <Header />
            <div
                key={`slide-banner`}
                className="w-full h-[589px] lg:h-auto flex-shrink-0 relative  bg-neutral-light"
            >
                <img
                    src={`/api/landing_home/media/${landing?.image || "undefined"}`}
                    alt={landing?.title}
                    loading="lazy"
                    className="absolute top-0 left-0 h-full md:h-full w-screen md:w-full object-cover object-right-25 md:object-center z-0 md:mr-20 lg:mr-0"
                />

                {/* Gradiente entre bg-primary y bg-contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-constrast opacity-80"></div>

                <div className="relative w-full px-primary px-[5%]     mx-auto h-[530px] md:h-[600px] flex flex-col items-center md:items-start justify-end md:justify-center text-white">
                    <div className="flex max-w-lg flex-col gap-5 lg:gap-10 items-start w-full text-start md:text-left">
                        <h2
                            className="font-title uppercase text-sm flex gap-2 leading-tight sm:text-lg md:text-lg tracking-normal font-medium text-white justify-center md:justify-start"
                            style={{
                                textShadow: "0 0 20px rgba(0, 0, 0, .25)",
                            }}
                        >
                            <span>
                                <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
                                    <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
                                    <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
                                    <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
                                    <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
                                </svg>
                            </span>
                            Infoproductos
                        </h2>
                        <p
                            className="w-full text-start px-primary mx-auto md:max-w-5xl italic font-semibold text-4xl lg:text-[60px] leading-tight font-paragraph text-white"
                            style={{
                                textShadow: "0 0 20px rgba(0, 0, 0, .25)",
                            }}
                        >
                            <TextWithHighlight text={landing?.title} color="bg-accent" />
                        </p>
                        <p>
                            {landing?.description || "Infoproductos es un espacio donde encontrarás recursos digitales para potenciar tu aprendizaje y desarrollo personal. Explora nuestra amplia gama de infoproductos diseñados para brindarte conocimientos valiosos y herramientas prácticas."}
                        </p>
                    </div>
                </div>
            </div>

            {productosRecientes && productosRecientes.length > 0 ? (
                <>
                    <div className="bg-neutral-light">
                        <FilterInfoproducto
                            categories={categories}
                            filter={filter}
                            setFilter={setFilter}
                        />
                        <ResultsInfoProducto filter={filter} />
                    </div>
                </>
            ) : (
                <MaintenancePage />
            )}
            <Footer />
        </div>
    );
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <InfoProductos {...properties} />
            </Base>
        </CarritoProvider>
    );
});
