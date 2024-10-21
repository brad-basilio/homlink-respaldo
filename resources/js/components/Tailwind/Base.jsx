import React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, summary, socials, generals, showSlogan = true, showFooter = true, gradientStart = '#c4b8d3', gradientEnd = '#f1d7c1', menuGradientEnd = '#dbc8c9' }) => {
  return <section style={{
    backgroundImage: `linear-gradient(to right bottom, ${gradientStart}, ${gradientEnd})`
  }}>
    <Header socials={socials} generals={generals} showSlogan={showSlogan} gradientStart={gradientStart} menuGradientEnd={menuGradientEnd} />
    <main className="overflow-hidden min-h-[360px] relative">
      {children}
    </main>
    {
      showFooter &&
      <Footer summary={summary} socials={socials} generals={generals} />
    }
  </section>
}

export default Base
