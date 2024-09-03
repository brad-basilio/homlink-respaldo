import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '../Components/Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import InputFormGroup from '../Components/form/InputFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import SelectFormGroup from '../Components/form/SelectFormGroup';
import DxButton from '../Components/dx/DxButton';
import BenefitsRest from '../Actions/Admin/BenefitsRest';
import TextareaFormGroup from '../Components/Adminto/form/TextareaFormGroup';
import { renderToString } from 'react-dom/server';
import SwitchFormGroup from '../Components/Adminto/form/SwitchFormGroup';

const benefitsRest = new BenefitsRest()

const Benefits = ({ icons }) => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const iconRef = useRef()
  const descriptionRef = useRef()
  const imageRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    $(iconRef.current).val(data?.icon ?? 'fab fa-dribbble-square').trigger('change')
    nameRef.current.value = data?.name ?? ''
    descriptionRef.current.value = data?.description ?? ''

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      icon: $(iconRef.current).val(),
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    }

    const result = await benefitsRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await benefitsRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await benefitsRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar recurso',
      text: '¿Estas seguro de eliminar este beneficio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await benefitsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const iconTemplate = (e) => {
    return $(renderToString(<span>
      <i className={`${e.id} me-1`}></i>
      {e.text}
    </span>))
  }

  return (<>
    <Table gridRef={gridRef} title='Beneficios' rest={benefitsRest}
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
            text: 'Nuevo beneficio',
            hint: 'Nuevo beneficio',
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
          dataField: 'icon',
          caption: 'Ícono',
          cellTemplate: (container, { data }) => {
            container.append(renderToString(<>
              <i className={`${data.icon} me-1`}></i>
              <span>{data.icon}</span>
            </>))
          }
        },
        {
          dataField: 'name',
          caption: 'Titulo'
        },
        {
          dataField: 'image',
          caption: 'Imagen',
          width: '90px',
          cellTemplate: (container, { data }) => {
            if (data.social_media == 'youtube') {
              ReactAppend(container, <img src={`https://i.ytimg.com/vi/${data.media_id}/hqdefault.jpg`} style={{ width: '80px', height: '48px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} />)
            } else {
              ReactAppend(container, <img src='/api/cover/thumbnail/null' style={{ width: '80px', height: '48px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} />)
            }
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar beneficio' : 'Agregar beneficio'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='benefits-container'>
        <input ref={idRef} type='hidden' />
        <SelectFormGroup eRef={iconRef} label="Ícono" dropdownParent='#benefits-container' required templateResult={iconTemplate} templateSelection={iconTemplate}>
          {
            icons.map((icon, i) => {
              return <option key={`icon-${i}`} value={icon.id}>
                {icon.value}
              </option>
            })
          }
        </SelectFormGroup>
        <InputFormGroup eRef={nameRef} label='Titulo' col='col-12' required />
        <TextareaFormGroup eRef={descriptionRef} label='Descripción' rows={3} />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Beneficios'>
    <Benefits {...properties} />
  </BaseAdminto>);
})