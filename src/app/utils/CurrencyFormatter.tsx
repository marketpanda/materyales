import React from "react"

const CurrencyFormatter:React.FC<{ amount: number}> = ({amount}) => {
    const formatCurrency = (value:number) => {
        if (!value) return 0
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        }).format(value)
    }

    return  <span>{ formatCurrency(amount) }</span>
}

export default CurrencyFormatter