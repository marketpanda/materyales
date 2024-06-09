"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { FlyOut } from "./components/FlyOut";
import { comma } from "postcss/lib/list";

import { Text, Button, Card, Heading, Table, Flex, Checkbox, Box } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form'

import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { logout } from "./logout/actions";
import DemoClientComponent from "./components/DemoClientComponent";
import FormCompute from "./components/FormCompute";

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

  const [area, setArea] = useState<null | number | string >(null)

  const [tilesTiles, setTilesTiles] = useState<number>(0)
  const [tilesGrout, setTilesGrout] = useState<number>(0)


  const displayArea = () => {
     if (typeof width === 'number' && typeof length === 'number') {
      const area2: number = width * length;

      const cleanDecimals: number = parseFloat(area2.toFixed(2))
      setArea(cleanDecimals);
    }
  }

  useEffect(() => {
    
  }, [width, length])
  
 

  const { data:any, isLoading } = useQuery({
    queryKey: ['exampleData'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const data = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
      
      return data 
    }
  })
   
   
  console.log(isLoading)

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


  const handleLengthChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value  = parseFloat(e.target.value)
    setLength(isNaN(value) ? null : value)
    
  }
  
  const handleWidthChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseFloat(e?.target.value))
  }

  const computeTilesTiles = ():void => {
    
    console.log('compute tiles')
    let tmpArea
    
    tmpArea = area
    
    if (typeof tmpArea === "number") {

      const numOfTiles = Math.ceil(tmpArea / .36)

      setTilesTiles(numOfTiles)
    }
  
  }
  
  const computeTilesGrout = ():void => { 
    let tmpArea 
     
      tmpArea = area
     
    if (typeof tmpArea === "number") {
  
      const kgOfGrout = tmpArea / 4
      setTilesGrout(kgOfGrout)
    }
  }

  const handleDirectArea = () => {
    setWidth(null)
    setLength(null)
    setArea(null)
  }

  const handleAreaChange = (e:any) => {
    setArea(parseFloat(e.target.value))
  }

  const estimateNow = (e:any) => {
    e.preventDefault()
    computeTilesTiles()
    computeTilesGrout() 
  }

   
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 bg-gray-100 border">
      <div className="w-full sm:w-[640px] flex flex-col gap-2"> 
       
        <Box className="rounded-md shadow bg-white borderd mt-2 flex sm:flex-row flex-col gap-2">
          <Flex  wrap="wrap"  justify="between" className="w-full">
            <Box className="sm:flex-1 w-full rounded-l-md overflow-hidden">
              <div className="sm:h-full h-[300px] bg-blue-300 relative">
                <Image alt="" layout="fill" objectFit="cover" className="absolute inset-o" src="https://znetflooring.com/media/catalog/product/cache/2bd175c9fdca7a1f445c94dbd4a9111b/6/f/6f9e783ab474dbdb351bee10fa6e1f2c1ef0fcd16404f074a709fc6f4b6c0fcb.jpeg" />
              </div>
            </Box> 
            <Box  className="sm:w-2/3 w-full p-4"> 
              <DemoClientComponent /> 
              <Heading size="5" className="mt-2">  
                <span>
                Tiles Calculator
                </span>
              </Heading>

            <FormCompute
              length={length}
              width={width}
              area={area}
              handleLengthChange = {handleLengthChange}
              handleWidthChange = {handleWidthChange}  
              handleAreaChange = {handleAreaChange}  
              estimateNow = {estimateNow}
            /> 

              {/* <form className="flex flex-col gap-2">
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
                <div className="flex">
                  <Button
                    style={{ width: '100%'}} 
                    size="3"
                    onClick={estimateNow}>
                    Estimate
                  </Button>
                </div>
              </form> */}
            </Box> 
          </Flex> 
        </Box>
        <Box className="rounded-md shadow bg-white borderd">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Material</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Cost per Unit</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-center">Total Cost</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell px="4">
                  <div className="rounded-full w-12 h-12 overflow-hidden">
                    <img src="https://picsum.photos/id/237/200/300" />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell> tiles</Table.Cell>
                <Table.Cell> {tilesTiles} (60x60cm tiles)</Table.Cell>
                <Table.Cell>
                  <input value={500} className="w-28  outline-none" onChange={() => console.log('tiles')}  />
                </Table.Cell>
                <Table.Cell pr="5">
                   <span className="justify-end pr-5  flex w-full bg-gray-100 rounded-full p-2"> 
                  {tilesTiles * 500 }
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row  >
                <Table.RowHeaderCell px="4" pb="5">
                  <div className="rounded-full w-12 h-12 overflow-hidden">
                    <img src="https://picsum.photos/id/237/200/300" />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell>grout</Table.Cell>
                <Table.Cell>{tilesGrout}kg</Table.Cell>
                <Table.Cell>
                  210
                </Table.Cell>
                <Table.Cell pr="5">
                  <span className="justify-end pr-5  flex w-full bg-gray-100 rounded-full p-2">   
                  {tilesGrout * 210 }
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
        {/* <div className="mt-2 flex flex-col w-full bg-gray-100 font-semibold gap-2 shadow border-4">
           */}
           
          
        {/* <div className="w-full flex flex-col gap-2 text-right p-2 border-4"> */}
        
        <Box className="rounded-md shadow bg-white borderd flex sm:flex-row flex-col gap-2">
        
        {/* <div className="w-full flex flex-col gap-2"> */}
           <Flex wrap="wrap-reverse" className="w-full">

           
            <Box className="sm:flex-1 w-full rounded-l-md overflow-hidden">
              <div className="sm:h-full h-[300px] bg-blue-300 relative">
                <Image alt="" layout="fill" objectFit="cover" className="absolute inset-o" src="https://znetflooring.com/media/catalog/product/cache/2bd175c9fdca7a1f445c94dbd4a9111b/6/f/6f9e783ab474dbdb351bee10fa6e1f2c1ef0fcd16404f074a709fc6f4b6c0fcb.jpeg" />
              </div>
            </Box> 
            <Box className="border w-full sm:w-2/3 p-4 pb-10">
              
                <div className="flex flex-col w-full text-sm">
                  <div className="flex justify-end gap-4 w-full items-center p-1"> 
                    <span className="flex-1 text-right">
                      Total of Materials:
                    </span> 
                    <span className="w-[50px] text-right"> </span>
                    <span className="w-[120px] text-right">Php1,000,000</span>
                    <span className="w-[20px] flex items-center"> 
                      <Checkbox defaultChecked />
                    </span>
                  </div>
                  <div className="flex justify-end gap-4 w-full items-center p-1"> 
                    <span className="flex-1 text-right">
                      Total of Labor:
                    </span> 
                    <span className="w-[50px] text-right">30%</span>
                    <span className="w-[120px] text-right">Php300,000</span>
                    <span className="w-[20px] flex items-center"> 
                      <Checkbox defaultChecked />
                    </span>
                  </div>
                  <div className="flex justify-end gap-4 w-full items-center p-1"> 
                    <span className="flex-1 text-right">
                      Contingency:
                    </span> 
                    <span className="w-[50px] text-right">5%</span>
                    <span className="w-[120px] text-right">Php50,000</span>
                    <span className="w-[20px] flex items-center"> 
                      <Checkbox defaultChecked />
                    </span>
                  </div>
                  <div className="flex justify-end gap-4 w-full items-center p-1"> 
                    <span className="flex-1 text-right">
                      Contractor's Profit:
                    </span> 
                    <span className="w-[50px] text-right">12.5%</span>
                    <span className="w-[120px] text-right">Php125,000</span>
                    <span className="w-[20px] flex items-center"> 
                      <Checkbox defaultChecked />
                    </span>
                  </div>
                  <div className="flex justify-end gap-4 w-full items-center p-1"> 
                    <span className="flex-1 text-right">
                      Tax:
                    </span> 
                    <span className="w-[50px] text-right">12.5%</span>
                    <span className="w-[120px] text-right">Php125,000</span>
                    <span className="w-[20px] flex items-center"> 
                      <Checkbox defaultChecked />
                    </span>
                  </div>
                  <div className="flex justify-end gap-4 w-full items-center p-1"> 
                    <span className="flex-1 text-right font-bold">
                      Total Project Cost:
                    </span> 
                    <span className="w-[50px] text-right"> </span>
                    <span className="w-[120px] text-right font-bold">Php1,600,000</span>
                    <span className="w-[20px] flex items-center"> 
                      <Checkbox defaultChecked />
                    </span>
                  </div>
                   
                   
                  
                </div>
              
              
              

            </Box>
          </Flex>
        </Box>
          

           

      
      </div>


     
    </main>
  );
}
