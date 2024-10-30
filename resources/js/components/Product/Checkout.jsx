import { useState } from 'react'
import { ShieldCheck, HeadphonesIcon, CreditCard, X } from 'lucide-react'
import { Local } from 'sode-extend-react';
import Number2Currency from '../../Utils/Number2Currency';
import Global from '../../Utils/Global';

const Checkout = ({ publicKey }) => {
  Culqi.publicKey = publicKey
  Culqi.options({
    paymentMethods: {
      tarjeta: true,
      yape: true,
      billetera: false,
      bancaMovil: true,
      agente: true,
      cuotealo: true,
    },
    installments: true,
    style: {
      logo: `${location.origin}/assets/img/icon-purple.svg`,
      bannerColor: '#A191B8'
    }
  })

  const cart = Local.get('vua_cart')

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('Perú')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [phone, setPhone] = useState('')
  const [coupon, setCoupon] = useState('')
  const [orderNotes, setOrderNotes] = useState('')

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const onCulqiOpen = () => {
    Culqi.settings({
      title: Global.APP_NAME,
      currency: 'PEN',
      amount: Math.ceil(totalPrice * 100),
      email: 'holamundo@gmail.com'
    })

    Culqi.open();
  }

  window.culqi = () => {
    console.log(e, Culqi)
  }

  return (
    <>
      <section className='px-[5%] md:px-[7.5%] lg:px-[10%] pb-[5%] mt-[7.5%] md:mt-[5%] lg:mt-[2.5%] text-[#404040]'>
        <div className='max-w-4xl mx-auto'>
          <div className="mb-6 flex justify-center space-x-8 text-sm text-white">
            <div className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>SSL Pago Seguro</span>
            </div>
            <div className="flex items-center">
              <HeadphonesIcon className="mr-2 h-4 w-4" />
              <span>24/7 Atención al cliente</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Pago online</span>
            </div>
          </div>
          <div className="w-full rounded-lg bg-white p-8 shadow-lg">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 relative">
              <div className='lg:col-span-3'>
                <h2 className="mb-4 text-xl font-semibold">Información del cliente</h2>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="email">
                    Dirección de correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={email}
                    placeholder='Dirección de correo electrónico'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <h2 className="mb-4 text-xl font-semibold">Detalles de facturación</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium " htmlFor="firstName">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium " htmlFor="lastName">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="country">
                    País / Región *
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={country}
                    disabled
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-5">
                  <div className='md:col-span-2'>
                    <label className="mb-1 block text-sm font-medium " htmlFor="province">
                      Región / Provincia *
                    </label>
                    <select
                      id="province"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    >
                      <option value=''>Elige una opción</option>
                      <option value='lima-metropolitana'>Lima metropolitana</option>
                      <option value='lima-provincia'>Distritos de Lima</option>
                      <option value='otros'>Otros departamentos</option>
                    </select>
                  </div>
                  {
                    (province == 'lima-provincia' || province == 'otros') && <>
                      <div className='md:col-span-2'>
                        <label className="mb-1 block text-sm font-medium " htmlFor="district">
                          {
                            province == 'lima-provincia'
                              ? 'Distrito'
                              : 'Departamento'
                          }
                        </label>
                        <input
                          type="text"
                          id="district"
                          className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium  truncate text-ellipsis" htmlFor="postalCode" title='Código postal'>
                          Código postal
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                    </>
                  }
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="address">
                    Dirección de la calle *
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={address}
                    placeholder='Nombre de la calle y número de la calle'
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="apartment">
                    Apartamento, habitación, escalera, etc. (opcional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="phone">
                    Teléfono/Celular *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="orderNotes">
                    Notas del pedido (opcional)
                  </label>
                  <textarea
                    id="orderNotes"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    rows={3}
                    placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    style={{
                      minHeight: 81,
                      fieldSizing: 'content'
                    }}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="mb-4 text-xl font-semibold">Pago</h3>
                  <div className="rounded-md border border-gray-300">
                    <div className='p-4 py-3 flex justify-between'>
                      <img className='h-4' src="/assets/img/checkout/culqi-logo.svg" alt="Culqi" />
                      <div className='flex gap-2'>
                        <img className='h-4' src="/assets/img/checkout/cards.svg" alt="Cards" />
                        <img className='h-4' src="/assets/img/checkout/pagoefectivo.svg" alt="Pago efectivo" />
                        <img className='h-4' src="/assets/img/checkout/yape.svg" alt="Yape" />
                      </div>
                    </div>
                    <p className="text-xs bg-[#f9f9f9] p-4 px-6 rounded-b">
                      Acepta pagos con <b>tarjetas de débito y crédito, Yape, Cuotealo BCP y PagoEfectivo</b>
                      (billeteras móviles, agentes y bodegas).
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-xs">
                  <p className='text-justify'>
                    Sus datos personales se utilizarán para procesar su pedido, respaldar su experiencia en este sitio web y para otros fines descritos en nuestra {' '}
                    <a href="#" className="text-purple-600 hover:underline">
                      política de privacidad
                    </a>.
                  </p>
                </div>
                {/* <button className="mt-6 w-full rounded-md bg-pink-400 py-3 text-white hover:bg-pink-500" onClick={onCulqiOpen}>
                  <i className='mdi mdi-lock me-1'></i>
                  Realizar el pedido S/ {Number2Currency(totalPrice)}
                </button> */}
              </div>
              <div className='lg:col-span-2 relative'>
                <div className='block sticky top-4'>
                  <h2 className="mb-4 text-xl font-semibold">Tu pedido</h2>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-4 flex justify-between border-b pb-2 font-bold">
                      <span className="">Producto</span>
                      <span className="">Subtotal</span>
                    </div>
                    {
                      cart.map((item, index) => {
                        return <div key={index} className="mb-1 flex items-center justify-between text-sm">
                          <div>
                            <p>{item.name}</p>
                            <small className="text-xs text-gray-500">
                              <span className='w-6 inline-block text-nowrap'>
                                × {item.quantity}
                              </span>
                              <div className='inline-flex flex-wrap gap-1'>
                                {item.colors.map((color, jndex) => {
                                  return <i className='mdi mdi-circle' style={{ color: color.hex, WebkitTextStroke: '1px #808080' }}></i>
                                })}
                              </div>
                            </small>
                          </div>
                          <span className=''>S/ {Number2Currency(item.price * item.quantity)}</span>
                        </div>
                      })
                    }
                    <div className="mb-2 mt-4 flex justify-between border-b pb-2 text-sm font-bold">
                      <span>Subtotal</span>
                      <span>S/ {Number2Currency(totalPrice)}</span>
                    </div>
                    {
                      province &&
                      <div className="mb-4 flex justify-between text-sm border-b pb-2">
                        <span className='font-bold'>Envío</span>
                        <span>
                          {
                            province == 'lima-metropolitana'
                              ? 'Gratis'
                              : 'Envío por Shalóm'
                          }
                        </span>
                      </div>
                    }
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>S/ {Number2Currency(totalPrice)}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex">
                    <input
                      type="text"
                      placeholder="Código de cupón"
                      className="w-full rounded-l-md border border-gray-300 p-2 text-sm outline-none"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button className="rounded-r-md bg-[#C5B8D4] px-4 py-2 text-sm text-white">
                      Aplicar
                    </button>
                  </div>

                  <button className="mt-6 w-full rounded-md bg-[#C5B8D4] py-3 text-white" onClick={onCulqiOpen}>
                    <i className='mdi mdi-lock me-1'></i>
                    Pagar Ahora 
                    <small className='ms-1'>(S/ {Number2Currency(totalPrice)})</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout