import { BuildCategory, materialsGroup } from "./materialsList/__materialsGroup"
import {  BuildPick } from "./types/types"

export interface UnitOptions {
    units?: string[]
    quantity?: number
    totalCost?: number
    unitSize?: string | null
    costPerUnit?: number
    imageIcon?: string
}

export interface Materials {
    [category: string] : {
        [material: string] : UnitOptions
    }
}

export interface Tools {
    [category: string]: {
        [tool: string]: UnitOptions
    }
}

// materials
// tools
// equipment

export default function useMaterialsList({ material } : { material: BuildCategory | string }): BuildPick { 
    const placeholderImage = 'https://picsum.photos/id/237/200/300'
 
    const tools:Tools = {

    }

    const equipment:Tools = {

    }
      
    const materialsList:Materials = {
        tiles: {
            tile: { 
                units: ['pc', 'box'],
                costPerUnit: 300,
                unitSize: '300x300',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0         
            },
            adhesive: { 
                units: ['kg'],
                costPerUnit: 23,
                unitSize: '2 kg',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0         
            },
            grout: {
                units: ['bag', 'kg'],
                costPerUnit: 85,
                unitSize: '2 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            }
        }, 
        paints: {
            topcoat: {
                units: ['liter'],
                costPerUnit: 700,
                unitSize: '1L',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0,
            },
            primer: {
                units: ['liter'],
                costPerUnit: 173,
                unitSize: '1L',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0,
            },
            paintbrush: {
                units: ['pcs'],
                costPerUnit: 67,
                unitSize: '2',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0,
            },
            roller: {
                units: ['pc'],
                costPerUnit: 55,
                unitSize: '9',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0,
            },
        },
        ceiling: {
            ficemBoard: {
                units: ['sqm'],
                costPerUnit: 413,
                unitSize: '1.2x2.4mx3.5mm',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            gypsumBoard: {
                units: ['sqm'],
                costPerUnit: 528,
                unitSize: '1.2x2.4mx9mm',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            metalFurring: {
                units: ['meters'],
                costPerUnit: 112,
                unitSize: '5m',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            screw: {
                units: ['pcs'],
                costPerUnit: 40,
                unitSize: '20pcs',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            }
        },
        roofing: {
            sheets: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            insulation: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
        },
        groundSlab: {
            cement: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            sand: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            gravel: {
                units: ['cum'],
                costPerUnit: 50,
                unitSize: '1 cum',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            rebar: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            tieWire: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            polyethyleneSheet: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },

        },
        suspendedSlab: {
            cement: {
                units: ['bag'],
                costPerUnit: 50,
                unitSize: '1 bag',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            sand: {
                units: ['cum'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            gravel: {
                units: ['cum'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            rebar: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            tieWire: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            }
        },
        modularCabinets: {
            MDF: {
                units: ['bag'],
                costPerUnit: 50,
                unitSize: '1 bag',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            laminate: {
                units: ['sqm'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            } 
        },
        simpleShelves: {
            MDF: {
                units: ['bag'],
                costPerUnit: 50,
                unitSize: '1 bag',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            laminate: {
                units: ['cum'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            bracket: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            } 
        }
    } 

    const getMaterialsGroup = materialsGroup[material as BuildCategory] 
    console.log('getMaterialsGroup ', getMaterialsGroup) 
  
    // return  { [material]: materialsList[material] } 
    return getMaterialsGroup as BuildPick
    
}
