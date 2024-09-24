import React from "react"
import { MapPin, Phone, Clock } from 'lucide-react';

const ContactItem = ({ icon: Icon, title, children }) => (
  <div className="bg-slate-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
    <Icon className="w-8 h-8 text-[#F8B62C] mb-4" />
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <div className="text-sm text-gray-600">{children}</div>
  </div>
);

const Address = () => {
  return <>
    <div className="w-full max-w-7xl mx-auto p-[5%] mt-16 font-sans">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          ¡Siempre estamos <span className="text-pink-600">pendiente</span> de usted!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Puede llamarnos en horario laboral o visitar nuestra oficina. Todos los correos electrónicos recibirán respuesta en un plazo de 24 horas. ¡Nos encantaría saber de usted!
        </p>
      </div>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <ContactItem icon={MapPin} title="Dirección">
            <p>No. 1259 Av. Aviación,</p>
            <p>San Borja, Lima - Perú</p>
          </ContactItem>

          <ContactItem icon={Phone} title="Contacto">
            <p>Móvil: (+51) 987 654 321</p>
            <p>Móvil: (+51) 985 232 746</p>
            <p>Correo: hola@mail.com</p>
          </ContactItem>

          <ContactItem icon={Clock} title="Horario de Funcionamiento">
            <p>Lunes – Viernes: 09:00 – 20:00</p>
            <p>Sábado y Domingo: 10:30 – 22:00</p>
          </ContactItem>
        </div>

        <div className="w-full md:w-2/3 px-4">
          <div className="relative w-full h-0 pb-[75%] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.980507722344!2d-77.00762542696805!3d-12.110186145815626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7f6ef339a21%3A0x9a8f0cea4a6c13e9!2sAv.%20Aviaci%C3%B3n%201259%2C%20San%20Borja%2015037%2C%20Peru!5e0!3m2!1sen!2sus!4v1695569311439!5m2!1sen!2sus"
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Address