import React from "react"
import Select from 'react-select'
import CoachCard from "./CoachCard"

const Content = ({ coaches, countries }) => {
  return <>
    <section className='p-[5%] min-h-[75vh] block md:flex items-start gap-5'>
      <form className="flex flex-col w-full md:w-4/12 lg:w-3/12">
        <div className='w-full lg:w-full'>
          <label className="text-lg font-semibold text-gray-800 mb-2">Ordenar por precio</label>
          <Select
            className='block text-black'
            options={[
              { value: 'asc', label: 'De menor a mayor' },
              { value: 'desc', label: 'De mayor a menor' }
            ]}
            defaultValue={{ value: 'asc', label: 'De menor a mayor' }}
            styles={{
              control: (base) => ({
                ...base,
                padding: '4px',
                borderRadius: '6px'
              }),
              placeholder: (base) => ({
                ...base,
                color: '#000',
              }),
            }} />
        </div>
        <div className="flex flex-col items-start py-4 w-full">
          <label className="text-left text-lg font-semibold text-gray-800 mb-2">Precio</label>
          <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4 w-full">
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Desde</label>
              <input
                type="number"
                min="0"
                placeholder="$ 8"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Hasta</label>
              <input
                type="number"
                min="0"
                placeholder="$ 70"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </form>
      <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-8/12 lg:w-9/12'>
        {coaches.map((coach, i) => {
          const country = countries.find((x) => x.id == coach.country)
          return <CoachCard key={i} {...coach} country={country} />;
        })}
      </section>
    </section>
  </>
}

export default Content