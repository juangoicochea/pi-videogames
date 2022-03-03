import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'

// Reux Thunk -> middleware para tratar codigo asincrono en React Redux, nos permite usar dispatch como argumento en las actions creators
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))