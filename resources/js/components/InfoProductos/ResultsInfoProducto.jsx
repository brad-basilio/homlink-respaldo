
import React, { useEffect, useState } from "react";
import FilterPagination from "../../Reutilizables/Pagination/FilterPagination";
import InfoProductoCard from "./InfoProductoCard";
import InfoproductsRest from "../../Actions/InfoproductsRest";
import ArrayJoin from "../../Utils/ArrayJoin";

const productosRest = new InfoproductsRest();

const ResultsInfoProducto = ({ filter }) => {
    const [results, setResults] = useState([]);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const filter2search = [
            ["name", "contains", filter.search],
            ["summary", "contains", filter.search],
        ];
        if (filter.category) {
            filter2search.push(["category_id", "=", filter.category]);
        }

        productosRest
            .paginate({
                filter: ArrayJoin(filter2search, "and"),
                requireTotalCount: true,
                skip: 6 * (currentPage - 1),
                sort: [
                    { selector: "created_at", desc: filter.sortOrder == "desc" },
                ],
                take: 6,
            })
            .then(({ status, data, totalCount }) => {
                if (status != 200) return;
                setPages(Math.ceil(totalCount / 12));
                setResults(data);
            });
    }, [filter, currentPage]);

    return (
        <>
            <section className="px-[5%] pt-0 min-h-[300px] grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.length > 0 ? (
                    results.map((item, index) => (
                        <InfoProductoCard key={item.id || index} {...item} />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16">
                        <img src="/assets/img/empty-box.png" alt="Sin resultados" className="w-32 h-32 mb-4 animate-bounce" />
                        <p className="text-slate-400 text-lg">No se encontraron resultados</p>
                    </div>
                )}
            </section>
            <div className="p-[5%]">
                <FilterPagination
                    pages={pages}
                    current={currentPage}
                    setCurrent={setCurrentPage}
                />
            </div>
        </>
    );
};

export default ResultsInfoProducto;
