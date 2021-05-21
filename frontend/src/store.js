import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import { productDetailsReducer, productCreateReducer, productUpdateReducer, productDeleteReducer } from './reducers/productReducers';
import { userSigninReducer, userRegisterReducer, userdetailsReducer } from './reducers/userReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem("userInfo"))
            : null
    }
};
const reducer = combineReducers({
    //  Combining all reducers of my app. to store data in store.
    productDetailsReducer,
    productCreateReducer,
    productUpdateReducer,
    productDeleteReducer,
    userSignin: userSigninReducer,
    userRegisterReducer,
    userdetailsReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;