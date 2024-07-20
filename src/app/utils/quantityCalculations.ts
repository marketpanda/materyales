interface Props {
    (
        material: string,
        materialStrand: string
    ) : {
        quantity?: number
    }
} 

const tilesTileQuantityPerSq:Props = (material, materialStrand) => {
    console.log('calculating tiles...: ', material, materialStrand)
    return { quantity: 120}
}

const tilesGroutQuantityPerSq:Props = (material, materialStrand) => {
    console.log('calculating grout...: ', material, materialStrand)
    return { quantity: 150}
}


export const calculcationFunctions: Record<string, Props> = {
    tilesTile: tilesTileQuantityPerSq,
    tilesGrout: tilesGroutQuantityPerSq
}

