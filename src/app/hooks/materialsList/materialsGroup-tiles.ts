import { Build, MaterialElement, MaterialsGroup, Variants } from "../types/types"

export const variantsTilesAdhesive:Variants = {
    id: 'vTilesAdhesive',
    element: 'adhesive',
    variants: {
        kg2: {
            costPerUnit: 55,
        },
        kg25: {
            costPerUnit: 425,
        }
    } 
}

export const variantTilesTile:Variants = {
    id: 'vTilesTile',
    element: 'tile',
    variants: {
        s60x60: {
            costPerUnit: 500,
        },
        s30x30: {
            costPerUnit: 90,
        }
    } 
}

export const variantTilesGrout:Variants = {
    id: 'vTilesGrout',
    element: 'grout',
    variants: {
        abc: {
            costPerUnit: 75,
        } 
    } 
}

export const tilesTile:MaterialElement = {
    id: 'tilesTile',
    name: 'Tiles', 
    variants: variantTilesTile,
    costPerUnit: 450, 
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const tilesAdhesive:MaterialElement = {
    id: 'tilesAdhesive',
    name: 'Adhesive', 
    variants: variantsTilesAdhesive,
    costPerUnit: 75, 
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const tilesGrout:MaterialElement = {
    id: 'tilesGrout',
    name: 'Grout', 
    variants: variantTilesGrout,
    costPerUnit: 55,
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const tilesTrowel:MaterialElement = {
    id: 'tilesTrowel',
    name: 'Trowel', 
    costPerUnit: 128,
    imageIcon: null,
    totalCost: 0,
    quantity: 0   
}

export const tilesSpacer:MaterialElement = {
    id: 'tilesSpacer',
    name: 'Tiles Spacer',
    costPerUnit: 84,
    imageIcon: null,
    totalCost: 0,
    quantity: 0  
}

export const grinder = {
    id: 'grinder',
    name: 'Grinder',
    costPerUnit: 2000,
    imageIcon: null,
    totalCost: 0,
    quantity: 0  
}


export const materialsGroupTiles:Build = {
    materials: {
        tile: tilesTile,
        adhesive: tilesAdhesive,
        grout: tilesGrout,
    },
    tools: {
        trowel: tilesTrowel,
        spacer: tilesSpacer
    },
    equipment: {
        grinder: grinder    
    }
}
 