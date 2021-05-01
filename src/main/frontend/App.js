import React from 'react';
import AppRouter from './components/routers/AppRouter';
import AuthContext from './stores/AuthStore';

const App = ({ isLoggedIn, user }) => {
    return (
        <AuthContext.Provider value={{ isLoggedIn, user }}>
            <AppRouter />
        </AuthContext.Provider>
    );
};

export default App;
