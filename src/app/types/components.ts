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

export type SbType = {
  sbTotalMaterials?: SummaryBreakdownStrand | null,
  sbLabor?: SummaryBreakdownStrand | null, 
  sbContingency?: SummaryBreakdownStrand | null,
  sbContractorsProfit?: SummaryBreakdownStrand | null,
  sbTax?: SummaryBreakdownStrand | null,
}