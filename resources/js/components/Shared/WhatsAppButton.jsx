import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import GeneralRest from "../../actions/GeneralRest";

const WhatsAppButton = ({ 
    children = "Reserva una consulta",
    variant = "primary", // primary, secondary, minimal
    size = "medium", // small, medium, large
    showIcon = true,
    className = "",
    customMessage = null,
    customPhone = null,
    ...props 
}) => {
    const [whatsappData, setWhatsappData] = useState({
        phone: null,
        message: null
    });
    const [loading, setLoading] = useState(true);
 const [aboutuses, setAboutuses] = useState(null); // o useState({});

  

    const aboutusData = aboutuses?.aboutus || [];
    const generalsData = aboutuses?.generals || [];
    useEffect(() => {
        const fetchWhatsAppData = async () => {
            try {
                const generalRest = new GeneralRest();
                generalRest.enableNotifications = false;
                
                const data = await generalRest.getAboutuses();
                   

                if (data) {
                    const phoneData = data?.generals?.find(item => 
                        item.correlative === 'whatsapp_phone'
                    );
                    const messageData =data?.generals?.find(item => 
                        item.correlative === 'whatsapp_message'
                    );

                    setWhatsappData({
                        phone: phoneData?.description || null,
                        message: messageData?.description || "Hola, me gustaría reservar una consulta."
                    });
                }
            } catch (error) {
                console.error('Error fetching WhatsApp data:', error);
                // Valores por defecto en caso de error
                setWhatsappData({
                    phone: null,
                    message: "Hola, me gustaría reservar una consulta."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchWhatsAppData();
    }, []);

    const handleClick = () => {
        const phone = customPhone || whatsappData.phone;
        const message = customMessage || whatsappData.message;

        if (!phone) {
            console.warn('No se encontró número de WhatsApp configurado');
            return;
        }

        // Limpiar el número de teléfono (quitar espacios, guiones, etc.)
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);
        
        // Crear URL de WhatsApp
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
        
        // Abrir en nueva ventana
        window.open(whatsappUrl, '_blank');
    };

    // Clases base según variante
    const getVariantClasses = () => {
        switch (variant) {
            case 'constrast':
                return "bg-constrast text-white ";
            case 'accent':
                return "bg-accent text-white ";
            case 'secondary':
                return "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white";
            case 'minimal':
                return "bg-transparent text-primary hover:bg-primary/10 border border-primary/30";
            default: // primary
                return "bg-primary text-white hover:bg-primary/90";
        }
    };

    // Clases de tamaño
    const getSizeClasses = () => {
        switch (size) {
            case 'small':
                return "px-4 py-2 text-sm";
            case 'large':
                return "px-8 py-4 text-lg";
            default: // medium
                return "px-6 py-3 text-base";
        }
    };

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`inline-flex items-center justify-center rounded-md ${getSizeClasses()} ${getVariantClasses()} ${className} opacity-70 cursor-not-allowed`}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                />
              
            </motion.div>
        );
    }

    if (!whatsappData.phone && !customPhone) {
        return (
            <motion.div
                className={`inline-flex items-center justify-center rounded-md ${getSizeClasses()} bg-gray-300 text-gray-500 cursor-not-allowed ${className}`}
            >
                <Phone className="w-4 h-4 mr-2" />
                No disponible
            </motion.div>
        );
    }

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0, 48, 73, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
            }}
            className={`
                inline-flex items-center justify-center rounded-md 
                font-semibold transition-all duration-300 
                shadow-lg hover:shadow-xl
                ${getSizeClasses()} 
                ${getVariantClasses()} 
                ${className}
            `}
            {...props}
        >
            <motion.span className="flex items-center">
                {children}
               
            </motion.span>
        </motion.button>
    );
};

// Componente especializado para botón con flecha (para mantener compatibilidad)
export const WhatsAppButtonWithArrow = ({ children = "Reserva una consulta", ...props }) => {
    return (
        <WhatsAppButton {...props}>
          
                {children}
               
          
        </WhatsAppButton>
    );
};

export default WhatsAppButton;
