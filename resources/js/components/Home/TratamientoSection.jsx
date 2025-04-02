import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function TratamientoSection() {
    const services = [
        {
            image: "/assets/img/testimonioSection/image1.png",
        },
        {
            image: "/assets/img/testimonioSection/image2.png",
        },
        {
            image: "/assets/img/testimonioSection/image3.png",
        },
        {
            image: "/assets/img/testimonioSection/image4.png",
        },
        {
            image: "/assets/img/testimonioSection/image5.png",
        },
    ];

    return (
        <div className=" mt-0 font-poppins">
            <div className="max-w-md mx-auto px-4 py-4 lg:hidden">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    breakpoints={{
                        0: { slidesPerView: 1.1, spaceBetween: 10 },
                        640: { slidesPerView: 1, spaceBetween: 10 },
                        1024: { slidesPerView: 3, spaceBetween: 0 },
                    }}
                >
                    {services.map((benefit, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex gap-4 w-full my-6">
                                <img
                                    src={benefit.image}
                                    alt={`Benefit ${index + 1}`}
                                    className="w-[295px] h-[430px] rounded-xl"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="hidden lg:block  font-poppins lg:px-[5%] lg:max-w-[82rem] lg:mx-auto">
                <div className=" lg:max-w-full lg:grid lg:grid-cols-4 lg:py-0 lg:px-0 lg:mt-10 lg:justify-between lg:items-center lg:gap-6">
                    <div>
                        <img
                            src={services[0].image}
                            className="w-full h-[410px] object-cover rounded-xl"
                        />
                    </div>
                    <div>
                        <img
                            src={services[1].image}
                            className="w-full h-[410px] object-cover rounded-xl"
                        />
                    </div>
                    <div className=" col-span-2 flex flex-col gap-6  h-full">
                        <div className="">
                            <img
                                src={services[2].image}
                                className="w-full h-[195px] rounded-3xl object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src={services[3].image}
                                className="w-full h-[195px] rounded-3xl object-cover"
                            />
                        </div>
                    </div>
                    <div className="col-span-4 flex gap-6">
                        <div className="w-8/12">
                            <img
                                src={services[4].image}
                                className="w-full h-[300px] rounded-xl"
                            />
                        </div>
                        <div className=" w-4/12 h-[300px]">
                            <div className="bg-[#F8F8F8] rounded-3xl h-[300px] p-8">
                                <h2 className="text-[36px] font-medium leading-[102%] w-9/12 ">
                                    Agenda tu cita y empieza tu recuperación.
                                </h2>
                                <div className="w-full flex items-center justify-end mt-10">
                                    <button className=" mt-5 bg-white text-[#242424] py-1 pl-1 pr-3  gap-2 rounded-full flex items-center">
                                        <img
                                            src="/assets/img/home/calendar-home.png"
                                            className="w-12 h-auto  bg-[#224483] rounded-full p-2"
                                        />
                                        Reservar una cita
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
