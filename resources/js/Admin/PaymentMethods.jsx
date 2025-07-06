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
import PaymentMethodsRest from "../actions/Admin/PaymentMethodsRest";
import { renderToString } from "react-dom/server";
import TextareaFormGroup from "../Components/Adminto/form/TextareaFormGroup";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";

const paymentMethodsRest = new PaymentMethodsRest();

const PaymentMethods = ({ types }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const slugRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const typeRef = useRef();
    const orderRef = useRef();

    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        slugRef.current.value = data?.slug ?? "";
        descriptionRef.current.value = data?.description ?? "";
        imageRef.image.src = `/api/payment-methods/media/${data?.image}`;
        imageRef.current.value = null;
        typeRef.current.value = data?.type ?? "immediate_10min";
        orderRef.current.value = data?.order ?? 0;
        
        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = {
                id: idRef.current.value || undefined,
                name: nameRef.current.value,
                slug: slugRef.current.value,
                description: descriptionRef.current.value,
                type: typeRef.current.value,
                order: parseInt(orderRef.current.value) || 0,
            };

            const formData = new FormData();
            for (const key in request) {
                if (request[key] !== undefined) {
                    formData.append(key, request[key]);
                }
            }
            const file = imageRef.current.files[0];
            if (file) {
                formData.append("image", file);
            }

            const result = await paymentMethodsRest.save(formData);
            if (!result) return;

            $(gridRef.current).dxDataGrid("instance").refresh();
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
        const result = await paymentMethodsRest.boolean({ id, field: "visible", value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar método de pago",
            text: "¿Estás seguro de eliminar este método de pago?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await paymentMethodsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Métodos de Pago"
                rest={paymentMethodsRest}
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
                            text: "Nuevo método de pago",
                            hint: "Nuevo método de pago",
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
                        caption: "Logo",
                        width: "80px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/payment-methods/media/${data.image}`}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                        backgroundColor: "#f8f9fa"
                                    }}
                                />
                            );
                        },
                    },
                    {
                        dataField: "name",
                        caption: "Contenido",
                        width: "30%",
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
                                    <div className="mt-1">
                                        <small className="badge badge-outline-info">
                                            {data.slug}
                                        </small>
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        dataField: "type",
                        caption: "Tipo",
                        width: "200px",
                        cellTemplate: (container, { data }) => {
                            const typeName = types[data.type] || data.type;
                            const badgeClass = data.type === 'immediate_10min' ? 'badge-success' : 'badge-warning';
                            container.html(
                                renderToString(
                                    <span className={`badge ${badgeClass}`}>
                                        {typeName}
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
                title={isEditing ? "Editar método de pago" : "Agregar método de pago"}
                onSubmit={onModalSubmit}
                size="lg"
            >
                <div className="row" id="form-payment-method">
                    <input ref={idRef} type="hidden" />
                    <ImageFormGroup
                        eRef={imageRef}
                        label="Logo del método de pago"
                        col="col-md-4"
                        aspect={1}
                        fit="contain"
                        required
                    />
                    <div className="col-md-8">
                        <InputFormGroup
                            eRef={nameRef}
                            label="Nombre del método"
                            required
                        />
                        <InputFormGroup
                            eRef={slugRef}
                            label="Slug (identificador único)"
                            placeholder="ej: bcp, interbank, yape"
                        />
                        <TextareaFormGroup
                            eRef={descriptionRef}
                            label="Descripción"
                            rows={2}
                        />
                    </div>
                    
                    <SelectFormGroup
                        eRef={typeRef}
                        label="Tipo de transferencia"
                        col="col-md-8"
                        required
                        dropdownParent={"#form-payment-method"}
                    >
                        {Object.entries(types).map(([key, value]) => (
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
        <BaseAdminto {...properties} title="Métodos de Pago">
            <PaymentMethods {...properties} />
        </BaseAdminto>
    );
});
