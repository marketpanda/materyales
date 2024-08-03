import React, { useCallback } from 'react'
import { calculcationFunctions } from '../utils/quantityCalculations' 

interface Props {
    material: string,
    materialStrand: string
    area: number
}

export function useMaterialQuantity({material, materialStrand, area}: Props)  { 
    
    const capitalizedStrand = materialStrand.charAt(0).toUpperCase() + materialStrand.slice(1) 
    
    const calculateQuantity = () => {

        // e. g. tiles + grout = tilesGrout hence calculationFunctions[tilesGrout]
        const calculateFn = calculcationFunctions[material+capitalizedStrand]
        if (!calculateFn) {
            console.log('Failed to retrieve material calculation. Defaulting to 0')
            return { quantity: 0 }
        }
        const result =  calculateFn(material, materialStrand, { param: 'area', paramValue: area})
        
        return result

    }
     
    return calculateQuantity
} 