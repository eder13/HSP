import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../stores/AuthStore';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                !isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

export default PrivateRoute;
