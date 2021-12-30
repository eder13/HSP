import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // TODO PROD: Remove this import
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
        // TODO PROD: Remove the below code
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

        // TODO PROD: Uncomment the below Code
        /*
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        );
        */
    }
})();
