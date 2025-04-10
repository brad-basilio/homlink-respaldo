import React, { useState } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";

import BlogHeader from "./Components/Blog/BlogHeader";
import Filter from "./Components/Blog/Filter";
import Results from "./Components/Blog/Results";
import Header from "./components/Tailwind/Header";
import { CarritoProvider } from "./context/CarritoContext";

function Blog({ categories,postRecent,landing }) {
    const [filter, setFilter] = useState({
        category: null,
        search: null,
        sortOrder: "asc",
    });

    return (
        <div >
            <Header />
            <BlogHeader postRecent={postRecent} landing={landing}/>
            <Filter
                categories={categories}
                filter={filter}
                setFilter={setFilter}
                landing={landing}
            />
            <Results filter={filter} />
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
