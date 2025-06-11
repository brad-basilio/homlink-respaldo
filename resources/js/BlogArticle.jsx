import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    CalendarClockIcon,
    Facebook,
    Link,
    Linkedin,
    MessageCircle,
    Twitter,
} from "lucide-react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import HtmlContent from "./Utils/HtmlContent";
import Tippy from "@tippyjs/react";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import PostCard from "./Components/Blog/PostCard";
import TextWithHighlight from "./Utils/TextWithHighlight";
import { AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import moment from "moment";
import "moment/locale/es"; // Para fechas en español

// Configurar moment en español
moment.locale('es');

// Animaciones reutilizables
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "backOut" },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const Toast = ({ show, message }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ type: "spring", damping: 25, stiffness: 500 }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center pointer-events-none z-50"
                >
                    <motion.div
                        className="bg-azul text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ type: "spring" }}
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring" }}
                        >
                            <Check className="h-5 w-5" />
                        </motion.div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {message}
                        </motion.span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const BlogArticle = ({ article, posts, landing }) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(article.name);
    const shareText = encodeURIComponent(
        `${article.name} - ${article.description.substring(0, 100)}...`
    );
    const [showToast, setShowToast] = useState(false);
    const [hoveredShare, setHoveredShare] = useState(null);

    const socialShareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}&summary=${shareText}`,
        whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
        email: `mailto:?subject=${shareTitle}&body=${shareText}%0A%0ALeer más: ${shareUrl}`,
        copy: shareUrl,
    };

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            })
            .catch((err) => {
                console.error("Error al copiar: ", err);
            });
    };

    const ArrowLeftIcon = ({ width = 24, height = 24, color = "#3E2F4D" }) => (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width={width} 
          height={height} 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <mask 
            id="mask0_202_13054" 
            style={{ maskType: "alpha" }} 
            maskUnits="userSpaceOnUse" 
            x="0" 
            y="0" 
            width={width} 
            height={height}
          >
            <rect x={width} width={width} height={height} transform={`rotate(90 ${width} 0)`} fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_202_13054)">
            <path 
              d="M8.62539 12L14.6254 6L16.0254 7.4L11.4504 12L16.0254 16.6L14.6254 18L8.62539 12Z" 
              fill={color}
            />
          </g>
        </svg>
    );

    return (
        <>
            <Header />
            <motion.section
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="px-[5%] bg-white pt-10 lg:pt-16 pb-8"
            >
                <div className="max-w-5xl mx-auto"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="mb-8 w-auto flex flex-col gap-4"
                    >   
                        <motion.a 
                            href="/blog" 
                            className="flex w-auto items-center gap-2 text-primary hover:text-accent transition-colors duration-200"
                            whileHover={{ x: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeftIcon />
                            <span className="text-base 2xl:text-lg font-medium">
                                Volver a blog
                            </span>
                        </motion.a>
                        
                        <motion.div className="w-auto mb-2">
                            <motion.span
                                className="inline-block rounded-lg text-sm text-primary font-semibold px-4 py-2 bg-neutral-light border border-primary/20"
                                whileHover={{ 
                                    scale: 1.05,
                                    backgroundColor: "#003049",
                                    color: "#F2F2F2"
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {article.category.name}
                            </motion.span>
                        </motion.div>
                        
                        <motion.h1
                            className="font-Poppins_Medium text-primary text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] !leading-tight mb-4"
                            variants={fadeInUp}
                        >
                            <TextWithHighlight text={article.name} />
                        </motion.h1>

                        <motion.div
                            className="flex items-center mt-2 text-base text-neutral-dark gap-3 font-medium"
                            variants={fadeInUp}
                        >
                            <motion.div 
                                className="flex items-center gap-2 text-accent"
                                whileHover={{ scale: 1.05 }}
                            >
                                <CalendarClockIcon className="h-5 w-5" />
                                <span>{moment(article.post_date).format("LL")}</span>
                            </motion.div>
                            
                            <motion.div 
                                className="h-1 w-1 bg-neutral-dark rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            
                            <motion.span 
                                className="text-neutral-dark"
                                whileHover={{ scale: 1.05 }}
                            >
                                Tiempo de lectura: ~{Math.max(1, Math.ceil(article.description.split(' ').length / 200))} min
                            </motion.span>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={scaleUp}
                        className="mb-12 overflow-hidden rounded-2xl shadow-2xl bg-white"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <motion.div className="relative">
                            <motion.img
                                src={`/api/posts/media/${article.image}`}
                                alt={article.name}
                                className="w-full h-auto object-cover object-center aspect-video"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        transition={{ delay: 0.4 }}
                        className="blog-content max-w-none"
                    >
                        <HtmlContent 
                            className="blog-article-content text-neutral-dark leading-relaxed" 
                            html={article.description} 
                        />
                        
                        <style jsx>{`
                            .blog-article-content {
                                line-height: 1.8;
                                font-size: 1.125rem;
                            }
                            
                            .blog-article-content h1 {
                                font-size: 2.5rem;
                                font-weight: 700;
                                color: #003049;
                                margin-top: 3rem;
                                margin-bottom: 1.5rem;
                                line-height: 1.2;
                            }
                            
                            .blog-article-content h2 {
                                font-size: 2rem;
                                font-weight: 600;
                                color: #003049;
                                margin-top: 2.5rem;
                                margin-bottom: 1.25rem;
                                line-height: 1.3;
                            }
                            
                            .blog-article-content h3 {
                                font-size: 1.75rem;
                                font-weight: 600;
                                color: #003049;
                                margin-top: 2rem;
                                margin-bottom: 1rem;
                                line-height: 1.4;
                            }
                            
                            .blog-article-content h4 {
                                font-size: 1.5rem;
                                font-weight: 500;
                                color: #003049;
                                margin-top: 1.75rem;
                                margin-bottom: 0.875rem;
                                line-height: 1.4;
                            }
                            
                            .blog-article-content h5 {
                                font-size: 1.25rem;
                                font-weight: 500;
                                color: #003049;
                                margin-top: 1.5rem;
                                margin-bottom: 0.75rem;
                                line-height: 1.5;
                            }
                            
                            .blog-article-content h6 {
                                font-size: 1.125rem;
                                font-weight: 500;
                                color: #003049;
                                margin-top: 1.25rem;
                                margin-bottom: 0.625rem;
                                line-height: 1.5;
                            }
                            
                            .blog-article-content p {
                                margin-bottom: 1.5rem;
                                color: #001520;
                                line-height: 1.8;
                                font-size: 1.125rem;
                            }
                            
                            .blog-article-content ul, 
                            .blog-article-content ol {
                                margin-bottom: 1.5rem;
                                padding-left: 2rem;
                                color: #001520;
                            }
                            
                            .blog-article-content li {
                                margin-bottom: 0.75rem;
                                line-height: 1.7;
                            }
                            
                            .blog-article-content ul li {
                                list-style-type: disc;
                            }
                            
                            .blog-article-content ol li {
                                list-style-type: decimal;
                            }
                            
                            .blog-article-content blockquote {
                                border-left: 4px solid #D62828;
                                background-color: #F2F2F2;
                                padding: 1.5rem 2rem;
                                margin: 2rem 0;
                                font-style: italic;
                                color: #003049;
                                border-radius: 0 8px 8px 0;
                            }
                            
                            .blog-article-content blockquote p {
                                margin-bottom: 0;
                                font-size: 1.25rem;
                                font-weight: 500;
                            }
                            
                            .blog-article-content a {
                                color: #D62828;
                                text-decoration: underline;
                                font-weight: 500;
                                transition: color 0.2s ease;
                            }
                            
                            .blog-article-content a:hover {
                                color: #F77F00;
                                text-decoration: none;
                            }
                            
                            .blog-article-content img {
                                max-width: 100%;
                                height: auto;
                                border-radius: 8px;
                                margin: 2rem 0;
                                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                            }
                            
                            .blog-article-content strong, 
                            .blog-article-content b {
                                font-weight: 700;
                                color: #003049;
                            }
                            
                            .blog-article-content em, 
                            .blog-article-content i {
                                font-style: italic;
                            }
                            
                            .blog-article-content code {
                                background-color: #F2F2F2;
                                color: #D62828;
                                padding: 0.25rem 0.5rem;
                                border-radius: 4px;
                                font-size: 0.875rem;
                                font-family: 'Courier New', monospace;
                            }
                            
                            .blog-article-content pre {
                                background-color: #001520;
                                color: #F2F2F2;
                                padding: 1.5rem;
                                border-radius: 8px;
                                overflow-x: auto;
                                margin: 2rem 0;
                                line-height: 1.6;
                            }
                            
                            .blog-article-content pre code {
                                background-color: transparent;
                                color: inherit;
                                padding: 0;
                                border-radius: 0;
                                font-size: 0.875rem;
                            }
                            
                            .blog-article-content table {
                                width: 100%;
                                border-collapse: collapse;
                                margin: 2rem 0;
                                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                                border-radius: 8px;
                                overflow: hidden;
                            }
                            
                            .blog-article-content th,
                            .blog-article-content td {
                                padding: 1rem;
                                text-align: left;
                                border-bottom: 1px solid #F2F2F2;
                            }
                            
                            .blog-article-content th {
                                background-color: #003049;
                                color: white;
                                font-weight: 600;
                            }
                            
                            .blog-article-content tr:nth-child(even) {
                                background-color: #F2F2F2;
                            }
                            
                            .blog-article-content hr {
                                border: none;
                                border-top: 2px solid #F2F2F2;
                                margin: 3rem 0;
                            }
                            
                            /* Estilos responsivos */
                            @media (max-width: 768px) {
                                .blog-article-content {
                                    font-size: 1rem;
                                }
                                
                                .blog-article-content h1 {
                                    font-size: 2rem;
                                }
                                
                                .blog-article-content h2 {
                                    font-size: 1.75rem;
                                }
                                
                                .blog-article-content h3 {
                                    font-size: 1.5rem;
                                }
                                
                                .blog-article-content h4 {
                                    font-size: 1.25rem;
                                }
                                
                                .blog-article-content p {
                                    font-size: 1rem;
                                }
                                
                                .blog-article-content blockquote {
                                    padding: 1rem 1.5rem;
                                    margin: 1.5rem 0;
                                }
                                
                                .blog-article-content blockquote p {
                                    font-size: 1.125rem;
                                }
                                
                                .blog-article-content ul, 
                                .blog-article-content ol {
                                    padding-left: 1.5rem;
                                }
                            }
                        `}</style>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        transition={{ delay: 0.6 }}
                        className="mt-16 pt-8 border-t-2 border-neutral-light"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <Toast
                                show={showToast}
                                message="Enlace copiado al portapapeles"
                            />
                            
                            <motion.div 
                                className="flex flex-col gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <motion.h3
                                    className="text-xl font-semibold text-primary"
                                    whileHover={{ x: 2 }}
                                >
                                    ¿Te gustó este artículo? ¡Compártelo!
                                </motion.h3>
                                
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { type: "copy", label: "Copiar enlace", icon: Link, color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
                                        { type: "linkedin", label: "LinkedIn", icon: Linkedin, color: "bg-blue-600 hover:bg-blue-700 text-white" },
                                        { type: "twitter", label: "Twitter", icon: Twitter, color: "bg-blue-400 hover:bg-blue-500 text-white" },
                                        { type: "facebook", label: "Facebook", icon: Facebook, color: "bg-blue-800 hover:bg-blue-900 text-white" },
                                    ].map(({ type, label, icon: Icon, color }) => (
                                        <motion.div
                                            key={type}
                                            whileHover={{ y: -2, scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onHoverStart={() => setHoveredShare(type)}
                                            onHoverEnd={() => setHoveredShare(null)}
                                        >
                                            <Tippy content={label}>
                                                <motion.a
                                                    href={type !== "copy" ? socialShareLinks[type] : undefined}
                                                    onClick={type === "copy" ? copyToClipboard : undefined}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${color} px-4 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg`}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                    <span className="hidden sm:inline">{label}</span>
                                                </motion.a>
                                            </Tippy>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                            
                         
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="mt-8 pt-6 bg-neutral-light text-sm font-medium px-[5%] py-8 md:py-12  text-negro"
            >
                <motion.h2
                    className="font-Poppins_Medium text-primary text-3xl sm:text-4xl lg:text-[44px] !leading-tight"
                    variants={fadeInUp}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <TextWithHighlight text={landing?.title} />
                </motion.h2>

                <motion.p
                    className="flex mt-3 text-center lg:text-left text-base font-Poppins_Regular 2xl:text-lg"
                    variants={fadeInUp}
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {landing?.description}
                </motion.p>

                <motion.section
                    className="py-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.3,
                            },
                        },
                    }}
                >
                    {posts.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                          
                        >
                            <PostCard {...item} firstImage />
                        </motion.div>
                    ))}
                </motion.section>
            </motion.section>

            <Footer />
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <BlogArticle {...properties} />
            </Base>
        </CarritoProvider>
    );
});
