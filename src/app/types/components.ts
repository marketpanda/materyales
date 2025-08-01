export type singleComponent = { 
  qty: number,
  units: string,
  price?: number,
  total?: number
}

export type SummaryBreakdownStrand = {
  value?: number,
  include?: boolean
}

export type DimensionKey = 'length' | 'width' | 'area'

export const BreakdownComponents = {
  TotalMaterials: "sbTotalMaterials",
  Labor: "sbLabor",
  Contingency: "sbContingency",
  ContractorsProfit: "sbContractorsProfit",
  Tax: "sbTax"
} as const

export type BreakdownComponent = typeof BreakdownComponents[keyof typeof BreakdownComponents]

export type SbType = {
  [K in BreakdownComponent]?: SummaryBreakdownStrand
}

export enum Sorts {
    NoSort = 'nosort',
    MaterialName = 'material',
    CostPerUnit = 'costPerUnit',
    Quantity = 'quantity',
    TotalCost = 'totalCost'
}
 