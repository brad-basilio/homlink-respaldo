import React from 'react';

const Sidebar = ({ specialties }) => {

  const categories = [
    { title: 'Todas las categorías', isActive: true, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/701732b6bd91887682c39b41d57a41202c313af1d4971a256321afba101048ae?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731' },
    { title: 'Coaching empresarial', isActive: false },
    { title: 'Coaching de vida', isActive: false },
    { title: 'Coaching motivacional', isActive: false },
    { title: 'Coaching autoconocimiento', isActive: false },
  ];

  const archives = [
    { title: 'Marzo 2023', isActive: false },
    { title: 'Febrero 2023', isActive: true, icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ea973f0f2ca14f1da16ed00770b17430d2a3f040d2cec3a3069320847dc5d269?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731' },
    { title: 'Enero 2023', isActive: false },
    { title: 'Diciembre 2022', isActive: false },
    { title: 'Noviembre 2022', isActive: false },
  ];

  return (
    <aside className="flex flex-col w-[21%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full text-sm leading-snug text-teal-950 max-md:mt-10">
        <div className="flex gap-2 items-center px-2.5 py-3 w-full font-medium leading-tight text-black whitespace-nowrap rounded-lg bg-neutral-100">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5c50c94270995306ee0789677e210ca3ea7a92c00f6e316e4d0fccb8a581e61?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
          <div className="self-stretch my-auto">Buscar</div>
        </div>
        <div className="flex flex-col mt-8 w-full text-center max-w-[200px]">
          <div className="flex gap-10 justify-between items-center w-full text-base font-bold leading-tight whitespace-nowrap">
            <div className="self-stretch my-auto">Categorías</div>
            <div className="flex shrink-0 self-stretch my-auto w-5 h-5" />
          </div>
          {specialties.map((specialty, index) => (
            <div key={index} className={`flex gap-10 justify-between items-center mt-4 w-full`}>
              <div className="self-stretch my-auto">{specialty.name}</div>
              <div className="flex shrink-0 self-stretch my-auto w-5 h-5" />
            </div>
          ))}
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/153dd3ab65491e274b3e521062c6c09d1341d8d05c4472c5acd5443c38fb02cf?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain mt-8 aspect-[200] w-[200px]" />
        <div className="flex flex-col mt-8 w-full text-center max-w-[200px]">
          <div className="flex gap-10 justify-between items-center w-full text-base font-bold leading-tight whitespace-nowrap">
            <div className="self-stretch my-auto">Archivo</div>
            <div className="flex shrink-0 self-stretch my-auto w-5 h-5" />
          </div>
          {archives.map((archive, index) => (
            <div key={index} className={`flex gap-10 justify-between items-center mt-4 w-full ${archive.isActive ? 'font-medium leading-tight text-red-500' : ''}`}>
              <div className="self-stretch my-auto">{archive.title}</div>
              {archive.icon ? (
                <img loading="lazy" src={archive.icon} alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
              ) : (
                <div className="flex shrink-0 self-stretch my-auto w-5 h-5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;