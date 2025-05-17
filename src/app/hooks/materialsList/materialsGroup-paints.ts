import { Build, MaterialElement, MaterialsGroup, Variants } from "../types/types"

export const variantPaintsPrimer:Variants = {
    id: 'vPaintsPrimer',
    element: 'primer',
    variants: {
        b701: {
            name: 'B701',
            costPerUnit: 640,
             
        },
        dv1350: { 
            costPerUnit: 700,
        }
    } 
}

export const variantPaintsTopcoat:Variants = {
    id: 'vPaintsTopcoat',
    element: 'topcoat',
    variants: {
        waterBasedPaint: {
            costPerUnit: 700,
        },
        qde: {
            costPerUnit: 700
        }
    } 
}
 

export const paintsPrimer:MaterialElement = {
    id: 'paintsPrimer',
    name: 'Primer', 
    variants: variantPaintsPrimer,
    costPerUnit: 640, 
    UOM: 'gallons',
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const paintsTopcoat:MaterialElement = {
    id: 'paintsTopcoat',
    name: 'Topcoat', 
    variants: variantPaintsTopcoat,
    costPerUnit: 700,
    UOM: 'gallons',
    imageIcon: null,
    totalCost: 0,
    quantity: 0
}

export const materialsGroupPaints:Build = {
    materials: {
        primer: paintsPrimer,
        topcoat: paintsTopcoat, 
    },
    // tools: {
    //     ...
    // },
    // equipment: {
    //     ...    
    // }
     
}