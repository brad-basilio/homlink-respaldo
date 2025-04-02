const AcercaDe = () => {
    const acercas = [
        {
            description:
                "Egresada de la Universidad Nacional Federico Villarreal.",
        },
        {
            description:
                "Maestría en Terapia Manual Ortopédica. Universidad Andrés Bello. Santiago de Chile – Chile.",
        },
        {
            description:
                "Maestría de Gerencia en servicios de Salud. Universidad Nacional Mayor de San Marcos. Lima – Perú.",
        },
        {
            description:
                "Diplomado en Fisiopatología Craneocervicomanibular. Universidad Andrés Bello. Santiago de Chile – Chile.",
        },
        {
            description:
                'Formación Completa en Terapias Miofasciales: "Concepto Inducción Miofascial" – Andrzej Pilat, AAKO, Buenos Aires – Argentina.',
        },
        {
            description:
                "Evaluación de Columna Vertebral. Universidad Saint Augustine University Florida. USA.",
        },
    ];
    return (
        <div className="min-h-screen  mt-12  font-poppins px-[5%] lg:mt-48 lg:max-w-[82rem] lg:mx-auto  lg:min-h-full lg:flex lg:gap-10">
            <img src="/assets/img/acercaDe/doctora.png" className="lg:hidden" />
            <img
                src="/assets/img/acercaDe/doctora-des.png"
                className="hidden lg:flex w-6/12"
            />
            <div className="px-[4%] lg:px-0 lg:w-6/12 lg:pr-6">
                <p className="mt-6 text-2xl ">Directora</p>
                <h2 className="text-4xl font-medium leading-[102%] w-full mt-2 lg:text-5xl">
                    Lic. Rocio <br className="lg:hidden" />
                    <span className="text-[#224483]"> Salas</span>{" "}
                    <br className="hidden lg:block" /> Cabrera
                </h2>
                <p className="mt-6 text-lg leading-[1.7rem] lg:text-[17px]">
                    La Lic. Rocío Salas Cabrera es una fisioterapeuta con amplia
                    formación internacional y especialización en rehabilitación,
                    ergonomía y terapia manual. Su experiencia docente y en
                    métodos avanzados la convierten en una referente en su
                    campo.
                </p>
                <div className="mt-8 lg:mt-8">
                    {acercas.map((acerca, index) => (
                        <div className="flex gap-3 mb-3 lg:mb-2">
                            <img
                                src="/assets/img/acercaDe/pin.png"
                                className="w-6 h-6"
                            />
                            <p key={index} className="text-lg lg:text-[17px]">
                                {acerca.description}
                            </p>{" "}
                        </div>
                    ))}
                </div>
                <div className="w-full flex items-center justify-start">
                    <button className=" mt-6 bg-white text-[#242424] py-1 pl-1 pr-5  gap-2 rounded-full flex items-center">
                        <img
                            src="/assets/img/acercaDe/user-group.png"
                            className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                        />
                        Ver staff
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AcercaDe;
