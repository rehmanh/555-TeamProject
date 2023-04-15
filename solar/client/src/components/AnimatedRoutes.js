import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import {SaRoute, OpRoute} from "../../../src/PrivateRoute"
import HomePage from '../pages/home';
import SignUp from '../pages/signUp';
import Login from '../pages/login';
import SalesRep from '../pages/salesRep';
import UserHome from '../pages/userHome';
import UserRequestForm from '../pages/UserRequestForm';
import Userprog from '../pages/Userprog';
import { Operation } from '../pages/Operation';
import OpManager from '../pages/OpManager';
import CoCheck from '../pages/coCheck';
import ConstructionManager from '../pages/ConstructionManager';
import { AnimatePresence } from 'framer-motion';
import Payment from '../pages/payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('your_stripe_public_key');
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
                    <Route exact path='/constructionManager' element={<ConstructionManager />} />
                </Route>
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<SignUp />} />
                <Route exact path='/salesrep' element={<SalesRep />} />
                <Route exact path='/userreq' element={<UserRequestForm />} />
                <Route exact path='/userprog' element={<Userprog />} />
                <Route exact path='/oper' element={<Operation />} />
                <Route exact path= '/coCheck' element={<CoCheck />}/>
                <Route exact path= '/payments' element={<Elements stripe={stripePromise}><Payment /></Elements>}/>

                {/* <Route exact path='/nav' element={<Navbar />}/> */}
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes