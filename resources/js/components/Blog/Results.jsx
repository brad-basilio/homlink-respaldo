import React, { useState } from "react"
import FilterPagination from "../../Reutilizables/Pagination/FilterPagination"
import PostCard from "./PostCard"

const Results = () => {
  const [results, setResults] = useState(new Array(12).fill(null))
  return <>
    <section className="p-[5%] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {
        results.map((item, index) => {
          return <PostCard key={index} {...item} />
        })
      }
    </section>
    <div className="p-[5%]">
      <FilterPagination pages={8} current={1} />
    </div>
  </>
}

export default Results