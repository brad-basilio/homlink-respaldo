
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
        if (activeStep < propertySteps.length - 1) {
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
                                className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-red-500 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6">
                                            {amenity.id === 'wifi' && <div className="w-full h-full">📶</div>}
                                            {amenity.id === 'tv' && <div className="w-full h-full">📺</div>}
                                            {amenity.id === 'kitchen' && <div className="w-full h-full">🍳</div>}
                                            {amenity.id === 'washing' && <div className="w-full h-full">🧺</div>}
                                            {amenity.id === 'parking' && <div className="w-full h-full">🚗</div>}
                                            {amenity.id === 'ac' && <div className="w-full h-full">❄️</div>}
                                        </div>
                                        <span className="font-medium text-gray-900">{amenity.label}</span>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full ${amenity.checked ? 'bg-red-500' : 'bg-gray-200'} flex items-center justify-center`}>
                                        {amenity.checked && <CheckCircle className="w-4 h-4 text-white" />}
                                    </div>
                                </div>
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
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all ${
                                activeTab === 'buscar' 
                                    ? 'bg-white text-gray-900 shadow-sm' 
                                    : 'text-gray-600'
                            }`}
                            onClick={() => setActiveTab('buscar')}
                        >
                            Buscar propiedad
                        </button>
                        <button 
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all ${
                                activeTab === 'anunciar' 
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
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Alquila una casa para llamarla suya
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Buscar por ciudad"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Agregar fecha"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="absolute left-3 top-1 text-xs text-gray-500">Llegada</span>
                                        </div>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Agregar fecha"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="absolute left-3 top-1 text-xs text-gray-500">Salida</span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="¿Cuántos?"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="absolute left-3 top-1 text-xs text-gray-500">N. Adultos</span>
                                        </div>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="¿Cuántos?"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="absolute left-3 top-1 text-xs text-gray-500">N. Niños</span>
                                        </div>
                                    </div>
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Buscar destino
                                    </motion.button>
                                </div>
                            </>
                        ) : (
                            // Formulario de anunciar propiedad (paso a paso)
                            <>
                                {/* Encabezado del paso actual */}
                                <motion.div 
                                    className="mb-6"
                                    key={`step-header-${activeStep}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {propertySteps[activeStep].title}
                                    </h2>
                                    <p className="text-gray-600">
                                        {propertySteps[activeStep].description}
                                    </p>
                                </motion.div>
                                
                                {/* Contenido del paso */}
                                <motion.div 
                                    key={`step-content-${activeStep}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className="mb-8"
                                >
                                    {renderStepContent(activeStep)}
                                </motion.div>
                                
                                {/* Botones de navegación */}
                                <div className="flex justify-between items-center mb-6">
                                    {activeStep > 0 ? (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={prevStep}
                                            className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                                        >
                                            Atrás
                                        </motion.button>
                                    ) : (
                                        <div></div>
                                    )}
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={activeStep === propertySteps.length - 1 ? handleOperationStart : nextStep}
                                        className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                                    >
                                        {activeStep === propertySteps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                    </motion.button>
                                </div>
                                
                                {/* Indicador de progreso */}
                                <div className="flex justify-center space-x-2">
                                    {propertySteps.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                index <= activeStep ? 'bg-red-500' : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    )
}

// Agregar estilos CSS para el swiper móvil
const styles = `
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
`;

// Inyectar estilos
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

