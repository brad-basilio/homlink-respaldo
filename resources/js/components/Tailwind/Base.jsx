import React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, summary, faqs }) => {
  return <>
    <Header />
    <main className="overflow-hidden min-h-[360px]">
      {children}
    </main>
    <Footer summary={summary} faqs={faqs} />
  </>
}

export default Base
