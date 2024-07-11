 
interface UnitOptions {
    units: string[]
    unitSize?: string
    costPerUnit?: number
    imageIcon?: string
}

interface Materials {
    [key: string] : {
        [key: string] : UnitOptions
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
                imageIcon: 'https://picsum.photos/id/237/200/300'
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
