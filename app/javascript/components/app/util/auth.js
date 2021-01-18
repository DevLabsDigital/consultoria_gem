export const setUserLogged = (userHeader, userInfo) => {
    const value = JSON.stringify(userHeader)
    localStorage.setItem('user', value)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export const getUserLogged = () => {
    const value = localStorage.getItem('user')
    if (!value) return null
    return JSON.parse(value)
}

export const getUserInfo = () => {
    const value = localStorage.getItem('userInfo')
    if (!value) return null
    return JSON.parse(value)
}

export const logout = () => {
    localStorage.clear()
}

export const isLogged = () => !!localStorage.getItem('user')