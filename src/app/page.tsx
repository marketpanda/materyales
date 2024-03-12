"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [width, setWidth] = useState<number |null>(null)
  const [length, setLength] = useState<number |null>(null)

  const [area, setArea] = useState<number | null | string>(null)


  const displayArea = () => {
     if (typeof width === 'number' && typeof length === 'number') {
      const area2: number = width * length;

      const cleanDecimals: string = area2.toFixed(2)
      setArea(cleanDecimals);
    }
  }

  useEffect(() => {
    displayArea()

    return () => {

    }
  }, [width, length])

  useEffect(() => {
    console.log(area)
    return () => {

    }
  }, [area])

  const handleLengthChange = (e:any) => {
    setLength(parseFloat(e?.target.value))    
  }
  
  const handleWidthChange = (e:any) => {
    setWidth(parseFloat(e?.target.value))
  }

  const handleDirectArea = () => {
    setWidth(null)
    setLength(null)
    setArea(null)
  }

  const handleAreaChange = (e:any) => {
    setArea(parseFloat(e.target.value))
  }

   
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full sm:w-[640px] border-4 rounded p-2 flex flex-col">
      
        <form className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="w-full sm:w-20 px-2 text-left sm:text-right font-bold">
              Length
            </div>
            <div className="flex w-full items-center bg-white">
              <input
                value={!length ? '' : length}
                onChange={handleLengthChange}
                placeholder="Type a length"
                type="number"
                name="length"
                className="p-2 w-full outline-none font-bold text-purple-800 text-2xl text-right" />
              <div className="w-16 text-left text-2xl font-bold text-purple-800">
                m
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="w-full sm:w-20 px-2 text-left sm:text-right font-bold">
              Width
            </div>
            <div className="flex w-full items-center bg-white">
              <input
                value={!width ? '' : width}
                onChange={handleWidthChange}
                placeholder="Type a width"
                type="number"
                name="length"
                className="p-2 w-full outline-none font-bold text-purple-800 text-2xl text-right" />
              <div className="w-16 text-left text-2xl font-bold text-purple-800">
                m
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="w-full sm:w-20 px-2 text-left sm:text-right font-bold">
              Area
            </div>
            <div className="flex w-full items-center bg-white">
              <input
                value={!area ? '' : area}
                onChange={handleAreaChange}
                onClick={handleDirectArea}
                placeholder="Type an area or generate"
                type="number"
                name="length"
                className="p-2 w-full outline-none font-bold text-purple-800 text-2xl text-right" />
              <div className="w-16 text-left text-2xl font-bold text-purple-800">
                sqm
              </div>
            </div>
          </div> 
        </form>
        {/* <div className="mt-2 flex flex-col w-full">
          
          <div className="w-full flex justify-between">
            <span className="w-1/2">
              tiles
            </span>
            <span className="w-1/2">
              100pcs
            </span>
            
          </div>
          
        </div> */}
      </div>

     
    </main>
  );
}
