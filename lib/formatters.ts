const CURRANCY_FORMATTER = new Intl.NumberFormat("id-Id",{
    currency:"IDR",
    style:"currency",
    minimumFractionDigits:0
})

export function formatCurrency(amount:number){
    return CURRANCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function formatNumber(number:number){
    return NUMBER_FORMATTER.format(number);
}

export default function dateFormater(value:Date){
    return new Date(value).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
}