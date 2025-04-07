import TextWithHighlight from "../../Utils/TextWithHighlight";

const AcercaDe = ({ staff_boss }) => {
    return (
        <div className="min-h-screen  mt-12  font-poppins px-[5%] lg:mt-48 lg:max-w-[82rem] lg:mx-auto  lg:min-h-full lg:flex lg:gap-10">
            <img
                src={`/api/staff/media/${staff_boss?.image}`}
                className="w-full lg:flex lg:w-6/12 object-cover"
                onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
            />
            <div className="px-[4%] lg:px-0 lg:w-6/12 lg:pr-6">
                <p className="mt-6 text-2xl ">{staff_boss?.job}</p>
                <h2 className="text-4xl font-medium leading-[102%] w-full mt-2 lg:text-5xl">
                    <TextWithHighlight text={staff_boss?.name} />
                </h2>
                <p className="mt-6 text-lg leading-[1.7rem] lg:text-[17px]">
                    {staff_boss?.description}
                </p>
                <div className="mt-8 lg:mt-8">
                    {staff_boss?.characteristics.map(
                        (characteristic, index) => (
                            <div className="flex gap-3 mb-3 lg:mb-2">
                                <img
                                    src="/assets/img/acercaDe/pin.png"
                                    className="w-6 h-6"
                                />
                                <p
                                    key={index}
                                    className="text-lg lg:text-[17px]"
                                >
                                    {characteristic}
                                </p>
                            </div>
                        )
                    )}
                </div>
                <div className="w-full flex items-center justify-start">
                    <a
                        href="/about"
                        className=" mt-6 bg-white text-[#242424] py-1 pl-1 pr-5  gap-2 rounded-full flex items-center"
                    >
                        <div className="bg-[#224483] w-12 p-2 rounded-full">
                            <img
                                src="/assets/img/icons/user-group.png"
                                className=" h-auto "
                            />
                        </div>
                        Ver staff
                    </a>
                </div>
            </div>
        </div>
    );
};
export default AcercaDe;
