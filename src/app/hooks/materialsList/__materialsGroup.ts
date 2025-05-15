import { EquipmentMap, MaterialsGroup, ToolMap } from "../types/types";
import { materialsGroupPaints } from "./materialsGroup-paints";
import { materialsGroupTiles } from "./materialsGroup-tiles";

export type BuildCategory = 
    'tiles' |
    'paints' |
    'ceiling' |
    'roofing' |
    'groundSlab' |
    'suspendedSlab'

// export type BuildComposition = {
//     build: MaterialsGroup 
// }

export type MaterialsGroupCollection  = Partial<Record<BuildCategory, MaterialsGroup>>
 
export const materialsGroup: MaterialsGroupCollection = {
    tiles: {
        id: 'tiles',
        name: 'Tiles',
        build: materialsGroupTiles,
        // tools: '',
        // equipment: ''
    },
    paints: {
        id: 'paints',
        name: 'Paints',
        build: materialsGroupPaints,
        // tools: '',
        // equipment: '' 
    }
    // ceiling: '',
    // roofing: '',
    // groundSlab: '',
    // suspendedSlab: ''
}

