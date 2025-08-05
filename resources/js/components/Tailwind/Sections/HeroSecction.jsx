
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import TextWithHighlight from '../../../Utils/TextWithHighlight';
import { MapPin, Home, Users, Calendar, Camera, CheckCircle, Upload, X } from 'lucide-react';

export default function HeroSecction({ data = [], apps = [], indicators = [] }) {
    const [activeStep, setActiveStep] = useState(0);
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [guests, setGuests] = useState(1);
    const [loopKey, setLoopKey] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('buscar'); // 'buscar' o 'anunciar'
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Estados para el formulario de búsqueda
    const [searchFormData, setSearchFormData] = useState({
        destination: '',
        checkinDate: '',
        checkoutDate: '',
        adults: '',
        children: ''
    });

    // Estados para el formulario de anunciar propiedad
    const [propertyFormData, setPropertyFormData] = useState({
        // Información básica
        property_type: '',
        title: '',
        price: '',
        currency: 'PEN',
        platform: 'Airbnb',
        
        // Ubicación
        address: '',
        apartment: '',
        department: '',
        province: '',
        district: '',
        postal_code: '',
        external_link: '',
        area_m2: '',
        latitude: '',
        longitude: '',
        
        // Descripción
        description: '',
        short_description: '',
        
        // Datos básicos
        guests: 4,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        
        // Información adicional
        rating: 5.0,
        reviews_count: 0,
        
        // Características
        amenities: [], // Amenidades predefinidas
        services: [], // Servicios predefinidos seleccionados
        characteristics: [], // Características predefinidas seleccionadas
        house_rules: [], // Reglas de la casa predefinidas seleccionadas
        
        // Imágenes
        main_image: null,
        images: []
    });

    // Estados para ubigeo
    const [ubigeoData, setUbigeoData] = useState({
        departments: [],
        provinces: [],
        districts: []
    });

    // Estados para drag and drop de imágenes
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    // Amenidades predefinidas con iconos
    const predefinedAmenities = [
        { id: 'wifi', label: 'WiFi', icon: 'fa-wifi' },
        { id: 'tv', label: 'TV', icon: 'fa-tv' },
        { id: 'kitchen', label: 'Cocina', icon: 'fa-utensils' },
        { id: 'washing_machine', label: 'Lavadora', icon: 'fa-tshirt' },
        { id: 'parking', label: 'Estacionamiento', icon: 'fa-car' },
        { id: 'air_conditioning', label: 'Aire acondicionado', icon: 'fa-snowflake' },
        { id: 'heating', label: 'Calefacción', icon: 'fa-fire' },
        { id: 'pool', label: 'Piscina', icon: 'fa-swimming-pool' },
        { id: 'gym', label: 'Gimnasio', icon: 'fa-dumbbell' },
        { id: 'balcony', label: 'Balcón', icon: 'fa-building' },
        { id: 'garden', label: 'Jardín', icon: 'fa-leaf' },
        { id: 'pet_friendly', label: 'Pet Friendly', icon: 'fa-paw' }
    ];

    // Servicios predefinidos
    const predefinedServices = [
        { id: 'cleaning', label: 'Servicio de limpieza', icon: 'fa-broom', description: 'Limpieza diaria o semanal' },
        { id: 'laundry', label: 'Servicio de lavandería', icon: 'fa-tshirt', description: 'Lavado y planchado de ropa' },
        { id: 'breakfast', label: 'Desayuno incluido', icon: 'fa-coffee', description: 'Desayuno continental' },
        { id: 'transport', label: 'Transporte al aeropuerto', icon: 'fa-plane', description: 'Traslado desde/hacia el aeropuerto' },
        { id: 'concierge', label: 'Servicio de conserje', icon: 'fa-concierge-bell', description: 'Asistencia personalizada' },
        { id: 'grocery', label: 'Servicio de compras', icon: 'fa-shopping-cart', description: 'Compra de alimentos y productos' },
        { id: 'tour_guide', label: 'Guía turístico', icon: 'fa-map-marked-alt', description: 'Tours y recomendaciones locales' },
        { id: 'babysitting', label: 'Cuidado de niños', icon: 'fa-baby', description: 'Servicio de niñera' },
        { id: 'massage', label: 'Servicio de masajes', icon: 'fa-spa', description: 'Masajes relajantes' },
        { id: 'chef', label: 'Chef privado', icon: 'fa-utensils', description: 'Preparación de comidas' }
    ];

    // Características predefinidas
    const predefinedCharacteristics = [
        { id: 'ocean_view', label: 'Vista al mar', icon: 'fa-water', value: 'Vista panorámica al océano' },
        { id: 'mountain_view', label: 'Vista a las montañas', icon: 'fa-mountain', value: 'Vista a las montañas' },
        { id: 'city_view', label: 'Vista a la ciudad', icon: 'fa-city', value: 'Vista urbana' },
        { id: 'historic', label: 'Edificio histórico', icon: 'fa-landmark', value: 'Patrimonio arquitectónico' },
        { id: 'modern', label: 'Diseño moderno', icon: 'fa-gem', value: 'Diseño contemporáneo' },
        { id: 'luxury', label: 'Propiedad de lujo', icon: 'fa-crown', value: 'Acabados premium' },
        { id: 'eco_friendly', label: 'Eco-amigable', icon: 'fa-leaf', value: 'Sostenible y ecológico' },
        { id: 'quiet', label: 'Zona tranquila', icon: 'fa-volume-mute', value: 'Ambiente silencioso' },
        { id: 'central', label: 'Ubicación céntrica', icon: 'fa-map-marker-alt', value: 'Centro de la ciudad' },
        { id: 'beachfront', label: 'Frente a la playa', icon: 'fa-umbrella-beach', value: 'Acceso directo a la playa' },
        { id: 'renovated', label: 'Recientemente renovado', icon: 'fa-hammer', value: 'Renovación reciente' },
        { id: 'spacious', label: 'Espacioso', icon: 'fa-expand-arrows-alt', value: 'Amplios espacios' }
    ];

    // Reglas de la casa predefinidas
    const predefinedHouseRules = [
        { id: 'no_smoking', label: 'No se permite fumar', icon: 'fa-smoking-ban', text: 'Prohibido fumar en toda la propiedad' },
        { id: 'no_pets', label: 'No se permiten mascotas', icon: 'fa-ban', text: 'No se admiten animales domésticos' },
        { id: 'no_parties', label: 'No se permiten fiestas', icon: 'fa-music', text: 'Prohibidas las fiestas y eventos ruidosos' },
        { id: 'quiet_hours', label: 'Horas de silencio', icon: 'fa-volume-mute', text: 'Mantener silencio de 10 PM a 8 AM' },
        { id: 'no_shoes', label: 'No usar zapatos dentro', icon: 'fa-shoe-prints', text: 'Quitarse los zapatos al ingresar' },
        { id: 'clean_up', label: 'Mantener limpio', icon: 'fa-broom', text: 'Mantener la propiedad limpia y ordenada' },
        { id: 'check_in_time', label: 'Horario de check-in', icon: 'fa-clock', text: 'Check-in: 3:00 PM - 10:00 PM' },
        { id: 'check_out_time', label: 'Horario de check-out', icon: 'fa-door-open', text: 'Check-out antes de las 11:00 AM' },
        { id: 'max_guests', label: 'Límite de huéspedes', icon: 'fa-users', text: 'No exceder el número máximo de huéspedes' },
        { id: 'energy_saving', label: 'Ahorro de energía', icon: 'fa-lightbulb', text: 'Apagar luces y equipos al salir' }
    ];

    // Verificar autenticación al cargar
    useEffect(() => {
        checkAuthentication();
        loadUbigeoData();
    }, []);

    const checkAuthentication = async () => {
        try {
            const response = await fetch('/api/user-check', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                },
                credentials: 'same-origin'
            });
            
            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(data.authenticated);
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            setIsAuthenticated(false);
        }
    };

    const loadUbigeoData = async () => {
        try {
            const response = await fetch('/ubigeo.json');
            const data = await response.json();
            
            // Extraer departamentos únicos
            const departments = [...new Set(data.map(item => item.departamento))].sort();
            setUbigeoData(prev => ({ ...prev, departments }));
        } catch (error) {
            console.error('Error loading ubigeo data:', error);
        }
    };

    const handleDepartmentChange = async (department) => {
        setPropertyFormData(prev => ({
            ...prev,
            department,
            province: '',
            district: ''
        }));

        try {
            const response = await fetch('/ubigeo.json');
            const data = await response.json();
            
            // Filtrar provincias por departamento
            const provinces = [...new Set(
                data.filter(item => item.departamento === department)
                    .map(item => item.provincia)
            )].sort();
            
            setUbigeoData(prev => ({ 
                ...prev, 
                provinces,
                districts: []
            }));
        } catch (error) {
            console.error('Error loading provinces:', error);
        }
    };

    const handleProvinceChange = async (province) => {
        setPropertyFormData(prev => ({
            ...prev,
            province,
            district: ''
        }));

        try {
            const response = await fetch('/ubigeo.json');
            const data = await response.json();
            
            // Filtrar distritos por departamento y provincia
            const districts = data
                .filter(item => 
                    item.departamento === propertyFormData.department && 
                    item.provincia === province
                )
                .map(item => item.distrito)
                .sort();
            
            setUbigeoData(prev => ({ ...prev, districts }));
        } catch (error) {
            console.error('Error loading districts:', error);
        }
    };

    const toggleAmenity = (amenityId) => {
        setPropertyFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenityId)
                ? prev.amenities.filter(id => id !== amenityId)
                : [...prev.amenities, amenityId]
        }));
    };

    const toggleService = (serviceId) => {
        setPropertyFormData(prev => ({
            ...prev,
            services: prev.services.includes(serviceId)
                ? prev.services.filter(id => id !== serviceId)
                : [...prev.services, serviceId]
        }));
    };

    const toggleCharacteristic = (characteristicId) => {
        setPropertyFormData(prev => ({
            ...prev,
            characteristics: prev.characteristics.includes(characteristicId)
                ? prev.characteristics.filter(id => id !== characteristicId)
                : [...prev.characteristics, characteristicId]
        }));
    };

    const toggleHouseRule = (ruleId) => {
        setPropertyFormData(prev => ({
            ...prev,
            house_rules: prev.house_rules.includes(ruleId)
                ? prev.house_rules.filter(id => id !== ruleId)
                : [...prev.house_rules, ruleId]
        }));
    };

    // Funciones para servicios, características y reglas de la casa (ahora son predefinidas)
    // Las funciones toggle están arriba junto con toggleAmenity

    const updateCounter = (field, increment) => {
        setPropertyFormData(prev => ({
            ...prev,
            [field]: Math.max(1, prev[field] + (increment ? 1 : -1))
        }));
    };

    // Función para manejar imagen principal
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPropertyFormData(prev => ({
                ...prev,
                main_image: file
            }));
        }
    };

    // Manejo de imágenes drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
            return isValidType && isValidSize;
        });

        if (validFiles.length !== files.length) {
            alert('Algunos archivos no son válidos. Solo se permiten imágenes JPEG, PNG o WEBP de máximo 5MB.');
        }

        if (uploadedImages.length + validFiles.length > 10) {
            alert('Máximo 10 imágenes permitidas.');
            return;
        }

        const newImages = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Date.now() + Math.random()
        }));

        setUploadedImages(prev => [...prev, ...newImages]);
        setPropertyFormData(prev => ({
            ...prev,
            images: [...prev.images, ...validFiles]
        }));
    };

    const removeImage = (imageId) => {
        setUploadedImages(prev => {
            const updated = prev.filter(img => img.id !== imageId);
            const files = updated.map(img => img.file);
            setPropertyFormData(prevForm => ({
                ...prevForm,
                images: files
            }));
            return updated;
        });
    };

    // Pasos del proceso de anunciar propiedad
    const propertySteps = [
        {
            title: "Información básica",
            description: "Título y precio de tu propiedad",
            icon: Home
        },
        {
            title: "Tipo de alojamiento",
            description: "Selecciona qué tipo de propiedad ofreces",
            icon: Home
        },
        {
            title: "Ubicación",
            description: "Confirma la dirección de tu alojamiento",
            icon: MapPin
        },
        {
            title: "Descripción",
            description: "Describe tu alojamiento",
            icon: Camera
        },
        {
            title: "Datos básicos",
            description: "Información sobre tu espacio",
            icon: Users
        },
        {
            title: "Comodidades",
            description: "Comodidades de tu alojamiento",
            icon: CheckCircle
        },
        {
            title: "Servicios adicionales",
            description: "Servicios extra que ofreces",
            icon: CheckCircle
        },
        {
            title: "Características",
            description: "Características especiales",
            icon: CheckCircle
        },
        {
            title: "Reglas de la casa",
            description: "Normas de tu propiedad",
            icon: CheckCircle
        },
        {
            title: "Imágenes",
            description: "Sube fotos de tu propiedad",
            icon: Upload
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

    const handleSearchSubmit = () => {
        // Construir los parámetros de búsqueda
        const searchParams = new URLSearchParams();
        
        if (searchFormData.destination.trim()) {
            searchParams.append('location', searchFormData.destination.trim());
        }
        
        if (searchFormData.checkinDate) {
            searchParams.append('checkin', searchFormData.checkinDate);
        }
        
        if (searchFormData.checkoutDate) {
            searchParams.append('checkout', searchFormData.checkoutDate);
        }
        
        if (searchFormData.adults) {
            searchParams.append('adults', searchFormData.adults);
        }
        
        if (searchFormData.children) {
            searchParams.append('children', searchFormData.children);
        }

        // Redirigir a la página de catálogo con los filtros
        const searchUrl = `/catalogo${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
        window.location.href = searchUrl;
    };

    // Función para manejar el envío del formulario de propiedad
    const handlePropertySubmit = async () => {
        if (!isAuthenticated) {
            alert('Debes estar logueado para anunciar una propiedad');
            window.location.href = '/login';
            return;
        }

        setIsLoading(true);

        try {
            // Obtener token CSRF de múltiples fuentes
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
                             document.querySelector('input[name="_token"]')?.value ||
                             window.Laravel?.csrfToken;

            console.log('CSRF Token encontrado:', csrfToken);
            
            if (!csrfToken) {
                alert('No se pudo obtener el token CSRF. Por favor recarga la página.');
                return;
            }

            const formData = new FormData();
            
            // Log de todos los datos antes de enviar
            console.log('Datos del formulario completos:', propertyFormData);
            
            // Información básica
            formData.append('title', propertyFormData.title || '');
            formData.append('property_type', propertyFormData.property_type || '');
            formData.append('price', propertyFormData.price || '');
            formData.append('currency', propertyFormData.currency || 'PEN');
            formData.append('platform', propertyFormData.platform || 'Airbnb');
            
            // Ubicación
            formData.append('address', propertyFormData.address || '');
            formData.append('apartment', propertyFormData.apartment || '');
            formData.append('department', propertyFormData.department || '');
            formData.append('province', propertyFormData.province || '');
            formData.append('district', propertyFormData.district || '');
            formData.append('postal_code', propertyFormData.postal_code || '');
            formData.append('external_link', propertyFormData.external_link || '');
            formData.append('area_m2', propertyFormData.area_m2 || '');
            formData.append('latitude', propertyFormData.latitude || '');
            formData.append('longitude', propertyFormData.longitude || '');
            
            // Descripción
            formData.append('description', propertyFormData.description || '');
            formData.append('short_description', propertyFormData.short_description || '');
            
            // Datos básicos
            formData.append('guests', propertyFormData.guests || 1);
            formData.append('bedrooms', propertyFormData.bedrooms || 1);
            formData.append('beds', propertyFormData.beds || 1);
            formData.append('bathrooms', propertyFormData.bathrooms || 1);
            
            // Información adicional
            formData.append('rating', propertyFormData.rating || 5.0);
            formData.append('reviews_count', propertyFormData.reviews_count || 0);
            
            // Amenidades predefinidas
            console.log('Amenidades seleccionadas:', propertyFormData.amenities);
            propertyFormData.amenities.forEach((amenity, index) => {
                formData.append(`amenities[${index}]`, amenity);
            });
            
            // Servicios (enviar solo los IDs seleccionados)
            console.log('Servicios seleccionados:', propertyFormData.services);
            propertyFormData.services.forEach((serviceId, index) => {
                formData.append(`services[${index}]`, serviceId);
            });
            
            // Características (enviar solo los IDs seleccionados)
            console.log('Características seleccionadas:', propertyFormData.characteristics);
            propertyFormData.characteristics.forEach((characteristicId, index) => {
                formData.append(`characteristics[${index}]`, characteristicId);
            });
            
            // Reglas de la casa (enviar solo los IDs seleccionados)
            console.log('Reglas de la casa seleccionadas:', propertyFormData.house_rules);
            propertyFormData.house_rules.forEach((ruleId, index) => {
                formData.append(`house_rules[${index}]`, ruleId);
            });
            
            // Imagen principal
            console.log('Imagen principal:', propertyFormData.main_image);
            if (propertyFormData.main_image) {
                formData.append('main_image', propertyFormData.main_image);
            }
            
            // Galería de imágenes
            console.log('Imágenes de galería:', propertyFormData.images);
            propertyFormData.images.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            // Log de todos los datos del FormData
            console.log('=== DATOS ENVIADOS AL BACKEND ===');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ', pair[1]);
            }

            const response = await fetch('/api/properties/submit', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json'
                },
                body: formData,
                credentials: 'same-origin'
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                if (response.status === 419) {
                    alert('Error de token CSRF. Por favor recarga la página e intenta nuevamente.');
                    console.error('CSRF Token:', csrfToken);
                    return;
                }
                const errorText = await response.text();
                console.error('Error response body:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('=== RESPUESTA DEL BACKEND ===');
            console.log('Result completo:', result);

            if (result.success) {
                setActiveStep(10); // Paso de éxito
            } else {
                console.error('Error del backend:', result);
                alert(result.message || 'Error al enviar la propiedad');
            }
        } catch (error) {
            console.error('Error submitting property:', error);
            alert('Error al enviar la propiedad. Por favor intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para manejar cambios en los campos del formulario
    const handleFormChange = (field, value) => {
        setSearchFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const nextStep = () => {
        if (activeStep < 9) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0: // Información básica
                return (
                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Título de tu propiedad</label>
                            <input
                                type="text"
                                placeholder="Ej: Apartamento moderno en Miraflores con vista al mar"
                                value={propertyFormData.title}
                                onChange={(e) => setPropertyFormData(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Un título atractivo ayuda a destacar tu propiedad
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Precio por noche</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500">S/</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="120.00"
                                        value={propertyFormData.price}
                                        onChange={(e) => setPropertyFormData(prev => ({ ...prev, price: e.target.value }))}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Área aproximada (m²)</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="60"
                                    value={propertyFormData.area_m2}
                                    onChange={(e) => setPropertyFormData(prev => ({ ...prev, area_m2: e.target.value }))}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción corta</label>
                            <textarea
                                placeholder="Breve descripción que aparecerá en los listados (máximo 150 caracteres)"
                                rows={2}
                                maxLength={150}
                                value={propertyFormData.short_description}
                                onChange={(e) => setPropertyFormData(prev => ({ ...prev, short_description: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {propertyFormData.short_description.length}/150 caracteres
                            </p>
                        </motion.div>
                    </div>
                );

            case 1: // Tipo de alojamiento
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {[
                            { id: 'casa', label: 'Casa: Alojamiento entero', description: 'Nulla eros eleifend risus, id vulputate metus quam nec metus. Aenean eget...', icon: Home },
                            { id: 'habitacion', label: 'Una habitación', description: 'Cras suscipit, neque non consequat commodo, nulla eros eleifend risus, id...', icon: Home },
                            { id: 'compartida', label: 'Habitación compartida', description: 'Cras suscipit, neque non consequat commodo, nulla eros eleifend risus, id...', icon: Home },
                            { id: 'otros', label: 'Otros', description: 'Nulla eros eleifend risus, id vulputate metus quam nec metus. Aenean eget...', icon: Home }
                        ].map((option, index) => (
                            <motion.div
                                key={option.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                                    propertyFormData.property_type === option.id 
                                        ? 'border-red-500 bg-red-50' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setPropertyFormData(prev => ({ ...prev, property_type: option.id }))}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <option.icon className="w-6 h-6 text-gray-700" />
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                        propertyFormData.property_type === option.id ? 'border-red-500' : 'border-gray-300'
                                    }`}>
                                        {propertyFormData.property_type === option.id && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{option.label}</h3>
                                <p className="text-sm text-gray-600">{option.description}</p>
                            </motion.div>
                        ))}
                    </div>
                );

            case 2: // Ubicación
                return (
                    <div className="space-y-4">
                        {/* País/Región */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">País/Región</label>
                            <div className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600">
                                Perú
                            </div>
                        </motion.div>

                        {/* Dirección */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                            <input
                                type="text"
                                placeholder="Ej: Av. Del Aire"
                                value={propertyFormData.address}
                                onChange={(e) => setPropertyFormData(prev => ({ ...prev, address: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </motion.div>

                        {/* Departamento y Apartamento */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                                <select
                                    value={propertyFormData.department}
                                    onChange={(e) => handleDepartmentChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">Seleccionar departamento</option>
                                    {ubigeoData.departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label>
                                <select
                                    value={propertyFormData.province}
                                    onChange={(e) => handleProvinceChange(e.target.value)}
                                    disabled={!propertyFormData.department}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                                >
                                    <option value="">Seleccionar provincia</option>
                                    {ubigeoData.provinces.map(prov => (
                                        <option key={prov} value={prov}>{prov}</option>
                                    ))}
                                </select>
                            </motion.div>
                        </div>

                        {/* Distrito y Apartamento */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Distrito</label>
                                <select
                                    value={propertyFormData.district}
                                    onChange={(e) => setPropertyFormData(prev => ({ ...prev, district: e.target.value }))}
                                    disabled={!propertyFormData.province}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                                >
                                    <option value="">Seleccionar distrito</option>
                                    {ubigeoData.districts.map(dist => (
                                        <option key={dist} value={dist}>{dist}</option>
                                    ))}
                                </select>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Apartamento, piso, etc</label>
                                <input
                                    type="text"
                                    placeholder="Si corresponde"
                                    value={propertyFormData.apartment}
                                    onChange={(e) => setPropertyFormData(prev => ({ ...prev, apartment: e.target.value }))}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </motion.div>
                        </div>

                        {/* Coordenadas */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Latitud (opcional)</label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    placeholder="-12.1211"
                                    value={propertyFormData.latitude}
                                    onChange={(e) => setPropertyFormData(prev => ({ ...prev, latitude: e.target.value }))}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Longitud (opcional)</label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    placeholder="-77.0269"
                                    value={propertyFormData.longitude}
                                    onChange={(e) => setPropertyFormData(prev => ({ ...prev, longitude: e.target.value }))}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </motion.div>
                        </div>
                    </div>
                );

            case 3: // Descripción
                return (
                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Link de tu anuncio en Airbnb <span className="text-blue-600">(Para sincronizar fechas)</span>
                            </label>
                            <input
                                type="url"
                                placeholder="Ej: https://www.airbnb.com/rooms/12345"
                                value={propertyFormData.external_link}
                                onChange={(e) => setPropertyFormData(prev => ({ ...prev, external_link: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Este enlace nos permitirá sincronizar automáticamente las fechas disponibles
                            </p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Describe tu alojamiento</label>
                            <textarea
                                placeholder="Describe las características principales de tu propiedad, servicios incluidos, ubicación..."
                                rows={4}
                                value={propertyFormData.description}
                                onChange={(e) => setPropertyFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </motion.div>
                    </div>
                );

            case 4: // Datos básicos
                return (
                    <div className="space-y-6">
                        {[
                            { field: 'guests', label: 'Huéspedes' },
                            { field: 'bedrooms', label: 'Habitaciones' },
                            { field: 'beds', label: 'Camas' },
                            { field: 'bathrooms', label: 'Baños' }
                        ].map((counter, index) => (
                            <motion.div
                                key={counter.field}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50"
                            >
                                <span className="font-semibold text-gray-900">{counter.label}</span>
                                <div className="flex items-center gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => updateCounter(counter.field, false)}
                                        className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                                    >
                                        <span className="text-gray-600 text-lg">−</span>
                                    </button>
                                    <span className="w-8 text-center font-semibold text-lg bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
                                        {propertyFormData[counter.field]}
                                    </span>
                                    <button 
                                        type="button"
                                        onClick={() => updateCounter(counter.field, true)}
                                        className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                                    >
                                        <span className="text-gray-600 text-lg">+</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 5: // Comodidades
                return (
                    <div className="grid grid-cols-2 gap-4">
                        {predefinedAmenities.map((amenity, index) => (
                            <motion.div
                                key={amenity.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                                    propertyFormData.amenities.includes(amenity.id)
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                                }`}
                                onClick={() => toggleAmenity(amenity.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <i className={`fas ${amenity.icon} text-gray-700 text-lg`}></i>
                                        <span className="font-semibold text-gray-900">{amenity.label}</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                        propertyFormData.amenities.includes(amenity.id)
                                            ? 'border-red-500 bg-red-500'
                                            : 'border-gray-300'
                                    }`}>
                                        {propertyFormData.amenities.includes(amenity.id) && (
                                            <CheckCircle className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 6: // Servicios adicionales
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Servicios adicionales que ofreces</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {predefinedServices.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                                        propertyFormData.services.includes(service.id)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                                    }`}
                                    onClick={() => toggleService(service.id)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <i className={`fas ${service.icon} text-gray-700 text-lg mt-1`}></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{service.label}</h4>
                                                <p className="text-sm text-gray-600">{service.description}</p>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                                            propertyFormData.services.includes(service.id)
                                                ? 'border-blue-500 bg-blue-500'
                                                : 'border-gray-300'
                                        }`}>
                                            {propertyFormData.services.includes(service.id) && (
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 7: // Características
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Características especiales de tu propiedad</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {predefinedCharacteristics.map((characteristic, index) => (
                                <motion.div
                                    key={characteristic.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                                        propertyFormData.characteristics.includes(characteristic.id)
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                                    }`}
                                    onClick={() => toggleCharacteristic(characteristic.id)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <i className={`fas ${characteristic.icon} text-gray-700 text-lg mt-1`}></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{characteristic.label}</h4>
                                                <p className="text-sm text-gray-600">{characteristic.value}</p>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                                            propertyFormData.characteristics.includes(characteristic.id)
                                                ? 'border-green-500 bg-green-500'
                                                : 'border-gray-300'
                                        }`}>
                                            {propertyFormData.characteristics.includes(characteristic.id) && (
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 8: // Reglas de la casa
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Reglas de la casa</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {predefinedHouseRules.map((rule, index) => (
                                <motion.div
                                    key={rule.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                                        propertyFormData.house_rules.includes(rule.id)
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                                    }`}
                                    onClick={() => toggleHouseRule(rule.id)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <i className={`fas ${rule.icon} text-gray-700 text-lg mt-1`}></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{rule.label}</h4>
                                                <p className="text-sm text-gray-600">{rule.text}</p>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                                            propertyFormData.house_rules.includes(rule.id)
                                                ? 'border-orange-500 bg-orange-500'
                                                : 'border-gray-300'
                                        }`}>
                                            {propertyFormData.house_rules.includes(rule.id) && (
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 9: // Imágenes
                return (
                    <div className="space-y-6">
                        {/* Imagen principal */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Imagen principal *
                            </label>
                            {propertyFormData.main_image ? (
                                <div className="relative inline-block">
                                    <img
                                        src={URL.createObjectURL(propertyFormData.main_image)}
                                        alt="Imagen principal"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <div className="absolute -top-2 -right-2 flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setPropertyFormData(prev => ({ ...prev, main_image: null }))}
                                            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('mainImageInput').click()}
                                            className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600"
                                        >
                                            ✓
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => document.getElementById('mainImageInput').click()}
                                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-red-400 transition-colors"
                                >
                                    <div className="text-center">
                                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <span className="text-sm text-gray-500">Seleccionar</span>
                                    </div>
                                </motion.div>
                            )}
                            <input
                                id="mainImageInput"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleMainImageChange}
                                className="hidden"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Esta será la imagen destacada de tu propiedad
                            </p>
                        </div>

                        {/* Galería de imágenes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Galería de imágenes
                            </label>
                            
                            {/* Área de drag and drop */}
                            <motion.div
                                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                                    isDragOver ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-red-400'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">
                                    <span className="font-medium">Arrastra y suelta tus imágenes aquí</span>
                                    <br />
                                    o <button 
                                        type="button"
                                        onClick={() => document.getElementById('fileInput').click()}
                                        className="text-blue-500 underline"
                                    >
                                        selecciona archivos
                                    </button>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Formatos: JPEG, PNG, WEBP • Máximo 5MB por imagen • Hasta 10 imágenes
                                </p>
                                <input
                                    id="fileInput"
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </motion.div>

                            {/* Vista previa de imágenes */}
                            {uploadedImages.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                    {uploadedImages.map((image, index) => (
                                        <motion.div
                                            key={image.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative group"
                                        >
                                            <img
                                                src={image.preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(image.id)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 10: // Éxito
                return (
                    <div className="text-center">
                        <div className="mb-6">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                ¡Propiedad enviada exitosamente!
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Tu propiedad ha sido recibida y será revisada por nuestro equipo. 
                                Te notificaremos cuando esté aprobada y visible en nuestra plataforma.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = '/catalogo'}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-full transition-colors duration-200 text-lg"
                        >
                            Ver propiedades
                        </motion.button>
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
                                                    value={searchFormData.destination}
                                                    onChange={(e) => handleFormChange('destination', e.target.value)}
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
                                                        type="date"
                                                        value={searchFormData.checkinDate}
                                                        onChange={(e) => handleFormChange('checkinDate', e.target.value)}
                                                        className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none text-base"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <Calendar className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-gray-900 mb-1">Salida</div>
                                                    <input
                                                        type="date"
                                                        value={searchFormData.checkoutDate}
                                                        onChange={(e) => handleFormChange('checkoutDate', e.target.value)}
                                                        className="w-full bg-transparent text-gray-600 placeholder-gray-500 border-none outline-none text-base"
                                                    />
                                                </div>
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
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        placeholder="¿Cuántos?"
                                                        value={searchFormData.adults}
                                                        onChange={(e) => handleFormChange('adults', e.target.value)}
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
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        placeholder="¿Cuántos?"
                                                        value={searchFormData.children}
                                                        onChange={(e) => handleFormChange('children', e.target.value)}
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
                                        onClick={handleSearchSubmit}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-lg mt-6"
                                    >
                                        Buscar destino
                                    </motion.button>
                                </div>
                            </>
                        ) : (
                            // Formulario de anunciar propiedad
                            <>
                                {activeStep === 10 ? (
                                    // Paso final: Éxito
                                    renderStepContent(10)
                                ) : (
                                    <>
                                        {/* Verificación de autenticación */}
                                        {!isAuthenticated ? (
                                            <div className="text-center">
                                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                                    Inicia sesión para anunciar
                                                </h2>
                                                <p className="text-gray-600 mb-6">
                                                    Necesitas tener una cuenta para publicar tu propiedad
                                                </p>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => window.location.href = '/login'}
                                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-full transition-colors duration-200 text-lg"
                                                >
                                                    Iniciar sesión
                                                </motion.button>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Título del paso */}
                                                <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                                                    {propertySteps[activeStep]?.title}
                                                </h2>
                                                <p className="text-gray-600 mb-6">
                                                    {propertySteps[activeStep]?.description}
                                                </p>

                                                {/* Contenido del paso */}
                                                <div className="mb-8">
                                                    {renderStepContent(activeStep)}
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
                                                        onClick={activeStep === 9 ? handlePropertySubmit : nextStep}
                                                        disabled={isLoading}
                                                        className={`${activeStep > 0 ? 'flex-1' : 'w-full'} bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 disabled:opacity-50`}
                                                    >
                                                        {isLoading ? 'Enviando...' : activeStep === 9 ? 'Enviar propiedad' : 'Siguiente'}
                                                    </motion.button>
                                                </div>
                                            </>
                                        )}
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

