import React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, summary, faqs }) => {
  return <>
    <Header />
    <main className="overflow-hidden">
      {children}
    </main>
    <Footer summary={summary} faqs={faqs} />
  </>
}

export default Base
