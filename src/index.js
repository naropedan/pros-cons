import ProsCons from './containers/ProsCons';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import React from 'react';

ReactDOM.render(
    <Provider store={store}>
        <ProsCons/>
    </Provider>,
    document.getElementById('root')
);