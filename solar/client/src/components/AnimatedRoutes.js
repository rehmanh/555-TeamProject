import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SaRoute, OpRoute, ConstructionManagerRoute, SiteSurveyorRoute} from "../../../src/PrivateRoute"
import HomePage from '../pages/home';
import Login from '../pages/login';
import SalesRep from '../pages/salesRep';
import UserHome from '../pages/userHome';
import UserRequestForm from '../pages/UserRequestForm';
import Userprog from '../pages/Userprog';
import { Operation } from '../pages/Operation';
import OpManager from '../pages/OpManager';
import CoCheck from '../pages/coCheck';
import ConstructionManager from '../pages/ConstructionManager';
import SiteSurveyor from '../pages/SiteSurveyor';
import { AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import Scheduling from '../pages/scheduling';
import AboutUs from '../pages/aboutUs';
import Payment from '../pages/payment';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route element={<SaRoute />}> 
                    <Route exact path='/userHome' element={<UserHome />} />
                    <Route exact path='/salesrep' element={<SalesRep />} />
                </Route>
                <Route element={<OpRoute />}>
                    <Route exact path='/userHome' element={<UserHome />} />
                    <Route exact path='/opManager' element={<OpManager />} />
                    <Route exact path='/salesrep' element={<SalesRep />} />
                </Route>
                <Route element={<ConstructionManagerRoute />}> 
                    <Route exact path='/userHome' element={<UserHome />} />
                    <Route exact path='/constructionManager' element={<ConstructionManager />} />
                    <Route exact path='/coCheck' element={<CoCheck />} />
                </Route>
                <Route element={<SiteSurveyorRoute />}> 
                    <Route exact path='/userHome' element={<UserHome />} />
                    <Route exact path='/siteSurveyor' element={<SiteSurveyor />} />
                </Route>
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/userreq' element={<UserRequestForm />} />
                <Route exact path='/userprog' element={<Userprog />} />
                <Route exact path='/oper' element={<Operation />} />
                <Route exact path= '/coCheck' element={<CoCheck />}/>
                <Route exact path= '/siteSurveyor' element={<SiteSurveyor />}/>
                <Route exact path= '/scheduling' element={<Scheduling />}/>
                <Route exact path='/aboutUs' element={<AboutUs />} />
                <Route exact path='/payment' element={<Payment />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes