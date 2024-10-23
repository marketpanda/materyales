import { usePathname } from "next/navigation";

export function useGetLastStringOnRoute() {
    const thisRoute:string = usePathname().split('/')[usePathname().split('/').length - 1]  

    return {
        thisRoute
    }
}