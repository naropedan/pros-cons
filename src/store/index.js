import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const setMiddleware = () => {
    let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    if (process.env.NODE_ENV === 'production') {
        composeEnhancers = (fn) => fn;
    }
    return composeEnhancers(applyMiddleware(thunk));
};

const store = createStore(rootReducer, setMiddleware());

export default store;