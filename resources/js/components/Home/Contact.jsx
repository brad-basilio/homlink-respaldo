import React, { useRef, useState } from "react"
import MessagesRest from "@Rest/MessagesRest"
import Swal from "sweetalert2"

const messagesRest = new MessagesRest()

const Contact = () => {
  const nameRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()
  const subjectRef = useRef()
  const descriptionRef = useRef()

  const [sending, setSending] = useState(false);

  const inputFields = [
    { label: 'Nombre completo', placeholder: 'Nombre y apellido', type: 'text', required: true, ref: nameRef },
    { label: 'WhatsApp', placeholder: '+51 999 999 999', type: 'tel', required: true, ref: phoneRef },
    { label: 'Correo electrónico', placeholder: 'hola@mail.com', type: 'email', required: false, ref: emailRef },
    { label: 'Asunto', placeholder: 'Asunto', type: 'text', required: true, ref: subjectRef },
  ];

  const onMessageSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const request = {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      description: descriptionRef.current.value
    }

    const result = await messagesRest.save(request);
    setSending(false)

    if (!result) return

    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado',
      text: 'Tu mensaje ha sido enviado correctamente. ¡Nos pondremos en contacto contigo pronto!',
      showConfirmButton: false,
      timer: 3000
    })

    nameRef.current.value = null
    phoneRef.current.value = null
    emailRef.current.value =null
    subjectRef.current.value = null
    descriptionRef.current.value = null
  }

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

          <form className="w-full text-sm mt-8" onSubmit={onMessageSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {inputFields.map((field, index) => (
                <div key={index} className="w-full">
                  <label className="leading-snug text-teal-950">
                    {field.label} {
                      field.required && <span className="font-bold text-red-500">*</span>
                    }
                  </label>
                  <input
                    ref={field.ref}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="p-4 mt-1 w-full font-medium leading-tight bg-white rounded-lg border border-solid border-zinc-200 text-teal-950 outline-none"
                    aria-label={field.label}
                    required={field.required}
                    disabled={sending}
                  />
                </div>
              ))}

              <div className="md:col-span-2 w-full">
                <label className="leading-snug text-teal-950">Mensaje <span className="font-bold text-red-500">*</span></label>
                <textarea
                  ref={descriptionRef}
                  placeholder="Hola..."
                  className="flex-1 p-4 mt-1 min-h-[90px] [field-sizing:content] font-medium leading-tight bg-white rounded-lg border border-solid border-zinc-200 text-teal-950 outline-none w-full"
                  aria-label="Mensaje"
                  required
                  disabled={sending}
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex gap-2 justify-center items-center self-start px-6 py-4 mt-14 text-base font-bold leading-tight bg-red-500 rounded-lg text-zinc-100 max-md:mt-10 disabled:bg-red-300 disabled:cursor-not-allowed"
              disabled={sending}
            >
              <span className="my-auto">¡No esperes más, únete a nosotros!</span>
              <i className="fas fa-envelope ms-1"></i>
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