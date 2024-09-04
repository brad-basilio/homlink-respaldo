import React, { useRef } from "react"
import Select from "react-select"

const Header = ({ specialties, setFilter }) => {
  const specialtyRef = useRef()
  const searchRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    const specialty = specialtyRef.current.getValue()[0]
    const search = searchRef.current.value
    setFilter(old => ({
      ...old,
      specialty: specialty?.value || null,
      search
    }))
  }

  return <>
    <section className="mt-[68px] p-[5%] flex flex-col justify-center items-center w-full bg-sky-800 max-md:max-w-full">
      <header className="flex flex-col mb-0 max-w-full w-[937px] max-md:mb-2.5">
        <div className="flex flex-col w-full text-center text-white max-md:max-w-full">
          <p className="text-base leading-5 md:leading-6 max-md:max-w-full">
            Estás listo para dar un gran paso en tu desarrollo personal y profesional, y sabes que necesitas el apoyo adecuado. Entonces, descubres Net Coaching, donde los mejores coaches y mentores de Latinoamérica te esperan a solo un clic de distancia.
          </p>
          <h1 className="mt-6 text-2xl md:text-4xl font-bold leading-8 md:leading-10 max-md:max-w-full">
            Net Coaching te conecta con el coach/mentor perfecto para impulsar tu desarrollo humano y bienestar integral
          </h1>
        </div>
      </header>

      <form className="flex flex-wrap gap-6 justify-center mt-10 w-full" aria-label="Coach and Mentor Search" onSubmit={onSubmit}>
        {/* Select de Especialidad */}
        <div className="w-full max-w-[240px]">
          <Select
            ref={specialtyRef}
            className="text-black"
            options={[{id: null, name: 'Todos'},...specialties].map(({ id: value, name: label }) => ({ value, label }))}
            placeholder="Especialidad"
            defaultValue={{ value: null, label: 'Todos' }}
            styles={{
              control: (base) => ({
                ...base,
                padding: '10px',
                borderRadius: '12px',
                borderColor: 'white',
              }),
              placeholder: (base) => ({
                ...base,
                color: '#000',
              }),
            }}
            onChange={(e) => setFilter(old => ({ ...old, specialty: e.value }))}
          />
        </div>
        <div className="w-full max-w-[240px]">
          <input
            ref={searchRef}
            type="text"
            placeholder="Encuentra tu coach"
            className="w-full px-6 py-4 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring focus:ring-blue-500"
            onChange={e => setFilter(old => ({ ...old, search: e.target.value || null }))}
          />
        </div>
        <button type="submit" className="px-6 py-3 font-bold leading-tight whitespace-nowrap bg-red-500 rounded-lg text-white">
          Buscar <i className='ml-2 fa fa-search'></i>
        </button>
      </form>
    </section>
  </>
}

export default Header 