import React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, footerLinks, session, socials, terms, showSlogan = true, showFooter = true, gradientStart = '#c4b8d3', gradientEnd = '#f1d7c1', menuGradientEnd = '#dbc8c9' }) => {
  return <section style={{
    backgroundImage: `linear-gradient(to right bottom, ${gradientStart}, ${gradientEnd})`
  }}>
    <Header showSlogan={showSlogan} gradientStart={gradientStart} menuGradientEnd={menuGradientEnd} session={session} />
    <main className="overflow-hidden min-h-[360px] relative">
      {children}
    </main>
    {
      showFooter &&
      <Footer socials={socials} terms={terms} footerLinks={footerLinks} />
    }
  </section>
}

export default Base
