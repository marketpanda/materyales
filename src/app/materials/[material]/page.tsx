"use client"
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react"; 
import { Heading, Table, Flex, Checkbox, Box } from "@radix-ui/themes"; 
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"; 
import FormCompute from "../../components/FormCompute";
import { priceMaterialsTiles } from "../../constants/numbers";
import ComponentBrandPortal from "../../components/ComponentBrandPortal";
import ComponentBrandPortalSimple from "../../components/ComponentBrandPortalSimple";
import ComponentShowcaseDetails from "../../components/ComponentShowcaseDetails";
import ComponentButtons from "../../components/ComponentButtons";
import { usePathname } from "next/navigation";
import { materials } from "@/common/materials";
import { Material } from "@/common/types";
import useMaterialsList, { UnitOptions } from "@/app/hooks/useMaterialsList";
import MaterialTable from "@/app/components/MaterialTable";
import { parse } from "path"; 
import Navbar from "@/app/components/Navbar";

export interface Dimensions {
    length?: number,
    width?: number,
    area?: number,
    volume?: number,
    diameter?: number
}

export interface MaterialDimensionsProps {
    [key:string] : Dimensions
}

//tabulation of materials list
interface MaterialElementsList { 
    [key: string] : UnitOptions 
}  

interface Dims {
    len?:number,
    wid?:number
}

export default function Page():JSX.Element {
    
    const thisRoute:string = usePathname().split('/')[usePathname().split('/').length - 1]  
    const GenerateHeader = ({ currentRoute }:{ currentRoute: string }) => {
        const materialStrand = materials.find(material => material.name === currentRoute)
        return materialStrand ? materialStrand.title : ""
    }
    
    const materialDimensionsInitial:MaterialDimensionsProps = {
        tiles: {
            length: 0,
            width: 0,
            area: 0
        },
        paints: {
            length: 0,
            width: 0,
            area: 0
        }
    } 
    
    const [materialDimensions, setMaterialDimensions] = useState<MaterialDimensionsProps>(materialDimensionsInitial)
    
    const [material, setMaterial] = useState<string>(thisRoute)

    //pass down prop to component to enable interactivity of button to a user
    const [areaReference, setAreaReference] = useState<number>(0) 

    const [dimensionsForDisplay, setDimensionsForDisplay] = useState({
        [material]:materialDimensionsInitial[material]
    })
   
     
    const handleParamsChange = (e:React.ChangeEvent<HTMLInputElement>, params:keyof Dimensions, directArea?:boolean) => {
        let value = parseFloat(e.target.value)  
        
        if (directArea) { console.log('using direct area input') }

        setMaterialDimensions((prev) => ({ ...prev, [material]: { ...materialDimensions[material], [params]: value }}))
         
        setDimensionsForDisplay({ [material]: { ...dimensionsForDisplay[material], [params]:value }}) 
    } 
    
    const handleDirectAreaChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if (isNaN(value)) return
         
        handleParamsChange(e, 'area', true) 
       
        // setDimensionsForDisplay({[material]:materialDimensionsInitial[material]}) 
        setDimensionsForDisplay((prev) => ({ ...prev, [material]: {
            ...prev[material],
            length: 0,
            width: 0,
            area: value
        }})) 

        
    }

  
    
    const getAreaByLengthAndWidth = ({len, wid}: Dims) => {
        if (!Number(len) || !Number(wid)) return
        return (len && wid) ?  len * wid : 0
    }
    useEffect(() => {

        const timeoudId = setTimeout(() => {
            const newArea = getAreaByLengthAndWidth({
                len:materialDimensions[material].length,
                wid:materialDimensions[material].width
            })
    
            setDimensionsForDisplay((prev) => ({
                ...prev, [material]:  {
                    ...dimensionsForDisplay[material], area: newArea
                }
            }))  

            setMaterialDimensions((prev) => ({
                ...prev, [material]: {
                    ...materialDimensions[material], area: newArea
                }
            })) 
        }, 500)

        return () => {
            clearTimeout(timeoudId)
        }

    }, [materialDimensions[material].length, materialDimensions[material].width]) 

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const runEstimate = useCallback((e:React.FormEvent<HTMLElement>) => {
    
        e.preventDefault() 
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            const num = materialDimensions[material].area 
                if (num && !isNaN(num)) { 
                setAreaReference(num)
            }

            console.log('hi there')

        }, 500)
       
    }, [material, materialDimensions])

    // useEffect(() => {

    //     const timeoudId = setTimeout(() => {  
    //         setDimensionsForDisplay((prev) => ({
    //             ...prev, [material]:  {
    //                 ...materialDimensions[material], length: 0, width: 0
    //             }
    //         }))

    //     }, 500) 
    //     return () => {
    //         clearTimeout(timeoudId)
    //     }

    // }, [materialDimensions[material].area]) 
    
    return (
        <> 
            <Box className="rounded-md shadow bg-white borderd mt-10 flex sm:flex-row flex-col gap-2">
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
                    <Heading size="5" className="mt-2">{ <GenerateHeader currentRoute={thisRoute} /> }</Heading>
                    <FormCompute
                        material={ material }
                        length={ dimensionsForDisplay[material].length || null }
                        width={ dimensionsForDisplay[material].width || null } 
                        area={ dimensionsForDisplay[material].area || null } 
                        handleParamsChange={handleParamsChange}
                        handleDirectAreaChange={handleDirectAreaChange}
                        estimateNow={runEstimate}
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
                    <MaterialTable materialComponent={material} area={areaReference} /> 

                    {/* {
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
                    }  */}

                
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
                        // onClick={() => toggleIncludeBreakdown("sbTotalMaterials")}
                        className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                        <span className="flex-1 text-right">
                        Total of Materials:
                        </span> 
                        <span className="w-[50px] text-right"> </span>
                        <span className="w-[120px] text-right">
                            {/* { summaryBreakdownState.sbTotalMaterials?.value } */}
                        </span>
                        <span className="w-[20px] flex items-center"> 
                        {/* <Checkbox checked={summaryBreakdownState.sbTotalMaterials?.include} /> */}
                        </span>
                    </div>
                    <div
                        // onClick={() => toggleIncludeBreakdown("sbLabor")}
                        className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                        <span className="flex-1 text-right">
                        Total of Labor:
                        </span> 
                        <span className="w-[50px] text-right">30%</span>
                        <span className="w-[120px] text-right">
                            {/* { summaryBreakdownState.sbLabor?.value } */}
                            </span>
                        <span className="w-[20px] flex items-center"> 
                        {/* <Checkbox checked={summaryBreakdownState.sbLabor?.include}  /> */}
                        </span>
                    </div>
                    <div
                        // onClick={() => toggleIncludeBreakdown("sbContingency")}
                        className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                        <span className="flex-1 text-right">
                        Contingency:
                        </span> 
                        <span className="w-[50px] text-right">5%</span>
                        <span className="w-[120px] text-right">
                            {/* { summaryBreakdownState.sbContingency?.value } */}
                            </span>
                        <span className="w-[20px] flex items-center"> 
                        {/* <Checkbox checked={summaryBreakdownState.sbContingency?.include} /> */}
                        </span>
                    </div>
                    <div
                        // onClick={() => toggleIncludeBreakdown("sbContractorsProfit")}
                        className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                        <span className="flex-1 text-right">
                        Contractor's Profit:
                        </span> 
                        <span className="w-[50px] text-right">12.5%</span>
                        <span className="w-[120px] text-right">
                            {/* { summaryBreakdownState.sbContractorsProfit?.value } */}
                            </span>
                        <span className="w-[20px] flex items-center"> 
                        {/* <Checkbox checked={summaryBreakdownState.sbContractorsProfit?.include} /> */}
                        </span>
                    </div>
                    <div
                        // onClick={() => toggleIncludeBreakdown("sbTax")}
                        className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                        <span className="flex-1 text-right">
                        Tax:
                        </span> 
                        <span className="w-[50px] text-right">12.5%</span>
                        <span className="w-[120px] text-right">
                            {/* { summaryBreakdownState.sbTax?.value } */}
                            </span>
                        <span className="w-[20px] flex items-center"> 
                        {/* <Checkbox checked={summaryBreakdownState.sbTax?.include} /> */}
                        </span>
                    </div>
                    <div
                        
                        className="flex justify-end gap-4 w-full items-center p-1 hover:bg-red-100 cursor-pointer duration-300 transition-colors ease-in-out rounded"> 
                        <span className="flex-1 text-right font-bold">
                        Total Project Cost:
                        </span> 
                        <span className="w-[50px] text-right"> </span>
                        {/* <span className="w-[120px] text-right font-bold">{ Object.values(summaryBreakdownState)
                        .reduce((acc, item) => {
                            if (item && item.include) return (acc + (item?.value ?? 0))
                            return acc
                        }, 0) }</span> */}
                        <span className="w-[20px] flex items-center"> 
                        
                        </span>
                    </div>
                    </div>
                </Box>
                </Flex>
            </Box>
        </>   
    )
}

 