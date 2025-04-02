export default function HealthSection() {
    const services = [
        {
            id: 1,
            title: "Alivio<br/>del dolor",
            description:
                "Tratamientos efectivos para reducir molestias y mejorar tu bienestar.",
            image: "/assets/img/healthSection/bone-02.png",
        },
        {
            id: 2,
            title: "Recuperación acelerada",
            description:
                "Programas personalizados para una rehabilitación más rápida y efectiva.",
            image: "/assets/img/healthSection/safe.png",
        },
        {
            id: 3,
            title: "Mejora de movilidad",
            description:
                "Recupera el movimiento natural de tu cuerpo con terapias especializadas.",
            image: "/assets/img/healthSection/wheelchair.png",
        },
        {
            id: 4,
            title: "Recuperación acelerada",
            description:
                "Programas personalizados para una rehabilitación más rápida y efectiva.",
            image: "/assets/img/healthSection/safe.png",
        },
    ];

    return (
        <div className="min-h-screen lg:min-h-max  mt-8  font-poppins lg:px-[5%] lg:max-w-[82rem] lg:mx-auto">
            <div className="max-w-md mx-auto px-4 py-4 lg:max-w-full lg:flex lg:flex-row lg:py-0 lg:px-0 lg:mt-16 lg:justify-between lg:items-center lg:gap-4">
                <div className="lg:w-4/12">
                    {/* Primera tarjeta */}
                    <div className="bg-[#F8F8F8] rounded-3xl px-[22px] py-[18px]  mb-7 lg:w-11/12 lg:p-5">
                        <div className="flex justify-between items-start">
                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: services[0].title,
                                }}
                                className="text-3xl font-bold mb-2 leading-[120%]"
                            ></h2>
                            <div className="p-4 rounded-full bg-white shadow-sm">
                                <img src={services[0].image} />
                            </div>
                        </div>
                        <p className="text-[#242424] text-lg mt-14">
                            {services[0].description}
                        </p>
                    </div>

                    {/* Segunda tarjeta */}
                    <div className="bg-[#F8F8F8] rounded-3xl px-[22px] py-[18px]  mb-7 lg:w-11/12 lg:p-5">
                        <div className="flex justify-between items-start">
                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: services[1].title,
                                }}
                                className="text-3xl font-bold mb-2 leading-[120%]"
                            ></h2>
                            <div className="p-4 rounded-full bg-white shadow-sm">
                                <img src={services[1].image} />
                            </div>
                        </div>
                        <p className="text-[#242424] text-lg mt-14">
                            {services[1].description}
                        </p>
                    </div>
                </div>

                {/* Imagen */}
                <div className="lg:hidden my-4 rounded-lg overflow-hidden">
                    <img
                        src="/assets/img/healthSection/image.png"
                        alt="Equipo médico profesional"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="hidden lg:flex my-4 rounded-2xl overflow-hidden lg:w-4/12">
                    <img
                        src="/assets/img/healthSection/bg-des.png"
                        alt="Equipo médico profesional"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="lg:w-4/12 lg:flex lg:justify-end lg:flex-col lg:items-end ">
                    {/* Tercera tarjeta */}
                    <div className="bg-[#F8F8F8] rounded-3xl px-[22px] py-[18px]  mb-7 lg:w-11/12 lg:p-5">
                        <div className="flex justify-between items-start">
                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: services[2].title,
                                }}
                                className="text-3xl font-bold mb-2 leading-[120%]"
                            ></h2>
                            <div className="p-4 rounded-full bg-white shadow-sm">
                                <img src={services[2].image} />
                            </div>
                        </div>
                        <p className="text-[#242424] text-lg mt-14 ">
                            {services[2].description}
                        </p>
                    </div>

                    {/* Cuarta tarjeta */}
                    <div className="bg-[#F8F8F8] rounded-3xl px-[22px] py-[18px]  mb-7 lg:w-11/12 lg:p-5">
                        <div className="flex justify-between items-start">
                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: services[3].title,
                                }}
                                className="text-3xl font-bold mb-2 leading-[120%]"
                            ></h2>
                            <div className="p-4 rounded-full bg-white shadow-sm">
                                <img src={services[3].image} />
                            </div>
                        </div>
                        <p className="text-[#242424] text-lg mt-14">
                            {services[3].description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
