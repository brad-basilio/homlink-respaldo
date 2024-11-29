import { CreditCard, HeadphonesIcon, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Local } from 'sode-extend-react';
import CulqiRest from '../../Actions/CulqiRest';
import Global from '../../Utils/Global';
import Number2Currency from '../../Utils/Number2Currency';

const places = {
  'metropolitana': 'Lima Metropolitana',
  'alrededores': 'Lima Alrededores',
  'provincias': 'Provincias'
}

const Checkout = ({ formula, publicKey, selectedPlan, bundles, planes, session }) => {
  Culqi.publicKey = publicKey
  Culqi.options({
    paymentMethods: {
      tarjeta: true,
      yape: true,
      billetera: true,
      bancaMovil: true,
      agente: true,
      cuotealo: false,
    },
    installments: true,
    style: {
      logo: `${location.origin}/assets/img/icon-purple.svg`,
      bannerColor: '#A191B8'
    }
  })

  const cart = Local.get('vua_cart')

  const [sale, setSale] = useState({
    name: session?.name || null,
    lastname: session?.lastname || null,
    email: formula.email,
    phone: session?.phone || null,
    country: 'Perú',
    department: null,
    province: null,
    district: null,
    zip_code: null,
    address: null,
    number: null,
    reference: null,
    comment: null,
  });
  const [loading, isLoading] = useState(false);
  const [coupon, setCoupon] = useState('')

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  const restBundles = bundles.filter(x => {
    switch (x.comparator) {
      case '<':
        return totalQuantity < x.items_quantity
      case '>':
        return totalQuantity > x.items_quantity
      default:
        return totalQuantity == x.items_quantity
    }
  }).sort((a, b) => b.percentage - a.percentage)

  const bundle = restBundles?.[0] ?? null
  const bundleDiscount = totalPrice * (bundle?.percentage || 0)

  const plan = planes.find(x => x.id == selectedPlan)
  const planDiscount = totalPrice * (plan?.percentage || 0)

  const getSale = () => {
    let department = 'Lima';
    let province = 'Lima'
    let district = null

    if (sale.province == 'Lima metropolitana') {
      province = 'Lima metropolitana'
      district = null
    }
    if (sale.province == 'Lima Alrededores') {
      province = sale.district
    }
    if (sale.province == 'Provincias') {
      department = sale.district
      province = null
    }

    return {
      ...sale,
      department, province, district
    }
  }

  const onCulqiOpen = async (e) => {
    e.preventDefault()
    if (loading) return
    isLoading(true)
    let order_number = null
    if (totalPrice > 6) {
      const resCQ = await CulqiRest.order({
        ...getSale(),
        order_number: Culqi.order_number,
        user_formula_id: formula.id,
        renewal_id: selectedPlan,
        coupon_id: null
      }, cart);
      if (resCQ) {
        order_number = resCQ.data.id
        Culqi.order_number = resCQ.data.order_number
      }
    }
    isLoading(false)
    Culqi.settings({
      title: Global.APP_NAME,
      currency: 'PEN',
      amount: Math.ceil((totalPrice - bundleDiscount - planDiscount) * 100),
      order: order_number
    })
    Culqi.open();
  }

  window.culqi = async () => {
    if (Culqi.token) {
      const resCQ = await CulqiRest.token({ ...getSale(), order_number: Culqi.order_number, user_formula_id: formula.id }, cart)
      if (resCQ) location.href = '/thanks'
    } else if (Culqi.order) {
      console.log(Culqi.order)
      redirectOnClose()
    }
  }

  const redirectOnClose = () => {
    setInterval(() => {
      if (Culqi.isOpen) return
      location.href = '/thanks'
    }, 500)
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
          <form className="w-full rounded-lg bg-white p-8 shadow-lg" onSubmit={onCulqiOpen}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 relative">
              <div className='lg:col-span-3'>
                <h2 className="mb-4 text-xl font-semibold">Información del cliente</h2>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="email">
                    Dirección de correo electrónico <b className='text-red-500'>*</b>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={sale.email}
                    placeholder='Dirección de correo electrónico'
                    onChange={(e) => setSale(old => ({ ...old, email: e.target.value }))}
                    required
                  />
                </div>
                <h2 className="mb-4 text-xl font-semibold">Detalles de facturación</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium " htmlFor="firstName">
                      Nombre <b className='text-red-500'>*</b>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                      value={sale.name}
                      onChange={(e) => setSale(old => ({ ...old, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium " htmlFor="lastName">
                      Apellidos <b className='text-red-500'>*</b>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                      value={sale.lastname}
                      onChange={(e) => setSale(old => ({ ...old, lastname: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="country">
                    País / Región <b className='text-red-500'>*</b>
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={sale.country}
                    disabled
                    required
                  />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-5">
                  <div className='md:col-span-2'>
                    <label className="mb-1 block text-sm font-medium " htmlFor="province">
                      Región / Provincia <b className='text-red-500'>*</b>
                    </label>
                    <select
                      id="province"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                      value={sale.province}
                      onChange={(e) => setSale(old => ({ ...old, province: e.target.value }))}
                      required
                    >
                      <option value=''>Elige una opción</option>
                      <option>Lima Metropolitana</option>
                      <option>Lima Alrededores</option>
                      <option>Otras Provincias</option>
                    </select>
                  </div>
                  {
                    (sale.province == 'Lima Alrededores' || sale.province == 'Otras Provincias') && <>
                      <div className='md:col-span-2'>
                        <label className="mb-1 block text-sm font-medium " htmlFor="district">
                          {
                            sale.province == 'Lima Alrededores'
                              ? 'Distrito'
                              : 'Departamento'
                          }
                        </label>
                        <input
                          type="text"
                          id="district"
                          className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                          value={sale.district}
                          onChange={(e) => setSale(old => ({ ...old, district: e.target.value }))}
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
                          value={sale.zip_code}
                          onChange={(e) => setSale(old => ({ ...old, zip_code: e.target.value }))}
                        />
                      </div>
                    </>
                  }
                </div>
                <div className="mt-4">
                  <div className="mt-4 grid gap-4 md:grid-cols-5 lg:grid-cols-3">
                    <div className='md:col-span-3 lg:col-span-2'>
                      <label className="mb-1 block text-sm font-medium " htmlFor="address">
                        Dirección de la calle <b className='text-red-500'>*</b>
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                        value={sale.address}
                        placeholder='Nombre de la calle y número de la calle'
                        onChange={(e) => setSale(old => ({ ...old, address: e.target.value }))}
                        required
                      />
                    </div>
                    <div className='md:col-span-2 lg:col-span-1'>
                      <label className="mb-1 block text-sm font-medium " htmlFor="number">
                        Número <b className='text-red-500'>*</b>
                      </label>
                      <input
                        type="text"
                        id="number"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                        value={sale.number}
                        placeholder='Nombre de la calle y número de la calle'
                        onChange={(e) => setSale(old => ({ ...old, number: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="apartment">
                    Apartamento, habitación, piso, etc. (opcional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={sale.reference}
                    onChange={(e) => setSale(old => ({ ...old, reference: e.target.value }))}
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium " htmlFor="phone">
                    Teléfono/Celular <b className='text-red-500'>*</b>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                    value={sale.phone}
                    onChange={(e) => setSale(old => ({ ...old, phone: e.target.value }))}
                    required
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
                    value={sale.comment}
                    onChange={(e) => setSale(old => ({ ...old, comment: e.target.value }))}
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
                    <div className='mb-2'>
                      {
                        cart.map((item, index) => {
                          return <div key={index} className="mb-1 flex items-center justify-between text-sm">
                            <div className='flex gap-2'>
                              <div className='h-10 aspect-[3/4] relative'>
                                <img className="h-10 aspect-[3/4] object-contain object-center rounded-md border" src={`/api/colors/media/${item.colors[0]?.image}`} alt={item.name} onError={e => e.target.src = `/api/items/media/${item.image}`} />
                              </div>
                              <div>
                                <p>{item.name}</p>
                                <small className="text-xs text-gray-500">
                                  <span className='w-6 inline-block text-nowrap'>
                                    × {item.quantity}
                                  </span>
                                  <div className='inline-flex flex-wrap gap-1'>
                                    {item.colors.map((color, jndex) => {
                                      return <i className='mdi mdi-circle' style={{ color: color?.hex ?? '#000', WebkitTextStroke: '1px #808080' }}></i>
                                    })}
                                  </div>
                                </small>
                              </div>
                            </div>
                            <span className=''>S/ {Number2Currency(item.price * item.quantity)}</span>
                          </div>
                        })
                      }
                    </div>
                    <div className="mb-2 mt-4 flex justify-between border-b pb-2 text-sm font-bold">
                      <span>Subtotal</span>
                      <span>S/ {Number2Currency(totalPrice)}</span>
                    </div>
                    {
                      bundle &&
                      <div className="mb-2 mt-2 flex justify-between items-center border-b pb-2 text-sm font-bold">
                        <span>
                          Descuento x paquete
                          <small className='block text-xs font-light'>Elegiste {bundle.name} (-{Math.round(bundle.percentage * 10000) / 100}%)</small>
                        </span>
                        <span>S/ -{Number2Currency(bundleDiscount)}</span>
                      </div>
                    }
                    {
                      plan &&
                      <div className="mb-2 mt-2 flex justify-between items-center border-b pb-2 text-sm font-bold">
                        <span>
                          Subscripción
                          <small className='block text-xs font-light'>{plan.name} (-{Math.round(plan.percentage * 10000) / 100}%)</small>
                        </span>
                        <span>S/ -{Number2Currency(planDiscount)}</span>
                      </div>
                    }
                    {
                      sale.province &&
                      <div className="mb-4 flex justify-between text-sm border-b pb-2">
                        <span className='font-bold'>Envío</span>
                        <span>
                          {
                            sale.province == 'Lima Metropolitana'
                              ? 'Gratis'
                              : 'Por Shalom - Pago en destino'
                          }
                        </span>
                      </div>
                    }
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>S/ {Number2Currency(totalPrice - bundleDiscount - planDiscount)}</span>
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
                    <button className="rounded-r-md bg-[#C5B8D4] px-4 py-2 text-sm text-white" type='button'>
                      Aplicar
                    </button>
                  </div>

                  <button type='submit' className="mt-6 w-full rounded-md bg-[#C5B8D4] py-3 text-white disabled:cursor-not-allowed" disabled={loading}>
                    {
                      loading
                        ? <i className='fa fa-spinner fa-spin me-1'></i>
                        : <i className='mdi mdi-lock me-1'></i>
                    }
                    Pagar Ahora
                    <small className='ms-1'>(S/ {Number2Currency(totalPrice - bundleDiscount - planDiscount)})</small>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout