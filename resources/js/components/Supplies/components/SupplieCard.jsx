import React from "react"

const SupplieCard = ({...supplie}) => {
  return <article className="w-full bg-white p-2 rounded-lg relative">
    <div className="w-full aspect-[5/4]">
      <img className="w-full aspect-square object-contain object-right-top absolute -top-4 -right-4" src={`/assets/img/supplies/${supplie.image}`} alt={supplie.title} />
    </div>
    <div className="h-12 line-clamp-3 text-start">
      <h4 className="text-xs font-bold">{supplie.title}</h4>
      <p className="text-xs">{supplie.description}</p>
    </div>
  </article>
}

export default SupplieCard