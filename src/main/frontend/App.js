import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import AppRouter from './components/routers/AppRouter';
import userData from './reducers/authReducer';
import clientSystemInfo from './reducers/clientReducer';
import { actionSetUser } from './actions/authActions';
import { Provider } from "react-redux";
import PropTypes from 'prop-types';
import 'bootswatch/dist/materia/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'icono/dist/icono.min.css';
import { actionSetBrowserWidth } from './actions/clientActions';
import _ from 'lodash';

const store = configureStore({
    reducer: combineReducers({ user: userData, clientSystemInfo }),
    middleware: [...getDefaultMiddleware()],
});

const captureBrowserWidth = () => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    store.dispatch(actionSetBrowserWidth(width));
}

const App = ({ id, user, isLoggedIn }) => {

    useEffect(() => {
        captureBrowserWidth();

        const debouncedCaptureBrowserWidth = _.debounce(captureBrowserWidth, 200);

        window.addEventListener("resize", debouncedCaptureBrowserWidth);
        return () => {
            window.removeEventListener('resize', debouncedCaptureBrowserWidth);
        }
    }, []);

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

export default App;
