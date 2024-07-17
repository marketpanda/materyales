 
export interface UnitOptions {
    units?: string[]
    quantity?: number
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

    const materialsList:Materials = {
        tiles: {
            tile: { 
                units: ['pc', 'box'],
                costPerUnit: 300,
                unitSize: '300x300',
                imageIcon: 'https://picsum.photos/id/237/200/300',
                
            },
            grout: {
                units: ['bag', 'kg'],
                costPerUnit: 50,
                unitSize: '1 kg',
                imageIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQrmKeUse2_2bxgzoHv0su3g8PSrWoF5yg&s'
            }
        }, 
        paints: {
            topcoat: {
                units: ['can', 'pail'],
                costPerUnit: 600,
                unitSize: '300x300',
                imageIcon: 'https://picsum.photos/id/237/200/300'
            },
            primer: {
                units: ['can', 'pail'],
                costPerUnit: 300,
                unitSize: 'galloon',
                imageIcon: 'https://picsum.photos/id/237/200/300'
            },
            paintbrush: {
                units: ['pcs'],
                costPerUnit: 50,
                unitSize: null,
                imageIcon: 'https://picsum.photos/id/237/200/300'
            },
            roller: {
                units: ['pcs'],
                costPerUnit: 150,
                unitSize: null,
                imageIcon: 'https://picsum.photos/id/237/200/300'
            },
        }
    } 

    return  { [material]: materialsList[material] } 
    
}
