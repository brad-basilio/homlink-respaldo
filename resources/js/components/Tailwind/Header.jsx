import React from "react"
import logo from '../../Svg/logo.svg'

const Header = ({ items, session }) => {
  return (
    <>
      <nav className="bg-[#05455A] fixed w-full z-30 top-0 start-0 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Net Coaching Logo" />
          </a>
          <div className="flex gap-4 md:order-2 rtl:space-x-reverse items-center">
            <a
              href="/login"
              className="font-semibold block text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#ef4444] md:p-0"
            >
              {
                session
                  ? <div className="flex items-center gap-2">
                    <img src={`/api/profile/thumbnail/${session.uuid}`} className="w-8 h-8 rounded-full aspect-square object-cover object-center"></img>
                    <span className="flex flex-col">
                      Dashboard
                      <span className="text-xs font-thin -mt-1">{session.name.split(' ')[0]} {session.lastname.split(' ')[0]}</span>
                    </span>
                  </div>
                  : 'Empezar'
              }
            </a>
            <button
              type="button"
              className="text-white bg-[#ef4444] hover:bg-[#d43b3b] focus:ring-4 focus:outline-none focus:ring-[#d43b3ba5] font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              <i className="fa fa-search"></i>
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <i className="fa fa-bars"></i>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              {items.map((item, i) => (
                <li key={`item-${i}`}>
                  <a
                    href={item.ref}
                    className={`block py-2 px-3 rounded md:p-0 font-semibold ${location.pathname == item.ref
                      ? 'text-white md:bg-transparent md:text-[#ef4444] bg-[#ef4444]'
                      : 'text-gray-900 hover:bg-gray-100 md:text-white md:hover:bg-transparent md:hover:text-[#ef4444]'
                      }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header