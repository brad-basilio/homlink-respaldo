import React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, ...properties }) => {
  const menuItems = [
    {
      label: 'Inicio',
      ref: '/'
    },
    {
      label: 'Nosotros',
      ref: '/about-us'
    },
    {
      label: 'Coaches',
      ref: '/coaches'
    },
    {
      label: 'Programas & Eventos',
      ref: '/events'
    },
    {
      label: 'Beneficios',
      ref: '/benefits'
    }
  ];
  return <>
    <Header items={menuItems} />
    <main>
      {children}
    </main>
    <Footer items={menuItems} />
  </>
}

export default Base
