import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import JSEncrypt from 'jsencrypt'
import CreateReactScript from './Utils/CreateReactScript'
import AuthRest from './actions/AuthRest'
import ReCAPTCHA from 'react-google-recaptcha'
import { Link } from '@inertiajs/react'
import Swal from 'sweetalert2'
import Global from './Utils/Global'

const Register = ({ PUBLIC_RSA_KEY, RECAPTCHA_SITE_KEY }) => {

  document.title = `Registro | ${Global.APP_NAME}`

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(PUBLIC_RSA_KEY)

  // Estados
  const [loading, setLoading] = useState(true)
  const [captchaValue, setCaptchaValue] = useState(null)
  const [found, setFound] = useState(false)

  // const documentTypeRef = useRef()
  // const documentNumberRef = useRef()
  const roleRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmationRef = useRef()

  useEffect(() => {
    setLoading(false)
  }, [null])

  const onRegisterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)


    const password = passwordRef.current.value
    const confirmation = confirmationRef.current.value

    if (password != confirmation) {
      return Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok'
      })
    }

    if (!captchaValue) return Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'Por favor, complete el captcha',
      confirmButtonText: 'Ok'
    })

    // if (found) return Swal.fire({
    //   icon: 'warning',
    //   title: 'Error',
    //   text: 'El numero de documento ya esta registrado',
    //   confirmButtonText: 'Ok'
    // })

    const request = {
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: jsEncrypt.encrypt(password),
      confirmation: jsEncrypt.encrypt(confirmation),
      captcha: captchaValue,
    }
    const result = await AuthRest.signup(request)
    if (!result) return setLoading(false)

    if (result) location.href = `./confirm-email/${result}`;
    setLoading(false)
  }

  const onDocumentTypeChange = (e) => {
    documentNumberRef.current.value = ''
    setFound(false)
  }

  return (<>
    <div className="account-pages mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="text-center mb-4">
              <Link href="/" className='d-block mb-2'>
                <img src='/assets/img/logo-dark.svg' alt="" className="mx-auto" style={{ height: '40px' }} />
              </Link>
              <b className='mb-4' style={{ color: '#404040', fontSize: 'x-large' }}>¡Ahora puedes ser una Vuá lover!</b>
              <ul className='d-flex flex-wrap justify-content-center gap-x-4 gap-y-0 text-sm'>
                <li><i className='mdi mdi-circle-small'></i> Guarda tus fórmulas únicas</li>
                <li><i className='mdi mdi-circle-small'></i> Beneficios en tu cumpleaños</li>
                <li><i className='mdi mdi-circle-small'></i> Recibe las promos del mes primero</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h4 className="text-uppercase mt-0 font-bold">Registrate</h4>
                </div>
                <form onSubmit={onRegisterSubmit} className='row'>
                  <div className="col-sm-6 mb-2">
                    <label htmlFor="name" className="form-label">Nombres <b className="text-danger">*</b></label>
                    <input ref={nameRef} className="form-control" type="text" id="name" placeholder="Ingrese su nombre"
                      required />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label htmlFor="lastname" className="form-label">Apellidos <b className="text-danger">*</b></label>
                    <input ref={lastnameRef} className="form-control" type="text" id="lastname" placeholder="Ingrese sus apellidos"
                      required />
                  </div>
                  <div className="col-12 mb-2">
                    <label htmlFor="email" className="form-label">Correo electronico <b className="text-danger">*</b></label>
                    <input ref={emailRef} className="form-control" type="email" id="email" required
                      placeholder="Ingrese su correo electronico" />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label htmlFor="password" className="form-label">Contraseña <b className="text-danger">*</b></label>
                    <input ref={passwordRef} className="form-control" type="password" required id="password"
                      placeholder="Ingrese su contraseña" />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="confirmation" className="form-label">Confirmacion <b className="text-danger">*</b></label>
                    <input ref={confirmationRef} className="form-control" type="password" required id="confirmation"
                      placeholder="Confirme su contraseña" />
                  </div>
                  <ReCAPTCHA className='m-auto mb-3' sitekey={RECAPTCHA_SITE_KEY} onChange={setCaptchaValue} style={{ display: "block", width: 'max-content' }} />
                  <div className="mb-0 text-center d-grid">
                    <button className="btn btn-pink" type="submit" disabled={loading} style={{ backgroundColor: '#A191B8', borderColor: '#A191B8' }}>
                      {loading ? <>
                        <i className='fa fa-spinner fa-spin'></i> Verificando
                      </> : 'Registrarme'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-center">
                <p className="">Ya tienes una cuenta? <Link href="/login"
                  className="ms-1"><b>Iniciar sesion</b></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Register {...properties} />);
})