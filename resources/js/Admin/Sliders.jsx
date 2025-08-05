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
import SlidersRest from "../actions/Admin/SlidersRest";
import ImageFormGroup from "../components/Adminto/form/ImageFormGroup";
import Swal from "sweetalert2";
import VideoFormGroup from "../components/Adminto/form/VideoFormGroup";

const slidersRest = new SlidersRest();

const Sliders = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    //const bgImageRef = useRef();
    const buttonTextRef = useRef();
    const buttonLinkRef = useRef();
    const imageRef = useRef();
    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        descriptionRef.current.value = data?.description ?? "";
        // Configurar video existente si estamos editando
        /* if (bgImageRef.current && data?.image) {
             bgImageRef.current.setVideoSrc(`/api/sliders/media/${data.image}`);
         }*/

        buttonTextRef.current.value = data?.button_text ?? "";
        buttonLinkRef.current.value = data?.button_link ?? "";
        imageRef.image.src = `/api/sliders/media/${data?.image ?? "undefined"}`;
        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            button_text: buttonTextRef.current.value,
            button_link: buttonLinkRef.current.value,
        };

        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }

        // Obtener el archivo de video
        /* if (bgImageRef.current) {
             const videoFile = bgImageRef.current.getFile();
             if (videoFile) {
                 formData.append("video", videoFile);
             }
         }*/
        const image = imageRef.current.files[0];
        if (image) {
            formData.append("image", image);
        }
        const result = await slidersRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await slidersRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar slider",
            text: "¿Estas seguro de eliminar este slider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await slidersRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Sliders"
                rest={slidersRest}
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
                            text: "Nuevo slider",
                            hint: "Nuevo slider",
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
                        caption: "Titulo",
                        width: "75%",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                data.name || data.description ? (
                                    <p
                                        className="mb-0"
                                        style={{ width: "100%" }}
                                    >
                                        <b className="d-block">{data.name}</b>
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
                                    </p>
                                ) : (
                                    <i className="text-muted">
                                        - Sin contenido textual -
                                    </i>
                                )
                            );
                        },
                    },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "90px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/sliders/media/${data.image}`}
                                   
                                    style={{
                                        width: "80px",
                                        height: "48px",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
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
                    // {
                    //   dataField: 'status',
                    //   caption: 'Estado',
                    //   dataType: 'boolean',
                    //   cellTemplate: (container, { data }) => {
                    //     switch (data.status) {
                    //       case 1:
                    //         ReactAppend(container, <span className='badge bg-success rounded-pill'>Activo</span>)
                    //         break
                    //       case 0:
                    //         ReactAppend(container, <span className='badge bg-danger rounded-pill'>Inactivo</span>)
                    //         break
                    //       default:
                    //         ReactAppend(container, <span className='badge bg-dark rounded-pill'>Eliminado</span>)
                    //         break
                    //     }
                    //   }
                    // },
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
                title={isEditing ? "Editar slider" : "Agregar slider"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="sliders-container">
                    <input ref={idRef} type="hidden" />
                    {/*  <VideoFormGroup
                        eRef={bgImageRef}
                        label="Selecciona un video"
                        col="col-12"
                    /> */}
                     <ImageFormGroup
                        eRef={imageRef}
                        label="Imagen"
                        aspect={16/9}
                        col="col-lg-12 col-md-12 col-sm-12"
                    />

                    <TextareaFormGroup
                        eRef={nameRef}
                        label="Titulo"
                        col="col-12"
                        rows={2}
                        required
                    />
                    <TextareaFormGroup
                        eRef={descriptionRef}
                        label="Descripción"
                        rows={3}
                    />
                    <InputFormGroup
                        eRef={buttonTextRef}
                        label="Texto botón primario"
                        col="col-sm-6"
                    />
                    <InputFormGroup
                        eRef={buttonLinkRef}
                        label="URL botón primario"
                        col="col-sm-6"
                    />
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Sliders">
            <Sliders {...properties} />
        </BaseAdminto>
    );
});
