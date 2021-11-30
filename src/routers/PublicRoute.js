import React  from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

export const PublicRoute =({
    isAutheticated,
    component: Component,
    ...rest
}) =>{



    return (

      //proteccion de rutas 

      <Route {...rest }
            component={ (props)=> (
                (isAutheticated)
                    ? (<Redirect to="/" /> )
                    : <Component { ...props} />
                    
        )}
      
      />
    )
}

PublicRoute.propTypes = {
  isAutheticated: PropTypes.bool.isRequired, 
  component: PropTypes.func.isRequired
}