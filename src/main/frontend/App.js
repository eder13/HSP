import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React from 'react';
import AppRouter from './components/routers/AppRouter';
import userData from "./reducers/authReducer";
import { actionSetUser } from './actions/authActions';
import { Provider } from "react-redux";
import PropTypes from 'prop-types';

const store = configureStore({
    reducer: combineReducers({ user: userData }),
    middleware: [...getDefaultMiddleware()],
});

const App = ({ id, user, isLoggedIn }) => {

    store.dispatch(actionSetUser(id, user, isLoggedIn));

    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};

App.propTypes = {
    id: PropTypes.number,
    user: PropTypes.string,
    isLoggedIn: PropTypes.bool
}
