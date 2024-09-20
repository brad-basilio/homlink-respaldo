import React, { useState } from "react"

const Header = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = ['Inicio', 'Cursos y Talleres', 'Nosotros', 'Blog', 'Contacto']

  return (
    <header className="fixed w-full z-40">
      <div className={`flex justify-between items-center bg-gray-600 ${!isOpen && 'bg-opacity-80'} text-white ps-[5%] border-b`}>
        <div className="py-4">
          <img src="/assets/img/logo.svg" alt="Trasciende Logo" className="h-8" />
        </div>
        <div className="flex">
          <button
            onClick={toggleMenu}
            className="text-white h-16 px-8 border-x"
            aria-label="Toggle menu"
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
          <button className="hidden md:block bg-[#F8B62C] text-black px-8 font-bold">
            CONVERSEMOS
            <i className="fa fa-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-gray-600 text-white z-40 transform ${isOpen ? 'translate-y-16' : '-translate-y-full'
          } transition-transform duration-300 ease-in-out border-t p-[5%] h-[calc(100vh-64px)] md:h-max overflow-y-auto`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="flex flex-col">
              <a href="/" className="text-lg font-bold mb-4 hover:text-[#F8B62C]">
                Inicio
              </a>
              <a href="/courses" className="text-lg font-bold mb-4 hover:text-[#F8B62C]">
                Cursos y talleres
              </a>
              <a href="/about" className="text-lg font-bold mb-4 hover:text-[#F8B62C]">
                Nosotros
              </a>
            </div>
            <div className="flex flex-col">
              <a href="/blogs" className="text-lg font-bold mb-4 hover:text-[#F8B62C]">
                Blog
              </a>
              <a href="/contact" className="text-lg font-bold mb-4 hover:text-[#F8B62C]">
                Contacto
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div>
              <p className="mb-4 text-lg">+51 945 622 983</p>
              <p className="mb-4 text-lg">soporte@trasciende.com</p>
              <p className="mb-4 text-lg">De lunes a viernes - 10 am a 7pm</p>
            </div>
            <div>
              <p className="mb-4">
                Calle Nicanor Rocca de Vergallo
                493 Magdalena del Mar
                Lima -Perú
              </p>
              <div className="flex space-x-4 mt-4">
                <i className="fab fa-instagram text-2xl"></i>
                <i className="fab fa-facebook text-2xl"></i>
                <i className="fab fa-linkedin text-2xl"></i>
                <i className="fab fa-whatsapp text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-[#F8B62C] text-black px-4 py-2 rounded mt-8 font-bold block md:hidden">
          CONVERSEMOS
          <i className="fa fa-arrow-right ms-2"></i>
        </button>
      </div>
    </header>
  )
};

export default Header