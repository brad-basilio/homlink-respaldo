import React from 'react';

/**
 * Utilidad simple para validar imágenes en el frontend antes de enviar
 */
export class ImageValidator {
    
    /**
     * Valida un archivo de imagen
     * @param {File} file - Archivo a validar
     * @param {number} maxSizeMB - Tamaño máximo en MB (default: 1.5)
     * @returns {object} {isValid: boolean, errors: string[]}
     */
    static validateFile(file, maxSizeMB = 1.5) {
        const errors = [];
        
        if (!file) {
            errors.push('No se ha seleccionado ningún archivo');
            return { isValid: false, errors };
        }
        
        // Validar que sea una imagen
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            errors.push('Formato no válido. Solo se permiten: JPG, PNG, GIF, WebP');
        }
        
        // Validar tamaño
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
            errors.push(`Imagen demasiado pesada. Máximo: ${maxSizeMB}MB, tu archivo: ${fileSizeMB}MB`);
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    
    /**
     * Formatea el tamaño de archivo en MB
     */
    static formatFileSize(bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    }
}

/**
 * Componente para mostrar errores de validación de imágenes
 */
export const ImageValidationErrors = ({ errors, className = '' }) => {
    if (!errors || errors.length === 0) return null;
    
    return (
        <div className={`alert alert-danger mt-2 ${className}`}>
            <ul className="mb-0">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    );
};

/**
 * Hook para manejar validación de imágenes
 */
export const useImageValidation = (maxSizeMB = 1.5) => {
    const [errors, setErrors] = React.useState([]);
    
    const validateFile = React.useCallback((file) => {
        const result = ImageValidator.validateFile(file, maxSizeMB);
        setErrors(result.errors);
        return result.isValid;
    }, [maxSizeMB]);
    
    const clearErrors = React.useCallback(() => {
        setErrors([]);
    }, []);
    
    return {
        errors,
        validateFile,
        clearErrors,
        hasErrors: errors.length > 0
    };
};
