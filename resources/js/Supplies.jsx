import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import Base from './Components/Tailwind/Base';
import SupplieCard from './Components/Supplies/components/SupplieCard';

const Supplies = ({ }) => {

  const supplies = [
    {
      image: 'arroz-fermentado.png',
      title: 'Arroz fermentado',
      description: 'Suaviza'
    },
    {
      image: 'maracuya.png',
      title: 'Maracuyá',
      description: 'Antioxidante'
    },
    {
      image: 'te-verde.png',
      title: 'Té verde',
      description: 'Crecimiento'
    },
    {
      image: 'acacia.png',
      title: 'Acacia',
      description: 'Fortalece'
    },
    {
      image: 'soya-fermentada.png',
      title: 'Soya fermentada',
      description: 'Revitaliza'
    },
    {
      image: 'quinoa.png',
      title: 'Quinoa',
      description: 'Brillo'
    },
    {
      image: 'amarantho.png',
      title: 'Amarantho',
      description: 'Restaura'
    },
    {
      image: 'propaneidol.png',
      title: 'Propaneidol',
      description: 'Humectante'
    },
    {
      image: 'romero.png',
      title: 'Romero',
      description: 'Purificante'
    },
    {
      image: 'manzanilla.png',
      title: 'Manzanilla',
      description: 'Crecimiento'
    },
    {
      image: 'arnica.png',
      title: 'Arnica',
      description: 'Nutrición'
    },
    {
      image: 'salvia.png',
      title: 'Salvia',
      description: 'Regenera'
    },
    {
      image: 'capuchina.png',
      title: 'Capuchina',
      description: 'Anticaspa'
    },
    {
      image: 'cascara-limon.png',
      title: 'Cáscara de limón',
      description: 'Purifica'
    },
    {
      image: 'tamarindo.png',
      title: 'Tamarindo',
      description: 'Vitalidad'
    },
    {
      image: 'aloe-vera.png',
      title: 'Aloe vera',
      description: 'Nutrición'
    },
    {
      image: 'pantenol.png',
      title: 'Pantenol',
      description: 'Hidratación'
    },
    {
      image: 'polifenoles.png',
      title: 'Polifenoles',
      description: 'Antioxidante'
    },
    {
      image: 'yacon.png',
      title: 'Yacón',
      description: 'Antiinflamatorio'
    },
    {
      image: 'uva.png',
      title: 'Uva',
      description: 'Hidratación'
    },
    {
      image: 'gluconolactona.png',
      title: 'Gluconolactona',
      description: 'Limpieza'
    },
    {
      image: 'manteca-karite.png',
      title: 'Manteca de Karité',
      description: 'Cabello sano'
    },
    {
      image: 'aceite-argon.png',
      title: 'Aceite de argón',
      description: 'Antifrizz'
    },
    {
      image: 'aceite-coco.png',
      title: 'Aceite de coco',
      description: 'Restaura'
    },
    {
      image: 'tomillo.png',
      title: 'Tomillo',
      description: 'Anticaspa'
    },
    {
      image: 'acido-salicilico.png',
      title: 'Ácido salicílico',
      description: 'Nutrición'
    },
    {
      image: 'sauce.png',
      title: 'Sauce',
      description: 'Cabello sano'
    },
    {
      image: 'pino.png',
      title: 'Pino',
      description: 'Suavidad'
    },
    {
      image: 'zinc.png',
      title: 'Zinc',
      description: 'Fortalecimiento'
    },
    {
      image: 'jalea-real.png',
      title: 'Jalea real',
      description: 'Repara puntas'
    },
    {
      image: 'vinagre-manzana.png',
      title: 'Vinagre manzana',
      description: 'Antibacteriana'
    },
    {
      image: 'alga-clorella.png',
      title: 'Alfa clorella',
      description: 'Hidratación'
    },
    {
      image: 'calendula.png',
      title: 'Caléndula',
      description: 'Anticaspa'
    },
    {
      image: 'papaya.png',
      title: 'Papaya',
      description: 'Crecimiento'
    },
    {
      image: 'acerola.png',
      title: 'Acerola',
      description: 'Hidratación'
    },
    {
      image: 'avena.png',
      title: 'Avena',
      description: 'Suavidad'
    },
    {
      image: 'ginkgo-biloba.png',
      title: 'Ginkgo Biloba',
      description: 'Vitalidad'
    },
    {
      image: 'biotina.png',
      title: 'Biotina',
      description: 'Crecimiento'
    },
    {
      image: 'tara.png',
      title: 'Tara',
      description: 'Volumen'
    },
    {
      image: 'cafeina.png',
      title: 'Cafeína',
      description: 'Volumen'
    },
    {
      image: 'arginina.png',
      title: 'Arginina',
      description: 'Crecimiento'
    },
    {
      image: 'guarana.png',
      title: 'Guaraná',
      description: 'Fortalecimiento'
    },
    {
      image: 'filtro-solar.png',
      title: 'Filtro solar UVA/UVB',
      description: 'Protege'
    },
    {
      image: 'vitamina-e.png',
      title: 'Vitamina E',
      description: 'Hidratación'
    },
    {
      image: 'seda.png',
      title: 'Seda',
      description: 'Antifrizz'
    },
    {
      image: 'almendras.png',
      title: 'Almendras',
      description: 'Suavidad'
    },
    {
      image: 'tocoferol.png',
      title: 'Tocoferol',
      description: 'Crecimiento'
    },
    {
      image: 'jojoba.png',
      title: 'Jojoba',
      description: 'Rizos definidos'
    },
    {
      image: 'brassica.png',
      title: 'Brassica',
      description: 'Desenredante'
    },
    {
      image: 'aceite-coco.png',
      title: 'Aceite de coco',
      description: 'Restaura'
    },
    {
      image: 'keratina.png',
      title: 'Keratina',
      description: 'Alisado'
    },
    {
      image: 'ceramidas.png',
      title: 'Ceramidas',
      description: 'Fortalecimiento'
    },
    {
      image: 'dimeticona.png',
      title: 'Dimeticona',
      description: 'Alisado'
    },
  ]

  return (
    <section className='p-[5%] py-[10%] md:py-[5%] bg-[#FBF5F1]'>
      <div className='max-w-5xl mx-auto'>
        <div className='mb-[10%] md:mb-[5%]'>
        <h2 className='text-2xl font-bold'>+50 Ingredientes naturales</h2>
        <p>Tu fórmula única cumplirá tus objetivos gracias a algunos ingredientes como:</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8'>
          {supplies.map((supplie, index) => <SupplieCard key={index} {...supplie} />)}
        </div>
      </div>
    </section>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Supplies {...properties} />
  </Base>);
})