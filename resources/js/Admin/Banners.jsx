import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../Components/dx/DxButton";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import Swal from "sweetalert2";
import BannersRest from "../Actions/Admin/BannersRest";
import { renderToString } from "react-dom/server";
import TextareaFormGroup from "../Components/Adminto/form/TextareaFormGroup";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";

const bannersRest = new BannersRest();

const Banners = ({ sections, positions, sectionPositions }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const buttonTextRef = useRef();
    const buttonLinkRef = useRef();
    const sectionRef = useRef();
    const positionRef = useRef();
    const orderRef = useRef();

    const [isEditing, setIsEditing] = useState(false);
    const [selectedSection, setSelectedSection] = useState('home');
    const [availablePositions, setAvailablePositions] = useState(sectionPositions['home'] || {});

    // Función para manejar el cambio de sección
    const handleSectionChange = (section) => {
        setSelectedSection(section);
        const newPositions = sectionPositions[section] || {};
        setAvailablePositions(newPositions);
        
        // Resetear la posición seleccionada si no está disponible en la nueva sección
        const firstPosition = Object.keys(newPositions)[0];
        if (positionRef.current) {
            positionRef.current.value = firstPosition || '';
            // Trigger change event for select2
            $(positionRef.current).trigger('change');
        }
    };

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        const section = data?.section ?? "home";
        const position = data?.position ?? Object.keys(sectionPositions[section] || {})[0];

        // Configurar la sección y las posiciones disponibles
        setSelectedSection(section);
        setAvailablePositions(sectionPositions[section] || {});

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        descriptionRef.current.value = data?.description ?? "";
        imageRef.image.src = `/api/banners/media/${data?.image}`;
        imageRef.current.value = null;
        buttonTextRef.current.value = data?.button_text ?? "";
        buttonLinkRef.current.value = data?.button_link ?? "";
        sectionRef.current.value = section;
        positionRef.current.value = position;
        orderRef.current.value = data?.order ?? 0;
        
     
        
        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = {
                id: idRef.current.value || undefined,
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                button_text: buttonTextRef.current.value,
                button_link: buttonLinkRef.current.value,
                section: sectionRef.current.value,
                position: positionRef.current.value,
                order: parseInt(orderRef.current.value) || 0,
             
            };

            const formData = new FormData();
            for (const key in request) {
                formData.append(key, request[key]);
            }
            const file = imageRef.current.files[0];
            if (file) {
                formData.append("image", file);
            }

            const result = await bannersRest.save(formData);
            console.log(result);
            if (!result) return;

            console.log("Refrescando tabla...");
            $(gridRef.current).dxDataGrid("instance").refresh();

            console.log("Cerrando modal...");
            $(modalRef.current).modal("hide");
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
            });
        }
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await bannersRest.boolean({ id, field: "visible", value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar banner",
            text: "¿Estás seguro de eliminar este banner?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await bannersRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Banners"
                rest={bannersRest}
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
                            text: "Nuevo banner",
                            hint: "Nuevo banner",
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
                        dataField: "image",
                        caption: "Imagen",
                        width: "80px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/banners/media/${data.image}`}
                                    style={{
                                        width: "70px",
                                        height: "40px",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                    }}
                                />
                            );
                        },
                    },
                    {
                        dataField: "name",
                        caption: "Contenido",
                        width: "40%",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <div>
                                    <p className="mb-1">
                                        <b>{data.name}</b>
                                    </p>
                                    {data.description && (
                                        <small
                                            className="text-wrap text-muted"
                                            style={{
                                                overflow: "hidden",
                                                display: "-webkit-box",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 2,
                                            }}
                                        >
                                            {data.description}
                                        </small>
                                    )}
                                    {data.button_text && (
                                        <div className="mt-1">
                                            <small className="badge badge-info">
                                                {data.button_text}
                                            </small>
                                        </div>
                                    )}
                                </div>
                            );
                        },
                    },
                    {
                        dataField: "section",
                        caption: "Sección",
                        width: "120px",
                        cellTemplate: (container, { data }) => {
                            const sectionName = sections[data.section] || data.section;
                            container.html(
                                renderToString(
                                    <span className="badge text-black badge-primary">
                                        {sectionName}
                                    </span>
                                )
                            );
                        },
                    },
                    {
                        dataField: "position",
                        caption: "Posición",
                        width: "120px",
                        cellTemplate: (container, { data }) => {
                            const sectionPos = sectionPositions[data.section] || {};
                            const positionName = sectionPos[data.position] || data.position;
                            container.html(
                                renderToString(
                                    <span className="badge text-black badge-secondary">
                                        {positionName}
                                    </span>
                                )
                            );
                        },
                    },
                    {
                        dataField: "order",
                        caption: "Orden",
                        width: "80px",
                        dataType: "number",
                    },
                    {
                        dataField: "button_link",
                        caption: "Link",
                        cellTemplate: (container, { data }) => {
                            if (data.button_link) {
                                container.html(
                                    renderToString(
                                        <a 
                                            href={data.button_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-truncate d-block"
                                            style={{ maxWidth: "200px" }}
                                        >
                                            {data.button_link}
                                        </a>
                                    )
                                );
                            } else {
                                container.html(
                                    renderToString(
                                        <i className="text-muted">
                                            - Sin link -
                                        </i>
                                    )
                                );
                            }
                        },
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: "120px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.visible}
                                    onChange={(e) =>
                                        onVisibleChange({
                                            id: data.id,
                                            value: e.target.checked,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
                        cellTemplate: (container, { data }) => {
                            container.css("text-overflow", "unset");
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-primary",
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
                        allowFiltering: false,
                        allowExporting: false,
                    },
                ]}
            />
            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar banner" : "Agregar banner"}
                onSubmit={onModalSubmit}
                size="lg"
            >
                <div className="row" id="form-banner">
                    <input ref={idRef} type="hidden" />
                    <ImageFormGroup
                        eRef={imageRef}
                        label="Imagen del banner"
                        col="col-md-4"
                        aspect={2.5}
                        fit="cover"
                        required
                    />
                    <div className="col-md-8">
                        <InputFormGroup
                            eRef={nameRef}
                            label="Título del banner"
                            required
                        />
                        <TextareaFormGroup
                            eRef={descriptionRef}
                            label="Descripción"
                            rows={2}
                        />
                        <div className="row">
                            <InputFormGroup
                                eRef={buttonTextRef}
                                label="Texto del botón"
                                col="col-md-6"
                            />
                            <InputFormGroup
                                eRef={buttonLinkRef}
                                label="Link del botón"
                                col="col-md-6"
                            />
                        </div>
                    </div>
                    
                    <SelectFormGroup
                        eRef={sectionRef}
                        label="Sección"
                        col="col-md-4"
                        required
                        dropdownParent={"#form-banner"}
                        onChange={(e) => handleSectionChange(e.target.value)}
                    >
                        {Object.entries(sections).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </SelectFormGroup>

                    <SelectFormGroup
                        eRef={positionRef}
                        label="Posición"
                        col="col-md-4"
                        required
                        dropdownParent={"#form-banner"}
                    >
                        {Object.entries(availablePositions).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </SelectFormGroup>

                    <InputFormGroup
                        eRef={orderRef}
                        label="Orden"
                        type="number"
                        col="col-md-4"
                        defaultValue={0}
                    />

                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Banners">
            <Banners {...properties} />
        </BaseAdminto>
    );
});
