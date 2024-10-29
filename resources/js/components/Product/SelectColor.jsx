import React, { useEffect, useState } from "react"
import { Local } from "sode-extend-react"
import ItemContainer from "./components/ItemContainer"

const SelectColor = ({ goToNextPage, colors = [] }) => {
  const [cart, setCart] = useState(Local.get('vua_cart') ?? [])

  useEffect(() => {
    setCart(old => {
      return old.map(item => {
        const currentColors = item.colors ?? []
        const quantity = item.quantity
        const leftColor = new Array(quantity - currentColors.length).fill(colors[0])

        if (currentColors.length < quantity) item.colors = [...currentColors, ...leftColor]
        else item.colors = currentColors.slice(0, quantity)
        return item
      })
    })
  }, [null])

  const onSelectColor = (itemId, colorIndex, color) => {
    setCart(old => {
      return old.map(item => {
        if (item.id == itemId) item.colors[colorIndex] = color
        return item
      })
    })
  }

  useEffect(() => {
    Local.set('vua_cart', cart)
  }, [cart])

  return <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center text-[#404040]'>

    <div className='max-w-2xl mx-auto '>
      <h1 className="text-2xl font-bold mb-2">¡Ahora selecciona el color!</h1>
      <p className="mb-8 text-sm font-extralight">Elije tus colores favoritos para tu rutina ✨</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 sm:mt-8 lg:mt-10">

      {
        cart.map((item, i) => {
          return item.colors?.map((existence, j) => {
            return <div key={`existence-${i}-${j}`} className="overflow-hidden w-full bg-white rounded-2xl ">
              <div className="flex flex-row gap-2 items-center p-2">
                <div className="">
                  <ItemContainer color={existence.hex}/>
                  {/* <img className="h-[120px] aspect-[3/4] object-cover object-center rounded-md" src='/assets/img/container.svg' alt={item.name}
                    style={{
                      fill: existence.color
                    }} /> */}
                </div>
                <div className="">
                  <div className="flex flex-wrap gap-3 items-end self-stretch my-auto ">
                    <div className="flex flex-col items-start self-stretch">
                      <h2 className="text-lg font-semibold tracking-normal leading-none text-neutral-700 mb-1">{item.name} {j + 1}</h2>
                      <p className=" text-sm font-light tracking-normal leading-none text-neutral-700 mb-4">Selecciona tu color:</p>
                      <div className="flex gap-2 flex-wrap">
                        {
                          colors.map((color, index) => {
                            const isSelected = existence.id == color.id
                            return <button key={index} className={`flex shrink-0 w-8 aspect-square rounded-full border ${isSelected ? 'shadow-md border-[#000000]' : ''}`} style={{
                              backgroundColor: color.hex || '#fff'
                            }} onClick={() => onSelectColor(item.id, j, color)} />
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })
        })
      }
    </div>


    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto md:mx-[12.5%] mt-5 sm:mt-10">
      <button onClick={goToNextPage} className='bg-[#C5B8D4] text-white text-sm px-8 py-3 rounded mt-4'>SIGUIENTE</button>
    </div>

  </section>
}

export default SelectColor 