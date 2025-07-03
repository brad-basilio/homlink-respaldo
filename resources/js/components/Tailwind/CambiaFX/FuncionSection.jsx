import TextWithHighlight from "../../../Utils/TextWithHighlight";

const FuncionSection = ({ data, pasos }) => {
    return (
        <section className="bg-primary py-16 px-2 md:px-0 w-full font-title">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="text-constrast font-medium tracking-widest text-sm mb-2 uppercase">PASO A PASO</div>
                    <h2 className="text-4xl md:text-6xl font-medium text-neutral-dark mb-4"> <TextWithHighlight text={data?.title} color='bg-neutral-dark font-semibold' /></h2>
                    <p className="text-base text-neutral-light max-w-xl mx-auto ">{data?.description || ""}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 max-w-5xl mx-auto">
                    {/* Paso 1 */}

                    {pasos && pasos.length > 0 && pasos.map((paso, index) => (

                        <div className="flex flex-col items-start">
                            <div className={`rounded-2xl  ${index ===1 ? "w-[250px] " : "w-[220px] "} h-[220px] flex items-end justify-end mb-6`}>
                                <img src={`/api/speciality/media/${paso?.image}`} alt={paso?.name} className="w-full object-cover" />
                            </div>
                            <div className="text-constrast font-medium text-sm mb-1 uppercase">PASO</div>
                            <div className="text-2xl md:text-2xl font-medium text-neutral-dark mb-2">
                                <TextWithHighlight text={`${paso?.name}`} color='bg-neutral-dark font-semibold' />
                              </div>
                            <div className="text-neutral-light text-base  ">{paso?.description}</div>
                        </div>
                    ))}
                   
                </div>
            </div>
        </section>
    );
}
export default FuncionSection;