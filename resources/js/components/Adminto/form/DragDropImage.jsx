import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DragDropImage = ({ onChange, currentImage, label, aspect = 16 / 9 }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                onChange({ file, preview: URL.createObjectURL(file) });
            }
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false,
    });

    return (
        <div className="form-group mb-3">
            <label className="form-label">{label}</label>
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? "active" : ""}`}
                style={{
                    border: "2px dashed #ced4da",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    aspectRatio: aspect,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: currentImage
                        ? `url(${
                              typeof currentImage === "string"
                                  ? `/api/service/media/${currentImage}`
                                  : currentImage.preview
                          })`
                        : "none",
                }}
            >
                <input {...getInputProps()} />

                {!currentImage && (
                    <div>
                        {isDragActive ? (
                            <p>Suelta la imagen aquí...</p>
                        ) : (
                            <p>
                                Arrastra una imagen o haz clic para seleccionar
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default DragDropImage;
