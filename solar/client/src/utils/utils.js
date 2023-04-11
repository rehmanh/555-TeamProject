const getUserFullName = () => {
    if (localStorage 
        && localStorage.getItem('firstName').length !== 0 
        && localStorage.getItem('lastName').length !== 0) {
        return localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')
    }
    return ""
}

export { getUserFullName };