import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../components/Table';
import Modal from '../components/Modal';
import InputFormGroup from '../components/Adminto/form/InputFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../components/dx/DxButton';
import FormulasRest from '../actions/Admin/FormulasRest';
import SelectFormGroup from '../components/Adminto/form/SelectFormGroup';
import SelectAPIFormGroup from '../components/Adminto/form/SelectAPIFormGroup';
import SetSelectValue from '../Utils/SetSelectValue';

const formulasRest = new FormulasRest()

const Formulas = ({ }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const suppliesRef = useRef()
  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    descriptionRef.current.value = data?.description ?? ''
    SetSelectValue(suppliesRef.current, data?.supplies, 'id', 'name')

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      supplies: $(suppliesRef.current).val()
    }

    const result = await formulasRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const names = [
    { id: 'has_treatment', name: 'Recibió tratamiento' },
    { id: 'scalp_type', name: 'Tipo de cuero cabelludo' },
    { id: 'hair_type', name: 'Tipo de cabello' },
    { id: 'hair_goals', name: 'Objetivos' }
  ]

  return (<>
    <Table gridRef={gridRef} title='Fórmulas' rest={formulasRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
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
          dataField: 'name',
          caption: 'Step',
          width: '150px',
          lookup: {
            dataSource: names,
            valueExpr: "id",
            displayExpr: "name"
          }
        },
        {
          dataField: 'description',
          caption: 'Respuesta',
          width: '200px',
        },
        {
          dataField: 'supplies.name',
          caption: 'Ingredientes',
          allowFiltering: false,
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <div className='d-flex gap-1'>
              {
                data.supplies.map((supply, index) => {
                  return <img key={index}
                    src={`/api/supplies/media/${supply.image}`}
                    style={{
                      width: '40px',
                      backgroundColor: '#fff',
                      border: '1px solid rgba(0,0,0,.125)',
                      aspectRatio: 5 / 4,
                      objectFit: 'contain',
                      objectPosition: 'center',
                      borderRadius: '4px'
                    }}
                    onError={e => e.target.src = '/assets/img/supplies/acido-salicilico.png'} />
                })
              }
            </div>)
          }
        },
        {
          caption: 'Acciones',
          width: '60px',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            // container.append(DxButton({
            //   className: 'btn btn-xs btn-soft-danger',
            //   title: 'Eliminar',
            //   icon: 'fa fa-trash',
            //   onClick: () => onDeleteClicked(data.id)
            // }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar fórmula' : 'Agregar fórmula'} onSubmit={onModalSubmit} size='md'>
      <div id='principal-container'>
        <input ref={idRef} type='hidden' />
        <SelectFormGroup eRef={nameRef} label='Step' required dropdownParent='#principal-container' col='col-12' disabled={isEditing}>
          {
            names.map((name, index) => {
              return <option key={index} value={name.id}>{name.name}</option>
            })
          }
        </SelectFormGroup>
        <InputFormGroup eRef={descriptionRef} label='Respuesta' required/>
        <SelectAPIFormGroup eRef={suppliesRef} label='Ingredientes' searchAPI='/api/admin/supplies/paginate' searchBy='name' required dropdownParent='#principal-container' col='col-12' multiple />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Fórmulas'>
    <Formulas {...properties} />
  </BaseAdminto>);
})
