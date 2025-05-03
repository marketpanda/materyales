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
export default function useMaterialsList({material} : { material: string }) { 
    const placeholderImage = 'https://picsum.photos/id/237/200/300'
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
                units: ['pc', 'box'],
                costPerUnit: 300,
                unitSize: '300x300',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0         
            },
            grout: {
                units: ['bag', 'kg'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            }
        }, 
        paints: {
            topcoat: {
                units: ['can', 'pail'],
                costPerUnit: 600,
                unitSize: '300x300',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0,
            },
            primer: {
                units: ['can', 'pail'],
                costPerUnit: 300,
                unitSize: 'galloon',
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0,
            },
            paintbrush: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: null,
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0,
            },
            roller: {
                units: ['pcs'],
                costPerUnit: 150,
                unitSize: null,
                imageIcon: placeholderImage,
                totalCost: 0,
                quantity: 0,
            },
        },
        ceiling: {
            ficemBoard: {
                units: ['sqm'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            gypsumBoard: {
                units: ['sqm'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            metalFurring: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
                totalCost: 0,
                quantity: 0,
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            },
            screw: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: '1 kg',
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
                units: ['cum'],
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
 
    return  { [material]: materialsList[material] } 
    
}
