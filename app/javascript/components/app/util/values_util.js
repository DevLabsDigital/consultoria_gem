export const hasValue = value => {
    if (value === undefined || value === null || !value) return false
    if (typeof value === "object" && Object.keys(value).length === 0) return false
    if (Array.isArray(value) && value.length === 0) return false

    return true
}

export const addZero = value => {
    if(value == null) return
    if(value.toString().length === 1) return `0${value}`
    return value.toString()
}

export const HOST_URL = 'https://task-manager-devlabs.herokuapp.com/'
