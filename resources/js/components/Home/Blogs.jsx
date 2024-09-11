import React from "react"

const Blogs = ({ resources }) => {
  return <>
    <section className="p-[5%]">
      <div className="flex flex-col">
        <div className="w-full max-md:max-w-full">
          <header className="flex flex-wrap md:flex-nowrap justify-between items-start w-full">
            <div className="flex flex-col flex-1 shrink justify-center text-4xl font-bold leading-10 basis-0 min-w-[240px] text-cyan-950">
              <h1 className="max-md:text-center">
                ¡Explora Nuestro Blog y Empieza tu Viaje de Desarrollo!
              </h1>
            </div>
            <div className="flex flex-col flex-1 shrink justify-center text-base min-w-[240px] mt-6 md:mt-0 md:text-right md:pl-6">
              <p className="leading-6 text-cyan-950">
                Sumérgete en nuestro blog y descubre una fuente de conocimiento y motivación para impulsar tu desarrollo y bienestar.
              </p>
              <a href="/resources" className="flex gap-2 justify-center items-center self-end px-6 py-4 mt-10 font-bold leading-tight bg-red-500 rounded-lg text-zinc-100 max-md:px-5 max-sm:self-center">
                <span className="self-stretch my-auto">Ver más publicaciones</span>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcb6cf155c6efbbda6a1e8e320f9116c0e4db4b2085f3907f8d17bf75f50cf82?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
              </a>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 mt-14 md:grid-cols-2 lg:grid-cols-3 max-md:mt-10">
            {
              resources.map((resource, index) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(resource.description, 'text/html');
                const plainText = doc.body.textContent || "";
                return (
                  <a key={`resource-${index}`} href={`/resources/${resource.id}`}>
                    <article className="flex flex-col w-full shadow-xl rounded-md">
                      <div className="flex flex-col max-w-full rounded">
                        <img loading="lazy" src={`https://i.ytimg.com/vi/${resource.media_id}/hqdefault.jpg`} alt={resource.name} className="object-cover object-center w-full rounded-t-md aspect-video" onError={e => e.target.src = '/api/cover/null'} />
                      </div>
                      <div className="flex flex-col px-4 py-3">
                        <h2 className="text-xl md:text-2xl font-bold leading-8 text-teal-950 line-clamp-2 h-16">{resource.name}</h2>
                        <p className="mt-2 text-base leading-6 text-cyan-950 line-clamp-3 h-[72px]">{plainText}</p>
                      </div>
                    </article>
                  </a>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>

  </>
}

export default Blogs