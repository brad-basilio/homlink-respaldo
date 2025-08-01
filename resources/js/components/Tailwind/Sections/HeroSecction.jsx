
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import TextWithHighlight from '../../../Utils/TextWithHighlight';
import { MapPin, Home, Users, Calendar, Camera, CheckCircle } from 'lucide-react';

export default function HeroSecction({ data = [], apps = [], indicators = [] }) {
    const [activeStep, setActiveStep] = useState(0);
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [guests, setGuests] = useState(1);
    const [loopKey, setLoopKey] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('buscar'); // 'buscar' o 'anunciar'

    // Pasos del proceso de anunciar propiedad
    const propertySteps = [
        {
            id: 1,
            title: "Tipo de alojamiento",
            description: "Selecciona qué tipo de propiedad ofreces",
            icon: Home,
            options: [
                { id: 'casa', label: 'Casa: Alojamiento entero', description: 'Nulla eros eleifend risus, id vulputate metus quam nec metus. Aenean eget...' },
                { id: 'habitacion', label: 'Una habitación', description: 'Cras suscipit, neque non consequat commodo, nulla eros eleifend risus, id...' },
                { id: 'compartida', label: 'Habitación compartida', description: 'Cras suscipit, neque non consequat commodo, nulla eros eleifend risus, id...' },
                { id: 'otros', label: 'Otros', description: 'Nulla eros eleifend risus, id vulputate metus quam nec metus. Aenean eget...' }
            ]
        },
        {
            id: 2,
            title: "Ubicación",
            description: "Confirma la dirección de tu alojamiento",
            icon: MapPin,
            fields: [
                { name: 'country', label: 'País/Región', value: 'Perú', type: 'select' },
                { name: 'address', label: 'Dirección', placeholder: 'Ej: Av. Del Aire', type: 'text' },
                { name: 'apartment', label: 'Departamento, piso, etc', placeholder: 'Si corresponde', type: 'text' },
                { name: 'district', label: 'Distrito', placeholder: 'Elegir distrito', type: 'select' },
                { name: 'postal', label: 'Código postal', placeholder: 'Ej: 93535', type: 'text' },
                { name: 'state', label: 'Departamento/estado/provincia', value: 'Provincia de Lima', type: 'text' }
            ]
        },
        {
            id: 3,
            title: "Descripción",
            description: "Describe tu alojamiento",
            icon: Camera,
            fields: [
                { name: 'link', label: 'Link de tu anuncio', placeholder: 'Ej: www.arbnb/miraflores/lima/peru/id24253538.com.pe', type: 'text' },
                { name: 'description', label: 'Describe tu alojamiento', placeholder: 'Mi alojamiento...', type: 'textarea' }
            ]
        },
        {
            id: 4,
            title: "Datos básicos",
            description: "Información sobre tu espacio",
            icon: Users,
            counters: [
                { name: 'guests', label: 'Huéspedes', value: 4 },
                { name: 'bedrooms', label: 'Habitaciones', value: 1 },
                { name: 'beds', label: 'Camas', value: 1 },
                { name: 'bathrooms', label: 'Baños', value: 1 }
            ]
        },
        {
            id: 5,
            title: "Comodidades",
            description: "Comodidades de tu alojamiento",
            icon: CheckCircle,
            amenities: [
                { id: 'wifi', label: 'Wifi', checked: true },
                { id: 'tv', label: 'TV', checked: true },
                { id: 'kitchen', label: 'Cocina', checked: true },
                { id: 'washing', label: 'Lavadora', checked: false },
                { id: 'parking', label: 'Estacionamiento gratis', checked: false },
                { id: 'ac', label: 'Aire condicionado', checked: true }
            ]
        }
    ];

    // Colores que van a rotar para las palabras con asterisco
    const colors = ['text-neutral-dark', 'text-constrast'];

    const TextWithColors = ({ text, className = '' }) => {
        if (!text) return null;
        const lines = text.split(',');

        return (
            <div className={`${className} flex flex-col`}>
                {lines.map((line, lineIndex) => {
                    const parts = line.trim().split(/(\*[^*]+\*)/g);
                    return (
                        <motion.span
                            key={lineIndex}
                            className="block"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: lineIndex * 0.2, duration: 0.5 }}
                        >
                            {parts.map((part, partIndex) => {
                                if (part.startsWith("*") && part.endsWith("*")) {
                                    return (
                                        <motion.span
                                            key={`${lineIndex}-${partIndex}-${colorIndex}`}
                                            className={`${colors[colorIndex]} font-bold relative`}
                                            initial={{ opacity: 0.7, scale: 0.98 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                transition: {
                                                    duration: 0.6,
                                                    ease: "easeInOut",
                                                    type: "spring",
                                                    stiffness: 150
                                                }
                                            }}
                                        >
                                            {part.slice(1, -1)}
                                        </motion.span>
                                    );
                                }
                                return <span key={partIndex}>{part}</span>;
                            })}
                        </motion.span>
                    );
                })}
            </div>
        );
    };

    // Variantes de animación más suaves y elegantes con loop
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] // easing más natural
            }
        }
    };

    // Variantes para el texto principal con loop
    const textLoopVariants = {
        hidden: {
            opacity: 0,
            x: -50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: 50,
            scale: 0.95,
            transition: {
                duration: 0.8,
                ease: "easeIn"
            }
        }
    };

    // Variantes para apps con loop en desktop
    const appsLoopVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -30,
            scale: 0.8,
            transition: {
                duration: 0.5,
                ease: "easeIn"
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3
            }
        }
    };

    const handleOperationStart = (operationData) => {
        // Redirigir a la página de contacto
        window.location.href = '/contacto';
    };

    const nextStep = () => {
        if (activeStep < 5) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const renderStepContent = (step) => {
        const currentStep = propertySteps[step];

        switch (currentStep.id) {
            case 1: // Tipo de alojamiento
                return (
                    <div className="space-y-4">
                        {currentStep.options.map((option, index) => (
                            <motion.div
                                key={option.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-red-500 transition-colors"
                                onClick={() => setPropertyType(option.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Home className="w-5 h-5 text-gray-600" />
                                            <h4 className="font-semibold text-gray-900">{option.label}</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">{option.description}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 ${propertyType === option.id ? 'border-red-500 bg-red-500' : 'border-gray-300'}`}>
                                        {propertyType === option.id && <div className="w-2 h-2 bg-white rounded-full m-1"></div>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 2: // Ubicación
                return (
                    <div className="space-y-4">
                        {/* País/Región */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0 * 0.1 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                País/Región
                            </label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                                <option>Perú</option>
                            </select>
                        </motion.div>

                        {/* Dirección */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 * 0.1 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Dirección
                            </label>
                            <input
                                type="text"
                                placeholder="Ej: Av. Del Aire"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </motion.div>

                        {/* Departamento/piso y Distrito en la misma fila */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 * 0.1 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Departamento, piso, etc
                                </label>
                                <input
                                    type="text"
                                    placeholder="Si corresponde"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Distrito
                                </label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                                    <option>Elegir distrito</option>
                                </select>
                            </div>
                        </motion.div>

                        {/* Código postal y Departamento/estado en la misma fila */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3 * 0.1 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Código postal
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej: 93535"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Departamento/estado/provincia
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Provincia de Lima"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                        </motion.div>
                    </div>
                );

            case 3: // Descripción
                return (
                    <div className="space-y-4">
                        {currentStep.fields.map((field, index) => (
                            <motion.div
                                key={field.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {field.label}
                                </label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        placeholder={field.placeholder}
                                        rows={4}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    ></textarea>
                                ) : (
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                )}
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                        >
                            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600">
                                <span className="font-medium">Imágenes (Formatos compatibles: JPEG y/o PNG)</span>
                                <br />
                                Arrastre y suelte archivos o <span className="text-blue-500 underline cursor-pointer">explore</span>
                            </p>
                        </motion.div>
                    </div>
                );

            case 4: // Datos básicos
                return (
                    <div className="space-y-6">
                        {currentStep.counters.map((counter, index) => (
                            <motion.div
                                key={counter.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between py-4 border-b border-gray-200"
                            >
                                <span className="font-medium text-gray-900">{counter.label}</span>
                                <div className="flex items-center gap-4">
                                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-red-500 transition-colors">
                                        <span className="text-gray-600">−</span>
                                    </button>
                                    <span className="w-8 text-center font-medium">{counter.value}</span>
                                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-red-500 transition-colors">
                                        <span className="text-gray-600">+</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 5: // Comodidades
                return (
                    <div className="grid grid-cols-2 gap-4">
                        {currentStep.amenities.map((amenity, index) => (
                            <motion.div
                                key={amenity.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:border-gray-300 transition-colors"
                            >
                                <label className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 text-gray-700">
                                            {amenity.id === 'wifi' && (
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                                </svg>
                                            )}
                                            {amenity.id === 'tv' && (
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {amenity.id === 'kitchen' && (
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            )}
                                            {amenity.id === 'washing' && (
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            )}
                                            {amenity.id === 'parking' && (
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                                </svg>
                                            )}
                                            {amenity.id === 'ac' && (
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="font-semibold text-gray-900">{amenity.label}</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        defaultChecked={amenity.checked}
                                        className="w-5 h-5 bg-gray-100 border-gray-300 rounded focus:ring-2 custom-secondary-checkbox"
                                    />
                                </label>
                            </motion.div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };
    return (
        <motion.section
            className="bg-white font-title relative overflow-hidden min-h-[600px] md:min-h-[700px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            {/* Imagen de fondo */}
            <div className="absolute inset-0 z-0">
                <img
                    src={`/api/landing_home/media/${data?.image}`}
                    alt="Fondo de propiedades"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 px-[5%] flex justify-start items-center min-h-[600px] md:min-h-[700px] py-8">
                {/* Card único centrado */}
                <motion.div
                    className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 max-w-lg w-full"
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Tabs */}
                    <div className="flex bg-gray-100 rounded-full p-1 mb-6">
                        <button
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all ${activeTab === 'buscar'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600'
                                }`}
                            onClick={() => setActiveTab('buscar')}
                        >
                            Buscar propiedad
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all ${activeTab === 'anunciar'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600'
                                }`}
                            onClick={() => setActiveTab('anunciar')}
                        >
                            Anunciar propiedad
                        </button>
                    </div>

                    {/* Contenido dinámico según el tab activo */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'buscar' ? (
                            // Formulario de búsqueda
                            <>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                                    Alquila una casa<br />
                                    para llamarla suya
                                </h2>

                                <div className="space-y-4">
                                    {/* Campo Destino */}
                                    <div className="relative">
                                        <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <MapPin className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" />
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-900 mb-1">Destino</div>
                                                <input
                                                    type="text"
                                                    placeholder="Buscar por ciudad"
                                                    className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none text-base"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fechas */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <Calendar className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-gray-900 mb-1">Llegada</div>
                                                    <input
                                                        type="text"
                                                        placeholder="Agregar fecha"
                                                        className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none text-base"
                                                    />
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <Calendar className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-gray-900 mb-1">Salida</div>
                                                    <input
                                                        type="text"
                                                        placeholder="Agregar fecha"
                                                        className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none text-base"
                                                    />
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Huéspedes */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <Users className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-gray-900 mb-1">N. Adultos</div>
                                                    <input
                                                        type="text"
                                                        placeholder="¿Cuántos?"
                                                        className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none text-base"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <svg className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-gray-900 mb-1">N. Niños</div>
                                                    <input
                                                        type="text"
                                                        placeholder="¿Cuántos?"
                                                        className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none text-base"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botón de búsqueda */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-lg mt-6"
                                    >
                                        Buscar destino
                                    </motion.button>
                                </div>
                            </>
                        ) : (
                            // Formulario de anunciar propiedad
                            <>
                                {activeStep === 5 ? (
                                    // Paso 6: Información recibida con éxito
                                    <div className="text-center">
                                        <div className="mb-6">
                                            <img
                                                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                                alt="Mujer feliz usando teléfono"
                                                className="w-full h-48 object-cover rounded-xl mb-6"
                                            />
                                        </div>

                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                            Información recibida<br />
                                            con éxito
                                        </h2>

                                        <p className="text-gray-600 mb-8 leading-relaxed">
                                            Donec et porttitor massa. Phasellus eu scelerisque arcu, at posuere justo. Sed et porta
                                            turpis. Phasellus ac ipsum et augue mollis suscipit a eu quam.
                                        </p>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-full transition-colors duration-200 text-lg"
                                        >
                                            Ver alojamientos
                                        </motion.button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Título del paso */}
                                        <h2 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
                                            {activeStep === 0 && "Tipo de alojamiento para ofrecer"}
                                            {activeStep === 1 && "Confirma la dirección de tu alojamiento"}
                                            {activeStep === 2 && "Describe tu alojamiento"}
                                            {activeStep === 3 && "Datos básicos sobre tu espacio"}
                                            {activeStep === 4 && "Comodidades de tu alojamiento"}
                                        </h2>

                                        {/* Contenido del paso */}
                                        <div className="mb-8">
                                            {activeStep === 0 && (
                                                // Paso 1: Tipo de alojamiento
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${propertyType === 'casa' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                                        onClick={() => setPropertyType('casa')}
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <Home className="w-6 h-6 text-gray-700" />
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${propertyType === 'casa' ? 'border-red-500' : 'border-gray-300'}`}>
                                                                {propertyType === 'casa' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                                                            </div>
                                                        </div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Casa: Alojamiento entero</h3>
                                                        <p className="text-sm text-gray-600">Nulla eros eleifend risus, id vulputate metus quam nec metus. Aenean eget...</p>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${propertyType === 'habitacion' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                                        onClick={() => setPropertyType('habitacion')}
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${propertyType === 'habitacion' ? 'border-red-500' : 'border-gray-300'}`}>
                                                                {propertyType === 'habitacion' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                                                            </div>
                                                        </div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Una habitación</h3>
                                                        <p className="text-sm text-gray-600">Cras suscipit, neque non consequat commodo, nulla eros eleifend risus, id...</p>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${propertyType === 'compartida' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                                        onClick={() => setPropertyType('compartida')}
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4" />
                                                            </svg>
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${propertyType === 'compartida' ? 'border-red-500' : 'border-gray-300'}`}>
                                                                {propertyType === 'compartida' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                                                            </div>
                                                        </div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Habitación compartida</h3>
                                                        <p className="text-sm text-gray-600">Cras suscipit, neque non consequat commodo, nulla eros eleifend risus, id...</p>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${propertyType === 'otros' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                                        onClick={() => setPropertyType('otros')}
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                                                            </svg>
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${propertyType === 'otros' ? 'border-red-500' : 'border-gray-300'}`}>
                                                                {propertyType === 'otros' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                                                            </div>
                                                        </div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Otros</h3>
                                                        <p className="text-sm text-gray-600">Nulla eros eleifend risus, id vulputate metus quam nec metus. Aenean eget...</p>
                                                    </motion.div>
                                                </div>
                                            )}

                                            {activeStep === 1 && (
                                                // Paso 2: Dirección
                                                <div className="space-y-4">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="relative"
                                                    >
                                                        <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                            <MapPin className="w-6 h-6 text-gray-600 mr-3" />
                                                            <div className="flex-1">
                                                                <div className="text-sm font-semibold text-gray-900 mb-1">País/Región</div>
                                                                <div className="text-gray-600">Perú</div>
                                                            </div>
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                        className="relative"
                                                    >
                                                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                            <div className="text-sm font-semibold text-gray-900 mb-1">Dirección</div>
                                                            <input
                                                                type="text"
                                                                placeholder="Ej: Av. Del Aire"
                                                                className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none"
                                                            />
                                                        </div>
                                                    </motion.div>

                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                        >
                                                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                                <div className="text-sm font-semibold text-gray-900 mb-1">Departamento, piso, etc</div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Si corresponde"
                                                                    className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none"
                                                                />
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.3 }}
                                                        >
                                                            <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                                <div className="flex-1">
                                                                    <div className="text-sm font-semibold text-gray-900 mb-1">Distrito</div>
                                                                    <div className="text-gray-500">Elegir distrito</div>
                                                                </div>
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </motion.div>
                                                    </div>

                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.4 }}
                                                        >
                                                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                                <div className="text-sm font-semibold text-gray-900 mb-1">Código postal</div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Ej: 93535"
                                                                    className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none"
                                                                />
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.5 }}
                                                        >
                                                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                                <div className="text-sm font-semibold text-gray-900 mb-1">Departamento/estado/provincia</div>
                                                                <div className="text-gray-600">Provincia de Lima</div>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            )}

                                            {activeStep === 2 && (
                                                // Paso 3: Descripción
                                                <div className="space-y-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                    >
                                                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                            <div className="text-sm font-semibold text-gray-900 mb-1">Link de tu anuncio</div>
                                                            <input
                                                                type="text"
                                                                placeholder="Ej: www.arbnb/miraflores/lima/peru/id24253538.com.pe"
                                                                className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none"
                                                            />
                                                        </div>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 min-h-[120px]">
                                                            <div className="flex items-start gap-3">
                                                                <svg className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                <div className="flex-1">
                                                                    <div className="text-sm font-semibold text-gray-900 mb-1">Describe tu alojamiento</div>
                                                                    <textarea
                                                                        placeholder="Mi alojamiento..."
                                                                        rows={3}
                                                                        className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none resize-none"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50">
                                                            <div className="flex items-start gap-3 justify-center mb-3">
                                                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                <div>
                                                                    <div className="text-sm font-semibold text-gray-900 mb-1">Imágenes (Formatos compatibles: JPEG y/o PNG)</div>
                                                                    <p className="text-gray-600 text-sm">
                                                                        Arrastre y suelte archivos o <span className="text-blue-500 underline cursor-pointer">explore</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            )}

                                            {activeStep === 3 && (
                                                // Paso 4: Datos básicos
                                                <div className="space-y-6">
                                                    {[
                                                        { name: 'guests', label: 'Huéspedes', value: 4 },
                                                        { name: 'bedrooms', label: 'Habitaciones', value: 1 },
                                                        { name: 'beds', label: 'Camas', value: 1 },
                                                        { name: 'bathrooms', label: 'Baños', value: 1 }
                                                    ].map((counter, index) => (
                                                        <motion.div
                                                            key={counter.name}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50"
                                                        >
                                                            <span className="font-semibold text-gray-900">{counter.label}</span>
                                                            <div className="flex items-center gap-4">
                                                                <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                                                                    <span className="text-gray-600 text-lg">−</span>
                                                                </button>
                                                                <span className="w-8 text-center font-semibold text-lg bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">{counter.value}</span>
                                                                <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                                                                    <span className="text-gray-600 text-lg">+</span>
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}

                                            {activeStep === 4 && (
                                                // Paso 5: Comodidades
                                                <div className="grid grid-cols-2 gap-4">
                                                    {[
                                                        { id: 'wifi', label: 'Wifi', checked: true },
                                                        { id: 'tv', label: 'TV', checked: true },
                                                        { id: 'kitchen', label: 'Cocina', checked: true },
                                                        { id: 'washing', label: 'Lavadora', checked: false },
                                                        { id: 'parking', label: 'Estacionamiento gratis', checked: false },
                                                        { id: 'ac', label: 'Aire condicionado', checked: true }
                                                    ].map((amenity, index) => (
                                                        <motion.div
                                                            key={amenity.id}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="border border-gray-200 rounded-xl p-4 bg-gray-50 cursor-pointer hover:border-gray-300 transition-colors"
                                                            onClick={() => {
                                                                // Toggle amenity selection - this would need state management
                                                                console.log(`Toggled ${amenity.id}`);
                                                            }}
                                                        >
                                                            <label className="flex items-center justify-between cursor-pointer">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-6 h-6 text-gray-700">
                                                                        {amenity.id === 'wifi' && (
                                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                                                            </svg>
                                                                        )}
                                                                        {amenity.id === 'tv' && (
                                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                            </svg>
                                                                        )}
                                                                        {amenity.id === 'kitchen' && (
                                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                        )}
                                                                        {amenity.id === 'washing' && (
                                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                        )}
                                                                        {amenity.id === 'parking' && (
                                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                                                            </svg>
                                                                        )}
                                                                        {amenity.id === 'ac' && (
                                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <span className="font-semibold text-gray-900">{amenity.label}</span>
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    defaultChecked={amenity.checked}
                                                                    className="w-5 h-5 bg-gray-100 border-gray-300 rounded focus:ring-2 custom-secondary-checkbox"
                                                                />
                                                            </label>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Botones de navegación */}
                                        <div className="flex gap-4">
                                            {activeStep > 0 && (
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={prevStep}
                                                    className="flex-1 bg-white border-2 border-red-500 text-red-500 font-semibold py-3 px-6 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                >
                                                    Atrás
                                                </motion.button>
                                            )}

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={nextStep}
                                                className={`${activeStep > 0 ? 'flex-1' : 'w-full'} bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200`}
                                            >
                                                {activeStep === 0 ? 'Siguiente' : activeStep === 4 ? 'Finalizar' : 'Siguiente'}
                                            </motion.button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}






// Agregar estilos CSS para el swiper móvil y checkboxes personalizados
const styles = `
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .custom-secondary-checkbox {
        accent-color: #FF3D2A;
        width: 1.25rem;
        height: 1.25rem;
    }
    .custom-secondary-checkbox:checked {
        background-color: #ff6b35;
        border-color: #ff6b35;
    }
    .custom-secondary-checkbox:focus {
        box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
    }
`;

// Inyectar estilos
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

