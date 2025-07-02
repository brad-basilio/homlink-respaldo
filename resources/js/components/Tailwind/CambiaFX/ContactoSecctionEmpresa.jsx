import React, { useState } from 'react'

export default function ContactoSecctionEmpresa() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        ruc: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        // Aquí iría la lógica para enviar los datos
    };

    return (
        <section className="w-full bg-primary py-20 px-[5%] font-paragraph">
            <div className=" mx-auto">
                <div className="bg-neutral-dark rounded-3xl overflow-hidden relative">
                    {/* Imagen de fondo a la derecha */}
                    <div className="absolute inset-0 flex">
                        <div className="w-full lg:w-1/2"></div>
                        <div className="hidden lg:block w-1/2 relative">
                            <img 
                                src="/assets/cambiafx/blog-1.png" 
                                alt="Background"
                                className="w-full h-full object-cover "
                            />
                         
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="relative z-10 flex flex-col lg:flex-row">
                        {/* Columna izquierda - Formulario */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-12">
                            <div className="max-w-lg">
                                <div className="uppercase text-white text-sm font-medium tracking-[8%] mb-4">
                                    CONTACTO
                                </div>
                                
                                <h2 className="text-3xl lg:text-[40px] font-medium text-white mb-4 leading-tight">
                                    <span className='font-semibold'>Déjanos</span> tu datos
                                </h2>
                                
                                <p className="text-white text-base mb-8 leading-relaxed">
                                    Nos comunicaremos contigo para ofrecerte información detallada
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Nombre completo */}
                                    <div>
                                        <input
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre completo"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#C6FF6B] text-gray-800 placeholder-gray-500 transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    {/* Email y Teléfono en la misma fila */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Correo electrónico"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#C6FF6B] text-gray-800 placeholder-gray-500 transition-all duration-300"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            name="telefono"
                                            placeholder="Teléfono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#C6FF6B] text-gray-800 placeholder-gray-500 transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    {/* RUC */}
                                    <div>
                                        <input
                                            type="text"
                                            name="ruc"
                                            placeholder="RUC"
                                            value={formData.ruc}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#C6FF6B] text-gray-800 placeholder-gray-500 transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    {/* Botón de envío */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="bg-secondary text-neutral-dark font-medium text-sm px-8 py-4 rounded-full  transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 uppercase tracking-[8%]"
                                        >
                                            ENVIAR DATOS
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                       
                    </div>
                </div>
            </div>
        </section>
    )
}