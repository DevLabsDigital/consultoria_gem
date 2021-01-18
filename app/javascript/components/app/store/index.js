import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import actionPlanDetail from "./reducers/actionPlanDetail";
import actionPlan from "./reducers/actionPlan";
import saga from "./saga";
import { connectRouter } from "connected-react-router"
import history from "../core/routesHistory";

export const rootReducer = combineReducers({
    actionPlanDetail,
    actionPlan,
    router: connectRouter(history),
})

const sagaMiddleware = createSagaMiddleware()

export const middlewares = [...getDefaultMiddleware(), sagaMiddleware]

const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewares,
    })
    sagaMiddleware.run(saga)
    return store
}

export default createStore()