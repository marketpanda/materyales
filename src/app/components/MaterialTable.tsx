import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import useMaterialsList, { UnitOptions } from '../hooks/useMaterialsList'
import { Table } from '@radix-ui/themes'
import { useMaterialQuantity } from '../hooks/useMaterialQuantity'

interface Props {
  materialComponent:string
  area:number
  materialComponentTotal?: number
  setMaterialComponentTotal: React.Dispatch<number>
  materialsComponent?: object
  setMaterialsComponent: React.Dispatch<object>
}

export interface ComponentType { 
  [key:string]: {    
    [key:string]: UnitOptions  
  } 
} 

// interface ComponentsStateProps {
//   componentsState: ComponentType,
//   setComponentsState: React.Dispatch<SetStateAction<ComponentType>>
// }

type MaterialStrand = [mat:string, matComponents:UnitOptions]

interface InputProps {
  mat: string
  param: string
} 

const MaterialTable:React.FC<Props> = ({
  materialComponent,
  area,
  materialComponentTotal,
  setMaterialComponentTotal,
  materialsComponent,
  setMaterialsComponent
}) => { 
    // materialComponent
    // tiles

    console.log("materialComponentTotal ", materialComponentTotal)

    const getMaterialList = useMaterialsList({ material: materialComponent })

    // const categoryBreakdownMaterials:ComponentType = useMaterialsList({ material: materialComponent })  
    const categoryBreakdownMaterials:ComponentType = getMaterialList  
    const [componentsState, setComponentsState] = useState<ComponentType>(categoryBreakdownMaterials)
     // componentsState
     // tiles: { tile ...} 
    const [componentsStateForDisplay, setComponentsStateForDisplay] = useState<ComponentType | null>(getMaterialList) 
 
    // const componentsStateForDisplay = { [materialComponent]: {...componentsState[materialComponent]} }
    //{ tiles: { tile: { ... }, grout: { ... }} }

    useEffect(() => {
      if (!componentsStateForDisplay) return 

      const tempNums:number[] = []

      const ComputeQuantitiesAndCosts = async () => {
        const updatedComponentsState = { ...categoryBreakdownMaterials }
  
        for (const [theMaterial, materialData] of Object.entries(categoryBreakdownMaterials[materialComponent] || {})) {
          // Assuming useMaterialQuantity is a function that can be called directly or using a custom hook outside of the loop
          const getQuantity = useMaterialQuantity({ material: materialComponent, materialStrand: theMaterial, area: area })
          const { quantity } = getQuantity()
  
          const { costPerUnit } = categoryBreakdownMaterials[materialComponent][theMaterial] 
          const totalCost = (costPerUnit ?? 0) * (quantity ?? 0)
  
          updatedComponentsState[materialComponent][theMaterial] = {
            ...materialData,
            quantity: quantity,
            totalCost: totalCost
          }
        }
        setComponentsStateForDisplay(updatedComponentsState)

        Object.values(updatedComponentsState[materialComponent]).map(item => tempNums.push(Number(item.totalCost)))
        const numTotal = tempNums.reduce((acc, num )=> acc + num, 0)
        
        setMaterialComponentTotal(numTotal) 
        setMaterialsComponent(updatedComponentsState)
      }


      
      ComputeQuantitiesAndCosts()
      }, [ materialComponent, area ]
    )
        // for (let theMaterial in componentsStateForDisplay?.[materialComponent]) {  
        //   const getQuantity = useMaterialQuantity({ material: materialComponent, materialStrand: theMaterial, area: area })
        //   const { quantity } = getQuantity()
    
        //   const { costPerUnit } = categoryBreakdownMaterials[materialComponent][theMaterial] 
        //   const totalCost = (costPerUnit ?? 0) * (quantity ?? 0)
    
        //   updatedComponentsState[materialComponent] = {
        //     ...updatedComponentsState[materialComponent], 
        //     [theMaterial]: {
        //       ...updatedComponentsState[materialComponent][theMaterial],
        //       quantity: quantity,
              
              
        //       totalCost: totalCost
        //     }
        //   }  
        // }
        
        // setComponentsState(updatedComponentsState)
        // setComponentsStateForDisplay(updatedComponentsState) 
   
    // useEffect(() => {
    //   console.log("componentsStateForDisplay ", componentsStateForDisplay)
    //   setComponentsStateForDisplay(componentsState)
    // }, [ componentsState ]) 
      
    const handleChangeValue = (event:ChangeEvent<HTMLInputElement>, { param, mat }: InputProps) => {   
      // onChange={(e) => handleChangeValue(e, { mat: materialName, param: 'quantity' })}  
      const value = Number(event.target.value)
      if (isNaN(value)) return
      // if (!Number(event.target.value)) return
      if (componentsStateForDisplay) { 
        setComponentsStateForDisplay((prev) => ({ ...prev,
            [materialComponent]: { ...prev?.[materialComponent],
              [mat]: { ...prev?.[materialComponent][mat], [param]: value }
        }})) 
      } 
      // componentsStateForDisplay[materialComponent][mat][param] = value
    }    

    // useEffect(() => { 
    //   const computeAndDisplayArea = () => {

    //     const qty = componentsState[materialComponent]['tile'].quantity 
    //     const cpu = componentsState[materialComponent]['tile'].costPerUnit
    //     const newTotal = (qty ? qty : 0) * (cpu ? cpu : 0) 
        
    //     setComponentsStateForDisplay((prev) => ({
    //       ...prev, [materialComponent]: { ...prev[materialComponent],
    //         ['tile']: { ...prev[materialComponent]['tile'], totalCost: newTotal}
    //       }
    //     }))
    //   }

    //   const timeOutId = setTimeout(() => {
    //     computeAndDisplayArea() 
    //   }, 500)

    //   return () => clearTimeout(timeOutId) 
    // }, [ 
    //   componentsStateForDisplay[materialComponent]['tile'].quantity,
    //   componentsStateForDisplay[materialComponent]['tile'].costPerUnit
    // ])
    
    useEffect(() => {
      console.log(
        componentsStateForDisplay?.[materialComponent]['tile'].quantity, 
      )
     }, [ 
      componentsStateForDisplay ? componentsStateForDisplay[materialComponent]['tile'].quantity : "",
      componentsStateForDisplay ? componentsStateForDisplay[materialComponent]['tile'].costPerUnit : "", 
    ]) 

    return (
        <> 
          {
            componentsStateForDisplay && Object.keys(componentsStateForDisplay[materialComponent]).map((materialInstance, n) => {
              const { imageIcon } = componentsStateForDisplay[materialComponent][materialInstance]
              return (
                <>
                    <Table.Row>
                      <Table.RowHeaderCell px="4">
                        <div className="rounded-full w-12 h-12 overflow-hidden" key={n}> 
                          <img src={ imageIcon } />
                        </div>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <div className="flex flex-col gap-2">
                          {materialInstance} 
                          {/*   
                          <ComponentBrandPortalSimple 
                            keyComponent={key}
                            showcaseComponent={showcaseComponent}
                            setShowcaseComponent={setShowcaseComponent}  
                            handleClickShowcaseComponent={() => handleClickShowcaseComponent(key)}
                          /> */}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                          {/* {`${componentTilesNumbers[key]?.qty} ${componentTilesNumbers[key]?.units}`} */}
                        <input 
                          value={ componentsStateForDisplay[materialComponent][materialInstance].quantity } 
                          className="w-20 outline-none bg-purple-100 p-2 font-semibold rounded text-l text-right" 
                          onChange={(e) => handleChangeValue(e, { mat: materialInstance, param: 'quantity' })}  />
                      </Table.Cell>
                      <Table.Cell>
                        {/* <input value={ componentTilesNumbers[key]?.price } className="w-20 outline-none" onChange={() => console.log('tiles')}  /> */}
                        <input 
                          value={ componentsStateForDisplay[materialComponent][materialInstance].costPerUnit }
                          className="w-20 outline-none bg-purple-100 p-2 font-semibold rounded text-l text-right"
                          onChange={(e) => handleChangeValue(e, { mat: materialInstance, param: 'costPerUnit' })}
                          disabled
                        />
                          
                      </Table.Cell>
                      <Table.Cell pr="5" className="md:table-cell hidden">
                        {/* <span className="justify-end pr-5 flex w-full bg-gray-100 rounded-full p-2">
                            {
                              (componentTilesNumbers[key]?.qty ?? 0) * (componentTilesNumbers[key]?.price ?? 0)
                            }
                        </span> */}
                        <input  
                          value={ componentsStateForDisplay[materialComponent][materialInstance].totalCost } 
                          className="w-20 outline-none p-2 font-semibold rounded text-l text-right" 
                          disabled />
                      </Table.Cell>
                    </Table.Row> 
                    {/* <Table.Row>
                      <Table.Cell colSpan={6}>
                        <div className='flex flex-col opacity-50 w-[300px]' key={n}>  
                          <div><pre>componentsStateForDisplay: {JSON.stringify(materialInstance, null, 2)}</pre></div>
                          <div><pre className='text-sm'>{JSON.stringify(componentsStateForDisplay[materialComponent][materialInstance], null, 2)}</pre></div> 
                        </div>
                      </Table.Cell>
                    </Table.Row> */}
                </> 
              )
            }) 
          } 
        </>
  )
}

export default MaterialTable