"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react"; 
import { Heading, Table, Flex, Checkbox, Box } from "@radix-ui/themes";  
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";  
import { priceMaterialsTiles } from "./constants/numbers";  
import ComponentButtons from "./components/ComponentButtons";
import Navbar from "./components/Navbar";
import { DimensionKey, SbType, singleComponent, SummaryBreakdownStrand } from "./types/components";
import WelcomeNote from "./components/WelcomeNote"; 
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from "./lib/db";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  ) 
}
 

function Home() {
  const [width, setWidth] = useState<number | null>(null)
  const [length, setLength] = useState<number | null>(null)

  type ShowcaseType = {
    [key: string]: boolean
  }
  
  const tilesShowcaseInitial:ShowcaseType = {
    tiles: false,
    grout: false
  }

  const [showcaseComponent, setShowcaseComponent] = useState<ShowcaseType>(tilesShowcaseInitial)

   

  type DimensionsBasicType = {
    width?: number,
    length?: number,
    area?: number
  }

  const [dimensions, setDimensions] = useState<DimensionsBasicType>({
    width: 0,
    length: 0,
    area: 0
  })

  const [area, setArea] = useState<null | number>(null)
 

  //should be importable for incoming components as well
  type componentTilesType = {
    [key: string]: singleComponent | null | undefined, 
  }

  const initialComponentTiles = {
    tiles: { qty: 0, units: 'pcs', price: priceMaterialsTiles.tiles },
    grout: { qty: 0, units: 'kg', price: priceMaterialsTiles.grout }
  }

  const [componentTilesNumbers, setComponentTilesNumbers] = useState<componentTilesType>(initialComponentTiles)

  const summaryBreakdown = {
    sbTotalMaterials: { include: true },
    sbLabor: { include: true }, 
    sbContingency: { include: true },
    sbContractorsProfit: { include: true },
    sbTax: { include: true },
  }

  const [summaryBreakdownState, setSummaryBreakdownState] = useState<SbType>(summaryBreakdown) 
 
  const displayArea = () => {
     if (typeof width === 'number' && typeof length === 'number') {
      const area = width * length; 
      const cleanDecimals = parseFloat(area.toFixed(2))
      setArea(cleanDecimals);
    }
  }
 
  useEffect(() => { 
    const timeoutId = setTimeout(() => { 
      displayArea()
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [width, length]) 

  
  const computeTotalOfMaterials = (componentArray: componentTilesType) => {
    let total:number = 0
    for (const material in componentArray) {
      const component = componentArray[material as keyof componentTilesType]
      if (component) {
        const qty = component.qty ?? 0
        const price = component.price ?? 0
        total += qty * price
      }
    }
    return total
  } 

  useEffect(() => {
    console.log(dimensions)
  }, [dimensions])


  useEffect(() => {
    const totalMaterials = computeTotalOfMaterials(componentTilesNumbers)
    const tax = totalMaterials * .125
    const labor = totalMaterials * .25
    const contingency = totalMaterials * .05
    const contractorProfit = totalMaterials * .125
     
    setSummaryBreakdownState(prev => ({...prev,
      sbTotalMaterials: {...prev.sbTotalMaterials, value: totalMaterials},
      sbLabor: {...prev.sbLabor, value: labor},
      sbTax: {...prev.sbTax, value: tax},
      sbContingency: {...prev.sbContingency, value: contingency},
      sbContractorsProfit: {...prev.sbContractorsProfit, value: contractorProfit}
    }))
    
  }, [componentTilesNumbers])
 
  const { todos } = db

  const allItems = useLiveQuery(() => todos.toArray(), []) 

  // const addTask = async() => {  
  //   try {
  //     await todos.add({
  //       title: 'workout',
  //       completed: true
  //     }) 
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
 
  
  return (
    <>
      <Navbar /> 
      <main className="flex min-h-screen flex-col items-center gap-2 z-10 bg-gray-100 border">
        <div className="w-full sm:w-[640px] flex flex-col gap-2"> 
        
          <Box className="rounded-md shadow bg-white mt-10 flex sm:flex-row flex-col gap-2">
            <Flex  wrap="wrap"  justify="between" className="w-full">
              <Box className="sm:flex-1 w-full rounded-l-md overflow-hidden relative">
                <div className="absolute z-10 flex items-center h-full w-full">
                  <ComponentButtons component="tiles" />
                </div>
                <div className="sm:h-full h-[300px] bg-blue-300 relative left-0 right-0"> 
                  <Image alt="" layout="fill" objectFit="cover" className="absolute inset-o" src="https://znetflooring.com/media/catalog/product/cache/2bd175c9fdca7a1f445c94dbd4a9111b/6/f/6f9e783ab474dbdb351bee10fa6e1f2c1ef0fcd16404f074a709fc6f4b6c0fcb.jpeg" />
                </div>
              </Box> 
              <Box className="sm:w-2/3 w-full p-4"> 
                <WelcomeNote /> 
                 
              </Box> 
            </Flex> 
          </Box>
          <Box className="rounded-md shadow bg-white borderd">
            <div className="m-5"> 
              Please click in the menu above. 
            </div>
            
          </Box> 
          <Box className="rounded-md shadow bg-white borderd flex sm:flex-row flex-col gap-2">
            <div className="m-5"> 
              Done by architect
            </div>
             
          </Box>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
