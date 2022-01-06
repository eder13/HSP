import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

/**
 * First Paint and Authentication before
 * Rendering React Components
 */
(async () => {
    let isLoggedIn = false;
    let user = '';
    let id = -1;

    try {
        const req = await axios.get('/user');
        if (req.status === 200) {
            isLoggedIn = true;
            user = req.data.email;
            id = req.data.id;
            console.log('[auth]: user is authenticated');
        } else {
            throw new Error();
        }
    } catch (e) {
        isLoggedIn = false;
        const errorMessage = await axios.get('/error?message=true');
        if (errorMessage.data?.length > 0) {
            console.error('[auth]:', errorMessage.data);
        }
        console.error('[auth]: user is not authenticated');
    } finally {
        if (process.env.NODE_ENV === 'development') {
            const hotModule = await import('react-hot-loader');
            const { AppContainer } = hotModule;
            const bootStrapIndicatorModule = await import('./components/utils/developmentUtils');
            const { bootstrapBreakpointIndicator } = bootStrapIndicatorModule;

            bootstrapBreakpointIndicator();
            const render = App => {
                ReactDOM.render(
                    <AppContainer>
                        <App id={id} user={user} isLoggedIn={isLoggedIn} />
                    </AppContainer>,
                    document.getElementById('root')
                );
            };

            render(App);

            if (module.hot) {
                module.hot.accept('./App.js', () => {
                    const NextRootContainer = require('./App').default;
                    render(NextRootContainer);
                });
            }
        } else {
            ReactDOM.render(
                <React.StrictMode>
                    <App id={id} user={user} isLoggedIn={isLoggedIn} />
                </React.StrictMode>,
                document.getElementById('root')
            );
        }
    }
})();
