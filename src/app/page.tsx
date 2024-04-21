"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { FlyOut } from "./components/FlyOut";
import { comma } from "postcss/lib/list";

import { Text, Button, Card, Heading, Table } from "@radix-ui/themes";
 
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
  
}



function Home() {
  const [width, setWidth] = useState<number |null>(null)
  const [length, setLength] = useState<number |null>(null)

  const [area, setArea] = useState<number | null | string>(null)

  const [tilesTiles, setTilesTiles] = useState<number>(0)
  const [tilesGrout, setTilesGrout] = useState<number>(0)


  const displayArea = () => {
     if (typeof width === 'number' && typeof length === 'number') {
      const area2: number = width * length;

      const cleanDecimals: string = area2.toFixed(2)
      setArea(cleanDecimals);
    }
  }
  
 

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


  const handleLengthChange = (e:any) => {
    setLength(parseFloat(e?.target.value))    
  }
  
  const handleWidthChange = (e:any) => {
    setWidth(parseFloat(e?.target.value))
  }

  const computeTilesTiles = ():void => {
    
    console.log('compute tiles')
    let tmpArea
    if (typeof area === "string") {
      tmpArea = parseFloat(area)
    }

    if (typeof tmpArea === "number") {

      const numOfTiles = Math.ceil(tmpArea / .36)

      setTilesTiles(numOfTiles)
    }
  
  }
  
  const computeTilesGrout = ():void => {
    console.log('compute grout')
    let tmpArea 
    if (typeof area === "string") { 
      tmpArea = parseFloat(area)
    }
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
    console.log('estimating...')
  }

   
  return (
    <main className="flex min-h-screen flex-col items-center gap-2">
      <div className="w-full sm:w-[640px] flex flex-col gap-2"> 
        <Card>
        
          <Heading size="5">
            Tile Calculator
          </Heading>
          

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
          <div className="flex">
            <Button
              style={{ width: '100%'}} 
              size="3"
              onClick={estimateNow}>
              Estimate
            </Button>
          </div>
        </form>
        </Card>
        <Card>
          <Table.Root>
            <Table.Header>
              <Table.ColumnHeaderCell>Material</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Cost per Unit</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total Cost</Table.ColumnHeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>
                  <div className="rounded-full w-12 h-12 overflow-hidden">
                    <img src="https://picsum.photos/id/237/200/300" />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell> {tilesTiles} (60x60cm tiles)</Table.Cell>
                <Table.Cell>
                  <input value={500} className="w-28  outline-none" onChange={() => console.log('tiles')}  />
                </Table.Cell>
                <Table.Cell>
                  {tilesTiles * 500 }
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.RowHeaderCell>
                  <div className="rounded-full w-12 h-12 overflow-hidden">
                    <img src="https://picsum.photos/id/237/200/300" />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell>  {tilesGrout}kg</Table.Cell>
                <Table.Cell>
                  210
                </Table.Cell>
                <Table.Cell>
                  {tilesGrout * 210 }
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Card>
        <div className="mt-2 flex flex-col w-full bg-gray-100 font-semibold gap-2 shadow">
          
           
          
          
          
          
          <div className="w-full flex flex-col gap-2 text-right p-2 border-4">
            <div className="flex flex-col gap-2">

            
              <div className="flex justify-end cursor-default">
                <span>Total of Materials:</span>
                <span className="w-12 opacity-60"></span>
                <span className="w-24">{ }</span>
                <span className="flex items-center w-8 justify-end"></span>
              </div>
              <div className="flex justify-end items-center cursor-pointer">
                <span>Total Labor:</span>
                <span className="w-12 opacity-60">{30}%</span>
                <span className="w-24">{ }</span>
                <span className="flex items-center w-8 justify-end"><input type="checkbox" className="h-4 w-4" name="isLabor" /></span>
              </div>
              <div className="flex justify-end text-sm cursor-pointer">
                <span>Contingency of Materials:</span>
                <span className="w-12 opacity-60">{5}%</span>
                <span className="w-24">{ }</span>
                <span className="flex items-center w-8 justify-end"><input type="checkbox" className="h-4 w-4" name="isContingencyMaterials" /></span>
              </div>
              <div className="flex justify-end text-sm cursor-pointer">
                <span>Contractor&apos;s Profit:</span>
                <span className="w-12 opacity-60">{15}%</span>
                <span className="w-24">{ }</span>
                <span className="flex items-center w-8 justify-end"><input type="checkbox" className="h-4 w-4" name="isContractorsProfit" /></span>
              </div>
              <div className="flex justify-end text-sm cursor-pointer">
                <span>Tax:</span>
                <span className="w-12 opacity-60">{12.5}%</span>
                <span className="w-24">{ }</span>
                <span className="flex items-center w-8 justify-end"><input type="checkbox" className="h-4 w-4" name="isTax" /></span>
              </div>
              
              <div className="flex justify-end cursor-default">
                <span>Total Project Cost:</span>
                <span className="w-12 opacity-60"></span>
                <span className="w-24">{ }</span>
                <span className="flex items-center w-8 justify-end"></span>
              </div>
              

            </div>
          </div>
          
        </div>

      
      </div>


     
    </main>
  );
}
