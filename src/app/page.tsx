"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react"; 
import { Heading, Table, Flex, Checkbox, Box } from "@radix-ui/themes"; 
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"; 
import DemoClientComponent from "./components/DemoClientComponent";
import FormCompute from "./components/FormCompute";
import { priceMaterialsTiles } from "./constants/numbers";
import ComponentBrandPortal from "./components/ComponentBrandPortal";
import ComponentBrandPortalSimple from "./components/ComponentBrandPortalSimple";
import ComponentShowcaseDetails from "./components/ComponentShowcaseDetails";
import ComponentButtons from "./components/ComponentButtons";

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
    [key: string]: boolean | undefined | null
  }
  
  const tilesShowcaseInitial:ShowcaseType = {
    tiles: false,
    grout: false
  }

  const [showcaseComponent, setShowcaseComponent] = useState<ShowcaseType>(tilesShowcaseInitial)

  const handleClickShowcaseComponent = (component:string) => {
    console.log("component is ", component) 
    setShowcaseComponent(prev => ({...prev, [component]: !prev[component]}))
    console.log(showcaseComponent) 
  }


  type DimensionsBasicType = {
    width?: number | null,
    length?: number | null,
    area?: number | null
  }


  const [dimensions, setDimensions] = useState<DimensionsBasicType>({
    width: 0,
    length: 0,
    area: 0
  })

  const [area, setArea] = useState<null | number | string >(null)

  const [tilesTiles, setTilesTiles] = useState<number>(0)
  const [tilesGrout, setTilesGrout] = useState<number>(0) 

  //should be importable for incoming components as well
  type singleComponent = { 
    qty: number,
    units: string,
    price?: number,
    total?: number
  }
  
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

  type SbTypeStrand = {
    value?: number,
    include?: boolean
  }

  type SbType = {
    sbTotalMaterials?: SbTypeStrand | null,
    sbLabor?: SbTypeStrand | null, 
    sbContingency?: SbTypeStrand | null,
    sbContractorsProfit?: SbTypeStrand | null,
    sbTax?: SbTypeStrand | null,
  }

  const [summaryBreakdownState, setSummaryBreakdownState] = useState<SbType>(summaryBreakdown) 
 
  const displayArea = () => {
     if (typeof width === 'number' && typeof length === 'number') {
      const area2: number = width * length; 
      const cleanDecimals: number = parseFloat(area2.toFixed(2))
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

 
  type DimensionKey = 'length' | 'width' | 'area'

  const updateValue = (param: Partial<{ [key in DimensionKey]: number | null  }> ) => { 
    setDimensions(prev => ({ ...prev, ...param })) 
  }

  const handleLengthChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value  = parseFloat(e.target.value)
    setLength(isNaN(value) ? null : value) 
    updateValue({ length: (isNaN(value) ? null : value) })
     
  }
  
  const handleWidthChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setWidth(parseFloat(e?.target.value))
    updateValue({ width: (isNaN(value) ? null : value)})
  }

  const handleAreaChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setArea(parseFloat(e?.target.value))
    setWidth(0)
    setLength(0)
    updateValue({ width: 0, length: 0, area: (isNaN(value) ? null : value)})
  }


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
    
    console.log(totalMaterials)
    setSummaryBreakdownState(prev => ({...prev,
      sbTotalMaterials: {...prev.sbTotalMaterials, value: totalMaterials},
      sbLabor: {...prev.sbLabor, value: labor},
      sbTax: {...prev.sbTax, value: tax},
      sbContingency: {...prev.sbContingency, value: contingency},
      sbContractorsProfit: {...prev.sbContractorsProfit, value: contractorProfit}
    }))
    
  }, [componentTilesNumbers])

  const computeTilesTiles = ():void => {
    
    console.log('compute tiles')
    let tmpArea
    
    tmpArea = area
    
    if (typeof tmpArea === "number") { 
      const numOfTiles = Math.ceil(tmpArea / .36) 
      setTilesTiles(numOfTiles)  
      setComponentTilesNumbers((prev:componentTilesType) => ({...prev, tiles: prev.tiles ? { ...prev.tiles, qty: numOfTiles } : null}))
 
      const forTotal = numOfTiles * (priceMaterialsTiles.tiles ?? 0)  
    }  
  }
  
  const computeTilesGrout = ():void => { 
    let tmpArea 
    tmpArea = area
     
    if (typeof tmpArea === "number") {
      const kgOfGrout = tmpArea / 4
      setTilesGrout(kgOfGrout)

      setComponentTilesNumbers((prev:componentTilesType) => ({...prev, grout: prev.grout ? { ...prev.grout,   qty: kgOfGrout } : null}))

       
    }
  }

  const estimateNow = (e:any) => {
    e.preventDefault()
    computeTilesTiles()
    computeTilesGrout() 
    console.log(componentTilesNumbers)
  }


  const toggleIncludeBreakdown = (breakdownComponent:keyof SbType) => { 
    console.log(summaryBreakdownState)
    setSummaryBreakdownState((prev) => {
      const component = prev[breakdownComponent]
      return {
        ...prev,
        [breakdownComponent]: component ?
        {...component, include: !component.include } :
        component
      }
    })
  }

{/* <Box className="sm:flex-1 w-full rounded-l-md overflow-hidden relative">
                    <div className="absolute z-[1000] flex items-center h-full"></div> */}


  
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 bg-gray-100 border">
      <div className="w-full sm:w-[640px] flex flex-col gap-2"> 
       
        <Box className="rounded-md shadow bg-white mt-2 flex sm:flex-row flex-col gap-2">
          <Flex  wrap="wrap"  justify="between" className="w-full">
            <Box className="sm:flex-1 w-full rounded-l-md overflow-hidden relative">
              <div className="absolute z-[1000] flex items-center h-full">
                <ComponentButtons component="tiles" />
              </div>
              <div className="sm:h-full h-[300px] bg-blue-300 relative left-0 right-0"> 
                <Image alt="" layout="fill" objectFit="cover" className="absolute inset-o" src="https://znetflooring.com/media/catalog/product/cache/2bd175c9fdca7a1f445c94dbd4a9111b/6/f/6f9e783ab474dbdb351bee10fa6e1f2c1ef0fcd16404f074a709fc6f4b6c0fcb.jpeg" />
              </div>
            </Box> 
            <Box className="sm:w-2/3 w-full p-4"> 
              <DemoClientComponent /> 
              <Heading size="5" className="mt-2">  
                <span>
                  Tiles Calculator
                </span>
              </Heading>

              <FormCompute
                length = {length}
                width = {width}
                area = {area}
                handleLengthChange = {handleLengthChange}
                handleWidthChange = {handleWidthChange}  
                handleAreaChange = {handleAreaChange}  
                estimateNow = {estimateNow}
              /> 
 
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
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                    Total Cost
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body> 

              {
                Object.keys(componentTilesNumbers).map(key => (
                  <React.Fragment key={key}>
                      <Table.Row>
                        <Table.RowHeaderCell px="4">
                          <div className="rounded-full w-12 h-12 overflow-hidden">
                            <img src="https://picsum.photos/id/237/200/300" />
                          </div>
                        </Table.RowHeaderCell>
                        <Table.Cell>
                          <div className="flex flex-col gap-2">

                            {key}
                          
                            <ComponentBrandPortalSimple 
                              keyComponent={key}
                              showcaseComponent={showcaseComponent}
                              setShowcaseComponent={setShowcaseComponent}  
                              handleClickShowcaseComponent={() => handleClickShowcaseComponent(key)}
                            />
                          </div>
                        </Table.Cell>
                        <Table.Cell>{`${componentTilesNumbers[key]?.qty} ${componentTilesNumbers[key]?.units}`}</Table.Cell>
                        <Table.Cell>
                          <input value={ componentTilesNumbers[key]?.price } className="w-20 outline-none" onChange={() => console.log('tiles')}  />
                        </Table.Cell>
                        <Table.Cell pr="5" className="md:table-cell hidden">
                          <span className="justify-end pr-5 flex w-full bg-gray-100 rounded-full p-2">
                              {
                                (componentTilesNumbers[key]?.qty ?? 0) * (componentTilesNumbers[key]?.price ?? 0)
                              }
                          </span>
                        </Table.Cell>
                      </Table.Row> 
                      <Table.Row className="md:hidden">
                        <Table.Cell colSpan={5}> 
                          <div className="flex justify-end items-center gap-2 mb-5">

                            <span className="font-bold">Total Cost</span>
                            <span className="justify-end pr-5 flex w-[150px] bg-gray-100 rounded-full p-2 ">
                                {
                                  (componentTilesNumbers[key]?.qty ?? 0) * (componentTilesNumbers[key]?.price ?? 0)
                                }
                            </span> 
                          </div>
                        </Table.Cell>
                      </Table.Row>
                      {  
                        showcaseComponent[key] ? (
                          <Table.Row>
                            <Table.Cell colSpan={5}>
                              
                              <ComponentShowcaseDetails component={key} />
                            </Table.Cell>
                          </Table.Row>
                        ) : "" 
                      }

                  </React.Fragment>
                ))
              } 

           
            </Table.Body>
          </Table.Root>
        </Box> 
        <Box className="rounded-md shadow bg-white borderd flex sm:flex-row flex-col gap-2">
          <Flex wrap="wrap-reverse" className="w-full">
            <Box className="sm:flex-1 w-full rounded-l-md overflow-hidden">
              <div className="sm:h-full h-[300px] bg-blue-300 relative">
                <Image alt="" layout="fill" objectFit="cover" className="absolute inset-o" src="https://znetflooring.com/media/catalog/product/cache/2bd175c9fdca7a1f445c94dbd4a9111b/6/f/6f9e783ab474dbdb351bee10fa6e1f2c1ef0fcd16404f074a709fc6f4b6c0fcb.jpeg" />
              </div>
            </Box> 
            <Box className="border w-full sm:w-2/3 p-4 pb-10">
              <div className="flex flex-col w-full text-sm">
                <div
                  onClick={() => toggleIncludeBreakdown("sbTotalMaterials")}
                  className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                  <span className="flex-1 text-right">
                    Total of Materials:
                  </span> 
                  <span className="w-[50px] text-right"> </span>
                  <span className="w-[120px] text-right">{ summaryBreakdownState.sbTotalMaterials?.value }</span>
                  <span className="w-[20px] flex items-center"> 
                    <Checkbox checked={summaryBreakdownState.sbTotalMaterials?.include} />
                  </span>
                </div>
                <div
                  onClick={() => toggleIncludeBreakdown("sbLabor")}
                  className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                  <span className="flex-1 text-right">
                    Total of Labor:
                  </span> 
                  <span className="w-[50px] text-right">30%</span>
                  <span className="w-[120px] text-right">{ summaryBreakdownState.sbLabor?.value }</span>
                  <span className="w-[20px] flex items-center"> 
                    <Checkbox checked={summaryBreakdownState.sbLabor?.include}  />
                  </span>
                </div>
                <div
                  onClick={() => toggleIncludeBreakdown("sbContingency")}
                  className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                  <span className="flex-1 text-right">
                    Contingency:
                  </span> 
                  <span className="w-[50px] text-right">5%</span>
                  <span className="w-[120px] text-right">{ summaryBreakdownState.sbContingency?.value }</span>
                  <span className="w-[20px] flex items-center"> 
                    <Checkbox checked={summaryBreakdownState.sbContingency?.include} />
                  </span>
                </div>
                <div
                  onClick={() => toggleIncludeBreakdown("sbContractorsProfit")}
                  className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                  <span className="flex-1 text-right">
                    Contractor's Profit:
                  </span> 
                  <span className="w-[50px] text-right">12.5%</span>
                  <span className="w-[120px] text-right">{ summaryBreakdownState.sbContractorsProfit?.value }</span>
                  <span className="w-[20px] flex items-center"> 
                    <Checkbox checked={summaryBreakdownState.sbContractorsProfit?.include} />
                  </span>
                </div>
                <div
                  onClick={() => toggleIncludeBreakdown("sbTax")}
                  className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                  <span className="flex-1 text-right">
                    Tax:
                  </span> 
                  <span className="w-[50px] text-right">12.5%</span>
                  <span className="w-[120px] text-right">{ summaryBreakdownState.sbTax?.value }</span>
                  <span className="w-[20px] flex items-center"> 
                  <Checkbox checked={summaryBreakdownState.sbTax?.include} />
                  </span>
                </div>
                <div
                  
                  className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                  <span className="flex-1 text-right font-bold">
                    Total Project Cost:
                  </span> 
                  <span className="w-[50px] text-right"> </span>
                  <span className="w-[120px] text-right font-bold">{ Object.values(summaryBreakdownState)
                    .reduce((acc, item) => {
                      if (item && item.include) return (acc + (item?.value ?? 0))
                      return acc
                    }, 0) }</span>
                  <span className="w-[20px] flex items-center"> 
                    
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
