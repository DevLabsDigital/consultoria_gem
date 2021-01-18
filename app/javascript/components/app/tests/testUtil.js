import {applyMiddleware, createStore} from "redux";
import {middlewares, rootReducer} from "../store";

export const storeFactory = initialState => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddleware(rootReducer, initialState)
}