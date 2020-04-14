import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from "./reducers/InitialState";
import { PersistGate } from 'redux-persist/integration/react';
import * as PostAction from "./actions/PostAction";
import App from './pages/App';
import "./styles/styles.css";
import "pwacompat";

export const { store, persistor } = configureStore(initialState);

if (navigator.userAgent.includes('Googlebot')) {
    console.log("not using service worker because this is google bot");
}
else if ('serviceWorker' in navigator) {
    // Check that service workers are supported
    window.addEventListener('load', () => {
        // Use the window load event to keep the page load performant
        navigator.serviceWorker.register('/sw.js').then(reg => {
            reg.addEventListener('updatefound', () => {
                let insworker = reg.installing;
                insworker.addEventListener('statechange', () => {
                    if (insworker.state == 'installed') {
                        //reload window or show ui for refreshing the app
                        store.dispatch(PostAction.loadPosts());
                        // window.location.reload();
                    }
                });
            });
        });
    });
}

setTimeout(() => {
    //initial load
    const states = store.getState();
    if (states.posts.items[0].title == "") {
        store.dispatch(PostAction.loadPosts());
    }
}, 1000)






render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);

