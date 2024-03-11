"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [width, setWidth] = useState<number |null>(null)
  const [length, setLength] = useState<number |null>(null)

  const [area, setArea] = useState<number |null>(null)


  const displayArea = () => {
     if (typeof width === 'number' && typeof length === 'number') {
      const area2: number = width * length;
      setArea(area2);
    }
  }

  useEffect(() => {
    displayArea()

    return () => {

    }
  }, [width, length])

  const handleLengthChange = (e:any) => {
    setLength(parseFloat(e?.target.value))
    
  }
  const handleWidthChange = (e:any) => {
    setWidth(parseFloat(e?.target.value))
     
  }

   
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[640px] border-4 rounded ">
      
        <form className="flex flex-col gap-2 p-2">
          <div className="flex gap-2 items-center">
            <div className="w-12 text-right">
              Length
            </div>
            <input
              value={!length ? '' : length}
              onChange={handleLengthChange}
              placeholder="Type a length"
              type="number"
              name="length"
              className="p-2 flex-grow outline-none font-bold text-purple-800 text-2xl text-right" />
            <div className="w-12 text-left">
              m
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-12 text-right">
              Width
            </div>
            <input 
              value={!width ? '' : width}
              onChange={handleWidthChange}
              placeholder="Type a width"
              type="number"
              name="length"
              className="p-2 flex-grow outline-none font-bold text-purple-800 text-2xl text-right" />
            <div className="w-12 text-left">
              m
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-12 text-right">
              Area
            </div>
            <input
              value={area !== null ? area : ''}
              type="number" name="length" className="p-2 flex-grow outline-none font-bold text-purple-800 text-2xl text-right" />
              <div className="w-12 text-left">
              sqm
            </div>
          </div>
          
          
        </form>
      </div>
    </main>
  );
}
