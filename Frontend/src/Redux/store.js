import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducers } from "./auth/reducers";
import { todoReducers } from "./todo/reducers";
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    authStore: authReducers,
    todoStore: todoReducers,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk,logger))
    );