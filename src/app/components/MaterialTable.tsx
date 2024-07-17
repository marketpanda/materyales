import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import useMaterialsList, { UnitOptions } from '../hooks/useMaterialsList'
import { Table } from '@radix-ui/themes'

interface Props {
  materialComponent:string
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
  mat: string,
  cpu: number | undefined
}


const MaterialTable:React.FC<Props> = ({materialComponent}) => {

    const categoryBreakdownMaterials:ComponentType = useMaterialsList({ material: materialComponent })
    console.log(categoryBreakdownMaterials)
    
    let categoryBreakdownMaterialsArray:MaterialStrand[] = []
    
    if (categoryBreakdownMaterials) categoryBreakdownMaterialsArray = Object.entries(categoryBreakdownMaterials[materialComponent])
     
    const handleChangeValue = (event:ChangeEvent<HTMLInputElement>, { mat, cpu }: InputProps) => {
     
      setComponentsState(( prev:ComponentType ) => ({
          ...prev, [materialComponent]: { ...componentsState[materialComponent],
            [mat]: {
                ...componentsState[materialComponent][mat], costPerUnit: Number(event.target.value)
              }
            }
          }
        )
      )
    }
 
    const [componentsState, setComponentsState] = useState<ComponentType>(categoryBreakdownMaterials)

    console.log(componentsState)

    useEffect(() => {
      console.log("componentsState ", componentsState)
    }, [componentsState])

    return (
        <>
            { categoryBreakdownMaterialsArray?.map((material, n:number) => {
                const materialName = material[0]
                const costPerUnit = material[1].costPerUnit
                const imageIcon = material[1].imageIcon
                const unitSize = material[1].unitSize

                console.log(materialComponent)
                console.log("material[1] ")

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
                              <div className="rounded-full w-12 h-12 overflow-hidden">
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
                                // value={ costPerUnit }
                                value={ componentsState[materialComponent][materialName].costPerUnit }
                                className="w-20 outline-none p-2 font-semibold rounded text-l text-right"
                                onChange={(e) => handleChangeValue(e, {mat: materialName, cpu: costPerUnit })}
                                disabled />
                            </Table.Cell>
                            <Table.Cell>
                              {/* <input value={ componentTilesNumbers[key]?.price } className="w-20 outline-none" onChange={() => console.log('tiles')}  /> */}
                              <input
                                // value={ costPerUnit }
                                value={ componentsState[materialComponent][materialName].costPerUnit }
                                className="w-20 outline-none bg-purple-100 p-2 font-semibold rounded text-l text-right"
                                onChange={(e) => handleChangeValue(e, {mat: materialName, cpu: costPerUnit })}  />
                                
                            </Table.Cell>
                            <Table.Cell pr="5" className="md:table-cell hidden">
                              {/* <span className="justify-end pr-5 flex w-full bg-gray-100 rounded-full p-2">
                                  {
                                    (componentTilesNumbers[key]?.qty ?? 0) * (componentTilesNumbers[key]?.price ?? 0)
                                  }
                              </span> */}
                               <input
                                // value={ costPerUnit }
                                value={ componentsState[materialComponent][materialName].costPerUnit }
                                className="w-20 outline-none p-2 font-semibold rounded text-l text-right"
                                onChange={(e) => handleChangeValue(e, {mat: materialName, cpu: costPerUnit })}
                                disabled />
                            </Table.Cell>
                        </Table.Row> 
                        <Table.Row> 
                          <Table.Cell colSpan={5}>
                            <pre className='text-xs opacity-50 w-full whitespace-pre-wrap'>{JSON.stringify(componentsState, null, 2)}</pre>
                          </Table.Cell>
                        </Table.Row>
                    </>
                )
                } 
            )}
        </>
  )
}

export default MaterialTable