import React, { useState } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import MaintenancePage from "./Utils/MaintenancePage";


import FilterInfoproducto from "./components/Blog/FilterInfoproducto";
import ResultsInfoProducto from "./components/InfoProductos/ResultsInfoProducto";

function InfoProductos({ categories, productosRecientes, landing, sliders }) {
    const [filter, setFilter] = useState({
        category: null,
        search: null,
        sortOrder: "asc",
    });

    return (
        <div>
            <Header />
           

            {productosRecientes && productosRecientes.length > 0 ? (
                <>
                    {/* Puedes agregar un header específico aquí si lo necesitas */}
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


