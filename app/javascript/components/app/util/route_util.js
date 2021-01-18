export const extractIdFromPathname = value => {
    if(!value) return value
    return value.toString().match(/\d+$/)[0]
}