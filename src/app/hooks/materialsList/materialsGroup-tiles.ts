import { Build, MaterialElement, MaterialsGroup, Variants } from "../types/types"

export const variantsTilesAdhesive:Variants = {
    id: 'vTilesAdhesive',
    element: 'adhesive',
    variants: {
        kg2: {
            costPerUnit: 55,
            name: '2 Kg'
        },
        kg25: {
            costPerUnit: 425,
            name: '25 Kg'
        }
    } 
}

export const variantTilesTile:Variants = {
    id: 'vTilesTile',
    element: 'tile',
    variants: {
        s60x60: {
            costPerUnit: 500,
            name: '60x60cm'
        },
        s30x30: {
            costPerUnit: 90,
            name: '30x30cm'
        }
    } 
}

export const variantTilesGrout:Variants = {
    id: 'vTilesGrout',
    element: 'grout',
    variants: {
        abc: {
            costPerUnit: 75,
            name: 'ABC'
        }
    } 
}

export const tilesTile:MaterialElement = {
    id: 'tilesTile',
    name: 'Tiles', 
    variants: variantTilesTile,
    costPerUnit: 450, 
    UOM: 'pcs',
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const tilesAdhesive:MaterialElement = {
    id: 'tilesAdhesive',
    name: 'Adhesive', 
    variants: variantsTilesAdhesive,
    costPerUnit: 75, 
    UOM: 'kg',
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const tilesGrout:MaterialElement = {
    id: 'tilesGrout',
    name: 'Grout', 
    variants: variantTilesGrout,
    costPerUnit: 55,
    UOM: 'kg',
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const tilesTrowel:MaterialElement = {
    id: 'tilesTrowel',
    name: 'Trowel', 
    costPerUnit: 128,
    UOM: 'kg',
    imageIcon: null,
    totalCost: 0,
    quantity: 0   
}

export const tilesSpacer:MaterialElement = {
    id: 'tilesSpacer',
    name: 'Tiles Spacer',
    costPerUnit: 84,
    UOM: 'pcs',
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
 