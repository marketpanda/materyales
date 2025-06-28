export default function useMaterialComponentsSummaryBreakdown(total:number) { 
   
    const sbTotalMaterials = total
    const sbLabor = total * .30
    const sbContingency = total * .05
    const sbContractorsProfit = total * .125
    const sbTax = total * .125

    return  { sbTotalMaterials, sbLabor,  sbContingency, sbContractorsProfit, sbTax }    
}
