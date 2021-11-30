import React  from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute =({
    isAutheticated,
    component: Component,
    ...rest
}) =>{


    return (

      //proteccion de rutas 

      <Route {...rest }
            component={ (props)=> (
                (isAutheticated)
                    ? <Component { ...props} />
                    : (<Redirect to="/auth/login" /> )
        )}
      
      />
    )
}

PrivateRoute.propTypes = {
  isAutheticated: PropTypes.bool.isRequired, 
  component: PropTypes.func.isRequired
}