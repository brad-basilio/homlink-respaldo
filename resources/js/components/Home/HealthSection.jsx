export default function HealthSection({ landingBenefits, benefits }) {
    return (
        <>
            {benefits && benefits.length > 0 && (
                <div className="min-h-screen lg:min-h-max  mt-8  font-poppins lg:px-[5%] lg:max-w-[82rem] lg:mx-auto">
                    <div className="max-w-md mx-auto px-4 py-4 lg:max-w-full lg:flex lg:flex-row lg:py-0 lg:px-0 lg:mt-16 lg:justify-between lg:items-center lg:gap-4">
                        <div className="lg:w-4/12">
                            {/* Primera tarjeta */}

                            {benefits.slice(0, 2).map((benefit, index) => (
                                <div className="bg-[#F8F8F8] rounded-3xl px-[22px] py-[18px]  mb-7 lg:w-11/12 lg:p-5">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-3xl font-bold mb-2 leading-[120%] w-[calc(100%-4rem)]">
                                            {benefit?.name &&
                                            benefit?.name ==
                                                "Alivio del dolor" ? (
                                                <>
                                                    Alivio
                                                    <br />
                                                    del dolor
                                                </>
                                            ) : (
                                                benefit?.name
                                            )}
                                        </h2>
                                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                                            <img
                                                src={`/api/strength/media/${benefit?.image}`}
                                                className=" w-8 h-8 object-cover"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[#242424] text-lg mt-14">
                                        {benefit?.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Imagen */}

                        <div className="flex my-4 h-full rounded-2xl overflow-hidden lg:w-4/12">
                            <img
                                src={`/api/landing_home/media/${landingBenefits.image}`}
                                alt="Equipo médico profesional"
                                className="w-full h-full lg:h-[450px] object-cover"
                            />
                        </div>
                        <div className="lg:w-4/12 lg:flex lg:justify-end lg:flex-col lg:items-end ">
                            {benefits.slice(2, 4).map((benefit, index) => (
                                <div className="bg-[#F8F8F8] rounded-3xl px-[22px] py-[18px]  mb-7 lg:w-11/12 lg:p-5">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-3xl font-bold mb-2 leading-[120%] w-[calc(100%-4rem)]">
                                            {benefit?.name &&
                                            benefit?.name == "Alivio del dolor"
                                                ? benefit?.name.replace(
                                                      /^(\S+)\s(.*)/,
                                                      "$1<br>$2"
                                                  )
                                                : benefit?.name}
                                        </h2>
                                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                                            <img
                                                src={`/api/strength/media/${benefit?.image}`}
                                                className=" w-8 h-8 object-cover"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[#242424] text-lg mt-14">
                                        {benefit?.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
