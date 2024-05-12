import React from 'react';
import 'react-native-gesture-handler';

import MainComponent from './components/MainComponent/MainComponent';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <MainComponent/>
        </Provider>
      
    );
}