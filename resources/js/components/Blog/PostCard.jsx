import React from "react"

const PostCard = ({ title, description, category, image, date }) => {
  return <div className="flex flex-col self-stretch my-auto w-full mt-6">
    <div className="flex flex-col w-full">
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight leading-tight text-[#2B384F] line-clamp-2">
        {title || 'Sin titulo'}
      </h3>
      <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base leading-snug sm:leading-normal md:leading-relaxed text-[#2E405E] line-clamp-4">
        {description || 'Sin descripción'}
      </p>
    </div>
    <div className="flex flex-col mt-6 sm:mt-8 md:mt-10 w-full">
      <img src={image} alt={title} className="w-full object-cover h-40 sm:h-44 md:h-48" />
      <div className="flex justify-between items-center mt-4 sm:mt-5 md:mt-6 w-full">
        <div className="flex gap-2 items-center text-sm sm:text-base font-semibold leading-snug text-[#2B384F]">
          <span>{category || 'Sin categoría'}</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0174721cd37a226a32e03731547bd1132cb737f3cc4d934878f9a014e71276a0"
            alt="Arrow"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        <span className="text-xs sm:text-sm font-medium leading-snug text-[#FF27B9]">
          {date}
        </span>
      </div>
    </div>
  </div>
}

export default PostCard