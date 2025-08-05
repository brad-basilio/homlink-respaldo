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
import SelectFormGroup from "@Adminto/form/SelectFormGroup";
import IndicatorsRest from "../actions/Admin/IndicatorsRest";
import Swal from "sweetalert2";
import ImageFormGroup from "../components/Adminto/form/ImageFormGroup";

const indicatorsRest = new IndicatorsRest();

// Opciones para el select de correlative
const correlativeOptions = [
    { value: 'inicio_hero', text: 'Inicio - Hero' },
    { value: 'inicio_cupones', text: 'Inicio - Cupones' }, 
    { value: 'empresas_stats', text: 'Empresas - Estadísticas' },
  
];

const Indicators = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const symbolRef = useRef();
    const nameRef = useRef();
   // const percentageRef = useRef();
    const descriptionRef = useRef();
    const correlativeRef = useRef();
    const orderRef = useRef();

    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        // symbolRef.current.value = data?.symbol ?? "";
        symbolRef.image.src = `/api/indicator/media/${data?.symbol}`;
        symbolRef.current.value = null;
        nameRef.current.value = data?.name ?? "";
        //percentageRef.current.value = data?.percentage ?? "";
        descriptionRef.current.value = data?.description ?? "";
        correlativeRef.current.value = data?.correlative ?? "";
        orderRef.current.value = data?.order ?? "";

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            // symbol: symbolRef.current.value,
            name: nameRef.current.value,
            // percentage: percentageRef.current.value,
            description: descriptionRef.current.value,
            correlative: correlativeRef.current.value,
            order: orderRef.current.value,
        };
        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        const file = symbolRef.current.files[0];
        if (file) {
            formData.append("symbol", file);
        }

        const result = await indicatorsRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onStatusChange = async ({ id, status }) => {
        const result = await indicatorsRest.status({ id, status });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await indicatorsRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar indicador",
            text: "¿Estas seguro de eliminar este indicador?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await indicatorsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Indicadores"
                rest={indicatorsRest}
                sorting={{
                    mode: 'multiple'
                }}
                defaultSort={[
                    { field: 'correlative', direction: 'asc' },
                    { field: 'order', direction: 'asc' }
                ]}
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
                            text: "Nuevo indicador",
                            hint: "Nuevo indicador",
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
                        dataField: "symbol",
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
                                    src={`/api/indicator/media/${data.symbol}`}
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
                        caption: "Titulo",
                    },
                    {
                        dataField: "correlative",
                        caption: "Correlativo",
                        width: "120px",
                        cellTemplate: (container, { data }) => {
                            const option = correlativeOptions.find(opt => opt.value === data.correlative);
                            ReactAppend(
                                container,
                                <span className="badge bg-info">
                                    {option ? option.text : data.correlative || 'Sin asignar'}
                                </span>
                            );
                        },
                    },
                    {
                        dataField: "order",
                        caption: "Orden",
                        width: "80px",
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
                        dataField: "percentage",
                        caption: "Porcentaje",
                    },
                    {
                        dataField: "description",
                        caption: "Descripción",
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
                title={isEditing ? "Editar término" : "Agregar término"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="indicators-container">
                    <input ref={idRef} type="hidden" />
                    <ImageFormGroup
                        eRef={symbolRef}
                        label="Imagen"
                        aspect={1}
                        fit="cover"
                        col="col-sm-4"
                    />
                    <div className="col-md-8">
                        <InputFormGroup eRef={nameRef} label="Título" />
                        {/*<InputFormGroup eRef={symbolRef} label='Símbolo' col='col-sm-4' rows={2} required />*/}

                     {/*   <InputFormGroup

                            eRef={percentageRef}
                            type="number"
                            label="Porcentaje"
                        /> */}
                        
                        <div className="row">
                            <div className="col-md-6">
                                <SelectFormGroup
                                    eRef={correlativeRef}
                                    label="Correlativo"
                                   
                                    required
                                    dropdownParent={"#indicators-container"}
                                    
                                >
                                    {correlativeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.text}
                                        </option>
                                    ))}
                                    </SelectFormGroup>
                            </div>
                            <div className="col-md-6">
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
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Indicadores">
            <Indicators {...properties} />
        </BaseAdminto>
    );
});
