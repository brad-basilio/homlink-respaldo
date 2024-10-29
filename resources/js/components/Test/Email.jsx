import React, { useRef } from "react";
import Swal from "sweetalert2";
import UserFormulasRest from "../../Actions/UserFormulasRest";
import { Local } from "sode-extend-react";

const userFormulasRest = new UserFormulasRest()

const Email = ({ test, setTest }) => {

  const emailRef = useRef()

  const onEmailSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value?.trim()
    if (!email) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, ingresa tu correo electrónico'
      })
    }

    const result = await userFormulasRest.save({
      ...test,
      email: emailRef.current.value
    });

    if (!result) return
    Local.delete('test')
    location.href = `/test/result/${result.data.id}`;
    setTest({})
  }

  return <section className="p-[5%] py-[15%] md:py-[10%] lg:py-[5%] bg-white text-center text-[#404040]">
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">¡Por último, para enviárte tu fórmula <br /> personalizada déjanos <b>tu correo!</b></h1>
      <p className="mb-4">y recibe 10% off con un código exclusivo para ti 🤫</p>
      <form className="relative" onSubmit={onEmailSubmit}>
        <input ref={emailRef} className="border text-center border-[#9577B9] text-[#9577B9] bg-white text-sm rounded-full w-full px-5 py-2.5 outline-none" type="email" placeholder="ESCRIBE AQUÍ" required />
        <button className="absolute top-1/2 -translate-y-1/2 right-3 w-6 h-6 bg-[#A191B8] text-white font-bold rounded-full" type="submit">
          <i className="mdi mdi-arrow-right"></i>
        </button>
      </form>
    </div>
  </section>
}

export default Email