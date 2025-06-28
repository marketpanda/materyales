import { calculcationFunctions } from '../utils/quantityCalculations' 

interface Props {
    material: string,
    materialStrand: string
    area: number
}

export function useMaterialQuantity({material, materialStrand, area}: Props)  { 

    const calculateQuantity = () => { 
        // e. g. tiles + grout = tilesGrout hence calculationFunctions[tilesGrout]
        const calculateFn = calculcationFunctions[material]
        console.log(calculateFn)
        if (!calculateFn) {
            console.log('Failed to retrieve material calculation. Defaulting to 0')
            return { quantity: 0 }
        }
        const result =  calculateFn(material, materialStrand, { param: 'area', paramValue: area})
        return result
    }
    return calculateQuantity
} 