import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useRef } from "react"

const Header = ({ socials, generals }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = (event) => {
    if (event.target.closest('.menu-toggle')) {
      setIsOpen(!isOpen)
    } else {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <>
      <div className="text-center px-[5%] py-4 bg-[#A191B8] text-white text-sm">
        ¡SUSCRÍBETE A CLUB VUÁ Y OBTÉN <b>ENVÍO GRATIS<br className="md:hidden" />
          A TODO LIMA METROPOLITANA!</b>
      </div>
      <header className="sticky top-0 w-screen z-40">
        <div className={`flex justify-between items-center bg-gradient-to-r from-[#c4b8d3] to-[#dbc8c9] ${!isOpen && location.pathname == '/' && 'bg-opacity-80'} text-white pe-[5%]`}>
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white h-16 w-16 px-6 menu-toggle"
              aria-label="Toggle menu"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
            <a href="/">
              <img src="/assets/img/logo.svg" alt="Trasciende Logo" className="h-8 -mt-3.5" />
            </a>
          </div>
          <div className="py-6 flex gap-2">
            <button className="rounded-full px-3 py-2 bg-white text-[#A191B8] text-sm">CREA TU FORMULA</button>
            <button>
              <i className="text-xl fa fa-user"></i>
            </button>
            <button>
              <i className="text-xl fas fa-shopping-cart"></i>
            </button>
          </div>

        </div>
        <div
          ref={menuRef}
          className={`absolute top-full inset-0 bg-gradient-to-r from-[#c4b8d3] to-[#dbc8c9] text-white z-40 transform ${isOpen ? 'opacity-1' : 'hidden opacity-0'} transition-transform duration-300 ease-in-out p-[5%] h-max overflow-y-auto`}>
          <ul className="flex flex-col gap-4 items-center justify-center">
            <li>
              <a href="/about">NOSOTROS</a>
            </li>
            <li>
              <a href="/supplies">NUESTROS INGREDIENTES</a>
            </li>
            <li>
              <a href="/subscribe">SUBSCRIPCION</a>
            </li>
            <li>
              <a href="/faqs">Q&A</a>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
};

export default Header