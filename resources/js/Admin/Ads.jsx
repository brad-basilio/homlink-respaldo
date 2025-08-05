import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../components/Table";
import Modal from "../components/Modal";
import InputFormGroup from "../components/Adminto/form/InputFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../components/dx/DxButton";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import ImageFormGroup from "../components/Adminto/form/ImageFormGroup";
import Swal from "sweetalert2";
import AdsRest from "../actions/Admin/AdsRest";
import { renderToString } from "react-dom/server";
import TextareaFormGroup from "../components/Adminto/form/TextareaFormGroup";
import SelectFormGroup from "../components/Adminto/form/SelectFormGroup";

const adsRest = new AdsRest();

const Ads = ({ items }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const dateBeginRef = useRef();
    const dateEndRef = useRef();
    const secondsRef = useRef();
    const durationRef = useRef();
    const linkRef = useRef();
    const invasivoRef = useRef();
    
    // Estados
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedAction, setSelectedAction] = useState(false);
    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        descriptionRef.current.value = data?.description ?? "";
        
        // Corregir la referencia de la imagen
        if (imageRef.image && data?.image) {
            imageRef.image.src = `/api/ads/media/${data.image}`;
        }
        imageRef.current.value = null; // Limpiar el input file
        
        dateBeginRef.current.value = data?.date_begin ?? "";
        dateEndRef.current.value = data?.date_end ?? "";
        secondsRef.current.value = data?.seconds ?? 0;
        durationRef.current.value = data?.duration ?? 10;
       // itemRef.current.value = data?.item_id ?? null;
        linkRef.current.value = data?.link ?? "";
      {/*  if (data?.actions) {
            $(actionsRef.current).prop("checked", false).trigger("click");
        } else {
            $(actionsRef.current).prop("checked", true).trigger("click");
        } */}
        if (data?.invasivo) {
            $(invasivoRef.current).prop("checked", false).trigger("click");
        } else {
            $(invasivoRef.current).prop("checked", true).trigger("click");
        }
        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedAction) {
                secondsRef.current.value = null;
            }

            const request = {
                id: idRef.current.value || undefined,
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                date_begin: dateBeginRef.current.value,
                date_end: dateEndRef.current.value,
                seconds: secondsRef.current.value || 0,
                duration: durationRef.current.value || 10,
               // actions: actionsRef.current.checked ? 1 : 0,
                item_id: null,
                link: linkRef.current.value,
                invasivo: invasivoRef.current.checked
                    ? 1
                    : 0,
            };

            const formData = new FormData();
            for (const key in request) {
                formData.append(key, request[key]);
            }
            
            const file = imageRef.current.files[0];
            if (file) {
                formData.append("image", file);
            }

            const result = await adsRest.save(formData);
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
        console.log('🔧 DEBUG - Enviando datos:', { 
            id, 
            field: "visible", 
            value, 
            valueType: typeof value,
            valueAsNumber: value ? 1 : 0 
        });
        
        // Convertir boolean a número para MySQL
        const numericValue = value ? 1 : 0;
        
        try {
            const result = await adsRest.boolean({ 
                id, 
                field: "visible", 
                value: numericValue 
            });
            
            console.log('📤 Respuesta del servidor:', result);
            
            if (!result) {
                console.error('❌ Error en la respuesta del servidor');
                return;
            }
            
            // Forzar refresh de la tabla después de la operación exitosa
            console.log('🔄 Refrescando tabla después de cambio exitoso...');
            $(gridRef.current).dxDataGrid("instance").refresh();
            
        } catch (error) {
            console.error('❌ Error en onVisibleChange:', error);
            // Si hay error, también refrescar para restaurar el estado correcto
            $(gridRef.current).dxDataGrid("instance").refresh();
        }
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar anuncio",
            text: "¿Estás seguro de eliminar este anuncio?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await adsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Popups y Anuncios"
                rest={adsRest}
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
                            text: "Nuevo Popup",
                            hint: "Crear nuevo popup/anuncio",
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
                                    src={`/api/ads/media/${data.image}`}
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
                        dataField: "name",
                        caption: "Contenido",
                        width: "50%",
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
                        dataField: "date_begin",
                        caption: "Mostrar",
                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <>
                                        {data.date_begin && data.date_end ? (
                                            <>
                                                <p className="mb-0">
                                                    <b>Desde:</b>{" "}
                                                    {moment(
                                                        data.date_begin
                                                    ).format("DD [de] MMMM")}
                                                </p>
                                                <p className="mb-0">
                                                    <b>Hasta:</b>{" "}
                                                    {moment(
                                                        data.date_end
                                                    ).format("DD [de] MMMM")}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="mb-0">
                                                <b>Visible:</b> Siempre
                                            </p>
                                        )}                        <p className="mb-0">
                            <b>Se muestra:</b>{" "}
                            {data.seconds > 0 && data.actions === 0 ? (
                                <span className="badge bg-warning text-dark">
                                    Después de {data.seconds}s
                                </span>
                            ) : data.actions === 1 ? (
                                <span className="badge bg-info">
                                    Al agregar al carrito
                                </span>
                            ) : (
                                <span className="badge bg-success">
                                    Al cargar la página
                                </span>
                            )}
                        </p>
                        <p className="mb-0">
                            <b>Duración:</b>{" "}
                            <span className="badge bg-primary">
                                {data.duration || 10} segundos visible
                            </span>
                        </p>
                        <p className="mb-0">
                            <b>Tipo:</b>{" "}
                            {data.invasivo && data.actions === 0 ? (
                                <span className="badge bg-danger">
                                    Invasivo (Solo este)
                                </span>
                            ) : (
                                <span className="badge bg-secondary">
                                    Normal
                                </span>
                            )}
                        </p>
                                    </>
                                )
                            );
                        },
                    },
                    {
                        dataField: "link",
                        caption: "Link",
                        cellTemplate: (container, { data }) => {
                            if (data.link) {
                                container.html(
                                    renderToString(
                                        <a href={data.link}>{data.link}</a>
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
                                    checked={!!data.visible} // Forzar boolean
                                    onChange={(e) => {
                                        console.log('🎯 Switch clicked:', {
                                            dataId: data.id,
                                            currentValue: data.visible,
                                            newValue: e.target.checked
                                        });
                                        
                                        onVisibleChange({
                                            id: data.id,
                                            value: e.target.checked,
                                        });
                                    }}
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
                title={isEditing ? "Editar Popup/Anuncio" : "Crear Nuevo Popup/Anuncio"}
                onSubmit={onModalSubmit}
                size="lg"
            >
                <div className="row" id="principal-container">
                    <input ref={idRef} type="hidden" />
                    
                    {/* Sección de Imagen */}
                    <div className="col-12 mb-4">
                        <div className="card border-primary">
                            <div className="card-header bg-primary text-white">
                                <h6 className="mb-0">📸 Diseño Visual</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <ImageFormGroup
                                        eRef={imageRef}
                                        label="Imagen del Popup"
                                        col="col-md-6"
                                        aspect={16/9}
                                        fit="contain"
                                        required
                                    />
                                    <div className="col-md-6">
                                        <TextareaFormGroup
                                            eRef={nameRef}
                                            label="Título del Popup"
                                            rows={2}
                                            placeholder="Ej: ¡Hoy 7 de Julio es feriado!"
                                        />
                                        <TextareaFormGroup
                                            eRef={descriptionRef}
                                            label="Descripción"
                                            rows={3}
                                            placeholder="Ej: Disfruta de este día especial con nuestras ofertas exclusivas..."
                                        />
                                        <InputFormGroup eRef={linkRef} label="Enlace (opcional)" placeholder="https://..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Programación */}
                    <div className="col-12 mb-4">
                        <div className="card border-success">
                            <div className="card-header bg-success text-white">
                                <h6 className="mb-0">⏰ Programación de Visualización</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <InputFormGroup
                                        eRef={dateBeginRef}
                                        label="Fecha de Inicio"
                                        type="date"
                                        col="col-md-6"
                                    />
                                    <InputFormGroup
                                        eRef={dateEndRef}
                                        label="Fecha de Fin"
                                        type="date"
                                        col="col-md-6"
                                    />
                                </div>
                                <small className="text-muted">
                                    💡 Si no seleccionas fechas, el popup se mostrará siempre
                                </small>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Comportamiento */}
                    <div className="col-12 mb-4">
                        <div className="card border-warning">
                            <div className="card-header bg-warning text-dark">
                                <h6 className="mb-0">⚙️ Comportamiento del Popup</h6>
                            </div>
                            <div className="card-body">
                                <SwitchFormGroup
                                    eRef={invasivoRef}
                                    label="🚨 Popup Invasivo"
                                    specification="Solo se mostrará este popup y bloqueará otros (ideal para anuncios importantes)"
                                />
                                
                               {/* <SwitchFormGroup
                                    eRef={actionsRef}
                                    onChange={(e) => setSelectedAction(e.target.checked)}
                                    label="🛒 Mostrar al agregar producto al carrito"
                                    specification="El popup aparecerá cuando se añada un producto específico al carrito"
                                /> */}

                                {/*selectedAction && (
                                    <div className="mt-3 p-3 bg-light rounded">
                                        <SelectFormGroup
                                            eRef={itemRef}
                                            label="Producto que activa el popup"
                                            dropdownParent="#principal-container"
                                            onChange={(e) => setSelectedItem(e.target.value)}
                                        >
                                            <option value="">Seleccionar producto...</option>
                                            {items.map((item, index) => (
                                                <option key={index} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </SelectFormGroup>
                                    </div>
                                )*/}

                                {!selectedAction && (
                                    <div className="mt-3 p-3 bg-light rounded">
                                        <div className="row">
                                            <InputFormGroup
                                                eRef={secondsRef}
                                                label="⏱️ Retraso en segundos"
                                                type="number"
                                                placeholder="0"
                                                helpText="0 = inmediato, 5 = después de 5 segundos, etc."
                                                col="col-md-6"
                                            />
                                            <InputFormGroup
                                                eRef={durationRef}
                                                label="⏰ Duración visible (segundos)"
                                                type="number"
                                                placeholder="10"
                                                helpText="Tiempo que permanecerá visible el popup"
                                                col="col-md-6"
                                            />
                                        </div>
                                    </div>
                                )}
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
        <BaseAdminto {...properties} title="Popups y Anuncios">
            <Ads {...properties} />
        </BaseAdminto>
    );
});
