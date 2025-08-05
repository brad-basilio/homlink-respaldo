import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../components/Table';
import Modal from '../components/Modal';
import InputFormGroup from '../components/form/InputFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../components/dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import Swal from 'sweetalert2';
import FaqsRest from '../actions/Admin/FaqsRest';
import QuillFormGroup from '../components/Adminto/form/QuillFormGroup';
import html2string from '../Utils/html2string';
import SelectFormGroup from '../components/Adminto/form/SelectFormGroup';

const faqsRest = new FaqsRest()

const Faqs = ({services }) => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  //const serviceRef = useRef();

  const [selectedService, setSelectedService] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    descriptionRef.current.value = data?.description ?? ''
    //descriptionRef.editor.root.innerHTML = data?.description ?? ''
      /*$(serviceRef.current)
            .val(data?.service_id || null)
            .trigger("change");*/

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      //service_id: serviceRef.current.value || undefined
    }

    const result = await faqsRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await faqsRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar faq',
      text: '¿Estas seguro de eliminar este faq?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await faqsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='FAQs' rest={faqsRest}
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
            text: 'Nuevo faq',
            hint: 'Nuevo faq',
            onClick: () => onModalOpen()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        }, {
          dataField: 'service.name',
          caption: 'Servicio',
          width: '40%'
        },
        {
          dataField: 'name',
          caption: 'Pregunta',
          width: '40%'
        },
        {
          dataField: 'description',
          caption: 'Respuesta',
          width: '50%',
          cellTemplate: (container, {data}) => {
            ReactAppend(container, <>
              <span className='text-sm'>{html2string(data.description)}</span>
            </>)
          }
        },
        {
          dataField: 'visible',
          caption: 'Visible',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            ReactAppend(container, <SwitchFormGroup checked={data.visible == 1} onChange={() => onVisibleChange({
              id: data.id,
              value: !data.visible
            })} />)
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar faq' : 'Agregar faq'} onSubmit={onModalSubmit} size='lg'>
      <div className='row' id='testimony-container'>
        <input ref={idRef} type='hidden' />
       {/*  <SelectFormGroup
                            eRef={serviceRef}
                            label="Servicio"
                            required
                            dropdownParent="#testimony-container"
                            onChange={(e) =>
                                setSelectedService(e.target.value)
                            }
                        >
                            {services.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </SelectFormGroup> */}
        <TextareaFormGroup eRef={nameRef} label='Pregunta' rows={2} required />
        <TextareaFormGroup eRef={descriptionRef} label='Respuesta' rows={3} required /> 
       {/* <QuillFormGroup eRef={descriptionRef} label='Respuesta' required /> */}
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='FAQs'>
    <Faqs {...properties} />
  </BaseAdminto>);
})
