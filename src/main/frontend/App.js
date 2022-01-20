import React from 'react';
import useWindowResizeListener from './hooks/useWindowResizeListener';
import PropTypes from 'prop-types';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { Provider } from 'react-redux';
import { api } from './middleware/api';
import { actionSetUser } from './actions/authActions';
import userData from './reducers/authReducer';
import clientSystemInfo from './reducers/clientReducer';
import modal from './reducers/modalReducer';
import AppRouter from './components/routers/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './css/variables.css';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        user: userData,
        clientSystemInfo,
        modal
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);

const App = props => {
    /**
     * Props
     */
    const { id, user, isLoggedIn } = props;

    /**
     * Actions
     */
    store.dispatch(actionSetUser(id, user, isLoggedIn));

    /**
     * Hooks
     */
    useWindowResizeListener(store.dispatch);

    /**
     * Render
     */
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};

App.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

export default App;
