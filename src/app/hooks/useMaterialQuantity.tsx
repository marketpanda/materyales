import { calculcationFunctions } from '../utils/quantityCalculations' 
import { Variant } from './types/types'

interface Props {
    material: string,
    materialStrand: string
    area: number
    currentVariant?:Variant
}

export function useMaterialQuantity({material, materialStrand, area, currentVariant}: Props)  { 
    console.log('currentVariant ', currentVariant)
    const calculateQuantity = () => { 
        // e. g. tiles + grout = tilesGrout hence calculationFunctions[tilesGrout]
        const calculateFn = calculcationFunctions[material]
        console.log(calculateFn)
        if (!calculateFn) {
            console.log('Failed to retrieve material calculation. Defaulting to 0')
            return { quantity: 0 }
        }
        const result =  calculateFn(material, materialStrand, { param: 'area', paramValue: area}, currentVariant)
        return result
    }
    return calculateQuantity
} 