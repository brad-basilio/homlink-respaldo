import TextWithHighlight from "../../../Utils/TextWithHighlight";

const FuncionSection = ({data}) => {
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
                    <div className="flex flex-col items-start">
                        <div className=" rounded-2xl w-[220px] h-[220px] flex items-end justify-end mb-6">
                            <img src="/assets/cambiafx/como-fx-phone.png" alt="Cotiza hoy" className="w-full object-cover" />
                        </div>
                        <div className="text-constrast font-medium text-sm mb-1 uppercase">PASO</div>
                        <div className="text-2xl md:text-2xl font-medium text-neutral-dark mb-2">1. <span className="font-semibold">Cotiza </span>hoy</div>
                        <div className="text-neutral-light text-base  ">Suspendisse a ipsum velit. Donec justo tortor, hendrerit id urna sed.</div>
                    </div>
                    {/* Paso 2 */}
                    <div className="flex flex-col items-start">
                        <div className=" rounded-2xl w-[250px] h-[220px] flex items-end justify-end mb-6">
                            <img src="/assets/cambiafx/como-fx-money.png" alt="Transfiere facil" className="w-full object-cover" />
                        </div>
                        <div className="text-constrast font-medium text-sm mb-1 uppercase">PASO</div>
                        <div className="text-2xl md:text-2xl font-medium text-neutral-dark mb-2">2. <span className="font-semibold">Transfiere </span>facil</div>
                        <div className="text-neutral-light text-base  ">Donec in rhoncus enim, at mollis diam. Cras aliquam neque risus.</div>
                    </div>
                    {/* Paso 3 */}
                    <div className="flex flex-col items-start">
                        <div className=" rounded-2xl w-[220px] h-[220px] flex items-start justify-center mb-6">
                            <img src="/assets/cambiafx/como-fx-hand.png" alt="Recibe rápido" className="w-full object-cover" />
                        </div>
                    <div className="text-constrast font-medium text-sm mb-1 uppercase">PASO</div>
                        <div className="text-2xl md:text-2xl font-medium text-neutral-dark mb-2">3. <span className="font-semibold">Recibe </span>rápido</div>
                        <div className="text-neutral-light text-base  ">Donec in rhoncus enim, at mollis diam. Cras aliquam neque risus.</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default FuncionSection;