import { Outlet, Navigate } from 'react-router-dom'
import React from "react";
import { getUserId, getUserRole } from '../client/src/utils/utils';

const SaRoute = () => {
    const userId = getUserId()
    const roleId = getUserRole()
    return (
        userId && (roleId === '1' || roleId === '2') ? <Outlet /> : <Navigate to='/login' />
    )
}

const OpRoute = () => {
    const userId = getUserId()
    const roleId = getUserRole()
    return (
        userId && (roleId === '1' || roleId === '3' || roleId === '6') ? <Outlet /> : <Navigate to='/login' />
    )
}

const ConstructionManagerRoute = () => {
    const userId = getUserId()
    const roleId = getUserRole()
    return (
        userId && (roleId === '1' || roleId === '6') ? <Outlet /> : <Navigate to='/login' />
    )
}

const SiteSurveyorRoute = () => {
    const userId = getUserId()
    const roleId = getUserRole()
    return (
        userId && (roleId === '1' || roleId === '6' || roleId === '7') ? <Outlet /> : <Navigate to='/login' />
    )
}

export { SaRoute, OpRoute, ConstructionManagerRoute, SiteSurveyorRoute }