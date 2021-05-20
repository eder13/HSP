import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { axios } from './components/util/axiosConfig';
import 'normalize.css';

(async () => {
    let isLoggedIn = false;
    let user = '';

    try {
        const req = await axios.get('/user');
        if (req.status === 200) {
            isLoggedIn = true;
            user = req.data.email;
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
        const render = (App) => {
            ReactDOM.render(
                <AppContainer>
                    <App user={user} isLoggedIn={isLoggedIn} />
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
    }
})();