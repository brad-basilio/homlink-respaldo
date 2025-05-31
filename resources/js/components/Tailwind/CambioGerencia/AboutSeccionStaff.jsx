import React from "react";

const staff = [
  {
    name: "Juan Danon",
    role: "Fundador & CEO",
    image: "/assets/cambiogerencia/staff-1.jpg",
    linkedin: "#"
  },
  {
    name: "Marta Cortés",
    role: "Técnica",
    image: "/assets/cambiogerencia/staff-2.jpg",
    linkedin: "#"
  },
  {
    name: "Mia Man",
    role: "Admin. de oficina",
    image: "/assets/cambiogerencia/staff-3.jpg",
    linkedin: "#"
  },
  {
    name: "Lisa Rose",
    role: "Admin. de producto",
    image: "/assets/cambiogerencia/staff-4.jpg",
    linkedin: "#"
  },
  {
    name: "Juan Tom Valdez",
    role: "RRHH",
    image: "/assets/cambiogerencia/staff-5.jpg",
    linkedin: "#"
  },
  {
    name: "Ale Gomez",
    role: "Asistente de Atención al Cliente",
    image: "/assets/cambiogerencia/staff-6.jpg",
    linkedin: "#"
  },
  {
    name: "Mia Man",
    role: "Admin. de oficina",
    image: "/assets/cambiogerencia/staff-7.jpg",
    linkedin: "#"
  },
];

const IconLinkedin = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#D62828" />
    <path d="M8 11v5M12 11v5M8 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 7v-2.5a2 2 0 0 0-4 0V16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AboutSeccionStaff = () => {
  return (
    <section className="w-full bg-white px-[5%] py-20">
      <div className="text-center mb-12">
        <span className="text-accent font-bold uppercase tracking-wider text-sm inline-block mb-3">Nuestro equipo</span>
        <h2 className="text-4xl md:text-5xl font-medium mb-2">
          Todo nuestro <span className="text-constrast italic font-normal">equipo</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {staff.map((person, idx) => (
          <div key={idx} className="bg-neutral-light rounded-2xl overflow-hidden shadow group flex flex-col">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-64 object-cover"
            />
            <div className="flex-1 flex flex-col justify-between p-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-neutral-dark text-lg font-semibold">{person.name}</span>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto">
                    <IconLinkedin />
                  </a>
                </div>
                <span className="text-neutral-500 text-sm">{person.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSeccionStaff;
