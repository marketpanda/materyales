interface Calculations {
    param: string,
    paramVariant?: string, // e.g. for tile 60x60, 30x30 since this will require different computation
    paramValue: number
}

interface Props {
    (
        material: string,
        materialStrand: string,
        calculations: Calculations
    ) : {
        quantity: number
    }
} 

const tilesTileQuantityPerSq:Props = (material, materialStrand, calculations) => {
    
    const area = calculations.paramValue
    const TILE_PER_SQM_60x60 = 2.77
    const getQuantity = Math.ceil(area * TILE_PER_SQM_60x60)
    
    return { quantity: getQuantity }
}

const tilesGroutQuantityPerSq:Props = (material, materialStrand, calculations) => { 
    const tileLengthandWidth = 1200 //assume 60x60cm tile
    const jointWidth = 3
    const thickness = 12 // thickness of tile
    const averageGroutDensity = 1.7
    const numberOfTiles = calculations.paramValue // rounded up, this is 2.78 from 1sqm of 60x60cm tile

    const getQuantity =( (tileLengthandWidth * jointWidth * thickness * numberOfTiles) / 1000000) * averageGroutDensity
 
    return { quantity: getQuantity }
} 

const tilesAdhesiveQuantityPerSq:Props = (material, materialStrand, calculations) => { 

    const area = calculations.paramValue
    const thickness10mmNotch =  8 // 5mm x 1.6kg / L
    const thickness6mmNotch =  4.8 // 3mm x 1.6kg / L 
    const getQuantity = Math.ceil(area * thickness10mmNotch)

    return { quantity: getQuantity }
} 

const paintsTopcoatQuantityPerSq:Props = (material, materialStrand, calculations) => { 
    const area = calculations.paramValue
    const TOPCOAT_PER_SQM = .148148
    // 4 liters / 27 sqm
    const getQuantity = Math.ceil(area * TOPCOAT_PER_SQM)

    return { quantity: getQuantity }
}

const paintsPrimerQuantityPerSq:Props = (material, materialStrand, calculations) => {
    const area = calculations.paramValue
    const PRIMER_PER_SQM = 1 / 16
    const getQuantity = Math.ceil(area * PRIMER_PER_SQM)

    return { quantity: getQuantity }
}

const paintsPaintbrushQuantityPerSq:Props = (material, materialStrand, calculations) => {
    const area = calculations.paramValue
    const BRUSH_PER_SQM = 1 / 32
    const getQuantity = Math.ceil(area * BRUSH_PER_SQM)

    return { quantity: getQuantity }
}

const paintsRollerQuantityPerSq:Props = (material, materialStrand, calculations) => {
    const area = calculations.paramValue
    const ROLLER_PER_SQM = 1 / 50
    const getQuantity = Math.ceil(area * ROLLER_PER_SQM)

    return { quantity: getQuantity }
}

export const calculcationFunctions: Record<string, Props> = {
    tilesTile: tilesTileQuantityPerSq,
    tilesGrout: tilesGroutQuantityPerSq,
    tilesAdhesive: tilesAdhesiveQuantityPerSq,
    paintsTopcoat: paintsTopcoatQuantityPerSq,
    paintsPrimer: paintsPrimerQuantityPerSq,
    paintsPaintbrush: paintsPaintbrushQuantityPerSq,
    paintsRoller: paintsRollerQuantityPerSq,
}

