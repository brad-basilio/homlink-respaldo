import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import InputFormGroup from '../Components/Adminto/form/InputFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import ImageFormGroup from '../Components/Adminto/form/ImageFormGroup';
import Swal from 'sweetalert2';
import FormulasRest from '../Actions/Admin/FormulasRest';

const formulasRest = new FormulasRest()

const Formulas = ({ }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()
  const imageRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    descriptionRef.current.value = data?.description ?? ''
    priceRef.current.value = data?.price ?? ''
    imageRef.image.src = `/api/items/media/${data?.image}`
    imageRef.current.value = null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
    }

    const formData = new FormData()
    for (const key in request) {
      formData.append(key, request[key])
    }
    const file = imageRef.current.files[0]
    if (file) {
      formData.append('image', file)
    }

    const result = await formulasRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await formulasRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar item',
      text: '¿Estás seguro de eliminar este item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await formulasRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

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
        // container.unshift({
        //   widget: 'dxButton', location: 'after',
        //   options: {
        //     icon: 'plus',
        //     text: 'Nuevo item',
        //     hint: 'Nuevo item',
        //     onClick: () => onModalOpen()
        //   }
        // });
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
            dataSource: [
              { id: 'has_treatment', name: 'Recibió tratamiento' },
              { id: 'scalp_type', name: 'Tipo de cuero cabelludo' },
              { id: 'hair_type', name: 'Tipo de cabello' },
              { id: 'hair_goals', name: 'Objetivos' }
            ],
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
          dataField: 'image',
          caption: 'Imagen',
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar item' : 'Agregar item'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='principal-container'>
        <input ref={idRef} type='hidden' />
        <ImageFormGroup eRef={imageRef} label='Imagen' col='col-md-4' aspect={3 / 4} onError='/assets/img/routine/conditioner.png' />
        <div className="col-md-8">
          <InputFormGroup eRef={nameRef} label='Nombre' required />
          <InputFormGroup eRef={priceRef} label='Precio' type='number' step={0.01} required />
          <TextareaFormGroup eRef={descriptionRef} label='Resumen' rows={3} required />
        </div>
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