export type Variant = {
    id?: string,
    name?: string,
    costPerUnit: number,
    brand?: string,
    specs?: Object
}

export type VariantOptions = Record<string, Variant>

export type Variants = {
    id: string,
    element: string,
    variants: VariantOptions
}

export type MaterialElement = {
    id: string,
    name: string,
    variants?: Variants | null,
    costPerUnit: number,
    imageIcon?: string | null,
    totalCost?: number,
    quantity?: number
}

export type Tool = {
    id: string,
    name: string,
    variants?: Variants | null,
    costPerUnit: number,
    imageIcon?: string | null,
    totalCost?: number,
    quantity?: number
}

export type Equipment = {
    id: string,
    name: string,
    variants?: Variants | null,
    costPerUnit: number,
    imageIcon?: string | null,
    totalCost?: number,
    quantity?: number
}

export type MaterialMap = Record<string, MaterialElement>
export type ToolMap = Record<string, Tool>
export type EquipmentMap = Record<string, Equipment>

export type MaterialsGroup = {
    id: string,
    name: string,
    materials:MaterialMap
}

export type ToolsGroup = {
    id: string,
    name: string,
    materials:ToolMap
}

export type EquipmentGroup = {
    id: string,
    name: string,
    materials:EquipmentMap
}


