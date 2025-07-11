import React, { useState, useCallback } from 'react';
import { Upload, X, Image, AlertCircle, CheckCircle } from 'lucide-react';

const ImageUploadValidator = ({ 
    onImageSelected, 
    maxSizeInMB = 5, 
    maxWidth = 2048, 
    maxHeight = 2048,
    allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    multiple = false,
    currentImage = null,
    className = ""
}) => {
    const [dragOver, setDragOver] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    const validateImageFile = useCallback((file) => {
        return new Promise((resolve, reject) => {
            // Validar tamaño
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                reject(`El archivo es demasiado grande. Tamaño máximo: ${maxSizeInMB}MB`);
                return;
            }

            // Validar formato
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedFormats.includes(fileExtension)) {
                reject(`Formato no permitido. Formatos permitidos: ${allowedFormats.join(', ')}`);
                return;
            }

            // Validar que sea una imagen real y obtener dimensiones
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            img.onload = () => {
                // Validar dimensiones
                if (img.width > maxWidth || img.height > maxHeight) {
                    reject(`Dimensiones demasiado grandes. Máximo: ${maxWidth}x${maxHeight}px. Actual: ${img.width}x${img.height}px`);
                    return;
                }

                // Crear preview
                canvas.width = Math.min(img.width, 300);
                canvas.height = (canvas.width * img.height) / img.width;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const preview = {
                    file,
                    preview: canvas.toDataURL(),
                    width: img.width,
                    height: img.height,
                    size: file.size
                };

                resolve(preview);
            };

            img.onerror = () => {
                reject('El archivo no es una imagen válida');
            };

            img.src = URL.createObjectURL(file);
        });
    }, [maxSizeInMB, maxWidth, maxHeight, allowedFormats]);

    const handleFileSelection = useCallback(async (files) => {
        setIsValidating(true);
        setValidationError('');

        try {
            const fileArray = Array.from(files);
            const validatedImages = [];

            for (const file of fileArray) {
                try {
                    const preview = await validateImageFile(file);
                    validatedImages.push(preview);
                } catch (error) {
                    setValidationError(error);
                    setIsValidating(false);
                    return;
                }
            }

            setPreviewImages(validatedImages);
            onImageSelected(multiple ? validatedImages : validatedImages[0]);
            setIsValidating(false);

        } catch (error) {
            setValidationError(error);
            setIsValidating(false);
        }
    }, [validateImageFile, multiple, onImageSelected]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            if (!multiple && files.length > 1) {
                setValidationError('Solo se permite una imagen');
                return;
            }
            handleFileSelection(files);
        }
    }, [multiple, handleFileSelection]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
    }, []);

    const handleFileInput = useCallback((e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelection(files);
        }
    }, [handleFileSelection]);

    const removeImage = useCallback((index) => {
        const newPreviews = previewImages.filter((_, i) => i !== index);
        setPreviewImages(newPreviews);
        onImageSelected(multiple ? newPreviews : null);
        setValidationError('');
    }, [previewImages, multiple, onImageSelected]);

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Área de subida */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                    dragOver 
                        ? 'border-blue-400 bg-blue-50' 
                        : validationError 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <input
                    type="file"
                    accept={allowedFormats.map(format => `.${format}`).join(',')}
                    multiple={multiple}
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isValidating}
                />

                <div className="text-center">
                    {isValidating ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                            <p className="mt-2 text-sm text-gray-600">Validando imagen...</p>
                        </div>
                    ) : (
                        <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                                Arrastra y suelta {multiple ? 'imágenes' : 'una imagen'} aquí, o{' '}
                                <span className="text-blue-600 font-medium">haz clic para seleccionar</span>
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Máximo {maxSizeInMB}MB, {maxWidth}x{maxHeight}px, formatos: {allowedFormats.join(', ')}
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Error de validación */}
            {validationError && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-red-700">{validationError}</span>
                </div>
            )}

            {/* Previews de imágenes */}
            {previewImages.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">
                        {multiple ? 'Imágenes seleccionadas:' : 'Imagen seleccionada:'}
                    </h4>
                    <div className={`grid gap-4 ${multiple ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                        {previewImages.map((imageData, index) => (
                            <div key={index} className="relative bg-white border border-gray-200 rounded-lg p-3">
                                <div className="flex items-start space-x-3">
                                    <img
                                        src={imageData.preview}
                                        alt="Preview"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {imageData.file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {imageData.width}x{imageData.height}px
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(imageData.size)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="mt-2 flex items-center space-x-1">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-xs text-green-600">Imagen válida</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Imagen actual (si existe) */}
            {currentImage && previewImages.length === 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Imagen actual:</h4>
                    <div className="relative bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                            <img
                                src={currentImage}
                                alt="Imagen actual"
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="text-sm text-gray-600">Imagen existente</p>
                                <p className="text-xs text-gray-500">Selecciona una nueva imagen para reemplazarla</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploadValidator;
