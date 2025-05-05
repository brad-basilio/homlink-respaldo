import React from "react";
import InputFormGroup from "../../Components/Adminto/form/InputFormGroup";
import DragDropImage from "../../components/Adminto/form/DragDropImage";

const RequirementCard = ({
    requirement,
    index,
    onUpdate,
    onRemove,
    onAddCharacteristic,
    onUpdateCharacteristic,
    onRemoveCharacteristic,
}) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6>Requisito #{index + 1}</h6>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemove(index)}
                    >
                        Eliminar Requisito
                    </button>
                </div>

                <InputFormGroup
                    label="Título del requisito"
                    value={requirement.title}
                    onChange={(e) => onUpdate(index, "title", e.target.value)}
                />

                <DragDropImage
                    current="purchaseOption"
                    label="Imagen del requisito"
                    currentImage={requirement.image}
                    onChange={(imageData) =>
                        onUpdate(index, "image", imageData)
                    }
                    aspect={16 / 9}
                />

                <div className="mb-3">
                    <label className="form-label">Características</label>
                    {requirement.characteristics.map((char, charIndex) => (
                        <div
                            key={`req-${index}-char-${charIndex}`}
                            className="input-group mb-2"
                        >
                            <input
                                type="text"
                                className="form-control"
                                value={char}
                                onChange={(e) =>
                                    onUpdateCharacteristic(
                                        index,
                                        charIndex,
                                        e.target.value
                                    )
                                }
                            />
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() =>
                                    onRemoveCharacteristic(index, charIndex)
                                }
                                disabled={
                                    requirement.characteristics.length <= 1
                                }
                            >
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onAddCharacteristic(index)}
                    >
                        Agregar Característica
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequirementCard;
