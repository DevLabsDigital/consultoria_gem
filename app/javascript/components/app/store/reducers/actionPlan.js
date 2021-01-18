import {createSlice} from "@reduxjs/toolkit";
import api from "../../core/network";
import {all, takeEvery, call, put} from "@redux-saga/core/effects";
import {genericError} from "../../util/toast_util";

const INITIAL_STATE = {
    modalNewPlanVisible: false,
    modalActionPlanData: null,
    boards: [],
}

const actionPlanSlice = createSlice({
    name: 'actionPlan',
    initialState: INITIAL_STATE,
    reducers: {
        openNewPlanModal(state, action) {
            state.modalNewPlanVisible = true
            state.modalActionPlanData = action.payload
        },
        closeNewPlanModal(state) {
            state.modalNewPlanVisible = false
            state.modalActionPlanData = null
        },
        createNewActionPlan(state) {
        },
        createNewActionPlanSucess(state) {
        },
        listBoardRequest() {
        },
        listBoardSuccess(state, action) {
            state.boards = action.payload
        },
    }
})

export const {
    openNewPlanModal,
    closeNewPlanModal,
    createNewActionPlan,
    createNewActionPlanSucess,
    listBoardRequest,
    listBoardSuccess,
} = actionPlanSlice.actions


export default actionPlanSlice.reducer


function* requestNewActionPlan({payload}) {
    try {
        let response
        if (!payload.id) {
            const {data} = yield call(api.post, '/boards', {title: payload.title})
            response = data
        } else {
            const {data} = yield call(api.put, `/boards/${payload.id}`, {title: payload.title})
            response = data
            yield put(listBoardRequest())
        }
        yield put(closeNewPlanModal())
        yield put(createNewActionPlanSucess(response))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* listBoards() {
    try {
        const {data: response} = yield call(api.get, '/boards')
        yield put(listBoardSuccess(response.data))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

export function* actionPlanSaga() {
    return yield all([
        takeEvery(createNewActionPlan.type, requestNewActionPlan),
        takeEvery(listBoardRequest.type, listBoards),
    ])
}

