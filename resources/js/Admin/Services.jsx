import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";
import ServicesRest from "../Actions/Admin/ServicesRest";
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
import SelectAPIFormGroupSupport from "../components/Adminto/form/SelectAPIFormGroupSupport";

const servicesRest = new ServicesRest();
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

    addStep,
    steps,

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

                    {(type === "characteristic" ? (
                        <div className="col-md-12">
                            <InputFormGroup
                                label="Título"
                                value={feature.title}
                                onChange={(e) =>
                                    handleFieldChange("title", e.target.value)
                                }
                            />
                        </div>) : (
                        <>
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
                                    label="Imagen"
                                    currentImage={feature.image}
                                    onChange={handleImageChange}
                                    aspect={16 / 9}
                                />
                            </div>
                        </>
                    ))}
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
                        (type === "benefit" && index === benefits.length - 1) || (type === "step" && index === steps.length - 1) ? (
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={
                                type === "characteristic"
                                    ? addCharacteristic
                                    : type === "benefit"
                                        ? addBenefit
                                        : addStep
                            }
                        >
                            Agregar{" "}
                            {type === "characteristic"
                                ? "Característica"
                                : type === "benefit"
                                    ? "Beneficio"
                                    : "Paso"}
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
const Services = ({ brands }) => {
    const gridRef = useRef();
    const modalRef = useRef();
    /* 'name',
            'title_approach',
            'description_approach',
            'characteristics_approach',
            'title_benefits',
            'title_methodology',
            'description_methodology',
            'steps_methodology', */
    // Form elements ref - Siguiendo el patrón del primer código
    const idRef = useRef();
    // Refs para los campos de texto - igual que en el primer código
    const nameRef = useRef();
    const titleRef = useRef();
    // const titlesecondRef = useRef();
    //const categoryRef = useRef();
    const descriptionRef = useRef();
    //const descriptionsecondRef = useRef();
    //const howItHelpsRef = useRef();
    //const descriptionHelpsRef = useRef();
    // const valuePropositionRef = useRef();
    // const innovationFocusRef = useRef();
    // const customerRelationRef = useRef();

    const title_approachRef = useRef();
    const description_approachRef = useRef();

    const title_benefitsRef = useRef();
    const title_methodologyRef = useRef();
    const description_methodologyRef = useRef();

    // Refs para imágenes - igual que en el primer código
    const imageRef = useRef();
    const imageSecondaryRef = useRef();
    // const imageBannerRef = useRef();

    const [isEditing, setIsEditing] = useState(false);
    // const [selectedItem, setSelectedItem] = useState(null);

    // Estados para características y beneficios
    const [characteristics, setCharacteristics] = useState([
        { title: "" },
    ]);
    const [benefits, setBenefits] = useState([
        { title: "", description: "", image: undefined },
    ]);

    const [steps, setSteps] = useState([
        { title: "", description: "", image: undefined },
    ]);
    //const [selectedCategory, setSelectedCategory] = useState("");

    // Funciones para características (simplificadas)
    const addCharacteristic = () => {
        setCharacteristics([
            ...characteristics,
            {
                title: "",
                // description: "",
                // image: undefined,
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



    const addStep = () => {
        setSteps([
            ...steps,
            {
                title: "",
                description: "",
                image: undefined,
            },
        ]);
    };
    const updateStep = useCallback((index, field, value) => {
        setSteps((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const removeStep = (index) => {
        if (steps.length <= 1) return;
        setSteps(steps.filter((_, i) => i !== index));
    };


    // Cargar datos al editar - similar al primer código
    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        // Resetear valores como en el primer código
        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        titleRef.current.value = data?.title ?? "";
        //titlesecondRef.current.value = data?.title_second ?? "";
        // categoryRef.current.value = data?.category.name ?? "";
        // setSelectedCategory(data?.category.name);
        // setSelectedItem(data);

        descriptionRef.current.value = data?.description ?? "";
        // descriptionsecondRef.current.value = data?.description_second ?? "";
        //howItHelpsRef.current.value = data?.how_it_helps ?? "";
        // descriptionHelpsRef.current.value = data?.description_helps ?? "";
        //valuePropositionRef.current.value = data?.value_proposition ?? "";
        // innovationFocusRef.current.value = data?.innovation_focus ?? "";
        //customerRelationRef.current.value = data?.customer_relation ?? "";

        title_approachRef.current.value = data?.title_approach ?? "";
        description_approachRef.current.value = data?.description_approach ?? "";

        title_benefitsRef.current.value = data?.title_benefits ?? "";
        title_methodologyRef.current.value = data?.title_methodology ?? "";
        description_methodologyRef.current.value = data?.description_methodology ?? "";
        // Manejo de imágenes como en el primer código
        imageRef.image.src = `/api/service/media/${data?.image ?? "undefined"}`;
         imageSecondaryRef.image.src = `/api/service/media/${data?.image_secondary ?? "undefined"
             }`;
        /* imageBannerRef.image.src = `/api/service/media/${data?.image_banner ?? "undefined"
             }`;*/

        // Cargar características y beneficios si existen
        /*if (data?.characteristics) {
            setCharacteristics(
                data.characteristics.map((char) => ({
                    title: char.title || "",
                    description: char.description || "",
                    image: char.image
                        ? { preview: `/api/service/media/${char.image}` }
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
                        ? { preview: `/api/service/media/${benefit.image}` }
                        : null,
                }))
            );
        }*/
        // En onModalOpen, al cargar características y beneficios
        if (data?.characteristics_approach) {
            setCharacteristics(
                data.characteristics_approach.map((char) => ({
                    title: char.title,
                    // description: char.description,
                    // image: char.image, // Guardar directamente el string del nombre de archivo
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

        if (data?.steps_methodology) {
            setSteps(
                data.steps_methodology.map((char) => ({
                    title: char.title,
                    description: char.description,
                    image: char.image, // Guardar directamente el string del nombre de archivo
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
            name: nameRef.current.value,
            title: titleRef.current.value,
            //title_second: titlesecondRef.current.value,
            description: descriptionRef.current.value,
            //  description_second: descriptionsecondRef.current.value,
            //how_it_helps: howItHelpsRef.current.value,
            // description_helps: descriptionHelpsRef.current.value,
            // value_proposition: valuePropositionRef.current.value,
            // innovation_focus: innovationFocusRef.current.value,
            //customer_relation: customerRelationRef.current.value,

            title_approach: title_approachRef.current.value,
            description_approach: description_approachRef.current.value,
            title_benefits: title_benefitsRef.current.value,
            title_methodology: title_methodologyRef.current.value,
            description_methodology: description_methodologyRef.current.value,
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

        /* const imageBanner = imageBannerRef.current.files[0];
         if (imageBanner) formData.append("image_banner", imageBanner);*/


        // Dentro de onModalSubmit, al procesar características
        characteristics.forEach((char, index) => {
            formData.append(`characteristics[${index}][title]`, char.title);
            /*  formData.append(
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
              }*/
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

        steps.forEach((char, index) => {
            formData.append(`steps[${index}][title]`, char.title);
            formData.append(
                `steps[${index}][description]`,
                char.description
            );

            if (char.image) {
                if (char.image.file) {
                    formData.append(
                        `steps[${index}][image]`,
                        char.image.file
                    );
                }
                // Si es una imagen existente (viene del servidor como string)
                else if (typeof char.image === "string") {
                    formData.append(
                        `steps[${index}][existing_image]`,
                        char.image
                    );
                }
            }
        });

        // Separar IDs existentes y nuevos nombres
        // formData.append("category_name", selectedCategory);

        const result = await servicesRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onBooleanChange = async ({ id, field, value }) => {
        const result = await servicesRest.boolean({ id, field, value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Servicios"
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
                            hint: "Agregar nuevo servicio",
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
                                    src={`/api/service/media/${data.image}`}
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
                        dataField: "featured",
                        caption: "Destacado",
                        dataType: "boolean",
                        width: "80px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.featured}
                                    onChange={(e) =>
                                        onBooleanChange({
                                            id: data.id,
                                            field: "featured",
                                            value: e.target.checked,
                                        })
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
                title={isEditing ? "Editar Servicio" : "Nuevo Servicio"}
                onSubmit={onModalSubmit}
                size="lg"
            >
                <input ref={idRef} type="hidden" />

                <div className="row" id="service-container">
                    <div className="col-md-6">
                        {/* <SelectAPIFormGroupSupport
                            eRef={categoryRef}
                            dropdownParent="#service-container"
                            label="Categoría"
                            searchAPI="/api/admin/category_services/paginate"
                            searchBy="name"
                            allowCreate
                            onChange={(categoryName) =>
                                setSelectedCategory(categoryName)
                            }
                            initialValue={selectedItem?.category?.name || ""}
                        /> */}
                        <InputFormGroup
                            eRef={nameRef}
                            label="Nombre del servicio"
                            required
                        />
                        <InputFormGroup
                            eRef={titleRef}
                            label="Título del servicio"
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

                        <ImageFormGroup
                            eRef={imageRef}
                            label="Imagen principal"
                            aspect={16 / 9}
                        />
                         <ImageFormGroup
                            eRef={imageSecondaryRef}
                            label="Icono del servicio"
                            aspect={1}
                        />
                    </div>
                    {/*  <div className="col-md-6">
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
                    </div> */}
                    <div className="col-md-6">
                        <InputFormGroup
                            eRef={title_approachRef}
                            label="Título del enfoque"
                            required
                        />
                        <div className="mb-3">
                            <label className="form-label">
                                Descripción del enfoque
                            </label>
                            <textarea
                                ref={description_approachRef}
                                className="form-control"
                                rows={4}
                                required
                            />
                        </div>
  <h5 className="mb-3 mt-4">Caracteristicas</h5>
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
                                // benefits={benefits}
                                addCharacteristic={addCharacteristic}
                            // addBenefit={addBenefit}
                            />
                        ))}
                    </div>
                </div>

                {/*                <div className="row mt-3">
                    <div className="col-md-12">
                        <InputFormGroup
                            eRef={titlesecondRef}
                            label="Título complementario"
                            required
                        />
                        <div className="mb-3">
                            <label className="form-label">Descripción complementaria</label>
                            <textarea
                                ref={descriptionsecondRef}
                                className="form-control"
                                rows={4}
                                required
                            />
                        </div>
                    </div>
                </div> */}


                {/*   <div className="row mt-3">
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
                </div> */}

                <div className="row mt-3">

                    <div className="col-md-12">
                        <InputFormGroup
                            eRef={title_methodologyRef}
                            label="Título de metodología"
                            required
                        />
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3">
                            <label className="form-label">
                                Descripción de metodología
                            </label>
                            <textarea
                                ref={description_methodologyRef}
                                className="form-control"
                                rows={4}
                                required
                            />
                        </div>
                    </div>
                      <h5 className="mb-3 mt-4">Paso a paso</h5>
                    {steps.map((step, index) => (
                        <FeatureCard
                            key={`step-${index}`}
                            feature={step}
                            index={index}
                            onUpdate={updateStep}
                            onRemove={removeStep}
                            canRemove={steps.length > 1}
                            type="step"
                            // characteristics={characteristics}
                            //benefits={benefits}
                            //addCharacteristic={addCharacteristic}
                            addStep={addStep}
                            steps={steps}
                        />
                    ))}
                </div>




                <div className="row mt-3">
                    {/* <div className="col-12">
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
                 */}
                </div>
                <div className="row mt-3">
                    {/*  <div className="col-md-6">
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
                    </div> */}
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <InputFormGroup
                                eRef={title_benefitsRef}
                                label="Título de beneficios"
                                required
                            />
                        </div>
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
                                // characteristics={characteristics}
                                benefits={benefits}
                                //addCharacteristic={addCharacteristic}
                                addBenefit={addBenefit}
                            />
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <LanguageProvider>
            <BaseAdminto {...properties} title="Servicios">
                <Services {...properties} />
            </BaseAdminto>
        </LanguageProvider>
    );
});
