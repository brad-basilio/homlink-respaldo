import React, { useRef, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import ProfileRest from '../../Actions/Customer/ProfileRest';
import Swal from 'sweetalert2';

ReactModal.setAppElement('#app');

const Information = ({ session }) => {

  const [modalOpen, setModalOpen] = useState(false)

  const nameRef = useRef()
  const lastnameRef = useRef()
  const phoneRef = useRef()
  const addressRef = useRef()
  const addressNumberRef = useRef()
  const addressReferenceRef = useRef()

  const onModalSubmit = async (e) => {
    e.preventDefault()
    const result = await ProfileRest.save({
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      address_number: addressNumberRef.current.value,
      address_reference: addressReferenceRef.current.value
    })
    if (!result) return
    Swal.fire({
      title: 'Información actualizada',
      text: 'Tu información se ha actualizado correctamente.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
    location.reload()
  }

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  return <>
    <div>
      <h2 className='text-xl border-b pb-2 mb-4 font-bold'>
        Tu informacion personal
      </h2>
      <div className='flex flex-col gap-6 p-6 pb-10 mb-4 items-start relative border bg-[#F7F7E7] rounded-3xl'>
        <div>
          <b>Nombres y apellidos:</b>
          <p>{session.name} {session.lastname}</p>
        </div>
        <div>
          <b>Correo electronico:</b>
          <p>{session.email}</p>
        </div>
        <div>
          <b>Telefono:</b>
          <p>{session.phone || <i className='opacity-75'>- Sin telefono -</i>}</p>
        </div>
        <div>
          <b>Direccion:</b>
          <p>{session?.address || 'Sin direccion'} {session?.address_number || 'SN'}
            <small className='opacity-75 block -mt-1'>{session?.province ?? session?.district}, {session?.department}, {session?.country} {session?.zip_code && <>- {session?.zip_code}</>}</small></p>
        </div>

        <button
          className='absolute -bottom-4 bg-[#A191B8] text-sm text-white px-4 py-2 rounded-full'
          onClick={() => setModalOpen(true)}>
          <i className='mdi mdi-pencil'></i> EDITAR INFORMACION
        </button>
      </div>
    </div>

    <ReactModal isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white p-10 rounded-2xl shadow-lg w-[95%] max-w-lg max-h-[95vh] overflow-y-auto'
      overlayClassName={'fixed inset-0 bg-black bg-opacity-50 z-50'}>
      <form onSubmit={onModalSubmit}>
        <div class="grid gap-6 mb-6 md:grid-cols-6">
          <div className='md:col-span-3'>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Nombres</label>
            <input ref={nameRef} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none" required
              defaultValue={session.name} />
          </div>
          <div className='md:col-span-3'>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Apellidos
            </label>
            <input ref={lastnameRef} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none" required
              defaultValue={session.lastname} />
          </div>
          <div className='col-span-6'>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Correo
            </label>
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none disabled:cursor-not-allowed disabled:bg-gray-100" required
              defaultValue={session.email} disabled />
          </div>
          <div className='md:col-span-3'>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">
              Pais
            </label>
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none disabled:cursor-not-allowed disabled:bg-gray-100" required
              defaultValue='Perú' disabled />
          </div>
          <div className='md:col-span-3'>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Teléfono
            </label>
            <input ref={phoneRef} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none" required
              defaultValue={session.phone} />
          </div>
          <div className='md:col-span-2'>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">
              Departamento
            </label>
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none disabled:cursor-not-allowed disabled:bg-gray-100" required
              defaultValue={session.department} disabled />
          </div>
          <div className='md:col-span-2'>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Provincia
            </label>
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none disabled:cursor-not-allowed disabled:bg-gray-100" required
              defaultValue={session.province} disabled />
          </div>
          <div className='md:col-span-2'>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Distrito
            </label>
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none disabled:cursor-not-allowed disabled:bg-gray-100" required
              defaultValue={session.district} disabled />
          </div>
          <div className='md:col-span-4'>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Dirección
            </label>
            <input ref={addressRef} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none disabled:cursor-not-allowed" required
              defaultValue={session.address} />
          </div>
          <div className='md:col-span-2'>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Número
            </label>
            <input ref={addressNumberRef} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none disabled:cursor-not-allowed" required
              defaultValue={session.address_number} />
          </div>
          <div className='col-span-6'>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
              Referencia
            </label>
            <input ref={addressReferenceRef} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F7C2C6] focus:border-[#F7C2C6] block w-full p-2.5 outline-none disabled:cursor-not-allowed" required
              defaultValue={session.address_reference} />
          </div>
        </div>
        <button className='bg-[#A191B8] text-sm text-white px-4 py-2 rounded-full'>
          <i className='fa fa-save me-2'></i>
          GUARDAR INFORMACIÓN
        </button>
      </form>
    </ReactModal>
  </>
}

export default Information;