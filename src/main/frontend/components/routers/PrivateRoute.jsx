import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../selectors/authSelector';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(selectLoggedIn);

    return <Route {...rest} render={props => (!isLoggedIn ? <Redirect to="/" /> : <Component {...props} />)} />;
};

PrivateRoute.propTypes = {
    component: PropTypes.func
};

export default PrivateRoute;
