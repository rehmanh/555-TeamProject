import { Outlet, Navigate } from 'react-router-dom'
import React, { Component, useEffect, useState } from "react";

// const [isLoggedIn] = useState(localStorage !== null
//     && localStorage.getItem('token') !== null
//     && localStorage.getItem('roleId') !== null
//     && localStorage.getItem('userId') !== null);
// const [roleId] = useState(localStorage.getItem('roleId'));

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

export { SaRoute, OpRoute, }