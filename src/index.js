import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from "./reducers/InitialState";
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { PersistGate } from 'redux-persist/integration/react';
import * as PostAction from "./actions/PostAction";
import App from './pages/App';
import "./styles/styles.css";

if ('serviceWorker' in navigator) {
    OfflinePluginRuntime.install({
        onUpdating: () => {
            console.log('SW Event:', 'onUpdating');
        },
        onUpdateReady: () => { console.log("update is ready"); OfflinePluginRuntime.applyUpdate(); },
        onUpdated: () => console.log("sw assets updated"),
        onUpdateFailed: () => {
            console.log('SW Event:', 'onUpdateFailed');
          }
    });
}

export const { store, persistor } = configureStore(initialState);

setTimeout(() => {
    store.dispatch(PostAction.loadPosts());
}, 1000);



render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);

