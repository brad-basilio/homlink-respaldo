import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import Swal from 'sweetalert2';
import InputFormGroup from '@Adminto/form/InputFormGroup';
import { renderToString } from 'react-dom/server';
import UsersRest from '../Actions/Admin/UsersRest';

const usersRest = new UsersRest()

const Users = ({ }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const iconRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const linkRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    $(iconRef.current).val(data?.icon ?? null);
    nameRef.current.value = data?.name ?? ''
    descriptionRef.current.value = data?.description ?? ''
    linkRef.current.value = data?.link ?? ''

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      icon: iconRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      link: linkRef.current.value,
    }

    const result = await usersRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onBooleanChange = async ({ id, field, value }) => {
    const result = await usersRest.boolean({ id, field, value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Banear usuario',
      text: '¿Estas seguro de banear a este usuario? Esta accion no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, banear',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await usersRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Usuarios' rest={usersRest}
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
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'name',
          caption: 'Nombre',
        },
        {
          dataField: 'lastname',
          caption: 'Apellido',
        },
        {
          dataField: 'email',
          caption: 'Correo electronico',
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            if (data.status == null) {
              container.html(renderToString(<i className='text-muted'>Baneado</i>))
            } else {
              ReactAppend(container, <SwitchFormGroup checked={data.status == 1} onChange={() => onBooleanChange({
                id: data.id,
                field: 'status',
                value: !data.status
              })} />)
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            if (data.status == null) return
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Banear usuario',
              icon: 'fas fa-ban',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar red social' : 'Agregar red social'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='socials-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={descriptionRef} label='Red social' col='col-md-8' required />
        <InputFormGroup eRef={nameRef} label='Usuario' col='col-12' required />
        <TextareaFormGroup eRef={linkRef} label='Enlace (https://...)' col='col-12' rows={2} required />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Usuarios'>
    <Users {...properties} />
  </BaseAdminto>);
})