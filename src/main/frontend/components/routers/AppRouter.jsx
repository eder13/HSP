import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../sites/HomePage';
import Navbar from '../organisms/navbar/Navbar';
import Dashboard from '../sites/Dashboard';
import PrivateRoute from './PrivateRoute';
import ROUTES from './Routes';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../selectors/authSelector';
import UserDashboardPage from '../sites/UserDashboardPage';
import About from '../sites/About';

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
            {/* Page Divider */}
            <div style={{ overflow: 'hidden', backgroundColor: 'rgb(242, 244, 254)' }}>
                <svg
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fill: '#ffffff', width: '100%', height: 42, transform: 'scaleX(-1)' }}
                >
                    <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
                </svg>
            </div>
            <Switch>
                <Route exact path={ROUTES.HOME_USERDASHBOARD} component={isLoggedIn ? UserDashboardPage : HomePage} />
                {/* TODO: Implement About Page */}
                <Route exact path={ROUTES.ABOUT} component={About} />
                {/* TODO: Implement My Account Page (if not logged in, show signup, otherwise show account) */}
                <Route exact path={ROUTES.ACCOUNT} component={null} />
                <PrivateRoute exact path={ROUTES.UPLOAD_FILE} component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
