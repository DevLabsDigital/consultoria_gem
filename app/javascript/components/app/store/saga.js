import {all} from 'redux-saga/effects'
import {actionPlanSaga} from "./reducers/actionPlan";
import {actionPlanDetailSaga} from "./reducers/actionPlanDetail";

function* rootSaga() {
    return yield all([
        ...actionPlanSaga(),
        ...actionPlanDetailSaga(),
    ])
}

export default rootSaga