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
    console.log('calculating tiles...: ', material, materialStrand)
    
    const area = calculations.paramValue
    const TILE_PER_SQM_60x60 = 2.77
    const getQuantity = Math.ceil(area * TILE_PER_SQM_60x60)
    
    return { quantity: getQuantity }
}

const tilesGroutQuantityPerSq:Props = (material, materialStrand, calculations) => { 

    const area = calculations.paramValue
    const GROUT_PER_SQM = 1.77
    const getQuantity = Math.ceil(area * GROUT_PER_SQM)

    return { quantity: getQuantity }
} 

export const calculcationFunctions: Record<string, Props> = {
    tilesTile: tilesTileQuantityPerSq,
    tilesGrout: tilesGroutQuantityPerSq
}

