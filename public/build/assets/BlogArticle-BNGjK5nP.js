import{j as t}from"./RequirementCard-DEdD30eg.js";import{r as m}from"./index-RYns6xqu.js";import{aG as y,C as z,B as I,m as e,H as $,aH as w,aI as H,aJ as L,aK as S,aL as V,aM as D,aN as q,af as E,aO as R,F as O,aP as U,aQ as _}from"./CreateReactScript-C-mUikVe.js";import{c as A}from"./ReactAppend-vpV7VTGG.js";import{C as B}from"./Detail-BKcVR7Sx.js";import"./DataGrid-Cd7cnf9r.js";import"./Results-CoLI09XT.js";import"./Filter-BDLE8FWR.js";import"./axios-B4uVmeYG.js";import"./index-CXU7o9CY.js";import"./TippyButton-Duhaw_sS.js";import"./MenuItem-CBKDeUjr.js";import"./___vite-browser-external_commonjs-proxy-DbMF7jdq.js";import"./sweetalert2.all-DJo0UVK6.js";import"./DxBox-DZgBbgD6.js";import"./TinyMCEFormGroup-TcwoFScW.js";import"./index-DNUR7M9R.js";import"./index-SDlHnhXR.js";import"./HomeSeccionBlog-CZ04iwe8.js";import"./CarruselBrands-Chpi1Apc.js";import"./Strengths-8rnVxSkq.js";import"./ModalAppointment-BjEduSb5.js";import"./CallToAction-3RvJBMpr.js";import"./WeCupSection-CkKcxXUy.js";import"./BlurText-Cr9yZ_QA.js";import"./Supplies-DJwkpyzw.js";import"./Banner-CXqQ-nCn.js";import"./HeroSecctionEmpresa-Bs7Po8J9.js";import"./WhatsAppModal-BCTi89gL.js";y.locale("es");const P={hidden:{opacity:0},visible:{opacity:1,transition:{duration:.8,ease:"easeOut"}}},l={hidden:{opacity:0,y:30},visible:{opacity:1,y:0,transition:{duration:.8,ease:"easeOut"}}},p={hidden:{opacity:0,x:-50},visible:{opacity:1,x:0,transition:{duration:.8,ease:"easeOut"}}},s={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.15,delayChildren:.2}}},v={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1,delayChildren:.1}}},M=({show:o,message:r})=>t.jsx(U,{children:o&&t.jsx(e.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},exit:{opacity:0,y:-30},transition:{type:"spring",damping:25,stiffness:500},className:"fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center pointer-events-none z-50",children:t.jsxs(e.div,{className:"bg-azul text-neutral-dark px-6 py-3 rounded-lg shadow-xl flex items-center gap-2",initial:{scale:.8},animate:{scale:1},exit:{scale:.8},transition:{type:"spring"},children:[t.jsx(e.div,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{type:"spring"},children:t.jsx(_,{className:"h-5 w-5"})}),t.jsx(e.span,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},children:r})]})})}),W=({article:o,posts:r,landing:n,banner_operacion:G,banner:J})=>{const c=encodeURIComponent(window.location.href),g=encodeURIComponent(o.name),d=encodeURIComponent(`${o.name} - ${o.description.substring(0,100)}...`),[j,h]=m.useState(!1),[x,u]=m.useState(null),[f,k]=m.useState(!1);m.useEffect(()=>{const a=setTimeout(()=>{k(!0)},100);return()=>clearTimeout(a)},[]);const N={twitter:`https://twitter.com/intent/tweet?url=${c}&text=${g}`,facebook:`https://www.facebook.com/sharer/sharer.php?u=${c}`,linkedin:`https://www.linkedin.com/shareArticle?mini=true&url=${c}&title=${g}&summary=${d}`,whatsapp:`https://wa.me/?text=${g}%20${c}`,email:`mailto:?subject=${g}&body=${d}%0A%0ALeer más: ${c}`,copy:c},F=()=>{navigator.clipboard.writeText(window.location.href).then(()=>{h(!0),setTimeout(()=>h(!1),2e3)}).catch(a=>{console.error("Error al copiar: ",a)})},C=({width:a=24,height:i=24,color:b="#3E2F4D"})=>t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:a,height:i,viewBox:"0 0 24 24",fill:"none",children:[t.jsx("mask",{id:"mask0_202_13054",style:{maskType:"alpha"},maskUnits:"userSpaceOnUse",x:"0",y:"0",width:a,height:i,children:t.jsx("rect",{x:a,width:a,height:i,transform:`rotate(90 ${a} 0)`,fill:"#D9D9D9"})}),t.jsx("g",{mask:"url(#mask0_202_13054)",children:t.jsx("path",{d:"M8.62539 12L14.6254 6L16.0254 7.4L11.4504 12L16.0254 16.6L14.6254 18L8.62539 12Z",fill:b})})]});return t.jsxs(e.div,{initial:"hidden",animate:"visible",variants:P,children:[t.jsx($,{}),t.jsx(e.section,{initial:"hidden",whileInView:"visible",variants:s,viewport:{once:!0,margin:"-100px"},className:"px-[5%] bg-white pt-10 lg:pt-16 pb-8 font-title",children:t.jsxs("div",{className:"mx-auto ",children:[t.jsxs(e.div,{variants:l,className:"mb-8 w-auto flex flex-col gap-4",children:[t.jsxs(e.a,{href:"/blog",className:"flex w-auto items-center gap-2 !text-neutral-dark hover:text-accent transition-colors duration-200",variants:p,whileHover:{x:-8,scale:1.02},whileTap:{scale:.95},children:[t.jsx(e.div,{animate:{x:[0,-3,0]},transition:{duration:2,repeat:1/0},children:t.jsx(C,{})}),t.jsx("span",{className:"text-base  2xl:text-lg font-medium",children:"Volver a blog"})]}),t.jsx(e.div,{className:"w-auto mb-2",variants:l,children:t.jsx(e.span,{className:"inline-block rounded-lg text-sm text-white font-semibold px-4 py-2 bg-constrast border border-primary/20",whileHover:{scale:1.05,boxShadow:"0 4px 15px rgba(0,0,0,0.1)"},whileTap:{scale:.95},transition:{duration:.2},children:o.category.name})}),t.jsx(e.h1,{className:"text-neutral-dark text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] !leading-tight mb-4",variants:l,children:t.jsx(w,{text:o.name})}),t.jsxs(e.div,{className:"flex items-center mt-2 text-base text-neutral-dark gap-3 font-medium",variants:v,children:[t.jsxs(e.div,{className:"flex items-center gap-2 text-accent",variants:l,whileHover:{scale:1.05,y:-2},children:[t.jsx(e.div,{animate:{rotate:[0,10,-10,0]},transition:{duration:3,repeat:1/0},children:t.jsx(H,{className:"h-5 w-5"})}),t.jsx("span",{children:y(o.post_date).format("LL")})]}),t.jsx(e.div,{className:"h-1 w-1 bg-neutral-dark rounded-full",variants:l,animate:{scale:[1,1.5,1],opacity:[.5,1,.5]},transition:{duration:2,repeat:1/0}}),t.jsxs(e.span,{className:"text-neutral-dark",variants:l,whileHover:{scale:1.05,y:-2},children:["Tiempo de lectura: ~",Math.max(1,Math.ceil(o.description.split(" ").length/200))," min"]})]})]}),t.jsx(e.div,{className:"flex flex-col lg:flex-row gap-8 mb-12",variants:s,children:t.jsx(e.div,{variants:p,className:"lg:w-full lg:flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl bg-white",whileHover:{scale:1.02,boxShadow:"0 25px 50px rgba(0,0,0,0.15)"},transition:{type:"spring",stiffness:400,damping:25},children:t.jsxs(e.div,{className:"relative w-full h-[500px] object-cover",initial:{opacity:0},whileInView:{opacity:1},transition:{duration:.8},viewport:{once:!0},children:[t.jsx(e.img,{src:`/api/posts/media/${o.image}`,alt:o.name,className:"absolute inset-0 w-full h-full object-cover object-center",initial:{opacity:0,scale:1.2},whileInView:{opacity:1,scale:1},transition:{duration:1.2,ease:"easeOut"},viewport:{once:!0}}),t.jsx(e.div,{className:"absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent",initial:{opacity:0},whileInView:{opacity:1},transition:{delay:.5,duration:.8},viewport:{once:!0}})]})})}),t.jsxs(e.div,{variants:l,className:"blog-content max-w-none",initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{duration:.8,delay:.2},viewport:{once:!0,margin:"-50px"},children:[t.jsx(L,{className:"blog-article-content text-neutral-dark leading-relaxed",html:o.description}),t.jsx("style",{jsx:!0,children:`
                            .blog-article-content,
                            .blog-article-content-part {
                                line-height: 1.8;
                                font-size: 1.125rem;
                            }
                            
                            .blog-article-content :global(h1),
                            .blog-article-content-part :global(h1) {
                                font-size: 2.5rem;
                                font-weight: 700;
                                color: #003049;
                                margin-top: 3rem;
                                margin-bottom: 1.5rem;
                                line-height: 1.2;
                            }
                            
                            .blog-article-content :global(h2),
                            .blog-article-content-part :global(h2) {
                                font-size: 2rem;
                                font-weight: 600;
                                color: #003049;
                                margin-top: 2.5rem;
                                margin-bottom: 1.25rem;
                                line-height: 1.3;
                            }
                            
                            .blog-article-content :global(h3),
                            .blog-article-content-part :global(h3) {
                                font-size: 1.75rem;
                                font-weight: 600;
                                color: #003049;
                                margin-top: 2rem;
                                margin-bottom: 1rem;
                                line-height: 1.4;
                            }
                            
                            .blog-article-content :global(h4),
                            .blog-article-content-part :global(h4) {
                                font-size: 1.5rem;
                                font-weight: 500;
                                color: #003049;
                                margin-top: 1.75rem;
                                margin-bottom: 0.875rem;
                                line-height: 1.4;
                            }
                            
                            .blog-article-content :global(h5),
                            .blog-article-content-part :global(h5) {
                                font-size: 1.25rem;
                                font-weight: 500;
                                color: #003049;
                                margin-top: 1.5rem;
                                margin-bottom: 0.75rem;
                                line-height: 1.5;
                            }
                            
                            .blog-article-content :global(h6),
                            .blog-article-content-part :global(h6) {
                                font-size: 1.125rem;
                                font-weight: 500;
                                color: #003049;
                                margin-top: 1.25rem;
                                margin-bottom: 0.625rem;
                                line-height: 1.5;
                            }
                            
                            .blog-article-content :global(p),
                            .blog-article-content-part :global(p) {
                                margin-bottom: 1.5rem;
                                color: #001520;
                                line-height: 1.8;
                                font-size: 1.125rem;
                            }
                            
                            .blog-article-content :global(ul), 
                            .blog-article-content :global(ol),
                            .blog-article-content-part :global(ul), 
                            .blog-article-content-part :global(ol) {
                                margin-bottom: 1.5rem;
                                padding-left: 2rem;
                                color: #001520;
                            }
                            
                            .blog-article-content :global(li),
                            .blog-article-content-part :global(li) {
                                margin-bottom: 0.75rem;
                                line-height: 1.7;
                            }
                            
                            .blog-article-content :global(ul li),
                            .blog-article-content-part :global(ul li) {
                                list-style-type: disc;
                            }
                            
                            .blog-article-content :global(ol li),
                            .blog-article-content-part :global(ol li) {
                                list-style-type: decimal;
                            }
                            
                            .blog-article-content :global(blockquote),
                            .blog-article-content-part :global(blockquote) {
                                border-left: 4px solid #D62828;
                                background-color: #F2F2F2;
                                padding: 1.5rem 2rem;
                                margin: 2rem 0;
                                font-style: italic;
                                color: #003049;
                                border-radius: 0 8px 8px 0;
                            }
                            
                            .blog-article-content :global(blockquote p),
                            .blog-article-content-part :global(blockquote p) {
                                margin-bottom: 0;
                                font-size: 1.25rem;
                                font-weight: 500;
                            }
                            
                            .blog-article-content :global(a),
                            .blog-article-content-part :global(a) {
                                color: #D62828;
                                text-decoration: underline;
                                font-weight: 500;
                                transition: color 0.2s ease;
                            }
                            
                            .blog-article-content :global(a:hover),
                            .blog-article-content-part :global(a:hover) {
                                color: #F77F00;
                                text-decoration: none;
                            }
                            
                            .blog-article-content :global(img),
                            .blog-article-content-part :global(img) {
                             
                                height: auto !important;
                                margin-left: auto !important;
                                margin-right: auto !important;
                                margin-top: 2rem !important;
                                margin-bottom: 2rem !important;
                                border-radius: 18px !important;
                                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                                object-fit: cover !important;
                                position: relative !important;
                                display: block !important;
                                overflow: hidden !important;
                            }
                            
                            /* Para pantallas grandes, centrar la imagen cuando excede el contenedor */
                            @media (min-width: 1280px) {
                                .blog-article-content :global(img),
                                .blog-article-content-part :global(img) {
                                   
                                   
                                    margin-left: calc(-40rem + 50%) !important;
                                    margin-right: calc(-40rem + 50%) !important;
                                }
                            }
                            
                            .blog-article-content :global(strong), 
                            .blog-article-content :global(b),
                            .blog-article-content-part :global(strong), 
                            .blog-article-content-part :global(b) {
                                font-weight: 700;
                                color: #003049;
                            }
                            
                            .blog-article-content :global(em), 
                            .blog-article-content :global(i),
                            .blog-article-content-part :global(em), 
                            .blog-article-content-part :global(i) {
                                font-style: italic;
                            }
                            
                            .blog-article-content :global(code),
                            .blog-article-content-part :global(code) {
                                background-color: #F2F2F2;
                                color: #D62828;
                                padding: 0.25rem 0.5rem;
                                border-radius: 4px;
                                font-size: 0.875rem;
                                font-family: 'Courier New', monospace;
                            }
                            
                            .blog-article-content :global(pre),
                            .blog-article-content-part :global(pre) {
                                background-color: #001520;
                                color: #F2F2F2;
                                padding: 1.5rem;
                                border-radius: 8px;
                                overflow-x: auto;
                                margin: 2rem 0;
                                line-height: 1.6;
                            }
                            
                            .blog-article-content :global(pre code),
                            .blog-article-content-part :global(pre code) {
                                background-color: transparent;
                                color: inherit;
                                padding: 0;
                                border-radius: 0;
                                font-size: 0.875rem;
                            }
                            
                            .blog-article-content :global(table),
                            .blog-article-content-part :global(table) {
                                width: 100%;
                                border-collapse: collapse;
                                margin: 2rem 0;
                                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                                border-radius: 8px;
                                overflow: hidden;
                            }
                            
                            .blog-article-content :global(th),
                            .blog-article-content :global(td),
                            .blog-article-content-part :global(th),
                            .blog-article-content-part :global(td) {
                                padding: 1rem;
                                text-align: left;
                                border-bottom: 1px solid #F2F2F2;
                            }
                            
                            .blog-article-content :global(th),
                            .blog-article-content-part :global(th) {
                                background-color: #003049;
                                color: white;
                                font-weight: 600;
                            }
                            
                            .blog-article-content :global(tr:nth-child(even)),
                            .blog-article-content-part :global(tr:nth-child(even)) {
                                background-color: #F2F2F2;
                            }
                            
                            .blog-article-content :global(hr),
                            .blog-article-content-part :global(hr) {
                                border: none;
                                border-top: 2px solid #F2F2F2;
                                margin: 3rem 0;
                            }
                            
                            /* Estilos responsivos */
                            @media (max-width: 768px) {
                                .blog-article-content,
                                .blog-article-content-part {
                                    font-size: 1rem;
                                }
                                
                                .blog-article-content :global(h1),
                                .blog-article-content-part :global(h1) {
                                    font-size: 2rem;
                                }
                                
                                .blog-article-content :global(h2),
                                .blog-article-content-part :global(h2) {
                                    font-size: 1.75rem;
                                }
                                
                                .blog-article-content :global(h3),
                                .blog-article-content-part :global(h3) {
                                    font-size: 1.5rem;
                                }
                                
                                .blog-article-content :global(h4),
                                .blog-article-content-part :global(h4) {
                                    font-size: 1.25rem;
                                }
                                
                                .blog-article-content :global(p),
                                .blog-article-content-part :global(p) {
                                    font-size: 1rem;
                                }
                                
                                .blog-article-content :global(blockquote),
                                .blog-article-content-part :global(blockquote) {
                                    padding: 1rem 1.5rem;
                                    margin: 1.5rem 0;
                                }
                                
                                .blog-article-content :global(blockquote p),
                                .blog-article-content-part :global(blockquote p) {
                                    font-size: 1.125rem;
                                }
                                
                                .blog-article-content :global(ul), 
                                .blog-article-content :global(ol),
                                .blog-article-content-part :global(ul), 
                                .blog-article-content-part :global(ol) {
                                    padding-left: 1.5rem;
                                }
                                
                                .blog-article-content :global(img),
                                .blog-article-content-part :global(img) {
                                    margin-top: 1.5rem;
                                    margin-bottom: 1.5rem;
                                }
                            }
                        `})]}),t.jsx(e.div,{variants:l,className:"mt-16 pt-8 border-t-2 border-neutral-light",initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{duration:.8},viewport:{once:!0,margin:"-100px"},children:t.jsxs(e.div,{className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-6",variants:s,children:[t.jsx(M,{show:j,message:"Enlace copiado al portapapeles"}),t.jsxs(e.div,{className:"flex flex-col gap-4",variants:p,children:[t.jsx(e.h3,{className:"text-xl font-semibold text-neutral-dark",whileHover:{x:5,scale:1.02},children:"¿Te gustó este artículo? ¡Compártelo!"}),t.jsx(e.div,{className:"flex flex-wrap gap-3",variants:v,children:[{type:"copy",label:"Copiar enlace",icon:S,color:"bg-gray-100 hover:bg-gray-200 text-neutral-dark"},{type:"linkedin",label:"LinkedIn",icon:V,color:"bg-blue-600 hover:bg-blue-700 text-white"},{type:"twitter",label:"Twitter",icon:D,color:"bg-blue-400 hover:bg-blue-500 text-white"},{type:"facebook",label:"Facebook",icon:q,color:"bg-blue-800 hover:bg-blue-900 text-white"}].map(({type:a,label:i,icon:b,color:T},K)=>t.jsx(e.div,{variants:l,whileHover:{y:-5,scale:1.08,boxShadow:"0 10px 25px rgba(0,0,0,0.15)"},whileTap:{scale:.95},onHoverStart:()=>u(a),onHoverEnd:()=>u(null),children:t.jsx(E,{content:i,children:t.jsxs(e.a,{href:a!=="copy"?N[a]:void 0,onClick:a==="copy"?F:void 0,target:"_blank",rel:"noopener noreferrer",className:`${T} px-4 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg`,style:{cursor:"pointer"},animate:{rotate:x===a?[0,-2,2,0]:0},transition:{duration:.3},children:[t.jsx(e.div,{animate:{scale:x===a?[1,1.2,1]:1},transition:{duration:.3},children:t.jsx(b,{className:"h-5 w-5"})}),t.jsx("span",{className:"hidden sm:inline",children:i})]})})},a))})]})]})})]})}),t.jsxs(e.section,{initial:"hidden",whileInView:"visible",variants:s,viewport:{once:!0,margin:"-100px"},className:"mt-8 pt-6 bg-constrast text-sm font-title font-medium px-[5%] py-8 md:py-12 text-neutral-dark",children:[t.jsx(e.h2,{className:"text-white text-3xl sm:text-4xl lg:text-[44px] !leading-tight",variants:l,children:t.jsx(w,{text:(n==null?void 0:n.title)||"Ver más *noticias*",color:"bg-neutral font-semibold"})}),t.jsx(e.p,{className:"flex mt-3 text-center lg:text-left text-base 2xl:text-lg text-white",variants:l,children:(n==null?void 0:n.description)||"Descubre más artículos interesantes y mantente al día con nuestras últimas noticias y actualizaciones."}),t.jsx(e.section,{className:"py-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8",variants:s,children:r.map((a,i)=>t.jsx(e.div,{variants:l,whileHover:{y:-8,scale:1.02,transition:{duration:.3}},whileTap:{scale:.98},children:t.jsx(e.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{duration:.8,delay:i*.1,ease:"easeOut"},viewport:{once:!0},children:t.jsx(R,{...a,firstImage:!0,classTitle:"text-white",classDescription:"text-white",classBtn:"bg-neutral-dark",classCategory:"text-neutral-dark"})})},i))})]}),t.jsx(e.div,{initial:{opacity:0,y:30},animate:{opacity:f?1:0,y:f?0:30},transition:{duration:.8,delay:.3},children:t.jsx(O,{})})]})};z((o,r)=>{A(o).render(t.jsx(B,{children:t.jsx(I,{...r,children:t.jsx(W,{...r})})}))});
