import { MaterialElement, MaterialsGroup, Variants } from "../types/types"

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
    costPerUnit: 0, 
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const tilesAdhesive:MaterialElement = {
    id: 'tilesAdhesive',
    name: 'Adhesive', 
    variants: variantsTilesAdhesive,
    costPerUnit: 0, 
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const tilesGrout:MaterialElement = {
    id: 'tilesGrout',
    name: 'Grout', 
    variants: variantTilesGrout,
    costPerUnit: 0,
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const materialsGroupTiles:MaterialsGroup = {
    id: 'groupTiles',
    name: 'Tiles Materials',
    materials: {
        tile: tilesTile,
        adhesive: tilesAdhesive,
        grout: tilesGrout,
    }
}