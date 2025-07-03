import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import InputFormGroup from "../Components/form/InputFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../Components/dx/DxButton";
import TextareaFormGroup from "@Adminto/form/TextareaFormGroup";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";

import Swal from "sweetalert2";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import AppsRest from "../Actions/Admin/AppsRest";

const appsRest = new AppsRest();

const Apps = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const linkRef = useRef();
    const orderRef = useRef();
    const imageRef = useRef();
    const statusRef = useRef();

    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        linkRef.current.value = data?.link ?? "";
        orderRef.current.value = data?.order ?? "";
        statusRef.current.checked = data?.status == 1 ?? true;
        
        // Handle image
        if (data?.image) {
            imageRef.image.src = `/api/app/media/${data?.image}`;
        }
        imageRef.current.value = null;

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            link: linkRef.current.value,
            order: orderRef.current.value,
            status: statusRef.current.checked ? 1 : 0,
        };

        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        
        const file = imageRef.current.files[0];
        if (file) {
            formData.append("image", file);
        }

        const result = await appsRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

      const onBooleanChange = async ({ id, field, value }) => {
        const result = await appsRest.boolean({ id, field, value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };


    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar aplicación",
            text: "¿Estás seguro de eliminar esta aplicación?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await appsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Apps de Descarga"
                rest={appsRest}
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
                            text: "Nueva aplicación",
                            hint: "Nueva aplicación",
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
                        dataField: "order",
                        caption: "Orden",
                        width: "80px",
                        dataType: "number",
                    },
                    {
                        dataField: "image",
                        caption: "Logo",
                        width: "80px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    style={{
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                        width: "60px",
                                        height: "40px",
                                        borderRadius: "4px",
                                    }}
                                    src={`/api/app/media/${data.image}`}
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
                        caption: "Nombre",
                    },
                    {
                        dataField: "link",
                        caption: "Enlace",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <a
                                    href={data.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary"
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "12px",
                                    }}
                                >
                                    {data.link.length > 50
                                        ? data.link.substring(0, 50) + "..."
                                        : data.link}
                                </a>
                            );
                        },
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            $(container).empty();
                            ReactAppend(
                                container,
                                <SwitchFormGroup
 checked={data.visible}
                                    onChange={(e) =>
                                         onBooleanChange({
                                            id: data.id,
                                            field: "visible",
                                            value: e.target.checked,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
                        width: "110px",
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
                title={isEditing ? "Editar aplicación" : "Agregar aplicación"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="apps-container">
                    <input ref={idRef} type="hidden" />
                    
                    <ImageFormGroup
                        eRef={imageRef}
                        label="Logo de la aplicación"
                        aspect={16/9}
                        fit="contain"
                        col="col-sm-4"
                    />
                    
                    <div className="col-md-8">
                        <InputFormGroup 
                            eRef={nameRef} 
                            label="Nombre de la aplicación" 
                            placeholder="Google Play, App Store, etc."
                            required 
                        />
                        
                        <InputFormGroup
                            eRef={linkRef}
                            label="Enlace de descarga"
                            type="url"
                            placeholder="https://play.google.com/store/apps/..."
                            required
                        />
                        
                        <div className="row">
                            <div className="col-md-6">
                                <InputFormGroup
                                    eRef={orderRef}
                                    type="number"
                                    label="Orden"
                                    placeholder="1, 2, 3..."
                                    min="1"
                                />
                            </div>
                            <div className="col-md-6 d-flex align-items-end">
                                <SwitchFormGroup
                                    eRef={statusRef}
                                    label="Activo"
                                    checked={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Apps de Descarga">
            <Apps {...properties} />
        </BaseAdminto>
    );
});
