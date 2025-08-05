import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../components/dx/DxButton";
import TextareaFormGroup from "@Adminto/form/TextareaFormGroup";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import SelectFormGroup from "@Adminto/form/SelectFormGroup";
import Swal from "sweetalert2";
import InputFormGroup from "../components/form/InputFormGroup";

import ImageFormGroup from "../components/Adminto/form/ImageFormGroup";
import BenefitsRest from "../actions/Admin/BenefitsRest";

const benefitsRest = new BenefitsRest();

// Opciones para el select de correlative
const correlativeOptions = [
    { value: 'principales', text: 'Beneficios Principales' },
    { value: 'empresas', text: 'Beneficios Empresas' },
];

const Benefits = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const imageRef = useRef();
    const descriptionRef = useRef();
    const correlativeRef = useRef();
    const orderRef = useRef();

    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        imageRef.image.src = `/api/benefit/media/${data?.image}`;
        imageRef.current.value = null;
        descriptionRef.current.value = data?.description ?? "";
        correlativeRef.current.value = data?.correlative ?? "";
        orderRef.current.value = data?.order ?? "";

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            correlative: correlativeRef.current.value,
            order: orderRef.current.value,
        };
        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        const file = imageRef.current.files[0];
        if (file) {
            formData.append("image", file);
        }

        const result = await benefitsRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await benefitsRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar beneficio",
            text: "¿Estás seguro de eliminar este beneficio?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await benefitsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Beneficios"
                rest={benefitsRest}
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
                            text: "Nuevo beneficio",
                            hint: "Nuevo beneficio",
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
                        width: "60px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                   style={{
                                       
                                        objectFit: "cover",
                                        objectPosition: "center",
                                      
                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    src={`/api/benefit/media/${data.image}`}
                                    alt={data.name}
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                />
                            );
                        },
                    },
                    {
                        dataField: "name",
                        caption: "Beneficio",
                        width: "25%",
                    },
                    {
                        dataField: "correlative",
                        caption: "Categoría",
                        width: "15%",
                        cellTemplate: (container, { data }) => {
                            const option = correlativeOptions.find(opt => opt.value === data.correlative);
                            ReactAppend(
                                container,
                                <span className="badge bg-primary">
                                    {option ? option.text : data.correlative || 'Sin categoría'}
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "order",
                        caption: "Orden",
                        width: "10%",
                        dataType: "number",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <span className="badge bg-secondary">
                                    {data.order || 0}
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "description",
                        caption: "Descripción",
                        width: "35%",
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        cellTemplate: (container, { data }) => {
                            $(container).empty();
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.visible == 1}
                                    onChange={() =>
                                        onVisibleChange({
                                            id: data.id,
                                            value: !data.visible,
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
                title={isEditing ? "Editar beneficio" : "Agregar beneficio"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="benefits-container">
                    <input ref={idRef} type="hidden" />
                    <div className="col-8">
                        <InputFormGroup
                            eRef={nameRef}
                            label="Beneficio"
                            required
                        />
                        
                        <div className="row">
                            <div className="col-md-8">
                                <SelectFormGroup
                                    eRef={correlativeRef}
                                    label="Categoría"
                                    
                                    dropdownParent={"#benefits-container"}
                                  
                                >
                                    {correlativeOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}    
                                        >
                                            {option.text}   
                                        </option>
                                    ))}
                                </SelectFormGroup>
                            </div>
                            <div className="col-md-4">
                                <InputFormGroup
                                    eRef={orderRef}
                                    type="number"
                                    label="Orden"
                                    placeholder="1, 2, 3..."
                                    min="0"
                                    step="1"
                                />
                            </div>
                        </div>
                        
                        <TextareaFormGroup
                            eRef={descriptionRef}
                            label="Descripción"
                            rows={3}
                        />
                    </div>
                  
                    <div className="col-md-4">
                        <ImageFormGroup
                            eRef={imageRef}
                            label="Imagen"
                            aspect={1}
                            fit="contain"
                            required
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Beneficios">
            <Benefits {...properties} />
        </BaseAdminto>
    );
});
