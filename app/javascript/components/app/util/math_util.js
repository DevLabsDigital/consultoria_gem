export const calcPercentual = (total, valor) => {
    const result = (Number((valor  / total).toFixed(2)) * 100).toFixed(0)
    if(isNaN(result)) return 0
    return result
}