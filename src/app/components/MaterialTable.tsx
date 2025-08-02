import React, { useEffect, useState } from 'react'
import useMaterialsList, { UnitOptions } from '../hooks/useMaterialsList'
import { Table } from '@radix-ui/themes'
import { useMaterialQuantity } from '../hooks/useMaterialQuantity'
import { MaterialMap } from '../hooks/types/types'
import { BuildCategory } from '../hooks/materialsList/__materialsGroup'
import { Sorts } from '../types/components'
import { SelectDropDown } from './utils/SelectDropDown'

 
interface Props {
  materialComponent:BuildCategory 
  area:number
  materialComponentTotal?: number
  setMaterialComponentTotal: React.Dispatch<number>
  materialsComponent?: object
  setMaterialsComponent: React.Dispatch<object>
  sortKey: Sorts
  setSortKey: React.Dispatch<Sorts>
  sortDirection: string
  setSortDirection: React.Dispatch<string>
}

export interface ComponentType { 
  [key:string]: {    
    [key:string]: UnitOptions  
  } 
}
 
const MaterialTable:React.FC<Props> = ({
  materialComponent,
  area,
  materialComponentTotal,
  setMaterialComponentTotal,
  materialsComponent,
  setMaterialsComponent,
  sortKey,
  setSortKey,
  sortDirection,
  setSortDirection
}) => {

    const getBuildList = useMaterialsList({ material: materialComponent })
    
    const categoryBreakdownMaterials = getBuildList?.build?.materials
    
    // real values under the hood
    const [componentsState, setComponentsState] = useState<MaterialMap | undefined>(categoryBreakdownMaterials) 
    
    // we use componentsStateForDisplay for display
    const [componentsStateForDisplay, setComponentsStateForDisplay] = useState<MaterialMap | undefined>(componentsState)  
    
    useEffect(() => {
      if (!componentsStateForDisplay || !categoryBreakdownMaterials) return  

      let newSortedList = [...Object.values(componentsStateForDisplay)]
      
      switch (sortKey) {
        case Sorts.MaterialName:
          newSortedList.sort((a, b) =>
            sortDirection === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name))
          break;
        case Sorts.CostPerUnit:
          newSortedList.sort((a, b) =>
            sortDirection === 'asc'
            ? a.costPerUnit - b.costPerUnit
            : b.costPerUnit - a.costPerUnit)
          break;
        case Sorts.Quantity:
            newSortedList.sort((a, b) =>
              sortDirection === 'asc'
              ? (a.quantity ?? 0) - (b.quantity ?? 0)
              : (b.quantity ?? 0) - (a.quantity ?? 0))
          break;
        case Sorts.TotalCost:
          newSortedList.sort((a, b) =>
            sortDirection === 'asc'
            ? (a.totalCost ?? 0) - (b.totalCost ?? 0)
            : (b.totalCost ?? 0) - (a.totalCost ?? 0))
          break;
        case Sorts.NoSort:
        default:
          return;
      }
      
      setComponentsStateForDisplay(Object.fromEntries(newSortedList.map(item => [item.id, item])))
    }, [sortKey, setSortKey, sortDirection])

    const [variantsSelected, setVariantsSelected] = useState<Record<string, string>>({})
    
    useEffect(() => {
      if (!componentsStateForDisplay) return 
      if (!categoryBreakdownMaterials) return 
        
      const tempNums:number[] = []

      const computeQuantitiesAndCosts = async () => {
        const updatedComponentsState = { ...componentsStateForDisplay }
        for (const [theMaterial, materialData] of Object.entries(componentsStateForDisplay || {})) {
    
          // Assuming useMaterialQuantity is a function that can be called directly or using a custom hook outside of the loop 
          console.log(materialData)
          const getQuantity = useMaterialQuantity({ 
            material: materialData.id,
            materialStrand: materialData.name,
            area: area,
            currentVariant: materialData.currentVariant })

          const { quantity } = getQuantity() 
          const { costPerUnit } = materialData
           
          const totalCost = (costPerUnit ?? 0) * (quantity ?? 0)
          updatedComponentsState[theMaterial] = {
            ...materialData,
            quantity: quantity,
            totalCost: totalCost
          } 
        }
        
        setComponentsStateForDisplay(updatedComponentsState) 
        
        Object.values(updatedComponentsState).map(item => tempNums.push(Number(item.totalCost)))
        const numTotal = tempNums.reduce((acc, num )=> acc + num, 0)
        
        setMaterialComponentTotal(numTotal) 
        setMaterialsComponent(updatedComponentsState)
      }

      computeQuantitiesAndCosts() 

      }, [ materialComponent, area, variantsSelected]
    )

    useEffect(() => {
      console.log("componentsStateForDisplay ", componentsStateForDisplay)
    }, [componentsStateForDisplay])
    
    useEffect(() => {
      console.log("componentsState ", componentsState)
    }, [componentsState])
 
    

    useEffect(() => {
      console.log('variantsSelected ', variantsSelected)
    }, [variantsSelected])
    
    const assignVariant = (materialId : string, newVariant: string) => {
      setVariantsSelected(prev => ({
        ...prev,
        [materialId]: newVariant
      })) 

      if (!componentsStateForDisplay) return
      
      const updateState = { ...componentsStateForDisplay }

      const strand = Object.entries(componentsStateForDisplay).find(([K, V]) => V.id === materialId)

      if (!strand) return
      
      // Object.entries generates [K, V], we extract the K
      const material = updateState[strand[0]]
      material.currentVariant = material.variants?.variants?.[newVariant]
      if (material.currentVariant) material.currentVariant.id = newVariant
    

      setComponentsStateForDisplay(updateState)
      setComponentsState(updateState)
     
    }

    
    return (
        <> 
          {
            componentsStateForDisplay && Object.values(componentsStateForDisplay).map((materialInstance, n) => {  
              const { name, quantity, costPerUnit, UOM, totalCost, imageIcon,  variants } = materialInstance
              const imageRef = imageIcon ?? 'https://picsum.photos/id/237/200/300'
              const rollVariants  = variants ? Object.entries(variants?.variants).map(([id, data]) => ({ id, parentName:name, ...data, element: variants.element })) : null             
              
              return (
                <>       
                    <Table.Row key={n}>
                      <Table.RowHeaderCell px="4">
                        <div className="rounded-full w-12 h-12 overflow-hidden cursor-pointer" key={n}> 
                          <img src={ imageRef } />
                        </div>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <div className="flex flex-col gap-2"> { name }</div>
                        { 
                          rollVariants && rollVariants.length > 1 &&  
                          (
                            <SelectDropDown
                              options={rollVariants}
                              value={variantsSelected ? variantsSelected[materialInstance.id] : ''}
                              onChange={(value) => assignVariant(materialInstance.id, value)} 
                            />
                          )
                        }
                      </Table.Cell>
                      <Table.Cell>
                        <div className='flex flex-row items-center gap-2'>
                          <input 
                            value={ quantity } 
                            className="w-20 outline-none bg-purple-100 p-2 font-semibold rounded text-l text-right" 
                            // onChange={(e) => handleChangeValue(e, { mat: materialInstance, param: 'quantity' })}
                          />
                          <div>{ UOM }</div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <input 
                          value={ costPerUnit }
                          className="w-20 outline-none bg-purple-100 p-2 font-semibold rounded text-l text-right"
                          // onChange={(e) => handleChangeValue(e, { mat: materialInstance, param: 'costPerUnit' })}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell pr="5" className="md:table-cell hidden"> 
                        <input  
                          value={ totalCost } 
                          className="w-20 outline-none p-2 font-semibold rounded text-l text-right" 
                          disabled />
                      </Table.Cell>
                    </Table.Row> 
                </> 
              )
            }) 
          } 
        </>
  )
}

export default MaterialTable