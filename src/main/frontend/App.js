import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { Provider } from "react-redux";
import { api } from './middleware/api';
import { actionSetUser } from './actions/authActions';
import { actionSetBrowserWidth } from './actions/clientActions';
import userData from './reducers/authReducer';
import clientSystemInfo from './reducers/clientReducer';
import AppRouter from './components/routers/AppRouter';
import 'bootswatch/dist/zephyr/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'icono/dist/icono.min.css';
import _ from 'lodash';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        user: userData, 
        clientSystemInfo
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

const captureBrowserWidth = () => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    store.dispatch(actionSetBrowserWidth(width));
}

const App = ({ id, user, isLoggedIn }) => {

    store.dispatch(actionSetUser(id, user, isLoggedIn));

    useEffect(() => {
        captureBrowserWidth();
        const debouncedCaptureBrowserWidth = _.debounce(captureBrowserWidth, 200);

        window.addEventListener("resize", debouncedCaptureBrowserWidth);
        return () => {
            window.removeEventListener('resize', debouncedCaptureBrowserWidth);
        }
    }, []);

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
