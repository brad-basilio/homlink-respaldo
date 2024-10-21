import React from "react"

const ProgressBar = ({ className = 'max-w-md', width }) => {
  return <div className={`h-2 bg-[#EFEAE5] ${className} rounded-full mx-auto`}>
    <hr className={`h-2 bg-[#F7C2C6] rounded-full`} style={{
      width: width,
      transition: 'all .25s'
    }} />
  </div>
}

export default ProgressBar