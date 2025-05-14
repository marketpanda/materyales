export type Variant = {
    id?: string,
    name?: string,
    costPerUnit: number,
    brand?: string,
    specs?: Record<string, any> | null
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

export type Build = {
    materials:MaterialMap
    tools?:ToolMap,
    equipment?:EquipmentMap
}

export type BuildPick = Partial<Pick<MaterialsGroup, 'build'>>

export type MaterialsGroup = {
    id: string,
    name: string,
    build: Build
}
