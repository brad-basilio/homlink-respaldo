import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";

import Modal from "../Components/Adminto/Modal";
import Table from "../Components/Adminto/Table";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import DxButton from "../Components/dx/DxButton";
import CreateReactScript from "../Utils/CreateReactScript";
import ReactAppend from "../Utils/ReactAppend";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import { LanguageProvider } from "../context/LanguageContext";
import DragDropImage from "../components/Adminto/form/DragDropImage";
import PurchaseOptionsRest from "../actions/Admin/PurchaseOptionsRest";
import RequirementCard from "./components/RequirementCard";

const servicesRest = new PurchaseOptionsRest();
// Componente FeatureCard simplificado
const FeatureCard = ({
    feature,
    index,
    onUpdate,
    onRemove,
    type,
    canRemove,
    characteristics,
    benefits,
    addCharacteristic,
    addBenefit,
}) => {
    const handleFieldChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const handleImageChange = (imageData) => {
        onUpdate(index, "image", imageData);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <InputFormGroup
                            label="Título"
                            value={feature.title}
                            onChange={(e) =>
                                handleFieldChange("title", e.target.value)
                            }
                        />
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                value={feature.description}
                                onChange={(e) =>
                                    handleFieldChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <DragDropImage
                            current="purchaseOption"
                            label="Imagen"
                            currentImage={feature.image}
                            onChange={handleImageChange}
                            aspect={16 / 9}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemove(index)}
                        disabled={!canRemove}
                    >
                        Eliminar
                    </button>
                    {(type === "characteristic" &&
                        index === characteristics.length - 1) ||
                    (type === "benefit" && index === benefits.length - 1) ? (
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={
                                type === "characteristic"
                                    ? addCharacteristic
                                    : addBenefit
                            }
                        >
                            Agregar{" "}
                            {type === "characteristic"
                                ? "Característica"
                                : "Beneficio"}
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
const PurchaseOptions = ({ brands }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref - Siguiendo el patrón del primer código
    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const howItHelpsRef = useRef();
    const descriptionHelpsRef = useRef();
    const valuePropositionRef = useRef();
    const innovationFocusRef = useRef();
    const customerRelationRef = useRef();

    const howItRequirementsRef = useRef();
    const descriptionRequirementsRef = useRef();

    // Refs para imágenes - igual que en el primer código
    const imageRef = useRef();
    const imageSecondaryRef = useRef();
    const imageBannerRef = useRef();

    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Estados para características y beneficios
    const [characteristics, setCharacteristics] = useState([
        { title: "", description: "", image: undefined },
    ]);
    const [benefits, setBenefits] = useState([
        { title: "", description: "", image: undefined },
    ]);
    const [requirements, setRequirements] = useState([
        {
            title: "",
            image: undefined,
            characteristics: [""],
        },
    ]);
    // Funciones para características (simplificadas)
    const addCharacteristic = () => {
        setCharacteristics([
            ...characteristics,
            {
                title: "",
                description: "",
                image: undefined,
            },
        ]);
    };

    const updateCharacteristic = useCallback((index, field, value) => {
        setCharacteristics((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const removeCharacteristic = (index) => {
        if (characteristics.length <= 1) return;
        setCharacteristics(characteristics.filter((_, i) => i !== index));
    };

    // Funciones para beneficios (simplificadas)
    const addBenefit = () => {
        setBenefits([
            ...benefits,
            {
                title: "",
                description: "",
                image: undefined,
            },
        ]);
    };
    const updateBenefit = useCallback((index, field, value) => {
        setBenefits((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const removeBenefit = (index) => {
        if (benefits.length <= 1) return;
        setBenefits(benefits.filter((_, i) => i !== index));
    };

    // Funciones para manejar múltiples requisitos
    const addRequirement = () => {
        setRequirements([
            ...requirements,
            {
                title: "",
                image: undefined,
                characteristics: [""],
            },
        ]);
    };

    const updateRequirement = (index, field, value) => {
        setRequirements((prev) =>
            prev.map((req, i) =>
                i === index ? { ...req, [field]: value } : req
            )
        );
    };

    const removeRequirement = (index) => {
        if (requirements.length <= 1) return;
        setRequirements(requirements.filter((_, i) => i !== index));
    };

    // Función para manejar características dentro de cada requisito
    const updateRequirementCharacteristic = (reqIndex, charIndex, value) => {
        setRequirements((prev) =>
            prev.map((req, i) => {
                if (i === reqIndex) {
                    const newCharacteristics = [...req.characteristics];
                    newCharacteristics[charIndex] = value;
                    return { ...req, characteristics: newCharacteristics };
                }
                return req;
            })
        );
    };

    const addRequirementCharacteristic = (reqIndex) => {
        setRequirements((prev) =>
            prev.map((req, i) => {
                if (i === reqIndex) {
                    return {
                        ...req,
                        characteristics: [...req.characteristics, ""],
                    };
                }
                return req;
            })
        );
    };

    const removeRequirementCharacteristic = (reqIndex, charIndex) => {
        setRequirements((prev) =>
            prev.map((req, i) => {
                if (i === reqIndex) {
                    return {
                        ...req,
                        characteristics: req.characteristics.filter(
                            (_, ci) => ci !== charIndex
                        ),
                    };
                }
                return req;
            })
        );
    };

    // Cargar datos al editar - similar al primer código
    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        // Resetear valores como en el primer código
        idRef.current.value = data?.id ?? "";
        titleRef.current.value = data?.title ?? "";
        descriptionRef.current.value = data?.description ?? "";
        howItHelpsRef.current.value = data?.how_it_helps ?? "";
        descriptionHelpsRef.current.value = data?.description_helps ?? "";
        valuePropositionRef.current.value = data?.value_proposition ?? "";
        innovationFocusRef.current.value = data?.innovation_focus ?? "";
        customerRelationRef.current.value = data?.customer_relation ?? "";

        howItRequirementsRef.current.value = data?.how_it_requirements ?? "";
        descriptionRequirementsRef.current.value =
            data?.description_requirements ?? "";

        // Manejo de imágenes como en el primer código
        imageRef.image.src = `/api/purchaseOption/media/${
            data?.image ?? "undefined"
        }`;
        imageSecondaryRef.image.src = `/api/purchaseOption/media/${
            data?.image_secondary ?? "undefined"
        }`;
        imageBannerRef.image.src = `/api/purchaseOption/media/${
            data?.image_banner ?? "undefined"
        }`;

        // Cargar características y beneficios si existen
        /*if (data?.characteristics) {
            setCharacteristics(
                data.characteristics.map((char) => ({
                    title: char.title || "",
                    description: char.description || "",
                    image: char.image
                        ? { preview: `/api/purchaseOption/media/${char.image}` }
                        : null,
                }))
            );
        }

        if (data?.benefits) {
            setBenefits(
                data.benefits.map((benefit) => ({
                    title: benefit.title || "",
                    description: benefit.description || "",
                    image: benefit.image
                        ? { preview: `/api/purchaseOption/media/${benefit.image}` }
                        : null,
                }))
            );
        }*/
        // En onModalOpen, al cargar características y beneficios
        if (data?.characteristics) {
            setCharacteristics(
                data.characteristics.map((char) => ({
                    title: char.title,
                    description: char.description,
                    image: char.image, // Guardar directamente el string del nombre de archivo
                }))
            );
        }

        if (data?.benefits) {
            setBenefits(
                data.benefits.map((char) => ({
                    title: char.title,
                    description: char.description,
                    image: char.image, // Guardar directamente el string del nombre de archivo
                }))
            );
        }

        if (data?.requirements) {
            setRequirements(
                data.requirements.map((req) => ({
                    title: req.title || "",
                    image: req.image || undefined,
                    characteristics: req.characteristics || [""],
                }))
            );
        }

        $(modalRef.current).modal("show");
    };

    // Enviar formulario - similar al primer código pero adaptado
    const onModalSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Campos básicos como en el primer código
        const request = {
            id: idRef.current.value || undefined,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            how_it_helps: howItHelpsRef.current.value,
            description_helps: descriptionHelpsRef.current.value,
            value_proposition: valuePropositionRef.current.value,
            innovation_focus: innovationFocusRef.current.value,
            customer_relation: customerRelationRef.current.value,

            how_it_requirements: howItRequirementsRef.current.value,
            description_requirements: descriptionRequirementsRef.current.value,
        };

        // Añadir campos básicos al formData
        for (const key in request) {
            formData.append(key, request[key]);
        }

        // Añadir imágenes como en el primer código
        const image = imageRef.current.files[0];
        if (image) formData.append("image", image);

        const imageSecondary = imageSecondaryRef.current.files[0];
        if (imageSecondary) formData.append("image_secondary", imageSecondary);

        const imageBanner = imageBannerRef.current.files[0];
        if (imageBanner) formData.append("image_banner", imageBanner);

        // Dentro de onModalSubmit, al procesar características
        characteristics.forEach((char, index) => {
            formData.append(`characteristics[${index}][title]`, char.title);
            formData.append(
                `characteristics[${index}][description]`,
                char.description
            );

            if (char.image) {
                if (char.image.file) {
                    formData.append(
                        `characteristics[${index}][image]`,
                        char.image.file
                    );
                }
                // Si es una imagen existente (viene del servidor como string)
                else if (typeof char.image === "string") {
                    formData.append(
                        `characteristics[${index}][existing_image]`,
                        char.image
                    );
                }
            }
        });

        benefits.forEach((char, index) => {
            formData.append(`benefits[${index}][title]`, char.title);
            formData.append(
                `benefits[${index}][description]`,
                char.description
            );

            if (char.image) {
                if (char.image.file) {
                    formData.append(
                        `benefits[${index}][image]`,
                        char.image.file
                    );
                }
                // Si es una imagen existente (viene del servidor como string)
                else if (typeof char.image === "string") {
                    formData.append(
                        `benefits[${index}][existing_image]`,
                        char.image
                    );
                }
            }
        });

        // Procesar requisitos
        const processedRequirements = requirements.map((req, index) => {
            const reqData = {
                title: req.title,
                characteristics: req.characteristics.filter(
                    (c) => c.trim() !== ""
                ),
            };

            // Manejar imagen nueva
            if (req.image?.file) {
                formData.append(
                    `requirements[${index}][image]`,
                    req.image.file
                );
            }
            // Mantener imagen existente
            else if (typeof req.image === "string") {
                reqData.image = req.image;
            }

            return reqData;
        });

        processedRequirements.forEach((req, index) => {
            formData.append(`requirements[${index}][title]`, req.title);

            if (req.image) {
                if (typeof req.image === "object" && req.image.file) {
                    formData.append(
                        `requirements[${index}][image]`,
                        req.image.file
                    );
                } else if (typeof req.image === "string") {
                    formData.append(
                        `requirements[${index}][existing_image]`,
                        req.image
                    );
                }
            }

            req.characteristics.forEach((char, charIndex) => {
                formData.append(
                    `requirements[${index}][characteristics][${charIndex}]`,
                    char
                );
            });
        });

        const result = await servicesRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Opciones de compra"
                rest={servicesRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refrescar tabla",
                            onClick: () =>
                                $(gridRef.current)
                                    .dxDataGrid("instance")
                                    .refresh(),
                        },
                    });
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "plus",
                            text: "Agregar",
                            hint: "Agregar nueva opción de compra",
                            onClick: () => onModalOpen(),
                        },
                    });
                }}
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "title",
                        caption: "Título",
                        width: "200px",
                    },
                    {
                        dataField: "description",
                        caption: "Descripción",
                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <div
                                        className="text-truncate"
                                        style={{ maxWidth: "300px" }}
                                    >
                                        {data.description}
                                    </div>
                                )
                            );
                        },
                    },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/purchaseOption/media/${data.image}`}
                                    style={{
                                        width: "80px",
                                        height: "45px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) =>
                                        (e.target.src =
                                            "/images/default-thumbnail.jpg")
                                    }
                                />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className:
                                        "btn btn-xs btn-soft-primary me-1",
                                    title: "Editar",
                                    icon: "fa fa-pen",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Eliminar",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                })
                            );
                        },
                    },
                ]}
            />

            <Modal
                modalRef={modalRef}
                title={
                    isEditing
                        ? "Editar Opción de Compra"
                        : "Nueva Opción de Compra"
                }
                onSubmit={onModalSubmit}
                size="lg"
            >
                <input ref={idRef} type="hidden" />

                <div className="row">
                    <div className="col-md-6">
                        <InputFormGroup
                            eRef={titleRef}
                            label="Título de la opción de compra"
                            required
                        />
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea
                                ref={descriptionRef}
                                className="form-control"
                                rows={4}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <InputFormGroup
                            eRef={howItHelpsRef}
                            label="Cómo ayuda"
                        />
                        <div className="mb-3">
                            <label className="form-label">
                                Descripción de ayuda
                            </label>
                            <textarea
                                ref={descriptionHelpsRef}
                                className="form-control"
                                rows={4}
                            />
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <ImageFormGroup
                            eRef={imageRef}
                            label="Imagen principal"
                            aspect={16 / 9}
                        />
                    </div>
                    <div className="col-md-6">
                        <ImageFormGroup
                            eRef={imageSecondaryRef}
                            label="Imagen secundaria"
                            aspect={16 / 9}
                        />
                    </div>
                    <div className="col-md-12 mt-3">
                        <ImageFormGroup
                            eRef={imageBannerRef}
                            label="Banner"
                            aspect={16 / 9}
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <InputFormGroup
                            eRef={valuePropositionRef}
                            label="Propuesta de valor"
                        />
                        <h5 className="mb-3">Características</h5>
                        {characteristics.map((char, index) => (
                            <FeatureCard
                                key={`char-${index}`}
                                feature={char}
                                index={index}
                                onUpdate={updateCharacteristic}
                                onRemove={removeCharacteristic}
                                canRemove={characteristics.length > 1}
                                type="characteristic"
                                characteristics={characteristics}
                                benefits={benefits}
                                addCharacteristic={addCharacteristic}
                                addBenefit={addBenefit}
                            />
                        ))}
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <InputFormGroup
                            eRef={innovationFocusRef}
                            label="Enfoque de innovación"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">
                                Relación con el cliente
                            </label>
                            <textarea
                                ref={customerRelationRef}
                                className="form-control"
                                rows={5}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h5 className="mb-3 mt-4">Beneficios</h5>
                        {benefits.map((benefit, index) => (
                            <FeatureCard
                                key={`benefit-${index}`}
                                feature={benefit}
                                index={index}
                                onUpdate={updateBenefit}
                                onRemove={removeBenefit}
                                canRemove={benefits.length > 1}
                                type="benefit"
                                characteristics={characteristics}
                                benefits={benefits}
                                addCharacteristic={addCharacteristic}
                                addBenefit={addBenefit}
                            />
                        ))}
                    </div>
                </div>

                {/* Sección de Requisitos */}
                <div className="row mt-3">
                    <div className="col-12">
                        <h5 className="mb-3">Requisitos</h5>

                        <div className="mb-3">
                            <InputFormGroup
                                eRef={howItRequirementsRef}
                                label="Cómo funciona los requisitos"
                            />
                            <div className="mb-3">
                                <label className="form-label">
                                    Descripción de requisitos
                                </label>
                                <textarea
                                    ref={descriptionRequirementsRef}
                                    className="form-control"
                                    rows={4}
                                />
                            </div>
                        </div>

                        {requirements &&
                            requirements.map((requirement, index) => (
                                <RequirementCard
                                    key={`requirement-${index}`}
                                    requirement={requirement}
                                    index={index}
                                    onUpdate={updateRequirement}
                                    onRemove={removeRequirement}
                                    onAddCharacteristic={
                                        addRequirementCharacteristic
                                    }
                                    onUpdateCharacteristic={
                                        updateRequirementCharacteristic
                                    }
                                    onRemoveCharacteristic={
                                        removeRequirementCharacteristic
                                    }
                                />
                            ))}

                        <button
                            type="button"
                            className="btn btn-primary mt-2"
                            onClick={addRequirement}
                        >
                            <i className="fa fa-plus me-2"></i> Agregar
                            Requisito
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <LanguageProvider>
            <BaseAdminto {...properties} title="Opción de Compras">
                <PurchaseOptions {...properties} />
            </BaseAdminto>
        </LanguageProvider>
    );
});
