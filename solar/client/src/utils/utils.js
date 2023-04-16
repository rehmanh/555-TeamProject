const getUserFullName = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')
    }
    return ""
}

const getUserId = () => {
    if (isUserLoggedIn) {
        return localStorage.getItem('userId')
    }
}

const isUserLoggedIn = () => {
    return (localStorage 
        && localStorage.getItem('firstName').length !== 0 
        && localStorage.getItem('lastName').length !== 0
        && localStorage.getItem('roleId').length !== 0
        && localStorage.getItem('userId').length !== 0)
}

export { getUserFullName, getUserId };