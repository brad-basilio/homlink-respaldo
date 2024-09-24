import React, { useEffect, useState } from "react"
import FilterPagination from "../../Reutilizables/Pagination/FilterPagination";
import CourseCard from "./CourseCard";
import CoursesRest from "../../Actions/CoursesRest";
import ArrayJoin from "../../Utils/ArrayJoin";

const coursesRest = new CoursesRest();

const Results = ({ categories, filter, setFilter }) => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const filter2search = [
      ['name', 'contains', filter.search],
      ['summary', 'contains', filter.search],
    ];
    if (filter.category) {
      filter2search.push([
        'category.id', '=', filter.category
      ])
    }

    coursesRest.paginate({
      filter: ArrayJoin(filter2search, 'and'),
      requireTotalCount: true,
      skip: 12 * (currentPage - 1),
      sort: [{ selector: 'post_date', desc: filter.sortOrder == 'desc' }],
      take: 12,
    })
      .then(({ status, data, totalCount }) => {
        if (status != 200) return
        setPages(Math.ceil(totalCount / 12))
        setResults(data)
      })
  }, [filter, currentPage])


  return <section className="p-[5%] pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div>
      <div class="flex flex-col w-full">
        <div class="flex gap-2 items-center p-4 w-full text-base uppercase rounded-3xl bg-slate-100 text-gray-900">
          <span class="flex-1">Categorías</span>
          <i className="mdi mdi-chevron-up"></i>
        </div>
        <div class="flex flex-col mt-1 w-full text-sm leading-snug text-gray-800">
          {
            categories.map((item, index) => {
              return <label key={index} class="flex gap-3 items-center px-4 py-2.5 w-full">
                <span class="flex-1">{item.name}</span>
                <input type="checkbox" onChange={e => setFilter(old => {
                  let newCategories = structuredClone(old.categories ?? []);
                  if (e.target.checked) {
                    newCategories.push(item.id)
                  } else {
                    newCategories = newCategories.filter(x => x.id != item.id)
                  }
                  return {
                    ...old,
                    categories: newCategories
                  }
                })} />
              </label>
            })
          }
        </div>
      </div>

    </div>
    <div className="lg:col-span-2 xl:col-span-3">
      <div className="grid lg:grid-cols-2 xl:grid-col-3">
        {results.map((item, index) => {
          return <CourseCard key={index} {...item} />
        })}
      </div>
      <div className="p-[5%]">
        <FilterPagination pages={pages} current={currentPage} setCurrent={setCurrentPage} />
      </div>
    </div>
  </section>
}

export default Results