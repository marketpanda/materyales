import React, { useCallback } from 'react'
import { calculcationFunctions } from '../utils/quantityCalculations'


interface Props {
    material: string,
    materialStrand: string
}

export function useMaterialQuantity({material, materialStrand}: Props)  {
    
    
    
    const capitalizeStrand = materialStrand.charAt(0).toUpperCase() + materialStrand.slice(1)
     
    
    const calculateQuantity = useCallback(() => {
        const calculateFn = calculcationFunctions[material+capitalizeStrand]
        if (!calculateFn) {
            console.log('Failed to retrieve material. Defaulting to 0')
            return { quantity: 0 }
        }
        
        return calculateFn(material, materialStrand)
    }, [material, materialStrand])
    

    return calculateQuantity
} 