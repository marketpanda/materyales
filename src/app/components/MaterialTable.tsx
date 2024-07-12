import React from 'react'
import useMaterialsList, { UnitOptions } from '../hooks/useMaterialsList'
import { Table } from '@radix-ui/themes'

interface Props {
    materialComponent:string
}

type MaterialStrand = [mat:string, matComponents:UnitOptions]

const MaterialTable:React.FC<Props> = ({materialComponent}) => {

    const categoryBreakdownMaterials = useMaterialsList({ material: materialComponent })
    
    let categoryBreakdownMaterialsArray:MaterialStrand[] = []
    if (categoryBreakdownMaterials) categoryBreakdownMaterialsArray = Object.entries(categoryBreakdownMaterials) 

    return (
        <>
            { categoryBreakdownMaterialsArray?.map((material, n:number) => {
                const materialName = material[0]
                const costPerUnit = material[1].costPerUnit

                return (
                    <> 
                        <div key={n} className='text-xs opacity-50'>
                            <pre>
                                { JSON.stringify(categoryBreakdownMaterialsArray, null, 2) }
                            </pre>
                        </div>
                        {/* <div key={n} className='text-xs opacity-50'>
                            <pre>
                                { JSON.stringify(material, null, 2) }
                            </pre>
                        </div> */}
     
                        <Table.Row>
                            <Table.RowHeaderCell px="4">
                              <div className="rounded-full w-12 h-12 overflow-hidden">
                                {/* <img src="https://picsum.photos/id/237/200/300" /> */}
                                <img src={material[1].imageIcon} />
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
                            </Table.Cell>
                            <Table.Cell>
                              {/* <input value={ componentTilesNumbers[key]?.price } className="w-20 outline-none" onChange={() => console.log('tiles')}  /> */}
                                {costPerUnit}
                            </Table.Cell>
                            <Table.Cell pr="5" className="md:table-cell hidden">
                              {/* <span className="justify-end pr-5 flex w-full bg-gray-100 rounded-full p-2">
                                  {
                                    (componentTilesNumbers[key]?.qty ?? 0) * (componentTilesNumbers[key]?.price ?? 0)
                                  }
                              </span> */}
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