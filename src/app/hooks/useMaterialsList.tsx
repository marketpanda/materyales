import { BuildCategory, materialsGroup } from "./materialsList/__materialsGroup"
import {  BuildPick } from "./types/types"

export interface UnitOptions {
    units?: string[]
    quantity?: number
    totalCost?: number
    unitSize?: string | null
    costPerUnit?: number
    imageIcon?: string
}

export interface Materials {
    [category: string] : {
        [material: string] : UnitOptions
    }
}

export interface Tools {
    [category: string]: {
        [tool: string]: UnitOptions
    }
}

export default function useMaterialsList({ material } : { material: BuildCategory | string }): BuildPick { 
    const placeholderImage = 'https://picsum.photos/id/237/200/300'
    const tools:Tools = {

    }

    const equipment:Tools = {

    }

    const getMaterialsGroup = materialsGroup[material as BuildCategory]
  
    return getMaterialsGroup as BuildPick
}
