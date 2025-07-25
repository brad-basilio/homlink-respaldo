import React from 'react';
import HtmlContent from './HtmlContent';

const HtmlContentWithInsert = ({ html, insertComponent, className = "" }) => {
    // Función para procesar las imágenes y envolverlas en un div con border-radius
    const processImages = (htmlString) => {
        if (!htmlString) return htmlString;
        
        // Reemplazar todas las etiquetas img con un wrapper
        return htmlString.replace(/<img([^>]*)>/g, (match, attributes) => {
            return `<div class="image-wrapper-rounded" style="
               
                margin-left: auto !important;
                margin-right: auto !important;
                margin-top: 2rem !important;
                margin-bottom: 2rem !important;
                border-radius: 18px !important;
                overflow: hidden !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                position: relative !important;
                display: block !important;
            "><img${attributes} style="
                width: 100% !important;
                height: auto !important;
                display: block !important;
                border-radius: 18px !important;
                margin: 0 !important;
                object-fit: cover !important;
            "></div>`;
        });
    };

    // Función para contar párrafos reales en el HTML
    const countParagraphs = (htmlString) => {
        if (!htmlString) return 0;
        
        // Crear un elemento temporal para parsear el HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        
        // Contar párrafos que no estén vacíos
        const paragraphs = tempDiv.querySelectorAll('p');
        let realParagraphCount = 0;
        
        paragraphs.forEach(p => {
            // Verificar si el párrafo tiene contenido real (no solo espacios o elementos vacíos)
            const textContent = p.textContent || p.innerText || '';
            if (textContent.trim().length > 0) {
                realParagraphCount++;
            }
        });
        
        return realParagraphCount;
    };

    // Función para insertar el componente en la posición correcta
    const insertComponentAtPosition = (htmlString, position) => {
        if (!htmlString || !insertComponent) return htmlString;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        
        const paragraphs = tempDiv.querySelectorAll('p');
        let insertedParagraphCount = 0;
        
        for (let i = 0; i < paragraphs.length; i++) {
            const p = paragraphs[i];
            const textContent = p.textContent || p.innerText || '';
            
            // Solo contar párrafos con contenido real
            if (textContent.trim().length > 0) {
                insertedParagraphCount++;
                
                // Insertar después del párrafo en la posición deseada
                if (insertedParagraphCount === position) {
                    // Crear un marcador único para el componente
                    const marker = document.createElement('div');
                    marker.setAttribute('data-insert-component', 'true');
                    marker.innerHTML = '<!-- COMPONENT_INSERTION_POINT -->';
                    
                    // Insertar el marcador después del párrafo
                    if (p.nextSibling) {
                        p.parentNode.insertBefore(marker, p.nextSibling);
                    } else {
                        p.parentNode.appendChild(marker);
                    }
                    break;
                }
            }
        }
        
        return tempDiv.innerHTML;
    };

    // Determinar la posición de inserción según la lógica solicitada
    const paragraphCount = countParagraphs(html);
    let insertPosition;
    
    if (paragraphCount > 4) {
        // Si tiene más de 4 párrafos, insertar después del segundo
        insertPosition = 2;
    } else if (paragraphCount > 0) {
        // Si tiene párrafos pero 4 o menos, insertar después del primero
        insertPosition = 1;
    } else {
        // Si no hay párrafos, no insertar nada
        insertPosition = null;
    }

    // Si no hay posición válida, renderizar el HTML normal con imágenes procesadas
    if (!insertPosition || !insertComponent) {
        const processedHtml = processImages(html);
        return <HtmlContent className={className} html={processedHtml} />;
    }

    // Procesar las imágenes antes de hacer la inserción
    const htmlWithProcessedImages = processImages(html);
    
    // Procesar el HTML con la inserción
    const processedHtml = insertComponentAtPosition(htmlWithProcessedImages, insertPosition);

    // Dividir el HTML en partes antes y después del marcador
    const parts = processedHtml.split('<!-- COMPONENT_INSERTION_POINT -->');
    
    if (parts.length === 2) {
        return (
            <div className={className}>
                <HtmlContent 
                    className="blog-article-content-part" 
                    html={parts[0]} 
                />
                
                {/* Insertar el componente aquí */}
                <div className="my-12">
                    {insertComponent}
                </div>
                
                <HtmlContent 
                    className="blog-article-content-part" 
                    html={parts[1]} 
                />
            </div>
        );
    }

    // Fallback: renderizar HTML normal si algo sale mal
    return <HtmlContent className={className} html={html} />;
};

export default HtmlContentWithInsert;
