import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux'
import { save, load } from "redux-localstorage-simple"
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import { BrowserRouter } from 'react-router-dom'
import '../node_modules/bulma/css/bulma.css'

const createStoreWithMiddleware 
    = applyMiddleware(
        save() 
    )(createStore)


const store = createStoreWithMiddleware(rootReducer, load(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById("root"));

