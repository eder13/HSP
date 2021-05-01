import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../sites/Home';
import Navbar from '../ui/Navbar';
import Dashboard from '../sites/Dashboard';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/dash" component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
