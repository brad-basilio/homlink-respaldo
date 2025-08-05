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
import ImageFormGroup from '../components/Adminto/form/ImageFormGroup';
import SelectFormGroup from '../components/form/SelectFormGroup';
import Swal from 'sweetalert2';

import QuillFormGroup from '../components/Adminto/form/QuillFormGroup';
import SelectAPIFormGroup from '../components/Adminto/form/SelectAPIFormGroup';
import html2string from '../Utils/html2string';
import SetSelectValue from '../Utils/SetSelectValue';
import InfoproductsRest from '../actions/Admin/InfoproductsRest';

const postsRest = new InfoproductsRest()

const Infoproducts = ({ }) => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const categoryRef = useRef()
  const descriptionRef = useRef()
  //const tagsRef = useRef()
  const imageRef = useRef()
  const info_dateRef = useRef()
  const collaboratorRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    SetSelectValue(categoryRef.current, data?.category?.id, data?.category?.name);
    descriptionRef.current.value = data?.summary ?? ''
    imageRef.image.src = `/api/infoproducts/media/${data?.image}`
    imageRef.current.value = null

    // SetSelectValue(tagsRef.current, data?.tags ?? [], 'id', 'name')
    info_dateRef.current.value = data?.info_date ?? moment().format('YYYY-MM-DD')
    collaboratorRef.current.value = data?.collaborator ?? ''

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      category_id: categoryRef.current.value,

      summary: descriptionRef.current.value,
      // tags: $(tagsRef.current).val(),
      info_date: info_dateRef.current.value,
      collaborator: collaboratorRef.current.value
    }

    const formData = new FormData()
    for (const key in request) {
      formData.append(key, request[key])
    }
    const file = imageRef.current.files[0]
    if (file) {
      formData.append('image', file)
    }

    const result = await postsRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await postsRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }
  const onBooleanChange = async ({ id, field, value }) => {
    const result = await postsRest.boolean({ id, field, value });
    if (!result) return;
    $(gridRef.current).dxDataGrid("instance").refresh();
  };
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
    const result = await postsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Infoproductos' rest={postsRest}
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
          dataField: 'category.name',
          caption: 'Categoría',
        },
        {
          dataField: 'name',
          caption: 'Título',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <>
              {data.name}<br />
              {data.tags?.map((tag, index) => <span key={index} className='badge badge-soft-success me-1'>{tag.name}</span>)}
            </>)
          }
        },
        {
          dataField: 'image',
          caption: 'Imagen',
          width: '90px',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <img src={`/api/infoproducts/media/${data.image}`} style={{ width: '80px', height: '48px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} onError={e => e.target.src = '/api/cover/thumbnail/null'} />)
          }
        },
        {
          dataField: "featured",
          caption: "Destacado",
          dataType: "boolean",
          width: "80px",
          cellTemplate: (container, { data }) => {
            ReactAppend(
              container,
              <SwitchFormGroup
                checked={data.featured}
                onChange={(e) =>
                  onBooleanChange({
                    id: data.id,
                    field: "featured",
                    value: e.target.checked,
                  })
                }
              />
            );
          },
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar infoproducto' : 'Agregar infoproducto'} onSubmit={onModalSubmit} size='lg' >
      <div className='row' id='posts-container'>
        <input ref={idRef} type='hidden' />

        <ImageFormGroup eRef={imageRef} label='Imagen' col="col-7" aspect='16/9' />
        <div className='col-5'>
          <SelectAPIFormGroup eRef={categoryRef} searchAPI='/api/admin/infoproductcategories/paginate' searchBy='name' label='Categoría' required dropdownParent='#posts-container' />
          <InputFormGroup eRef={nameRef} label='Título' rows={2} required />
          <TextareaFormGroup eRef={descriptionRef} label='Contenido' col="col-12" />
          {/* <TextareaFormGroup eRef={tagsRef} label='Tags (Separado por comas)' rows={1} /> */}
          {/* <SelectAPIFormGroup id='tags' eRef={tagsRef} searchAPI={'/api/admin/tags/paginate'} searchBy='name' label='Tags' dropdownParent='#posts-container' tags multiple/> */}
          <InputFormGroup eRef={info_dateRef} label='Fecha de publicación' type='date' required />
          <InputFormGroup eRef={collaboratorRef} label='Colaborador' rows={2} required />
        </div>

      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Infoproductos'>
    <Infoproducts {...properties} />
  </BaseAdminto>);
})
