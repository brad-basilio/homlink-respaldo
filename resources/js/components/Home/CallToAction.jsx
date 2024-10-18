import React from "react"

const CallToAction = () => {
  return <section className="px-[5%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-gradient-to-tr from-[#99ade8] to-[#f2a2d2] text-center flex flex-col gap-4 justify-center" >
    <div className="flex flex-col gap-4 md:flex-row">
      <div>
        <img className="h-auto items-center" src="/assets/img/calltoaction/slogan.png" alt="" />
      </div>
      <div>
        <img className="h-auto items-center" src="/assets/img/calltoaction/banner.png" alt="" />
      </div>
    </div>
    <button className='bg-[#8998DA] text-white text-sm px-4 py-3 rounded border border-white w-max mx-auto md:mx-[12.5%]'>TE CONTAMOS MAS AQUI</button>
  </section>
}

export default CallToAction