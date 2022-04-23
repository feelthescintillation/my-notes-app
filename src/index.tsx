import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { AppConnected } from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const el = document.getElementById("myNoteRoot");
if (el === null) throw new Error('Root container missing in index.html')

const root = ReactDOM.createRoot(el);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppConnected />
        </Provider>
        ,
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
