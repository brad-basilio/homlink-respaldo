import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "@Utils/CreateReactScript";
import Table from "../components/Table";
import DxButton from "../components/dx/DxButton";
import ReactAppend from "@Utils/ReactAppend";
import MessagesRest from "@Rest/Admin/MessagesRest";
import Modal from "@Adminto/Modal";
import Swal from "sweetalert2";

const messagesRest = new MessagesRest();

const Messages = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    const [dataLoaded, setDataLoaded] = useState(null);

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar mensaje",
            text: "¿Estas seguro de eliminar este mensaje?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await messagesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onModalOpen = (data) => {
        if (!data.seen) {
            messagesRest.boolean({
                id: data,
                field: "seen",
                value: true,
            });
            $(gridRef.current).dxDataGrid("instance").refresh();
        }
        setDataLoaded(data);
        $(modalRef.current).modal("show");
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Mensajes"
                rest={messagesRest}
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
                            const fullName = data.lastname 
                                ? `${data.name} ${data.lastname}`
                                : data.name;
                            ReactAppend(
                                container,
                                <div
                                    style={{
                                        width: "100%",
                                        fontWeight: data.seen
                                            ? "lighter"
                                            : "bold",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => onModalOpen(data)}
                                >
                                    <div>{fullName}</div>
                                    {data.ruc && (
                                        <small className="text-muted">RUC: {data.ruc}</small>
                                    )}
                                </div>
                            );
                        },
                    },
                    {
                        dataField: "email",
                        caption: "Correo",
                    },
                    {
                        dataField: "contact_type",
                        caption: "Tipo",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            const isEmpresa = data.contact_type === 'empresa';
                            ReactAppend(
                                container,
                                <span className={`badge ${isEmpresa ? 'bg-primary' : 'bg-secondary'} rounded-pill`}>
                                    {isEmpresa ? 'Empresa' : 'Personal'}
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "phone",
                        caption: "Teléfono",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <span>
                                    {data.phone || '-'}
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "created_at",
                        caption: "Fecha",
                        dataType: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        sortOrder: "desc",
                    },
                    {
                        dataField: "status",
                        caption: "Estado",
                        dataType: "boolean",
                        cellTemplate: (container, { data }) => {
                            if (data.seen) {
                                ReactAppend(
                                    container,
                                    <span className="badge bg-success rounded-pill">
                                        Leído
                                    </span>
                                );
                            } else {
                                ReactAppend(
                                    container,
                                    <span className="badge bg-danger rounded-pill">
                                        No leído
                                    </span>
                                );
                            }
                        },
                    },
                    {
                        caption: "Acciones",
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-dark",
                                    title: "Ver mensaje",
                                    icon: "fa fa-eye",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            // container.append(DxButton({
                            //   className: 'btn btn-xs btn-light',
                            //   title: data.status === null ? 'Restaurar' : 'Cambiar estado',
                            //   icon: data.status === 1 ? 'fa fa-toggle-on text-success' : data.status === 0 ? 'fa fa-toggle-off text-danger' : 'fas fa-trash-restore',
                            //   onClick: () => onStatusChange(data)
                            // }))
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
            <Modal modalRef={modalRef} title="Mensaje" hideFooter>
                <div className="row">
                    <div className="col-md-6">
                        <p>
                            <b>Tipo de contacto</b>:
                            <span className={`ms-2 badge ${dataLoaded?.contact_type === 'empresa' ? 'bg-primary' : 'bg-secondary'}`}>
                                {dataLoaded?.contact_type === 'empresa' ? 'Empresa' : 'Personal'}
                            </span>
                        </p>
                        <p>
                            <b>Nombre</b>:
                            <span className="ms-1">{dataLoaded?.name}</span>
                        </p>
                        {dataLoaded?.lastname && (
                            <p>
                                <b>Apellido</b>:
                                <span className="ms-1">{dataLoaded.lastname}</span>
                            </p>
                        )}
                        <p>
                            <b>Correo</b>:
                            <span className="ms-1">
                                {dataLoaded?.email || (
                                    <i className="text-muted">- Sin correo -</i>
                                )}
                            </span>
                        </p>
                    </div>
                    <div className="col-md-6">
                        {dataLoaded?.phone && (
                            <p>
                                <b>Teléfono</b>:
                                <span className="ms-1">{dataLoaded.phone}</span>
                            </p>
                        )}
                        {dataLoaded?.ruc && (
                            <p>
                                <b>RUC</b>:
                                <span className="ms-1">{dataLoaded.ruc}</span>
                            </p>
                        )}
                        <p>
                            <b>Asunto</b>:
                            <span className="ms-1">{dataLoaded?.subject}</span>
                        </p>
                        <p>
                            <b>Fecha</b>:
                            <span className="ms-1">
                                {dataLoaded?.created_at ? new Date(dataLoaded.created_at).toLocaleString() : '-'}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="mt-3">
                    <p>
                        <b>Mensaje</b>:
                    </p>
                    <div className="border rounded p-3 bg-light" style={{ whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto' }}>
                        {dataLoaded?.description}
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Mensajes">
            <Messages {...properties} />
        </BaseAdminto>
    );
});
