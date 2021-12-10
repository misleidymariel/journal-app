import { getAuth,  } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";

import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {


        const dispatch = useDispatch();  
        
        const [checking, setChecking] = useState(true);
        const [isLoggeIn, setIsLoggeIn] = useState(false);


        useEffect(()=> {

            getAuth().onAuthStateChanged( async (user) => {

                if( user?.uid) {
                    dispatch(login(user.uid, user.displayName))
                    setIsLoggeIn( true);
                    dispatch( startLoadingNotes( user.uid ) ); 

                } else {
                    setIsLoggeIn(false); 
                }

                setChecking(false);

            });

        },[dispatch, setChecking, setIsLoggeIn])
        

        if( checking){
            return (
                <h1>Plis wait.. </h1>
            )
        }


    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAutheticated ={ isLoggeIn }
                    />

                    <PrivateRoute
                        exact
                        isAutheticated={ isLoggeIn}
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
            
        </Router>
    )

}
