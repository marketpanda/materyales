import { EquipmentGroup, MaterialsGroup, ToolsGroup } from "../types/types";
import { materialsGroupPaints } from "./materialsGroup-paints";
import { materialsGroupTiles } from "./materialsGroup-tiles";


export type BuildCategory = 
    'tiles' |
    'painting' |
    'ceiling' |
    'roofing' |
    'groundSlab' |
    'suspendedSlab'

export type BuildComposition = {
    materials: MaterialsGroup,
    tools?: ToolsGroup,
    equipment?: EquipmentGroup
}

export type MaterialsGroupCollection  = Partial<Record<BuildCategory, BuildComposition>>
 
export const materialsGroup: MaterialsGroupCollection = {
    tiles: {
        materials: materialsGroupTiles,
        // tools: '',
        // equipment: ''
    },
    painting: {
        materials: materialsGroupPaints,
        // tools: '',
        // equipment: '' 
    }
    // ceiling: '',
    // roofing: '',
    // groundSlab: '',
    // suspendedSlab: ''
}

