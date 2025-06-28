import React, { useEffect, useState } from 'react'
import useMaterialsList, { UnitOptions } from '../hooks/useMaterialsList'
import { Table } from '@radix-ui/themes'
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { useMaterialQuantity } from '../hooks/useMaterialQuantity'
import { MaterialMap } from '../hooks/types/types'
import { BuildCategory } from '../hooks/materialsList/__materialsGroup'
import { Sorts } from '../types/components'
 
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

    useEffect(() => {
      if (!componentsStateForDisplay) return 
      if (!categoryBreakdownMaterials) return 
        
      const tempNums:number[] = []

      const ComputeQuantitiesAndCosts = async () => {
        const updatedComponentsState = { ...componentsStateForDisplay }
        for (const [theMaterial, materialData] of Object.entries(componentsStateForDisplay || {})) {
    
          // Assuming useMaterialQuantity is a function that can be called directly or using a custom hook outside of the loop 
          const getQuantity = useMaterialQuantity({ material: materialData.id, materialStrand: materialData.name, area: area })
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

      ComputeQuantitiesAndCosts()
      }, [ materialComponent, area ]
    )

    const [variant, setVariant] = useState<string>('')
    
    const variantsInitial = componentsStateForDisplay ?
    Object.fromEntries(Object.entries(componentsStateForDisplay).map(([key, value]) => [
      key, null
    ])) : null
    
    const [variantsSelected, setVariantsSelected] = useState<{[materialId: string]: string}>({})

    console.log("variantsSelected ", variantsSelected) 
    
    interface SelectProps {
      options: any[]
      value: any
      onChange: (value:string) => void
      placeholder?: string
    }

    const assignVariant = (materialId : string, newVariant: string) => {
      setVariantsSelected(prev => ({
        ...prev,
        [materialId]: newVariant
      })) 
    }
    const SelectDropDown:React.FC<SelectProps> = ({
      options,
      value,
      onChange
    }) => {
      
      return (
        <Select.Root value={value} onValueChange={onChange}>
          <Select.Trigger className='inline-flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded w-[100px] hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className='bg-white border border-gray-300 rounded shadow-md z-50'>
              <Select.ScrollUpButton className='flex items-center justify-center p-1 text-gray-500'>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className='p-1'>
                {
                  options.map((option) => ( 
                    <Select.Item
                      key={option.id}
                      value={option.id}
                      className='cursor-pointer px-3 py-2 rounded hover:bg-gray-100 focus:bg-gray-200 flex items-center justify-between'
                    >
                      <Select.ItemText>{option.name}</Select.ItemText>
                      <Select.ItemIndicator>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))
                }
              </Select.Viewport>
              <Select.ScrollDownButton className='flex items-center justify-center p-1 text-gray-500'>
                <ChevronDownIcon fontSize={1} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )
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
                        <div className="rounded-full w-12 h-12 overflow-hidden" key={n}> 
                          <img src={ imageRef } />
                        </div>
                      </Table.RowHeaderCell>
                      <Table.Cell>
                        <div className="flex flex-col gap-2"> { name }</div>
                        {
                          rollVariants && rollVariants.length > 1 && (
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
                    {/* <Table.Row>
                      <Table.Cell colSpan={6}>
                        <div className='flex flex-col opacity-50 w-[300px]' key={n}>  
                          <div><pre className='text-sm'>{JSON.stringify(materialInstance, null, 2)}</pre></div> 
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