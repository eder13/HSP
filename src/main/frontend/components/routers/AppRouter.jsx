import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../sites/HomePage';
import Navbar from '../ui/navbar/Navbar';
import Dashboard from '../sites/Dashboard';
import PrivateRoute from './PrivateRoute';
import ROUTES from './Routes';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../selectors/authSelector';
import UserDashboardPage from '../sites/UserDashboardPage';

const AppRouter = () => {
    /**
     * Selectors
     */
    const isLoggedIn = useSelector(selectLoggedIn);

    /**
     * Render
     */
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path={ROUTES.HOME_USERDASHBOARD} component={isLoggedIn ? UserDashboardPage : HomePage} />
                <PrivateRoute exact path={ROUTES.UPLOAD_FILE} component={Dashboard} />
            </Switch>
            {/* TODO: Footer with Benutzerregeln, Datenschutz und Impressum */}
        </BrowserRouter>
    );
};

export default AppRouter;
