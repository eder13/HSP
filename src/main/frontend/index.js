import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { axios } from './components/util/axiosConfig';
import 'normalize.css';

(async () => {

    console.log('%cWant to contribute? Feel free to submit your Pull Requests! 👨‍💻', 'background-color: #333; padding: 0.3rem 1.5rem; font-size: 1.2em; line-height: 1.4em; color: white;');
    console.log('https://github.com/eder13/HSP')

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
        const render = (App) => {
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
    }
})();