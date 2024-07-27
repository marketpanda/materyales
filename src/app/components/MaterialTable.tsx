import React, { ChangeEvent, useEffect, useState } from 'react'
import useMaterialsList, { UnitOptions } from '../hooks/useMaterialsList'
import { Table } from '@radix-ui/themes'
import { useMaterialQuantity } from '../hooks/useMaterialQuantity'

interface Props {
  materialComponent:string
  area:number
}

interface ComponentType { 
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

const MaterialTable:React.FC<Props> = ({materialComponent, area}) => {
    console.log("area ", area)

    const categoryBreakdownMaterials:ComponentType = useMaterialsList({ material: materialComponent })   
    const [componentsState, setComponentsState] = useState<ComponentType>(categoryBreakdownMaterials)   

    // for (let material in componentsState[materialComponent]) { 
      
    //   const getQuantity = useMaterialQuantity({material: materialComponent, materialStrand: material })
    //   const { quantity } = getQuantity()  
    //   console.log(quantity)
      
    //   const { costPerUnit } = categoryBreakdownMaterials[materialComponent][material]  
      
    //   const totalCost = (costPerUnit ?? 0) * (quantity || 0) 
    //   console.log(totalCost)
      
    //   componentsState[materialComponent][material].quantity = quantity
    //   componentsState[materialComponent][material].totalCost = totalCost  
      
    // }
     
    // let categoryBreakdownMaterialsArray:MaterialStrand[] = [] 
    
    const [categoryBreakdownMaterialsArray, setCategoryBreakdownMaterialsArray] = 
      useState<MaterialStrand[]>(Object.entries(componentsState[materialComponent]))
      
    
    const handleChangeValue = (event:ChangeEvent<HTMLInputElement>, { param, mat }: InputProps) => { 
      if (!Number(event.target.value)) return
      setComponentsState(( prev:ComponentType ) => ({
        ...prev, [materialComponent]: { ...componentsState[materialComponent],
            [mat]: { ...componentsState[materialComponent][mat], [param]: Number(event.target.value) }
      }}))
      console.log(componentsState)
    } 

    const materialStrandDependencies = Object.entries(componentsState)

    console.log( materialStrandDependencies ) 
    
    console.log( componentsState ) 

    useEffect(() => { 
      const computeAndDisplayArea = () => {

        const qty = componentsState[materialComponent]['tile'].quantity 
        const cpu = componentsState[materialComponent]['tile'].costPerUnit
        const newTotal = (qty ? qty : 0) * (cpu ? cpu : 0) 
  
        setComponentsState((prev) => ({
          ...prev, [materialComponent]: { ...componentsState[materialComponent],
            ['tile']: { ...componentsState[materialComponent]['tile'], totalCost: newTotal}
          }
        }))
      }

      const timeOutId = setTimeout(() => {
        computeAndDisplayArea() 
      }, 500)

      return () => clearTimeout(timeOutId) 
    }, [
      // componentsState[materialComponent]['tile'].quantity,
      // componentsState[materialComponent]['tile'].costPerUnit
    ])

   

    return (
        <>
            { categoryBreakdownMaterialsArray?.map((material, n:number) => {
                const materialName = material[0] 
                const imageIcon = material[1].imageIcon    

                return (
                    <> 
                        {/* <div key={n} className='text-xs opacity-50'>
                            <pre>
                                { JSON.stringify(categoryBreakdownMaterialsArray, null, 2) }
                            </pre>
                        </div> */}
                        {/* <div key={n} className='text-xs opacity-50'>
                            <pre>
                                { JSON.stringify(material, null, 2) }
                            </pre>
                        </div> */}
                        
                        
                        <Table.Row>
                            <Table.RowHeaderCell px="4">
                              <div className="rounded-full w-12 h-12 overflow-hidden" key={n}>
                                {/* <img src="https://picsum.photos/id/237/200/300" /> */}
                                <img src={imageIcon} />
                              </div>
                            </Table.RowHeaderCell>
                            <Table.Cell>
                              <div className="flex flex-col gap-2">
                                {materialName} 
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
                                value={ componentsState[materialComponent][materialName].quantity } 
                                className="w-20 outline-none bg-purple-100 p-2 font-semibold rounded text-l text-right" 
                                onChange={(e) => handleChangeValue(e, { mat: materialName, param: 'quantity' })}  />
                            </Table.Cell>
                            <Table.Cell>
                              {/* <input value={ componentTilesNumbers[key]?.price } className="w-20 outline-none" onChange={() => console.log('tiles')}  /> */}
                              <input 
                                value={ componentsState[materialComponent][materialName].costPerUnit }
                                className="w-20 outline-none bg-purple-100 p-2 font-semibold rounded text-l text-right"
                                onChange={(e) => handleChangeValue(e, { mat: materialName, param: 'costPerUnit' })}  />
                                
                            </Table.Cell>
                            <Table.Cell pr="5" className="md:table-cell hidden">
                              {/* <span className="justify-end pr-5 flex w-full bg-gray-100 rounded-full p-2">
                                  {
                                    (componentTilesNumbers[key]?.qty ?? 0) * (componentTilesNumbers[key]?.price ?? 0)
                                  }
                              </span> */}
                               <input  
                                value={ componentsState[materialComponent][materialName].totalCost } 
                                className="w-20 outline-none p-2 font-semibold rounded text-l text-right" 
                                disabled />
                            </Table.Cell>
                        </Table.Row> 
                        {/* <Table.Row> 
                          <Table.Cell colSpan={5}>
                            <pre className='text-xs opacity-50 w-full whitespace-pre-wrap'>{JSON.stringify(componentsState, null, 2)}</pre>
                          </Table.Cell>
                        </Table.Row> */}
                    </>
                )
                } 
            )}
        </>
  )
}

export default MaterialTable