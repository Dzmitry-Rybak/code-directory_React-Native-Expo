import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import i18n from './config/i18n';
import MainComponent from './components/MainComponent/MainComponent';
import store from './redux/store';

export default function App() {
    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <MainComponent/>
            </Provider>
        </I18nextProvider>
     
    );
}