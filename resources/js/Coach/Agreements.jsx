import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '../Components/Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '../Components/Table';
import ReactAppend from '@Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import AgreementsRest from '../Actions/Coach/AgreementsRest';
import Modal from '../Components/Coach/Agreements/Modal';

const agreementsRest = new AgreementsRest()

const Agreements = () => {

  const gridRef = useRef()

  const [contractNumber, setContractNumber] = useState(1)
  const [dataLoaded, setDataLoaded] = useState(null)

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar registro',
      text: '¿Estas seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await agreementsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Acuerdos' rest={agreementsRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            text: 'Nuevo registro',
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
          }
        });
      }}
      onRefresh={({ summary }) => {
        if (!summary?.contract_number) return
        setContractNumber(summary.contract_number)
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'coachee.name',
          caption: 'Coachee',
          dataType: 'string',
          cellTemplate: (container, { data }) => {
            container.text(`${data.coachee.name} ${data.coachee.lastname}`)
          }
        },
        {
          dataField: 'contract_number',
          caption: 'Acuerdo',
          dataType: 'number',
          cellTemplate: (container, { data }) => {
            container.text('C' + String(data.contract_number).padStart(3, '0'))
          }
        },
        {
          dataField: 'process_topic',
          caption: 'Tema',
        },
        {
          dataField: 'created_at',
          caption: 'Fecha',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.created_at).format('LL'))
          }
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            switch (data.status) {
              case 1:
                ReactAppend(container, <span className='badge bg-success rounded-pill'>Aprobado</span>)
                break
              case 0:
                ReactAppend(container, <div>
                  <span className='badge bg-danger rounded-pill'>Observado</span>
                </div>)
                break
              default:
                ReactAppend(container, <span className='badge bg-dark rounded-pill'>Pendiente</span>)
                break
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => setDataLoaded(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} onSave={() => $(gridRef.current).dxDataGrid('instance').refresh()} />
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Acuerdos'>
    <Agreements {...properties} />
  </BaseAdminto>);
})