 
export interface UnitOptions {
    units: string[]
    unitSize?: string
    costPerUnit?: number
    imageIcon?: string
}

export interface Materials {
    [category: string] : {
        [material: string] : UnitOptions
    }
}
export default function useMaterialsList({material} : { material: string}) { 


    const materialsList:Materials = {
        tiles: {
            tile: { 
                units: ['pc', 'box'],
                costPerUnit: 300,
                unitSize: '300x300',
                imageIcon: 'https://picsum.photos/id/237/200/300'
            },
            grout: {
                units: ['bag', 'kg'],
                costPerUnit: 50,
                unitSize: '1 kg',
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            }
        }, 
        paints: {
            topcoat: { units: ['can', 'pail'] },
            primer: { units: ['can', 'pail'] },
            paintbrush: { units: ['pcs', 'set'] },
        }
    } 

    return materialsList[material] ? materialsList[material] : null
    
}
