import { Build, MaterialElement, Variants } from "../types/types"

export const variantPaintsPrimer:Variants = {
    id: 'vPaintsPrimer',
    element: 'primer',
    variants: {
        b701: {
            name: 'B701',
            costPerUnit: 640,
        },
        b701pail: {
            name: 'B701 Pail',
            costPerUnit: 3100,
            UOM: 'pail',            
        },
        dv1350: { 
            name: 'Davies 1350',
            costPerUnit: 700,
        }
    } 
}

export const variantPaintsTopcoat:Variants = {
    id: 'vPaintsTopcoat',
    element: 'topcoat',
    variants: {
        waterBasedPaint: {
            costPerUnit: 680,
        },
        qde: {
            costPerUnit: 720
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
     
}