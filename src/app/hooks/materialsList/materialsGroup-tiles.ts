export type Variant = {
    costPerUnit: number
}

export type VariantOptions = Record<string, Variant>

export type Variants = {
    id: string,
    element: string,
    variants: VariantOptions
}

export type MaterialElement = {
    id: string,
    name: string,
    variants?: Variants | null,
    costPerUnit: number,
    imageIcon?: string | null,
    totalCost?: number,
    quantity?: number
}

export type MaterialMap = Record<string, MaterialElement>

export type MaterialsGroup = {
    id: string,
    name: string,
    materials:MaterialMap
}

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

export const tilesTile:MaterialElement = {
    id: 'tilesTile',
    name: 'Tiles', 
    variants: null,
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
    variants: null,
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