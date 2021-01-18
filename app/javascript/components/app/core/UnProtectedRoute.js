import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLogged} from "../util/auth";

const UnProtectedRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={(props) => !isLogged() ? <Component {...props} />
            : <Redirect to={{pathname: '/home', state: {from: props.location}}} />} />
    );
};

export default UnProtectedRoute;