import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "../Components/Modal";
import Table from "../Components/Table";
import InputFormGroup from "../Components/form/InputFormGroup";
import SelectFormGroup from "../Components/form/SelectFormGroup";
import TextareaFormGroup from "../Components/form/TextareaFormGroup";
import CreateReactScript from "../Utils/CreateReactScript";
import SetSelectValue from "../Utils/SetSelectValue";
import CoachesRest from "../actions/CoachesRest";
import Adminto from "./components/Adminto";

const coachesRest = new CoachesRest();

const Coaches = ({ countries }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const tableRef = useRef()
  const nameRef = useRef()
  const professionRef = useRef()
  const cityRef = useRef()
  const countryRef = useRef()
  const colorRef = useRef()
  const phoneRef = useRef()
  const descriptionRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id || null
    SetSelectValue(tableRef.current, data?.table?.id, data?.table?.name)
    nameRef.current.value = data?.name || null
    phoneRef.current.value = data?.color || '#343a40'
    descriptionRef.current.value = data?.description || null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      table_id: tableRef.current.value,
      name: nameRef.current.value,
      color: colorRef.current.value,
      description: descriptionRef.current.value,
    }

    const result = await coachesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await coachesRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const result = await coachesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Coaches' rest={coachesRest}
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
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'table.name',
          caption: 'Tabla',
          dataType: 'string'
        },
        {
          dataField: 'name',
          caption: 'Estado de tabla'
        },
        {
          dataField: 'color',
          caption: 'Color',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <span className={`badge rounded-pill`} style={{ backgroundColor: data.color || '#343a40' }}>{data.color}</span>)
          }
        },
        {
          dataField: 'description',
          caption: 'Descripcion',
          cellTemplate: (container, { value }) => {
            if (!value) ReactAppend(container, <i className='text-muted'>- Sin descripcion -</i>)
            else ReactAppend(container, value)
          }
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            switch (data.status) {
              case 1:
                ReactAppend(container, <span className='badge bg-success rounded-pill'>Activo</span>)
                break
              case 0:
                ReactAppend(container, <span className='badge bg-danger rounded-pill'>Inactivo</span>)
                break
              default:
                ReactAppend(container, <span className='badge bg-dark rounded-pill'>Eliminado</span>)
                break
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.attr('style', 'display: flex; gap: 4px; overflow: unset')

            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-primary' title='Editar' onClick={() => onModalOpen(data)}>
              <i className='fa fa-pen'></i>
            </TippyButton>)

            ReactAppend(container, <TippyButton className='btn btn-xs btn-light' title={data.status === null ? 'Restaurar' : 'Cambiar estado'} onClick={() => onStatusChange(data)}>
              {
                data.status === 1
                  ? <i className='fa fa-toggle-on text-success' />
                  : data.status === 0 ?
                    <i className='fa fa-toggle-off text-danger' />
                    : <i className='fas fa-trash-restore' />
              }
            </TippyButton>)

            ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-danger' title='Eliminar' onClick={() => onDeleteClicked(data.id)}>
              <i className='fa fa-trash-alt'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar datos del coach' : 'Agregar nuevo coach'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='status-crud-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Nombre completo' col='col-12' required />
        <InputFormGroup eRef={professionRef} label='Especialidad' col='col-12' required />
        <SelectFormGroup eRef={countryRef} label='Pais' col='col-md-6' dropdownParent='#status-crud-container' required >
          {
            countries.map((country, i) => {
              return <option key={`country-${i}`} value={country.id}>{country.name}</option>
            })
          }
        </SelectFormGroup>
        <InputFormGroup eRef={cityRef} label='Ciudad' col='col-md-6' required />
        <InputFormGroup eRef={phoneRef} label='Telefono de contacto' col='col-12' required />
        <TextareaFormGroup eRef={descriptionRef} label='Reseña' col='col-12' />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Adminto {...properties} title='Coaches'>
    <Coaches {...properties} />
  </Adminto>);
})