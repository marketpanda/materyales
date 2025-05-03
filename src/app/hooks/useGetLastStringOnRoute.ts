import { usePathname } from "next/navigation";

const paths = {
    'tiles': 'tiles',
    'paints': 'paints',
    'modular-cabinets': 'modularCabinets' 
}

export function useGetLastStringOnRoute() {
    let thisRoute:string = usePathname().split('/').pop() || ''
    if (thisRoute.includes('-')) {
        thisRoute =  thisRoute
            .split('-')
            .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
            .join('') 
    }
    return { thisRoute }
}