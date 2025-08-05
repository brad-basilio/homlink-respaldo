import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../components/Table";
import Modal from "../components/Modal";
import InputFormGroup from "../components/form/InputFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../components/dx/DxButton";
import TextareaFormGroup from "@Adminto/form/TextareaFormGroup";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import TestimoniesRest from "../actions/Admin/TestimoniesRest";
import Swal from "sweetalert2";
import ImageFormGroup from "../components/Adminto/form/ImageFormGroup";

const testimoniesRest = new TestimoniesRest();

const Testimonies = ({}) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const correlativeRef = useRef();
    const positionRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);
        
        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        correlativeRef.current.value = data?.correlative ?? "";
        positionRef.current.value = data?.position ?? "";
        descriptionRef.current.value = data?.description ?? "";
        imageRef.image.src = `/api/testimony/media/${data?.image}`;
        imageRef.current.value = null;

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            correlative: correlativeRef.current.value,
            position: positionRef.current.value,
        description: descriptionRef.current.value,
        };
        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        const file = imageRef.current.files[0];
        if (file) {
            formData.append("image", file);
        }

        const result = await testimoniesRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await testimoniesRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar testimonio",
            text: "¿Estas seguro de eliminar este testimonio?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await testimoniesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Testimonios"
                rest={testimoniesRest}
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
                            text: "Nuevo testimonio",
                            hint: "Nuevo testimonio",
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
                        dataField: "name",
                        caption: "Nombre",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <p className="mb-0" style={{ width: "100%" }}>
                                    <b className="d-block">{data.name}</b>
                                </p>
                            );
                        },
                    },
                    // {
                    //     dataField: "description",
                    //     caption: "Youtube",
                    //     width: "50%",
                    // },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "60px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/testimony/media/${data.image}`}
                                    style={{
                                        width: "50px",
                                        aspectRatio: 1,
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                />
                            );
                        },
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: "120px",
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
                        width: "120px",
                        cellTemplate: (container, { data }) => {
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
                title={isEditing ? "Editar testimonio" : "Agregar testimonio"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="testimony-container">
                    <input ref={idRef} type="hidden" />
                    <ImageFormGroup
                        eRef={imageRef}
                        label="Imagen"
                        col="col-md-4"
                        aspect={1}
                        fit="cover"
                        required
                    />

                    <div className="col-md-8">
                        <InputFormGroup
                            eRef={nameRef}
                            label="Nombre"
                            required
                        />
                         <InputFormGroup
                            eRef={positionRef}
                            label="Cargo"
                            required
                        />
                    <InputFormGroup
                            eRef={correlativeRef}
                            label="Empresa"
                            required
                        />
                         
                    </div>
                    <TextareaFormGroup
                        type="text"
                        eRef={descriptionRef}
                        label="Descripción"
                        rows={3}
                        placeholder="Ingresa el texto"
                        required
                        col="col-12"
                    />
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Testimonios">
            <Testimonies {...properties} />
        </BaseAdminto>
    );
});
