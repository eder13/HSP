import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../sites/Home';
import Navbar from '../ui/navbar/Navbar';
import Dashboard from '../sites/Dashboard';
import PrivateRoute from './PrivateRoute';
import ROUTES from './Routes';

const AppRouter = () => (
    <BrowserRouter>
        <Navbar />
        <Switch>
            {/* TODO -- HOME_DASHBOARD -- if logged in HOME else DASHBOARD */}
            <Route exact path={ROUTES.HOME_DASHBOARD} component={Home} />
            <PrivateRoute exact path={ROUTES.UPLOAD_FILE} component={Dashboard} />
        </Switch>
        {/* TODO: Footer with Benutzerregeln, Datenschutz und Impressum */}
    </BrowserRouter>
);

export default AppRouter;
