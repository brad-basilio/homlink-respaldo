import React from 'react';
import { Mail, User, MessageSquare, ArrowUpRight } from 'lucide-react';

const ContactForm = () => {
  return (
    <div className="w-full bg-slate-100 ">
      <div className="w-full max-w-[1280px] p-[5%] mx-auto">
        <h2 className="text-2xl font-medium text-[#2B384F] mb-4">
          Pregúntanos cualquier cosa aquí
        </h2>
        <div className="flex flex-col space-y-6 text-sm text-[#2E405E]">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex items-center bg-white rounded w-full">
              <User className="ml-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Nombre completo"
                className="flex-grow p-4 outline-none w-full"
              />
            </div>
            <div className="flex items-center bg-white rounded w-full">
              <Mail className="ml-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="flex-grow p-4 outline-none w-full"
              />
            </div>
          </div>
          <div className="flex items-center bg-white rounded w-full">
            <MessageSquare className="ml-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Asunto"
              className="flex-grow p-4 outline-none w-full"
            />
          </div>
          <div className="flex items-start bg-white rounded w-full">
            <MessageSquare className="ml-3 mt-3 text-gray-400" size={20} />
            <textarea
              placeholder="Mensaje"
              className="flex-grow p-4 outline-none w-full min-h-[100px]"
              style={{ fieldSizing: 'content' }}
            />
          </div>
        </div>
      <button className="flex items-center justify-center gap-2 mt-8 px-6 py-4 text-base font-medium text-white uppercase rounded-full bg-[#2E405E] hover:bg-[#3A516E] transition-colors duration-300 w-max">
        <span>enviar mensaje</span>
        <ArrowUpRight size={20} />
      </button>
      </div>
    </div>
  );
};

export default ContactForm;
