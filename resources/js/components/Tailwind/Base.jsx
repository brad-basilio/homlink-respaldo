import React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, summary, socials, generals }) => {
  return <section className="bg-gradient-to-br from-[#c4b8d3] to-[#f1d7c1]">
    <Header socials={socials} generals={generals} />
    <main className="overflow-hidden min-h-[360px]">
      {children}
    </main>
    <Footer summary={summary} socials={socials} generals={generals} />
  </section>
}

export default Base
