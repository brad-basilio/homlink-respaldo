import React from "react";

const pasos = [
  {
    title: "Diagnóstico cultural inicial",
    desc: "Alineamos valores, comportamientos y procesos para garantizar una cultura organizacional que respalde tus desafíos estratégicos.",
  },
  {
    title: "Definición de valores y conductas clave",
    desc: "",
  },
  {
    title: "Ajuste de políticas y procesos de RR.HH.",
    desc: "",
  },
  {
    title: "Formación y fortalecimiento de liderazgo",
    desc: "",
  },
  {
    title: "Plan de comunicación interna",
    desc: "",
  },
  {
    title: "Medición de resultados y sostenibilidad",
    desc: "",
  },
];

const IconUsers = (color = "#fff") => (
  <svg width="28" height="28" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill={color} /><path d="M21.333 22.667v-1.334A2.667 2.667 0 0 0 18.667 18.667h-5.334A2.667 2.667 0 0 0 10.667 21.333v1.334M16 16a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const ServiceSeccionMetodologia = () => {
  return (
    <section className="w-full bg-white px-[5%] py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-[1600px] mx-auto">
      {/* Columna izquierda */}
      <div className="flex-1 flex flex-col items-start max-w-xl w-full mb-8 lg:mb-0">
        <div className="flex items-center gap-2 mb-2">
          <span>
            <svg width="18" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
              <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
              <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
              <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
              <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
            </svg>
          </span>
          <span className="uppercase text-neutral-dark text-lg font-bold tracking-wide">Culture 360</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Metodología <span className="text-primary italic font-normal">paso a paso</span>
        </h2>
        <p className="text-lg text-neutral mb-6">
          Alineamos valores, comportamientos y procesos para garantizar una cultura organizacional que respalde tus desafíos estratégicos.
        </p>
        <a
          href="#"
          className="inline-block bg-accent hover:bg-primary text-white text-lg font-semibold rounded-xl px-8 py-4 transition-colors duration-200 shadow-md"
        >
          Conoce cómo aplicarlo en tu empresa&nbsp;&rarr;
        </a>
      </div>
      {/* Columna derecha: timeline */}
      <div className="flex-1 flex flex-col items-start w-full max-w-2xl">
        <ol className="relative border-l-2 border-accent/30 ml-6">
          {pasos.map((p, i) => (
            <li key={i} className="mb-10 ml-8 flex items-start">
              <span className={`absolute -left-8 flex items-center justify-center w-12 h-12 rounded-full border-4 ${i === 0 ? 'bg-accent border-accent' : 'bg-accent/20 border-accent/20'} z-10`}>
                {IconUsers(i === 0 ? '#D62828' : '#F5A5A5')}
              </span>
              <div>
                <span className="block text-xs font-bold uppercase text-neutral mb-1">PASO {i + 1}</span>
                <span className="block text-xl font-semibold text-primary-dark mb-1">{p.title}</span>
                {p.desc && <span className="block text-neutral text-base max-w-lg truncate">{p.desc}</span>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServiceSeccionMetodologia;
