import React from "react"
import logo from '../Svg/logo.svg'

const Base = ({ children, ...properties }) => {

  const menuItems = [
    'Nosotros',
    'Coaches',
    'Programas & Eventos',
    'Beneficios',
  ];

  const policyItems = [
    'Políticas de uso',
    'Políticas de privacidad'
  ];

  const contactInfo = [
    { type: 'phone', value: '+51 948 681 429' },
    { type: 'email', value: 'info@netcoaching.services' }
  ];

  const socialIcons = [
    { icon: 'fab fa-facebook-f', label: 'Facebook' },
    { icon: 'fab fa-twitter', label: 'Twitter' },
    { icon: 'fab fa-instagram', label: 'Instagram' }
  ];

  return <>
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
        </a>
        <div className="flex gap-4 md:order-2 rtl:space-x-reverse items-center">
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            Empezar
          </a>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <i className="fa fa-search"></i>
          </button>
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <i className="fa fa-bars"></i>
            {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg> */}
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Coaches
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Programas & Eventos
              </a>
            </li>
            {/* <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Blog
              </a>
            </li> */}
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Beneficios
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {children}

    <footer className="flex flex-col px-20 py-14 bg-cyan-900 max-md:px-5">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full text-gray-50 max-md:max-w-full">
        <div className="flex flex-col text-sm leading-5 min-w-[240px] w-[326px] max-sm:m-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a57e7c90e6798f74c1c4ffc59e953c34bd50720aa58f80aad6af19bc11334c86?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
            alt="Net Coaching Logo"
            className="object-contain max-w-full aspect-[8.93] w-[214px] max-sm:mx-auto"
          />
          <p className="mt-4 max-sm:mx-auto text-center md:text-start">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut interdum tortor ac ornare commodo.
          </p>
        </div>
        <div className="flex flex-wrap gap-10 justify-center md:justify-between items-start min-w-[240px] w-[560px] max-md:max-w-full max-sm:mx-auto">
          <nav className="flex flex-col w-40 text-center md:text-start">
            <h2 className="text-base font-bold leading-tight">Menú</h2>
            <ul className="flex flex-col mt-4 w-full text-sm leading-snug">
              {menuItems.map((item, index) => (
                <li key={index} className={index > 0 ? 'mt-1' : ''}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
          <section className="flex flex-col w-40 text-center md:text-start">
            <h2 className="text-base font-bold leading-tight">Políticas</h2>
            <ul className="flex flex-col mt-4 w-full text-sm leading-snug">
              {policyItems.map((item, index) => (
                <li key={index} className={index > 0 ? 'mt-1' : ''}>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col w-40 text-center md:text-start">
            <h2 className="text-base font-bold leading-tight">Contacto</h2>
            <ul className="flex flex-col mt-4 w-full text-sm leading-snug">
              {contactInfo.map((info, index) => (
                <li key={index} className={index > 0 ? 'mt-1' : ''}>
                  {info.type === 'phone' ? (
                    <a href={`tel:${info.value.replace(/\s/g, '')}`} className="hover:underline">{info.value}</a>
                  ) : (
                    <a href={`mailto:${info.value}`} className="hover:underline text-wrap">{info.value}</a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <hr className="mt-10 w-full border-gray-50 max-md:max-w-full" />
      <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
        <p className="self-stretch my-auto text-sm font-medium leading-tight text-gray-50 max-sm:mx-auto text-center">
          Donec varius pulvinar gravida. Etiam ut venenatis enim
        </p>
        <div className="flex gap-4 items-start self-stretch my-auto max-sm:mx-auto">
          {socialIcons.map((icon, index) => (
            <a
              href="#"
              key={index}
              className="focus:outline-none focus:ring-2 focus:ring-gray-50 rounded-full p-2"
              aria-label={icon.label}
            >
              <i className={`${icon.icon} text-gray-50 w-6 h-6`} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  </>
}

export default Base
