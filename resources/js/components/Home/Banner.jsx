import React, { useRef, useState } from "react"
import SubscriptionsRest from "@Rest/SubscriptionsRest"
import Swal from "sweetalert2";

const subscriptionsRest = new SubscriptionsRest();

const Banner = () => {
  const emailRef = useRef()

  const [saving, setSaving] = useState()

  const onEmailSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    const request = {
      email: emailRef.current.value
    }
    const result = await subscriptionsRest.save(request);
    setSaving(false)

    if (!result) return

    Swal.fire({
      title: '¡Éxito!',
      text: 'Te has suscrito correctamente al blog de Net Coaching.',
      icon: 'success',
      confirmButtonText: 'Ok'
    })

    emailRef.current.value = null
  }

  return <>
    <section className="p-[5%]">
      <div className='flex relative flex-col justify-center items-center px-20 py-16 min-h-[421px] max-md:px-5 max-md:mt-10'>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/77949e2ea46912c14e03091f78ef8591a8c17802fdab4a09f105347cc3b5b08b?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" className="object-cover absolute inset-0 size-full rounded-lg select-none" alt="" />
        <div className="flex relative flex-col items-center max-w-full w-[628px]">
          <div className="flex flex-col w-full text-center text-white">
            <h2 className="text-4xl font-bold leading-10 max-md:max-w-full">
              ¡Únete a Nuestro Viaje de Desarrollo! Suscríbete al Blog Net Coaching
            </h2>
            <p className="mt-6 text-base leading-6 max-md:max-w-full">
              Al suscribirte a nuestro blog, te convertirás en parte de una comunidad apasionada por el desarrollo humano y el bienestar. Recibirás regularmente consejos, historias inspiradoras y recursos exclusivos para impulsar tu crecimiento.
            </p>
          </div>
          <form className="flex flex-nowrap gap-2.5 justify-center items-center px-2.5 py-2 mt-10 max-w-full text-base rounded-xl border border-white border-solid w-[557px]" onSubmit={onEmailSubmit}>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="outline-none flex-1 shrink gap-2.5 self-stretch px-3 py-4 my-auto leading-snug text-center text-white basis-6 bg-transparent"
              placeholder="Déjanos tu correo"
              required
            />
            <button className='flex gap-2 justify-center items-center px-6 py-4 text-base leading-tight bg-red-500 rounded-lg text-zinc-100 disabled:bg-red-300 disabled:cursor-not-allowed' disabled={saving}>
              <span className="hidden md:block">Suscríbete</span>
              <i className='far fa-handshake'></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  </>
}

export default Banner