import React from "react"

const Blogs = () => {

  const blogPosts = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/883fd36e282a92503d603f7d417ce763e22ff6ba1d0b1014cd6c72fa038f2c70?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731",
      title: "Cómo Maximizar tu Desarrollo y bienestar en el Entorno Laboral",
      description: "Explorar estrategias y consejos para impulsar el crecimiento personal en el lugar de trabajo."
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f7352f0e2c26487a87af289d3b44b21a43becc44b75516feea0bfb20d575862e?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731",
      title: "La Transformación Digital y el Coaching: Una Combinación Ganadora",
      description: "Examina cómo el coaching puede ayudar a profesionales y empresas a adaptarse y prosperar en la era digital."
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/00f7c61d364129e120feefd81aff53ca87df93918009b06443de2b46b1943b04?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731",
      title: "Historias de Éxito: Cómo el Coaching Cambió la Vida de Nuestros Clientes",
      description: "Explora casos reales de personas que experimentaron transformaciones significativas en sus vidas."
    }
  ];

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
              <button className="flex gap-2 justify-center items-center self-end px-6 py-4 mt-10 font-bold leading-tight bg-red-500 rounded-lg text-zinc-100 max-md:px-5 max-sm:self-center">
                <span className="self-stretch my-auto">Ver más publicaciones</span>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcb6cf155c6efbbda6a1e8e320f9116c0e4db4b2085f3907f8d17bf75f50cf82?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 mt-14 md:grid-cols-2 lg:grid-cols-3 max-md:mt-10">
            {blogPosts.map((post, index) => (
              <article key={index} className="flex flex-col min-w-[240px]">
                <div className="flex flex-col max-w-full rounded">
                  <img loading="lazy" src={post.imageSrc} alt={post.title} className="object-contain w-full rounded aspect-[0.9]" />
                </div>
                <div className="flex flex-col mt-8">
                  <h2 className="text-2xl font-bold leading-8 text-teal-950">{post.title}</h2>
                  <p className="mt-4 text-base leading-6 text-cyan-950">{post.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

  </>
}

export default Blogs