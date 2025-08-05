import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "@Utils/CreateReactScript";
import Table from "../components/Table";
import DxButton from "../components/dx/DxButton";
import ReactAppend from "@Utils/ReactAppend";

import Modal from "@Adminto/Modal";
import Swal from "sweetalert2";
import AppointmentsRest from "../actions/Admin/AppointmentsRest";

const appointmentsRest = new AppointmentsRest();

const Appointments = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    const [dataLoaded, setDataLoaded] = useState(null);

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar cita",
            text: "¿Estas seguro de eliminar este cita?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await appointmentsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onModalOpen = (data) => {
        if (!data.seen) {
            appointmentsRest.boolean({
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
                title="Citas"
                rest={appointmentsRest}
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
                            ReactAppend(
                                container,
                                <span
                                    style={{
                                        width: "100%",
                                        fontWeight: data.seen
                                            ? "lighter"
                                            : "bold",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => onModalOpen(data)}
                                >
                                    {data.name}
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "email",
                        caption: "Correo",
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
                                    title: "Ver cita",
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
                <p>
                    <b>Nombre</b>:
                    <span className="ms-1">
                        {dataLoaded?.name} {dataLoaded?.lastname_father}{" "}
                        {dataLoaded?.lastname_mother}
                    </span>
                </p>
                <p>
                    <b>Correo</b>:
                    <span className="ms-1">
                        {dataLoaded?.email || (
                            <i className="text-muted">- Sin correo -</i>
                        )}
                    </span>
                </p>
                <p>
                    <b>Telefono</b>:
                    <span className="ms-1">{dataLoaded?.number}</span>
                </p>
                <p>
                    <b>DNI O CE</b>:
                    <span className="ms-1">{dataLoaded?.document}</span>
                </p>
                <p>
                    <b>Mensaje</b>:
                    <span className="ms-1">{dataLoaded?.description}</span>
                </p>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Citas">
            <Appointments {...properties} />
        </BaseAdminto>
    );
});
