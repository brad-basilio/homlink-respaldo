import React, { useState } from 'react';

const FormulaCard = ({ name, created_at, has_treatment, scalp_type, hair_type, hair_goals, fragrance, index }) => {

  const [nameEditing, setNameEditing] = useState(false);

  return <div className='relative w-full'>
    <div className='relative bg-[#F7F7E7] p-4 rounded-xl w-full pb-8'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div>
          {
            nameEditing
              ? <input type="text" className='w-full outline-none px-3 py-1 rounded-md' defaultValue={name} onBlur={() => setNameEditing(false)} autoFocus />
              : <span className='text-lg font-bold' onClick={() => setNameEditing(true)}>Fórmula {index + 1}</span>
          }
        </div>
        <small>Creado el {moment(created_at).format('ll')}</small>
      </div>
      <div className='text-sm mt-2'>
        <div>
          <b>🧐 Tratamiento</b>:{' '}
          {has_treatment.description}
        </div>
        <div>
          <b>👀 Cuero cabelludo</b>: {' '}
          {scalp_type.description}
        </div>
        <div>
          <b>✅ Tipo de cabello</b>:{' '}
          {hair_type.description}
        </div>
        <div>
          <b>💡 Objetivos</b>:{' '}
          {hair_goals.map(x => x.description).join(', ')}
        </div>
        <div>
          <b>🫙 Fragancia</b>:{' '}
          {fragrance.name}
        </div>
      </div>
      <button
        className='absolute -bottom-4 bg-[#A191B8] text-sm text-white px-4 py-2 rounded-full'>
        VOLVER A COMPRAR <i className='mdi mdi-arrow-top-right'></i>
      </button>
    </div>
  </div>
};

export default FormulaCard;
