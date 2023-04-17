import { Outlet, Navigate } from 'react-router-dom'
import React, { useState } from "react";

const SaRoute = () => {
    const [isLoggedIn] = useState(localStorage !== null
        && localStorage.getItem('token') !== null
        && localStorage.getItem('roleId') !== null
        && localStorage.getItem('userId') !== null);
    const [roleId] = useState(localStorage.getItem('roleId'));

    return (
        isLoggedIn && (roleId == 1 || roleId == 2) ? <Outlet /> : <Navigate to='/login' />
    )
}

const OpRoute = () => {
    const [isLoggedIn] = useState(localStorage !== null
        && localStorage.getItem('token') !== null
        && localStorage.getItem('roleId') !== null
        && localStorage.getItem('userId') !== null);
    const [roleId] = useState(localStorage.getItem('roleId'));

    return (
        isLoggedIn && (roleId == 1 || roleId == 3) ? <Outlet /> : <Navigate to='/login' />
    )
}

const CoRoute = () => {
    const [isLoggedIn] = useState(localStorage !== null
        && localStorage.getItem('token') !== null
        && localStorage.getItem('roleId') !== null
        && localStorage.getItem('userId') !== null);
    const [roleId] = useState(localStorage.getItem('roleId'));

    return (
        isLoggedIn && (roleId == 1 || roleId == 6) ? <Outlet /> : <Navigate to='/login' />
    )
}

export { SaRoute, OpRoute, CoRoute, }