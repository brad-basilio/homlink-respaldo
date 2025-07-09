import TextWithHighlight from "../../../Utils/TextWithHighlight";
import { motion } from 'framer-motion';

const FuncionSection = ({ data, pasos }) => {
    return (
        <section className="bg-primary py-16 px-2 md:px-0 w-full font-title">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div
                        className="text-constrast font-medium tracking-widest text-sm mb-2 uppercase"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >PASO A PASO</motion.div>
                    <motion.h2
                        className="text-4xl md:text-6xl font-medium text-neutral-dark mb-4"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <TextWithHighlight text={data?.title} color='bg-neutral-dark font-semibold' />
                    </motion.h2>
                    <motion.p
                        className="text-base text-neutral-light max-w-xl mx-auto "
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        {data?.description || ""}
                    </motion.p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 max-w-5xl mx-auto">
                    {pasos && pasos.length > 0 && pasos.map((paso, index) => (
                        <motion.div
                            className="flex flex-col items-start"
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.08)' }}
                        >
                            <motion.div
                                className={`rounded-2xl  ${index ===1 ? "w-[250px] " : "w-[220px] "} h-[220px] flex items-end justify-end mb-6`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: 0.25 + index * 0.15 }}
                            >
                                <motion.img
                                    src={`/api/speciality/media/${paso?.image}`}
                                    alt={paso?.name}
                                    className="w-full object-cover"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                                    whileHover={{ scale: 1.06 }}
                                />
                            </motion.div>
                            <motion.div
                                className="text-constrast font-medium text-sm mb-1 uppercase"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: 0.35 + index * 0.15 }}
                            >PASO</motion.div>
                            <motion.div
                                className="text-2xl md:text-2xl font-medium text-neutral-dark mb-2"
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                            >
                                <TextWithHighlight text={`${paso?.name}`} color='bg-neutral-dark font-semibold' />
                            </motion.div>
                            <motion.div
                                className="text-neutral-light text-base  "
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: 0.45 + index * 0.15 }}
                            >
                                {paso?.description}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default FuncionSection;