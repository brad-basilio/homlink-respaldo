import React from "react"

const Contact = () => {

  const inputFields = [
    { label: 'Nombre completo', placeholder: 'Nombre y apellido', type: 'text' },
    { label: 'Correo electrónico (opcional)', placeholder: 'hola@mail.com', type: 'email' },
    { label: 'Asunto', placeholder: 'Asunto', type: 'text' },
    { label: 'WhatsApp', placeholder: '+51 999 999 999', type: 'tel' }
  ];

  return <>
    <section className="p-[5%] bg-[#f4f4f4]">
      <div className="flex gap-6 max-md:flex-col">
        <section className="flex flex-col w-6/12 max-md:w-full max-md:items-center">
          <header className="flex flex-col text-cyan-950 max-md:text-center">
            <h1 className="text-4xl font-bold leading-10">
              ¿Listo para dar el primer paso hacia tu desarrollo y bienestar?
            </h1>
            <p className="mt-6 text-base leading-snug">
              Déjanos tus datos y te acompañaremos en esta emocionante aventura.
            </p>
          </header>

          <form className="w-full text-sm mt-8">
            <div className="flex flex-nowrap flex-col gap-6 items-start w-full">
              {inputFields.map((field, index) => (
                <div
                  key={index}
                  className="w-1/2 max-md:w-full"
                >
                  <label className="leading-snug text-teal-950">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="px-2.5 py-4 mt-1 w-full font-medium leading-tight bg-white rounded-lg border border-solid border-zinc-200 text-teal-950 text-opacity-30"
                    aria-label={field.label}
                  />
                </div>
              ))}

              <div className="flex flex-col w-full">
                <label className="leading-snug text-teal-950">Mensaje</label>
                <textarea
                  placeholder="Hola..."
                  className="flex-1 px-2.5 py-4 mt-1 font-medium leading-tight bg-white rounded-lg border border-solid border-zinc-200 text-teal-950 text-opacity-30"
                  aria-label="Mensaje"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex gap-2 justify-center items-center self-start px-6 py-4 mt-14 text-base font-bold leading-tight bg-red-500 rounded-lg text-zinc-100 max-md:mt-10"
            >
              <span className="my-auto">¡No esperes más, únete a nosotros!</span>
              <i className=" fas fa-envelope ms-1"></i>
            </button>
          </form>
        </section>

        <aside className="flex flex-col w-6/12 max-md:hidden">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b9da078d6212f8163ea2787e4b73f9667cee43400849a9ae335818137d05c24?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
            alt="Ilustración representativa de desarrollo y bienestar"
            className="object-contain w-full rounded aspect-[0.88]"
          />
        </aside>
      </div>
    </section>
  </>
}

export default Contact