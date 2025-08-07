import React, { useState, useEffect } from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import { CarritoProvider } from './context/CarritoContext';
import Base from './components/Tailwind/Base';
import Header from './components/Tailwind/Header';
import DestacadosSection from './components/Tailwind/Sections/DestacadosSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Global from './Utils/Global';
import GeneralRest from './actions/GeneralRest';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from './components/Tailwind/Footer';

const PropertyDetail = ({ property: initialProperty, otherProperties: initialOtherProperties, otherPropertiesTitle: initialTitle }) => {
    const [property, setProperty] = useState(initialProperty);
    const [otherProperties, setOtherProperties] = useState(initialOtherProperties || []);
    const [otherPropertiesTitle, setOtherPropertiesTitle] = useState(initialTitle || "Otros departamentos que te pueden gustar");
    const [loading, setLoading] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

    // ✅ GENERAR SESSION_ID ÚNICO PARA TODA LA SESIÓN DEL NAVEGADOR
    useEffect(() => {
        // Solo generar si no existe ya en sessionStorage
        if (!sessionStorage.getItem('app_session_id')) {
            const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            sessionStorage.setItem('app_session_id', sessionId);
            console.log('🆔 Nuevo session_id generado:', sessionId);
        } else {
            console.log('🆔 Session_id existente:', sessionStorage.getItem('app_session_id'));
        }
    }, []);

    // ✅ MAPEO DE ÍCONOS PARA AMENIDADES, SERVICIOS, CARACTERÍSTICAS Y REGLAS
    // Usando exactamente los mismos IDs y labels que en HeroSecction.jsx
    const amenityIcons = {
        'wifi': { label: 'WiFi', icon: 'fa-wifi' },
        'tv': { label: 'TV', icon: 'fa-tv' },
        'kitchen': { label: 'Cocina', icon: 'fa-utensils' },
        'washing_machine': { label: 'Lavadora', icon: 'fa-tshirt' },
        'parking': { label: 'Estacionamiento', icon: 'fa-car' },
        'air_conditioning': { label: 'Aire acondicionado', icon: 'fa-snowflake' },
        'heating': { label: 'Calefacción', icon: 'fa-fire' },
        'pool': { label: 'Piscina', icon: 'fa-swimming-pool' },
        'gym': { label: 'Gimnasio', icon: 'fa-dumbbell' },
        'balcony': { label: 'Balcón', icon: 'fa-building' },
        'garden': { label: 'Jardín', icon: 'fa-leaf' },
        'pet_friendly': { label: 'Pet Friendly', icon: 'fa-paw' }
    };

    const serviceIcons = {
        'cleaning': { label: 'Servicio de limpieza', icon: 'fa-broom', description: 'Limpieza diaria o semanal' },
        'laundry': { label: 'Servicio de lavandería', icon: 'fa-tshirt', description: 'Lavado y planchado de ropa' },
        'breakfast': { label: 'Desayuno incluido', icon: 'fa-coffee', description: 'Desayuno continental' },
        'transport': { label: 'Transporte al aeropuerto', icon: 'fa-plane', description: 'Traslado desde/hacia el aeropuerto' },
        'concierge': { label: 'Servicio de conserje', icon: 'fa-concierge-bell', description: 'Asistencia personalizada' },
        'grocery': { label: 'Servicio de compras', icon: 'fa-shopping-cart', description: 'Compra de alimentos y productos' },
        'tour_guide': { label: 'Guía turístico', icon: 'fa-map-marked-alt', description: 'Tours y recomendaciones locales' },
        'babysitting': { label: 'Cuidado de niños', icon: 'fa-baby', description: 'Servicio de niñera' },
        'massage': { label: 'Servicio de masajes', icon: 'fa-spa', description: 'Masajes relajantes' },
        'chef': { label: 'Chef privado', icon: 'fa-utensils', description: 'Preparación de comidas' }
    };

    const characteristicIcons = {
        'ocean_view': { label: 'Vista al mar', icon: 'fa-water', value: 'Vista panorámica al océano' },
        'mountain_view': { label: 'Vista a las montañas', icon: 'fa-mountain', value: 'Vista a las montañas' },
        'city_view': { label: 'Vista a la ciudad', icon: 'fa-city', value: 'Vista urbana' },
        'historic': { label: 'Edificio histórico', icon: 'fa-landmark', value: 'Patrimonio arquitectónico' },
        'modern': { label: 'Diseño moderno', icon: 'fa-gem', value: 'Diseño contemporáneo' },
        'luxury': { label: 'Propiedad de lujo', icon: 'fa-crown', value: 'Acabados premium' },
        'eco_friendly': { label: 'Eco-amigable', icon: 'fa-leaf', value: 'Sostenible y ecológico' },
        'quiet': { label: 'Zona tranquila', icon: 'fa-volume-mute', value: 'Ambiente silencioso' },
        'central': { label: 'Ubicación céntrica', icon: 'fa-map-marker-alt', value: 'Centro de la ciudad' },
        'beachfront': { label: 'Frente a la playa', icon: 'fa-umbrella-beach', value: 'Acceso directo a la playa' },
        'renovated': { label: 'Recientemente renovado', icon: 'fa-hammer', value: 'Renovación reciente' },
        'spacious': { label: 'Espacioso', icon: 'fa-expand-arrows-alt', value: 'Amplios espacios' }
    };

    const houseRuleIcons = {
        'no_smoking': { label: 'No se permite fumar', icon: 'fa-smoking-ban', text: 'Prohibido fumar en toda la propiedad' },
        'no_pets': { label: 'No se permiten mascotas', icon: 'fa-ban', text: 'No se admiten animales domésticos' },
        'no_parties': { label: 'No se permiten fiestas', icon: 'fa-music', text: 'Prohibidas las fiestas y eventos ruidosos' },
        'quiet_hours': { label: 'Horas de silencio', icon: 'fa-volume-mute', text: 'Mantener silencio de 10 PM a 8 AM' },
        'no_shoes': { label: 'No usar zapatos dentro', icon: 'fa-shoe-prints', text: 'Quitarse los zapatos al ingresar' },
        'clean_up': { label: 'Mantener limpio', icon: 'fa-broom', text: 'Mantener la propiedad limpia y ordenada' },
        'check_in_time': { label: 'Horario de check-in', icon: 'fa-clock', text: 'Check-in: 3:00 PM - 10:00 PM' },
        'check_out_time': { label: 'Horario de check-out', icon: 'fa-door-open', text: 'Check-out antes de las 11:00 AM' },
        'max_guests': { label: 'Límite de huéspedes', icon: 'fa-users', text: 'No exceder el número máximo de huéspedes' },
        'energy_saving': { label: 'Ahorro de energía', icon: 'fa-lightbulb', text: 'Apagar luces y equipos al salir' }
    };

    // ✅ FUNCIÓN PARA CONVERTIR STRINGS A OBJETOS CON ÍCONOS
    const parseDataWithIcons = (dataArray, iconMap) => {
        if (!Array.isArray(dataArray)) return [];
        
        return dataArray.map(item => {
            if (typeof item === 'string') {
                // Buscar el item por ID o por label
                const mapData = iconMap[item] || null;
                if (mapData) {
                    return {
                        name: mapData.label,
                        icon: mapData.icon,
                        description: mapData.description || null,
                        value: mapData.value || null,
                        text: mapData.text || null
                    };
                }
                // Si no se encuentra, devolver con icono por defecto
                return {
                    name: item,
                    icon: 'fa-check'
                };
            }
            return item; // Si ya es un objeto, devolverlo tal como está
        });
    };

    const {
        title,
        platform,
        price_per_night,
        currency,
        address,
        department,
        province,
        district,
        city,
        country,
        bedrooms,
        bathrooms,
        max_guests,
        area_m2,
        description,
        short_description,
        main_image,
        gallery,
        rating,
        reviews_count,
        amenities: rawAmenities,
        services: rawServices,
        characteristics: rawCharacteristics,
        house_rules: rawHouseRules,
        check_in_info,
        latitude,
        longitude,
        slug,
        active,
        featured,
        availability_status
    } = property || {};

    // ✅ PROCESAR DATOS CON ÍCONOS
    const amenities = parseDataWithIcons(rawAmenities, amenityIcons);
    const services = parseDataWithIcons(rawServices, serviceIcons);
    const characteristics = parseDataWithIcons(rawCharacteristics, characteristicIcons);
    const house_rules = parseDataWithIcons(rawHouseRules, houseRuleIcons);

    // ✅ DEBUG: Mostrar datos en consola para verificar
    useEffect(() => {
        if (property?.id) {
            console.log('🔍 DEBUGGING PropertyDetail - Datos recibidos:');
            console.log('  - Raw Amenities:', rawAmenities);
            console.log('  - Raw Services:', rawServices);
            console.log('  - Raw Characteristics:', rawCharacteristics);
            console.log('  - Raw House Rules:', rawHouseRules);
            console.log('  - Processed Amenities:', amenities);
            console.log('  - Processed Services:', services);
            console.log('  - Processed Characteristics:', characteristics);
            console.log('  - Processed House Rules:', house_rules);
        }
    }, [property?.id, rawAmenities, rawServices, rawCharacteristics, rawHouseRules]);

    // Declarar allImages aquí para que esté disponible en useEffect
    const allImages = [main_image, ...(gallery || [])].filter(Boolean);

    // ✅ FUNCIONES DE DEBUGGING Y UTILIDAD
    const clearSessionViewData = () => {
        if (property?.id) {
            const cardClickKey = `property_card_clicked_${property.id}`;
            const detailViewKey = `property_detail_viewed_${property.id}`;
            const gallerySessionKey = `gallery_viewed_${property.id}`;
            const cardTimestampKey = `${cardClickKey}_timestamp`;
            const detailTimestampKey = `${detailViewKey}_timestamp`;
            const galleryTimestampKey = `${gallerySessionKey}_timestamp`;
            const executionCountKey = `${detailViewKey}_executions`;
            
            sessionStorage.removeItem(cardClickKey);
            sessionStorage.removeItem(detailViewKey);
            sessionStorage.removeItem(gallerySessionKey);
            sessionStorage.removeItem(cardTimestampKey);
            sessionStorage.removeItem(detailTimestampKey);
            sessionStorage.removeItem(galleryTimestampKey);
            sessionStorage.removeItem(executionCountKey);
            
            console.log('🧹 Datos de sesión limpiados para propiedad:', property.id);
        }
    };

    const checkSessionStatus = () => {
        if (property?.id) {
            const cardClickKey = `property_card_clicked_${property.id}`;
            const detailViewKey = `property_detail_viewed_${property.id}`;
            const gallerySessionKey = `gallery_viewed_${property.id}`;
            
            console.log('📋 Estado de sesión para propiedad:', property.id);
            console.log('  - Click en card:', sessionStorage.getItem(cardClickKey) || 'No registrado');
            console.log('  - Vista de detalle:', sessionStorage.getItem(detailViewKey) || 'No registrada');
            console.log('  - Vista de galería:', sessionStorage.getItem(gallerySessionKey) || 'No registrada');
        }
    };

    const checkReactStrictMode = () => {
        console.log('🔍 Verificando React Strict Mode...');
        console.log('  - NODE_ENV:', process.env.NODE_ENV);
        console.log('  - StrictMode detectado:', document.querySelector('[data-reactroot]') ? 'Posible' : 'No detectado');
        
        // Verificar si hay doble ejecución de useEffect
        const testKey = 'react_strict_mode_test';
        const currentCount = parseInt(sessionStorage.getItem(testKey) || '0') + 1;
        sessionStorage.setItem(testKey, currentCount.toString());
        
        setTimeout(() => {
            const finalCount = parseInt(sessionStorage.getItem(testKey) || '0');
            console.log('  - Ejecuciones detectadas:', finalCount);
            if (finalCount > 1) {
                console.log('⚠️ React Strict Mode o re-renders múltiples detectados');
            }
            sessionStorage.removeItem(testKey);
        }, 500);
    };

    // ✅ EJECUTAR FUNCIONES DE DEBUGGING SOLO UNA VEZ
    useEffect(() => {
        // Solo ejecutar si no se ha ejecutado antes en esta sesión
        const debugExecutedKey = 'debug_functions_executed';
        const alreadyExecuted = sessionStorage.getItem(debugExecutedKey);
        
        if (!alreadyExecuted && typeof window !== 'undefined') {
            sessionStorage.setItem(debugExecutedKey, 'true');
            
            // ✅ FUNCIÓN MEJORADA PARA DEBUGGING
            window.debugPropertyView = () => {
                if (property?.id) {
                    const cardClickKey = `property_card_clicked_${property.id}`;
                    const detailViewKey = `property_detail_viewed_${property.id}`;
                    const gallerySessionKey = `gallery_viewed_${property.id}`;
                    const executionCountKey = `${detailViewKey}_executions`;
                    
                    const cardClicked = sessionStorage.getItem(cardClickKey);
                    const detailViewed = sessionStorage.getItem(detailViewKey);
                    const galleryViewed = sessionStorage.getItem(gallerySessionKey);
                    const executionCount = sessionStorage.getItem(executionCountKey);
                    
                    console.log('📊 DEBUGGING - Estado completo para propiedad:', property.id);
                    console.log('  - Click en card (sessionStorage):', cardClicked || 'No');
                    console.log('  - Vista de detalle (sessionStorage):', detailViewed || 'No');
                    console.log('  - Galería vista:', galleryViewed || 'No');
                    console.log('  - Ejecuciones de useEffect:', executionCount || '0');
                    console.log('  - NODE_ENV:', process.env.NODE_ENV);
                    
                    if (cardClicked) {
                        const timestamp = sessionStorage.getItem(`${cardClickKey}_timestamp`);
                        console.log('  - Card clicked:', timestamp ? new Date(timestamp).toLocaleString() : 'Sin timestamp');
                    }
                    
                    if (detailViewed) {
                        const timestamp = sessionStorage.getItem(`${detailViewKey}_timestamp`);
                        console.log('  - Detail viewed:', timestamp ? new Date(timestamp).toLocaleString() : 'Sin timestamp');
                    }
                    
                    // Mostrar todas las claves relacionadas
                    console.log('🗂️ Todas las claves en sessionStorage relacionadas:');
                    for (let i = 0; i < sessionStorage.length; i++) {
                        const key = sessionStorage.key(i);
                        if (key && key.includes(property.id)) {
                            console.log(`  - ${key}: ${sessionStorage.getItem(key)}`);
                        }
                    }
                }
            };
            
            window.clearPropertyViewSession = clearSessionViewData;
            window.checkPropertyViewSession = checkSessionStatus;
            window.checkReactStrictMode = checkReactStrictMode;
            
            // Mensaje de ayuda
            console.log('🛠️ Funciones de debugging disponibles:');
            console.log('  - debugPropertyView() - Estado de métricas');
            console.log('  - clearPropertyViewSession() - Limpiar datos');
            console.log('  - checkReactStrictMode() - Verificar Strict Mode');
            console.log('📊 Sistema con protección anti-duplicados implementado');
        }
    }, []); // Solo ejecutar una vez al montar el componente

    useEffect(() => {
        if (initialProperty) {
            setProperty(initialProperty);
        }
        if (initialOtherProperties) {
            setOtherProperties(initialOtherProperties);
        }
        if (initialTitle) {
            setOtherPropertiesTitle(initialTitle);
        }
    }, [initialProperty, initialOtherProperties, initialTitle]);

    // ✅ REGISTRAR VISTA DE PROPIEDAD CUANDO SE CARGA EL DETALLE (CON CONTROL DE SESIÓN CORRECTO)
    useEffect(() => {
        if (property?.id) {
            const viewSessionKey = `property_detail_viewed_${property.id}`;
            const executionCountKey = `${viewSessionKey}_executions`;
            
            // Incrementar contador de ejecuciones para debugging
            const currentExecutions = parseInt(sessionStorage.getItem(executionCountKey) || '0') + 1;
            sessionStorage.setItem(executionCountKey, currentExecutions.toString());
            
            console.log(`🔄 useEffect ejecutándose (vez ${currentExecutions}) para propiedad:`, property.id);
            
            const alreadyViewed = sessionStorage.getItem(viewSessionKey);
            
            // 🔍 DEBUGGING MODE: SIEMPRE ENVIAR (temporalmente deshabilitada la protección)
            const debugMode = true; // ⚠️ CAMBIAR A false EN PRODUCCIÓN
            
            // SI NO HA SIDO VISTA EN ESTA SESIÓN O ESTÁ EN DEBUG MODE, registrarla
            if (!alreadyViewed || debugMode) {
                console.log('🔍 Registrando vista de Property Detail para propiedad:', property.id);
                console.log('🔧 DEBUG MODE:', debugMode ? 'ACTIVADO - enviando siempre' : 'DESACTIVADO');
                
                // MARCAR INMEDIATAMENTE COMO 'processing' para prevenir duplicados
                sessionStorage.setItem(viewSessionKey, debugMode ? `debug_${Date.now()}` : 'processing');
                sessionStorage.setItem(`${viewSessionKey}_timestamp`, new Date().toISOString());
                
                // Agregar un timeout para verificar que no haya otra ejecución en paralelo
                setTimeout(() => {
                    // En debug mode, siempre enviar; en modo normal, verificar status  
                    const shouldSend = debugMode || true; // Forzar siempre para debugging
                    
                    if (shouldSend) {
                        // � DEBUGGING: Verificar session_id antes de enviar
                        const sessionId = sessionStorage.getItem('app_session_id');
                        const fallbackSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                        const finalSessionId = sessionId || fallbackSessionId;
                        
                        console.log('🚀 Enviando petición de Property Detail...');
                        console.log('🆔 Session ID desde sessionStorage:', sessionId);
                        console.log('🆔 Session ID final que se enviará:', finalSessionId);
                        console.log('🔍 Todos los datos en sessionStorage:', Object.keys(sessionStorage).map(key => `${key}: ${sessionStorage.getItem(key)}`));
                        
                        const requestData = {
                            property_id: property.id,
                            event_type: 'property_view',
                            session_id: finalSessionId,
                            metadata: {
                                page: 'property_detail',
                                title: property.title,
                                slug: property.slug,
                                session_controlled: true,
                                timestamp: new Date().toISOString(),
                                source: 'property_detail_page',
                                execution_count: currentExecutions,
                                debug_mode: debugMode
                            }
                        };
                        
                        console.log('📦 Datos que se enviarán:', JSON.stringify(requestData, null, 2));
                        
                        fetch('/api/property-metrics/track', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                            },
                            body: JSON.stringify(requestData)
                        })
                        .then(response => {
                            console.log('📡 Respuesta del servidor:', response.status, response.statusText);
                            return response.text();
                        })
                        .then(responseText => {
                            console.log('📋 Respuesta completa:', responseText);
                            try {
                                const responseJson = JSON.parse(responseText);
                                console.log('✅ Respuesta JSON parseada:', responseJson);
                                sessionStorage.setItem(viewSessionKey, 'completed');
                                console.log('✅ Vista de Property Detail registrada exitosamente');
                            } catch (e) {
                                console.log('⚠️ Respuesta no es JSON válido:', e);
                                sessionStorage.setItem(viewSessionKey, 'error');
                            }
                        })
                        .catch(error => {
                            sessionStorage.setItem(viewSessionKey, 'error');
                            console.log('❌ Error tracking property detail view:', error);
                            console.log('❌ Error completo:', error.stack);
                        });
                    } else {
                        console.log('🔒 Petición cancelada, ya procesada por otra ejecución. Status actual:', currentStatus);
                    }
                }, 50); // Timeout muy corto para evitar race conditions
                
            } else {
                console.log('🔒 Property Detail ya vista en esta sesión para propiedad:', property.id);
                console.log('📊 Status actual:', alreadyViewed);
                const timestamp = sessionStorage.getItem(`${viewSessionKey}_timestamp`);
                if (timestamp) {
                    console.log('📅 Vista registrada el:', new Date(timestamp).toLocaleString());
                }
            }
        }
    }, [property?.id]);

    // ✅ MANEJAR CERRAR MODAL CON TECLA ESCAPE
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isGalleryModalOpen) {
                setIsGalleryModalOpen(false);
            }
        };

        if (isGalleryModalOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            // Prevenir scroll del body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isGalleryModalOpen]);

    // Función para manejar el click en "Ir a Airbnb"
    const handleAirbnbClick = async () => {
        console.log('📊 Iniciando registro de click de Airbnb...');
        
        // Verificar que tenemos un ID válido
        const propertyId = property?.id;
        
        if (!propertyId) {
            console.log('❌ No hay ID de propiedad disponible');
            // Abrir enlace sin registrar métrica
            if (property?.external_link) {
                window.open(property.external_link, '_blank');
            }
            return;
        }
        
        try {
            console.log('📊 Enviando petición al servidor...');
            
            // 🔍 DEBUGGING: Verificar session_id antes de enviar
            const sessionId = sessionStorage.getItem('app_session_id');
            const fallbackSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const finalSessionId = sessionId || fallbackSessionId;
            
            console.log('🆔 Session ID desde sessionStorage:', sessionId);
            console.log('🆔 Session ID final que se enviará:', finalSessionId);
            
            const requestData = {
                property_id: propertyId,
                event_type: 'airbnb_click',
                session_id: finalSessionId,
                metadata: {
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                    external_link: property?.external_link,
                    user_action: 'intentional_click'
                }
            };
            
            console.log('📦 Datos Airbnb que se enviarán:', JSON.stringify(requestData, null, 2));
            
            // USAR RUTA RELATIVA (como el resto de la aplicación)
            const response = await fetch('/api/property-metrics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(requestData)
            });
            
            console.log('📊 Respuesta recibida, status:', response.status);
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ Métrica de click registrada:', result);
            } else {
                console.log('⚠️ Error en respuesta:', response.status);
            }
            
        } catch (error) {
            console.error('❌ Error registrando métrica Airbnb:', error);
        }

        // Verificar y abrir enlace de Airbnb (independientemente del resultado de la métrica)
        if (!property?.external_link) {
            console.log('❌ No se ha configurado un enlace de Airbnb para esta propiedad');
            alert('No se ha configurado un enlace de Airbnb para esta propiedad');
            return;
        }
        
        console.log('📊 Abriendo enlace:', property.external_link);
        window.open(property.external_link, '_blank');
    };

    // Función para abrir el modal de galería y registrar métrica
    const handleViewMorePhotos = () => {
        console.log('🖼️ Abriendo modal de galería para propiedad:', property.id);
        
        // ✅ REGISTRAR MÉTRICA DE INTERACCIÓN CON GALERÍA AL ABRIR MODAL
        const gallerySessionKey = `gallery_viewed_${property.id}`;
        const alreadyViewedGallery = sessionStorage.getItem(gallerySessionKey);
        
        if (!alreadyViewedGallery) {
            console.log('🖼️ Registrando primera interacción con galería en esta sesión:', property.id);
            
            // 🔍 DEBUGGING: Verificar session_id antes de enviar
            const sessionId = sessionStorage.getItem('app_session_id');
            const fallbackSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const finalSessionId = sessionId || fallbackSessionId;
            
            console.log('🆔 Gallery - Session ID desde sessionStorage:', sessionId);
            console.log('🆔 Gallery - Session ID final que se enviará:', finalSessionId);
            
            const requestData = {
                property_id: property.id,
                event_type: 'gallery_view',
                session_id: finalSessionId,
                metadata: {
                    total_images: allImages.length,
                    interaction_type: 'modal_open',
                    session_controlled: true,
                    timestamp: new Date().toISOString()
                }
            };
            
            console.log('📦 Datos Gallery que se enviarán:', JSON.stringify(requestData, null, 2));
            
            fetch('/api/property-metrics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (response.ok) {
                    // Marcar como vista de galería en esta sesión
                    sessionStorage.setItem(gallerySessionKey, 'true');
                    sessionStorage.setItem(`${gallerySessionKey}_timestamp`, new Date().toISOString());
                    console.log('✅ Interacción con galería registrada y marcada en sesión');
                }
            })
            .catch(error => console.log('❌ Error tracking gallery metric:', error));
        } else {
            console.log('🔒 Galería ya vista en esta sesión para propiedad:', property.id);
        }
        
        // Abrir modal
        setIsGalleryModalOpen(true);
    };

    // Función para registrar interacción con el slider (navegación entre imágenes)
    const handleSliderInteraction = (swiper) => {
        // ✅ REGISTRAR MÉTRICA DE INTERACCIÓN CON GALERÍA SOLO CUANDO HAY NAVEGACIÓN REAL
        const gallerySessionKey = `gallery_viewed_${property.id}`;
        const alreadyViewedGallery = sessionStorage.getItem(gallerySessionKey);
        
        if (!alreadyViewedGallery) {
            console.log('🖼️ Registrando primera interacción con galería en esta sesión:', property.id);
            
            // 🔍 DEBUGGING: Verificar session_id antes de enviar
            const sessionId = sessionStorage.getItem('app_session_id');
            const fallbackSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const finalSessionId = sessionId || fallbackSessionId;
            
            console.log('🆔 Gallery - Session ID desde sessionStorage:', sessionId);
            console.log('🆔 Gallery - Session ID final que se enviará:', finalSessionId);
            
            const requestData = {
                property_id: property.id,
                event_type: 'gallery_view',
                session_id: finalSessionId,
                metadata: {
                    total_images: allImages.length,
                    slide_index: swiper.realIndex,
                    interaction_type: 'slider_navigation',
                    session_controlled: true,
                    timestamp: new Date().toISOString()
                }
            };
            
            console.log('📦 Datos Gallery que se enviarán:', JSON.stringify(requestData, null, 2));
            
            fetch('/api/property-metrics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (response.ok) {
                    // Marcar como vista de galería en esta sesión
                    sessionStorage.setItem(gallerySessionKey, 'true');
                    sessionStorage.setItem(`${gallerySessionKey}_timestamp`, new Date().toISOString());
                    console.log('✅ Interacción con galería registrada y marcada en sesión');
                }
            })
            .catch(error => console.log('❌ Error tracking gallery metric:', error));
        } else {
            console.log('🔒 Galería ya vista en esta sesión para propiedad:', property.id);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 -b-2 -secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando propiedad...</p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h1>
                    <p className="text-gray-600">La propiedad que buscas no existe o ha sido eliminada.</p>
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-white">
            <Header/>
            {/* Container principal */}
            <div className=" mx-auto px-[5%]  py-8">{/* Título y ubicación */}
                {/* Título y ubicación */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
                    <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{[address, district, city, province, department].filter(Boolean).join(', ')}</span>
                    </div>
                </div>

                {/* Imagen principal con botón "Ver más fotos" */}
                <div className="mb-8">
                    <div className="relative h-96 rounded-xl overflow-hidden group">
                        {allImages.length > 0 ? (
                            <>
                                {/* Imagen principal */}
                                <img
                                    src={allImages[0] ? `/api/property/media/${allImages[0]}` : '/assets/images/property-placeholder.jpg'}
                                    alt={`${title} - Imagen principal`}
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={handleViewMorePhotos}
                                    onError={(e) => {
                                        e.target.src = '/assets/images/property-placeholder.jpg';
                                    }}
                                />
                                
                                {/* Botón "Ver más fotos" - solo mostrar si hay más de 1 imagen */}
                                {allImages.length > 1 && (
                                    <button
                                        onClick={handleViewMorePhotos}
                                        className="absolute bottom-4 right-4 bg-secondary bg-opacity-90 hover:bg-opacity-100 text-white px-4 py-3 rounded-full font-medium shadow-lg transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm border border-gray-200"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Ver más fotos ({allImages.length})</span>
                                    </button>
                                )}
                                
                               
                            </>
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <p className="text-gray-500">No hay imágenes disponibles</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Layout con columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Columna principal */}
                    <div className="lg:col-span-2">
                        {/* Información básica con íconos */}
                        <div className="mb-8 pb-8 -b ">
                            <div className="flex items-center space-x-8 mb-6">
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                    </svg>
                                    <span>{max_guests || 4} huéspedes</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                    </svg>
                                    <span>{bedrooms || 2} habitaciones</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd"/>
                                    </svg>
                                    <span>{bathrooms || 2} baños</span>
                                </div>
                                {area_m2 && (
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                        <span>{area_m2} m²</span>
                                    </div>
                                )}
                            </div>

                            {/* Rating */}
                            {rating && (
                                <div className="flex items-center">
                                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full mr-4">
                                        <svg className="w-4 h-4 text-yellow-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-bold text-yellow-900">{rating}</span>
                                    </div>
                                  {/*  <span className="text-gray-600">({reviews_count || 0} reseñas)</span> */}
                                    <span className="ml-4 text-gray-600">{[district, city, department].filter(Boolean).join(', ')}</span>
                                </div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="mb-8 pb-8 -b ">
                            <p className="text-gray-700 leading-relaxed">
                                {description || short_description || "Descripción no disponible."}
                            </p>
                        </div>

                        {/* Anfitrión - usando check_in_info si está disponible */}
                        {/*check_in_info && (
                            <div className="mb-8 pb-8 -b ">
                                <h3 className="text-lg font-semibold mb-4">Información del Anfitrión</h3>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                                        {check_in_info.host_avatar ? (
                                            <img 
                                                src={check_in_info.host_avatar} 
                                                alt={check_in_info.host_name || 'Anfitrión'}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <span className="text-lg font-bold text-gray-600">
                                            {(check_in_info.host_name || 'Anfitrión').split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        {check_in_info.host_name && (
                                            <h4 className="font-semibold text-gray-900 mb-1">{check_in_info.host_name}</h4>
                                        )}
                                        {check_in_info.host_phone && (
                                            <p className="text-gray-600 text-sm mb-2">Teléfono: {check_in_info.host_phone}</p>
                                        )}
                                        {check_in_info.host_email && (
                                            <p className="text-gray-600 text-sm mb-2">Email: {check_in_info.host_email}</p>
                                        )}
                                        {check_in_info.instructions && (
                                            <p className="text-gray-700">{check_in_info.instructions}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )*/}

                        {/* Lo que ofrece este lugar - usando amenities de la base de datos */}
                        <div className="mb-8 pb-8 -b ">
                            <h2 className="text-xl font-semibold mb-6">Lo que ofrece este lugar</h2>
                            {amenities && amenities.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center p-3 bg-transparent rounded-lg  ">
                                            <i className={`fas ${amenity.icon || 'fa-check'} text-secondary mr-3 text-lg`}></i>
                                            <span className="font-medium text-gray-900">{amenity.name}</span>
                                            {amenity.available === false && (
                                                <span className="ml-2 text-gray-400 text-sm">(No disponible)</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-transparent0">No hay amenidades registradas.</p>
                            )}
                        </div>

                        {/* Servicios */}
                        {services && services.length > 0 && (
                            <div className="mb-8 pb-8 -b ">
                                <h2 className="text-xl font-semibold mb-6">Servicios</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {services.map((service, index) => (
                                        <div key={index} className="flex items-start p-4 bg-transparent  rounded-xl  -blue-200">
                                            <i className={`fas ${service.icon || 'fa-concierge-bell'} text-secondary mr-3 mt-1 text-lg`}></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                                                {service.description && (
                                                    <p className="text-gray-600 text-sm">{service.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Características */}
                        {characteristics && characteristics.length > 0 && (
                            <div className="mb-8 pb-8 -b ">
                                <h2 className="text-xl font-semibold mb-6">Características</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {characteristics.map((characteristic, index) => (
                                        <div key={index} className="flex items-start p-4  rounded-xl  -green-200">
                                            <i className={`fas ${characteristic.icon || 'fa-info'} text-secondary mr-3 mt-1 text-lg`}></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{characteristic.name}</h4>
                                                {characteristic.value && (
                                                    <p className="text-gray-600 text-sm">{characteristic.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Políticas del alojamiento y reglas de la casa */}
                        <div className="mb-8 pb-8 -b ">
                            <h2 className="text-xl font-semibold mb-6">Políticas del alojamiento</h2>
                            <div className="space-y-4">
                                {/* Información de check-in/out desde check_in_info */}
                                {check_in_info && (
                                    <>
                                        {check_in_info.check_in_time && (
                                            <div>
                                                <span className="font-medium">Check-in:</span>
                                                <span className="ml-2 text-gray-600">{check_in_info.check_in_time}</span>
                                            </div>
                                        )}
                                        {check_in_info.check_out_time && (
                                            <div>
                                                <span className="font-medium">Check-out:</span>
                                                <span className="ml-2 text-gray-600">{check_in_info.check_out_time}</span>
                                            </div>
                                        )}
                                        {check_in_info.cancellation_policy && (
                                            <div>
                                                <span className="font-medium">Cancelación:</span>
                                                <span className="ml-2 text-gray-600">{check_in_info.cancellation_policy}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                                
                                {/* Reglas de la casa desde house_rules */}
                                {house_rules && house_rules.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold mb-4">Reglas de la casa</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            {house_rules.map((rule, index) => (
                                                <div key={index} className="flex items-start p-4  rounded-xl  -orange-200">
                                                    <i className={`fas ${rule.icon || 'fa-info-circle'} text-secondary  mr-3 mt-1 text-lg`}></i>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 mb-1">{rule.name}</h4>
                                                        {rule.text && (
                                                            <p className="text-gray-600 text-sm">{rule.text}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-6">Ubicación</h2>
                            {latitude && longitude ? (
                                <div className="h-64 rounded-lg overflow-hidden">
                                    <LoadScript googleMapsApiKey={Global.GMAPS_API_KEY}>
                                        <GoogleMap
                                            mapContainerStyle={{
                                                width: "100%",
                                                height: "256px",
                                            }}
                                            center={{
                                                lat: parseFloat(latitude),
                                                lng: parseFloat(longitude)
                                            }}
                                            zoom={15}
                                            options={{
                                                disableDefaultUI: false,
                                                zoomControl: true,
                                                streetViewControl: false,
                                                mapTypeControl: false,
                                                fullscreenControl: true,
                                            }}
                                        >
                                            <Marker 
                                                position={{
                                                    lat: parseFloat(latitude),
                                                    lng: parseFloat(longitude)
                                                }}
                                                title={title}
                                            />
                                        </GoogleMap>
                                    </LoadScript>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="text-gray-600">Ubicación no disponible</p>
                                    <p className="text-sm text-transparent0">No se han proporcionado coordenadas</p>
                                    {latitude && longitude && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            Coordenadas: {latitude}, {longitude}
                                        </p>
                                    )}
                                </div>
                            )}
                            
                            {/* Información de ubicación */}
                            <div className="mt-4 p-4 bg-transparent rounded-lg">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-secondary mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-gray-900 mb-1">Dirección</p>
                                        <p className="text-gray-600">{[address, district, city, province, department].filter(Boolean).join(', ')}</p>
                                        {latitude && longitude && (
                                            <p className="text-xs text-gray-400 mt-2">
                                                Coordenadas: {latitude}, {longitude}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar de reserva */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white  -gray-300 rounded-xl shadow-lg p-6">
                                {/* Precio y rating */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-2xl font-bold">{currency}/{parseFloat(price_per_night).toFixed(0)}</span>
                                        <span className="text-transparent0 ml-1">noche</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-semibold">{rating || '4.6'}</span>
                                     {/*   <span className="text-transparent0 ml-1">({reviews_count || 127} reseñas)</span> */}
                                    </div>
                                </div>

                                {/* Fechas y huéspedes */}
                                <div className=" -gray-300 rounded-lg mb-4">
                                    <div className="grid grid-cols-2 -b -gray-300">
                                        <div className="p-3 -r -gray-300">
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Llegada</label>
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full -none outline-none text-sm"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Salida</label>
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full -none outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Huéspedes</label>
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            className="w-full -none outline-none text-sm"
                                        >
                                            {[...Array(max_guests || 4)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1} huésped{i > 0 ? 'es' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Botón principal de reserva - Ir a Airbnb */}
                                <button 
                                    onClick={handleAirbnbClick}
                                    className="w-full bg-secondary hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 mb-3"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.1,22.2c1.2-1.2,2.7-3.1,4.1-5.8c0.6-1.2,1.2-2.5,1.7-3.9c0.4-1.3,0.7-2.6,0.7-3.9c0-3.4-2.8-6.2-6.2-6.2 s-6.2,2.8-6.2,6.2c0,1.3,0.3,2.6,0.7,3.9c0.5,1.4,1.1,2.7,1.7,3.9C10.4,19.1,11.9,21,13.1,22.2z M13.1,5.8c1.9,0,3.4,1.5,3.4,3.4 s-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4S11.2,5.8,13.1,5.8z"/>
                                    </svg>
                                    <span>Ver en Airbnb</span>
                                </button>

                                <div className="text-center text-sm text-transparent0 mb-4">
                                    No se hará ningún cargo por el momento
                                </div>

                                {/* Desglose de precios */}
                              {/*  <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="underline">{currency}/{parseFloat(price_per_night).toFixed(0)} x 5 noches</span>
                                        <span>{currency}/{(parseFloat(price_per_night) * 5).toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline">Tarifa de servicio</span>
                                        <span>{currency}/{(parseFloat(price_per_night) * 0.1).toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline">Impuestos</span>
                                        <span>{currency}/{(parseFloat(price_per_night) * 0.05).toFixed(0)}</span>
                                    </div>
                                    <div className="-t  pt-3">
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>{currency}/{(parseFloat(price_per_night) * 5 + parseFloat(price_per_night) * 0.15).toFixed(0)}</span>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de galería con swiper completo */}
            {isGalleryModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4">
                    <div className="relative w-full h-full max-w-xl max-h-96">
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setIsGalleryModalOpen(false)}
                            className="absolute top-4 right-4 z-30 w-12 h-12 bg-black bg-opacity-50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Título de la propiedad */}
                        <div className="absolute top-4 left-4 z-30 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <p className="text-sm opacity-90">{allImages.length} fotos</p>
                        </div>

                        {/* Swiper en modal */}
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            <style jsx>{`
                                .gallery-modal-swiper .swiper-pagination-bullet {
                                    width: 8px !important;
                                    height: 8px !important;
                                    background: white !important;
                                    opacity: 0.7 !important;
                                    transition: all 0.3s ease !important;
                                    margin: 0 4px !important;
                                }
                                .gallery-modal-swiper .swiper-pagination-bullet-active {
                                    width: 20px !important;
                                    height: 8px !important;
                                    border-radius: 12px !important;
                                    opacity: 1 !important;
                                    background: white !important;
                                }
                            `}</style>
                            <Swiper
                                modules={[Pagination, Navigation]}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop={allImages.length > 1}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={{
                                    nextEl: '.gallery-modal-swiper-button-next',
                                    prevEl: '.gallery-modal-swiper-button-prev',
                                }}
                                onSlideChange={(swiper) => {
                                    setCurrentImageIndex(swiper.realIndex);
                                    handleSliderInteraction(swiper);
                                }}
                                className="gallery-modal-swiper w-full h-full"
                            >
                                {allImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="w-full h-full flex items-center justify-center bg-black">
                                            <img
                                                src={image ? `/api/property/media/${image}` : '/assets/images/property-placeholder.jpg'}
                                                alt={`${title} - Vista ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/assets/images/property-placeholder.jpg';
                                                }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                                
                                {/* Navigation arrows */}
                                {allImages.length > 1 && (
                                    <>
                                        <div className="gallery-modal-swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black bg-opacity-50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </div>
                                        <div className="gallery-modal-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black bg-opacity-50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                                
                               
                            </Swiper>
                        </div>
                    </div>
                </div>
            )}

            {/*SECCION LO MAS VISITADO */}
            {/* Sección de propiedades relacionadas o destacadas */}
            {otherProperties && otherProperties.length > 0 && (
                <div >
                    <DestacadosSection
                        propiedades={otherProperties}
                        titulo={otherPropertiesTitle}
                    />
                </div>
            )}
            <Footer/>

        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <PropertyDetail {...properties} />
            </Base>
        </CarritoProvider>
    );
});


