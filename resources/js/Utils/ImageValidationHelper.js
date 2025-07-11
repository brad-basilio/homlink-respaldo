// Helper para validación de imágenes en JavaScript
export class ImageValidator {
    constructor(options = {}) {
        this.maxSizeInMB = options.maxSizeInMB || 5;
        this.maxWidth = options.maxWidth || 2048;
        this.maxHeight = options.maxHeight || 2048;
        this.allowedFormats = options.allowedFormats || ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    }

    async validateFile(file) {
        return new Promise((resolve, reject) => {
            // Validar tamaño
            const maxSizeInBytes = this.maxSizeInMB * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                reject({
                    type: 'size',
                    message: `El archivo es demasiado grande. Tamaño máximo: ${this.maxSizeInMB}MB`,
                    current: this.formatFileSize(file.size),
                    max: this.formatFileSize(maxSizeInBytes)
                });
                return;
            }

            // Validar formato
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!this.allowedFormats.includes(fileExtension)) {
                reject({
                    type: 'format',
                    message: `Formato no permitido. Formatos permitidos: ${this.allowedFormats.join(', ')}`,
                    current: fileExtension,
                    allowed: this.allowedFormats
                });
                return;
            }

            // Validar que sea una imagen real y obtener dimensiones
            const img = new Image();
            
            img.onload = () => {
                // Validar dimensiones
                if (img.width > this.maxWidth || img.height > this.maxHeight) {
                    reject({
                        type: 'dimensions',
                        message: `Dimensiones demasiado grandes. Máximo: ${this.maxWidth}x${this.maxHeight}px`,
                        current: `${img.width}x${img.height}px`,
                        max: `${this.maxWidth}x${this.maxHeight}px`,
                        width: img.width,
                        height: img.height
                    });
                    return;
                }

                resolve({
                    valid: true,
                    file,
                    width: img.width,
                    height: img.height,
                    size: file.size,
                    format: fileExtension,
                    dimensions: `${img.width}x${img.height}px`,
                    sizeFormatted: this.formatFileSize(file.size)
                });
            };

            img.onerror = () => {
                reject({
                    type: 'invalid',
                    message: 'El archivo no es una imagen válida'
                });
            };

            img.src = URL.createObjectURL(file);
        });
    }

    async validateMultiple(files) {
        const results = [];
        const errors = [];

        for (let i = 0; i < files.length; i++) {
            try {
                const result = await this.validateFile(files[i]);
                results.push(result);
            } catch (error) {
                errors.push({
                    file: files[i],
                    index: i,
                    error
                });
            }
        }

        return {
            valid: results,
            errors,
            allValid: errors.length === 0
        };
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    createPreview(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    // Optimización de imagen en el cliente (opcional)
    async compressImage(file, quality = 0.8, maxWidth = null, maxHeight = null) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                const { width, height } = img;
                
                // Calcular nuevas dimensiones si se especifican límites
                let newWidth = width;
                let newHeight = height;

                if (maxWidth && width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = (height * maxWidth) / width;
                }

                if (maxHeight && newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = (width * maxHeight) / height;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                canvas.toBlob((blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    resolve(compressedFile);
                }, 'image/jpeg', quality);
            };

            img.src = URL.createObjectURL(file);
        });
    }

    // Generar thumbnail
    async generateThumbnail(file, size = 150) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                const { width, height } = img;
                const aspectRatio = width / height;

                let thumbWidth = size;
                let thumbHeight = size;

                if (aspectRatio > 1) {
                    thumbHeight = size / aspectRatio;
                } else {
                    thumbWidth = size * aspectRatio;
                }

                canvas.width = thumbWidth;
                canvas.height = thumbHeight;

                ctx.drawImage(img, 0, 0, thumbWidth, thumbHeight);

                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };

            img.src = URL.createObjectURL(file);
        });
    }
}

// Hook personalizado para React
export const useImageValidator = (options = {}) => {
    const validator = new ImageValidator(options);

    const validateFiles = async (files) => {
        if (!files || files.length === 0) {
            return { valid: [], errors: [], allValid: true };
        }

        const fileArray = Array.from(files);
        return await validator.validateMultiple(fileArray);
    };

    return {
        validator,
        validateFiles,
        validateFile: (file) => validator.validateFile(file),
        formatFileSize: (bytes) => validator.formatFileSize(bytes),
        createPreview: (file) => validator.createPreview(file),
        compressImage: (file, quality, maxWidth, maxHeight) => 
            validator.compressImage(file, quality, maxWidth, maxHeight),
        generateThumbnail: (file, size) => validator.generateThumbnail(file, size)
    };
};
