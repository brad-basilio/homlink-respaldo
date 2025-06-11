import React, { useState } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";

import BlogHeader from "./Components/Blog/BlogHeader";
import Filter from "./Components/Blog/Filter";
import Results from "./Components/Blog/Results";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import MaintenancePage from "./Utils/MaintenancePage";
import SliderInteractive from "./components/Tailwind/Sliders/SliderInteractive";
import FilterAgencia from "./components/Blog/FilterAgencia";
function Blog({ categories, postRecent, landing,sliders }) {

    const landingDestacados = landing?.find(
        (item) => item.correlative === "page_blog_destacados"
    );
    const landingTodos = landing?.find(
        (item) => item.correlative === "page_blog_todos"
    );

    const [filter, setFilter] = useState({
        category: null,
        search: null,
        sortOrder: "asc",
    });

    return (
        <div>
            <Header />
            <SliderInteractive
                items={sliders}
                data={{
                    infiniteLoop: "si",
                    paginationAlignment: "center",
                    showNavigation: "no",
                    navigationAlignment: "center"
                }}
                current="posts"
            />
            
            {postRecent && postRecent.length > 0 ? (
                <>
                    <BlogHeader postRecent={postRecent} landing={landingDestacados} />
                    
                  <div className="bg-neutral-light">
                      <FilterAgencia
                        categories={categories}
                        filter={filter}
                        setFilter={setFilter}
                        landing={landingTodos}
                    />

                    <Results filter={filter} />
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
                <Blog {...properties} />
            </Base>
        </CarritoProvider>
    );
});
