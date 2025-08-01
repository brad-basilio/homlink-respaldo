import { Link } from '@inertiajs/react'
import JSEncrypt from 'jsencrypt'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ReCAPTCHA from 'react-google-recaptcha'
import Swal from 'sweetalert2'
import CreateReactScript from './Utils/CreateReactScript'
import Global from './Utils/Global'
import AuthRest from './actions/AuthRest'

const Register = ({ PUBLIC_RSA_KEY, RECAPTCHA_SITE_KEY }) => {

  document.title = `Registro | ${Global.APP_NAME}`

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(PUBLIC_RSA_KEY)

  // Estados
  const [loading, setLoading] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    document: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onRegisterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!captchaValue) {
      setLoading(false)
      return Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Por favor, complete el captcha',
        confirmButtonText: 'Ok'
      })
    }

    if (formData.password !== formData.confirmPassword) {
      setLoading(false)
      return Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok'
      })
    }

    console.log('Submitting with captcha:', captchaValue);

    const request = {
      name: formData.fullName.split(' ')[0] || '',
      lastname: formData.fullName.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      phone: formData.phone,
      document: formData.document,
      password: jsEncrypt.encrypt(formData.password),
      confirmation: jsEncrypt.encrypt(formData.confirmPassword),
      captcha: captchaValue
    }

    console.log('Request payload:', { ...request, password: '[ENCRYPTED]', confirmation: '[ENCRYPTED]' });

    const result = await AuthRest.signup(request)
    if (!result) return setLoading(false)

    if (result) {
      // Mostrar mensaje de éxito
      await Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada exitosamente!',
        text: 'Bienvenido a nuestra plataforma',
        confirmButtonText: 'Continuar',
        timer: 2000
      });
      
      // Redirigir a la página principal
      location.href = '/';
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Contenedor principal - Tarjeta centrada */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex min-h-[700px]">
          {/* Panel izquierdo - Formulario */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-full max-w-sm mx-auto">
              {/* Logo */}
              <div className="mb-8">
                <div className="flex items-center">
                  <a href="/">
                    <img



                      src="/assets/img/logo.svg"
                      alt={Global.APP_NAME}
                      className="object-cover object-top h-12 max-h-12 w-auto sm:h-12 sm:max-h-12 transition-all duration-300"
                    />
                  </a>
                </div>
              </div>

              {/* Título */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Crear cuenta
                </h2>
                <p className="text-sm text-gray-500">
                  Aliquam quis lectus aliquam, bibendum urna vel
                </p>
              </div>

              {/* Formulario */}
              <form className="space-y-4" onSubmit={onRegisterSubmit}>
                {/* Campo Nombre completo */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nombre y Apellido"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>

                {/* Campo Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hola@mail.com"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>

                {/* Campo Celular */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Celular
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(+51)"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>

                {/* Campo Documento */}
                <div>
                  <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
                    Documento (DNI, RUC, CE o Pasaporte)
                  </label>
                  <input
                    id="document"
                    name="document"
                    type="text"
                    required
                    value={formData.document}
                    onChange={handleChange}
                    placeholder="Ej: E-23485"
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>

                {/* Campo Contraseña */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="appearance-none block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Campo Confirmar Contraseña */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="appearance-none block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center py-4">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(value) => {
                      console.log('reCAPTCHA value:', value);
                      setCaptchaValue(value);
                    }}
                    onExpired={() => {
                      console.log('reCAPTCHA expired');
                      setCaptchaValue(null);
                    }}
                    onError={(error) => {
                      console.log('reCAPTCHA error:', error);
                      setCaptchaValue(null);
                    }}
                  />
                </div>

                {/* Botón de registro */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? "Creando cuenta..." : "Crear cuenta"}
                  </button>
                </div>

                {/* Ya tienes cuenta */}
                <div className="text-center pt-4">
                  <span className="text-sm text-gray-600">
                    ¿Ya tienes una cuenta? Ingresa{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                      aquí
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Panel derecho - Imagen y testimonial */}
          <div className="hidden lg:block flex-1 relative">
            <div className="absolute inset-0 rounded-r-3xl overflow-hidden">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://i.ibb.co/9mjrtNR3/image-34.png"
                alt="Persona trabajando"
                onError={(e) => {
                  console.log('Error loading image:', e.target.src);
                  e.target.src = '/assets/cambiafx/nosotros.png'; // Fallback image
                }}
                onLoad={() => console.log('Image loaded successfully')}
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>

              {/* Testimonial */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <blockquote className="text-lg font-medium mb-4 leading-relaxed">
                  "Fusce tristique dolor nec diam facilisis, quis hendrerit magna posuere. Nam lectus libero, commodo ut neque vel."
                </blockquote>
                <div>
                  <div className="font-semibold text-lg">Carla Paretto</div>
                  <div className="text-sm opacity-80">Lima</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Register {...properties} />);
})