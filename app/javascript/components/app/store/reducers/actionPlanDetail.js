import {createAction, createSlice} from "@reduxjs/toolkit";
import {all, call, put, takeEvery, select} from "@redux-saga/core/effects";
import api from "../../core/network";
import {extractIdFromPathname} from "../../util/route_util";
import {findListid} from "../../util/action_plan_util";
import {genericError} from "../../util/toast_util";

export const loadActionPlanData = createAction('actionPlanDetail/loadData')
export const loadrequestBoard = createAction('actionPlanDetail/requestBoard')

export const changeActionPlanCardPosition = createAction('actionPlanDetail/changeActionPlanCardPosition')
export const createNewCardActionPlan = createAction('actionPlanDetail/createNewCardActionPlan')
export const deleteCardActionPlan = createAction('actionPlanDetail/deleteCardActionPlan')
export const handleOpenCardActionPlan = createAction('actionPlanDetail/handleOpenCardActionPlan')
export const handleAddNewCheckList = createAction('actionPlanDetail/handleAddNewCheckList')
export const handleUpdateCheckList = createAction('actionPlanDetail/handleUpdateCheckList')
export const handleDeleteCheckList = createAction('actionPlanDetail/handleDeleteCheckList')
export const handleAddTag = createAction('actionPlanDetail/handleAddTag')
export const fetchTags = createAction('actionPlanDetail/fetchTags')
export const handleAddUser = createAction('actionPlanDetail/handleAddUser')
export const deleteTag = createAction('actionPlanDetail/deleteTag')
export const removeTag = createAction('actionPlanDetail/removeTag')
export const updateTag = createAction('actionPlanDetail/updateTag')
const initialState = {
    item: {
        visible: false,
        cardValue: null,
        modalChecklist: {
            visible: false,
        },
        modalTag: {
            visible: false,
        },
        modalUser: {
            visible: false,
        },
        newCommentInputValue: '',
    },
    newCard: {
        visible: false,
        listId: null,
        //o id do board `e para dar o refresh nos itens depois do novo card salvo
        boardId: null,
    },
    items: [],
    board: {},
    modalCopyCard: {
        visible: false,
        cardId: null,
        listId: null,
    },
    tags: [],
    filters: {
        text: '',
        status: {
            scheduled: false,
            in_progress: false,
            delayed: false,
            completed: false,
        }

    }
}

const actionPlanDetailSlice = createSlice({
    name: 'actionPlanDetail',
    initialState,
    reducers: {
        openItemModal(state, action) {
            state.item = {...state.item, visible: true, cardValue: action.payload, newCommentInputValue: ''}
        },
        closeItemModal(state, action) {
            state.item = {...state.item, visible: false, cardValue: null}
        },
        openAddChecklistModal(state, action) {
            state.item = {...state.item, modalChecklist: {visible: true}}
        },
        closeAddChecklistModal(state, action) {
            state.item = {...state.item, modalChecklist: {visible: false}}
        },
        openAddTagModal(state, action) {
            state.item = {...state.item, modalTag: {visible: true, withoutCard: action?.payload?.withoutCard}}
        },
        closeAddTagModal(state, action) {
            state.item = {...state.item, modalTag: {visible: false}}
        },
        openAddUserModal(state, action) {
            state.item = {...state.item, modalUser: {visible: true}}
            if(action.payload) {
                state.item.cardValue = action.payload
            }
        },
        closeAddUserModal(state, action) {
            state.item = {...state.item, modalUser: {visible: false}}
        },
        openCopyCardModal(state, action) {
            state.modalCopyCard = {visible: true, ...action.payload}
        },
        closeCopyCardModal(state, action) {
            state.modalCopyCard = {visible: false, cardId: null, listId: null}
        },
        openNewCardModal(state, action) {
            const {listId, boardId} = action.payload
            state.newCard = {visible: true, listId, boardId}
        },
        closeNewCardModal(state, action) {
            state.newCard = {visible: false, listId: null, boardId: null}
        },
        loadTags(state, action) {
            state.tags = action.payload.data
        },
        loadBoardDataSuccess(state, action) {
            state.board = action.payload
        },
        loadActionPlanDataSuccess(state, action) {
            state.items = action.payload
        },
        changeTemporalyActionPlanCardPosition(state, action) {
            state.items = action.payload
        },
        changeNewCommentValue(state, action) {
            state.item.newCommentInputValue = action.payload
        },
        handleNewCommentRequest(state, action) {},
        handleNewReply(state, action) {},
        editComment(state, action) {},
        deleteComment(state, action) {},
        editDescription(state, action) {},
        deleteChecklist(state, action) {},
        createTask(state, action) {},
        deleteTask(state, action) {},
        changeTask(state, action) {},
        updateTask(state, action) {},
        copyCard(state, action) {},
        handleFilterCheck(state, action) {
            const {field, value} = action.payload
            state.filters.status[field] = value
        }
    },
})

export const {
    closeItemModal,
    openItemModal,
    loadActionPlanDataSuccess,
    changeTemporalyActionPlanCardPosition,
    closeNewCardModal,
    openNewCardModal,
    openAddChecklistModal,
    closeAddChecklistModal,
    openAddTagModal,
    closeAddTagModal,
    openAddUserModal,
    closeAddUserModal,
    changeNewCommentValue,
    handleNewCommentRequest,
    handleNewReply,
    editComment,
    deleteComment,
    editDescription,
    deleteChecklist,
    createTask,
    deleteTask,
    changeTask,
    updateTask,
    openCopyCardModal,
    closeCopyCardModal,
    copyCard,
    handleFilterCheck,
    loadTags,
    loadBoardDataSuccess
} = actionPlanDetailSlice.actions

export default actionPlanDetailSlice.reducer

function* requestActionPlanData({payload}) {
    try {
        const {data: response} = yield call(api.get, `/${payload}/lists`)
        const {data} = response

        let objFinal = {
            columns: {},
        }
        //A lib para fazer drag and drop pecisa das keys (que no caso sao os ids em string), por isso estou passando para string
        data.forEach(lista => {
            objFinal[lista.attributes.status] = {
                id: lista.id.toString(),
                ids: lista.attributes.cards.map(item => item.id.toString())
            }
            lista.attributes.cards.forEach(item => {
                objFinal.columns = {...objFinal.columns, [item.id.toString()]: {...item, id: item.id.toString()}}
            })
        })


        yield put(loadActionPlanDataSuccess(objFinal))
        yield put(fetchTags())
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestBoard({payload}) {
    try {
        let response
        {
            const {data} = yield call(api.get, `/boards/${payload.id}`)
            response = data
        }
        
        yield put(loadBoardDataSuccess(response))
    } catch (e) {
        genericError()
        console.log(e)
    }
}


function* requestChangeCardPosition({payload}) {
    try {
        const {data, idToRefresh: boardId} = payload
        yield call(api.put, 'cards/move_to_list', data)
        
        yield put(loadActionPlanData(boardId))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestCreateNewCardActionPlan({payload}) {
    
    try {
        const {listId, boardId, ...value} = payload
        const {data} = yield call(api.post, `${listId}/cards`, value)
        yield put(closeNewCardModal())
        yield put(openItemModal(data.data))
        yield put(loadActionPlanData(boardId))

    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestDeleteCardActionPlan({payload}) {
    try {
        const {listId, boardId, cardId} = payload
        yield call(api.delete, `${listId}/cards/${cardId}`)
        yield put(loadActionPlanData(boardId))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestDetailCardActionPlan({payload}) {
    try {
        const {listId, cardId} = payload
        const {data} = yield call(api.get, `${listId}/cards/${cardId}`)
        yield put(openItemModal(data.data))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestAddNewCheckList({payload}) {
    try {
        const {title, cardId} = payload
        const {items} = yield select(state => state.actionPlanDetail)

        yield call(api.post, `${cardId}/checklists`, {title})
        yield put(closeAddChecklistModal())

        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}
function* requestUpdateCheckList({payload}) {
    try {
        const {title, cardId, id} = payload
        const {items} = yield select(state => state.actionPlanDetail)

        yield call(api.put, `${cardId}/checklists/${id}`, {title})

        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestTags({payload}){
    const [pathname, items] = yield select(state => [state.router.location.pathname, state.actionPlanDetail.items])
    const boardId = extractIdFromPathname(pathname)

    const {data} = yield call(api.get, `${boardId}/tags`)
    
    yield put(loadTags(data))
    
}
function* requestAddTag({payload}) {
    try {
        const [pathname, items] = yield select(state => [state.router.location.pathname, state.actionPlanDetail.items])
        const boardId = extractIdFromPathname(pathname)
        const {name, cardId, withoutCard} = payload

        const {data} = yield call(api.post, `${boardId}/tags`, {name})

        if(!withoutCard){
            yield call(api.post, `${cardId}/tagging`, {consultoria_tag_id: data.data.id})
            yield put(closeAddTagModal())
        }

        yield put(fetchTags())

        if(!withoutCard){
            yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
        }
    } catch (e) {
        genericError()
        console.log(e)
    }
}
function* requestAddUser({payload}) {
    try {
        const [pathname, items] = yield select(state => [state.router.location.pathname, state.actionPlanDetail.items])
        const boardId = extractIdFromPathname(pathname)
        const {userIds, cardId, isMainUser} = payload

        yield call(api.post, `${boardId}/add_user_to_card`, {id: cardId, user_ids: userIds, is_main: isMainUser})
        yield put(closeAddUserModal())
        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestCopyCard({payload}) {
    try {
        const [pathname, items] = yield select(state => [state.router.location.pathname, state.actionPlanDetail.items])
        const boardId = extractIdFromPathname(pathname)
        const {listId, cardId, value} = payload

        const {data} = yield call(api.post, `${listId}/cards/copy_card`, {...value})
        
        //yield put(closeAddTagModal())
        yield put(closeCopyCardModal())
        yield put(loadActionPlanData(boardId))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestRemoveTag({payload}) {
    try {
        const [pathname, items] = yield select(state => [state.router.location.pathname, state.actionPlanDetail.items])
        const {id} = payload
        const boardId = extractIdFromPathname(pathname)

        yield call(api.delete, `${boardId}/tags/${id}`)
        yield put(fetchTags())
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestUpdateTag({payload}) {
    try {
        const [pathname, items] = yield select(state => [state.router.location.pathname, state.actionPlanDetail.items])
        const {id, name} = payload
        const boardId = extractIdFromPathname(pathname)

        yield call(api.put, `${boardId}/tags/${id}`, {name})
        yield put(fetchTags())
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestDeleteTag({payload}) {
    try {
        const {items} = yield select(state => state.actionPlanDetail)
        const {consultoria_tag_id, cardId} = payload

        yield call(api.delete, `${cardId}/tagging`, {data: {consultoria_tag_id}})
        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestNewComment({payload}) {
    try {
        const {value: description, cardId} = payload
        const {items} = yield select(state => state.actionPlanDetail)

        yield call(api.post, `${cardId}/comments`, {description})
        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestNewReply({payload}) {
    try {
        const {value: description, cardId, commentId} = payload
        const {items} = yield select(state => state.actionPlanDetail)

        yield call(api.post, `${cardId}/comments/${commentId}/replies`, {description})
        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestEditComment({payload}) {
    try {
        const {value: description, cardId, commentId} = payload
        const {items} = yield select(state => state.actionPlanDetail)

        yield call(api.put, `${cardId}/comments/${commentId}`, {description})
        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestDeleteComment({payload}) {
    try {
        const {cardId, commentId} = payload
        const {items} = yield select(state => state.actionPlanDetail)

        yield call(api.delete, `${cardId}/comments/${commentId}`)
        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestEditDescription({payload}) {
    try {
        const {title, description, cardId} = payload
        const [pathname, items] = yield select(state => [state.router.location.pathname, state.actionPlanDetail.items])
        const boardId = extractIdFromPathname(pathname)
        
        yield call(api.put, `${findListid(cardId, items)}/cards/${cardId}`, {description, title})

        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
        yield put(loadActionPlanData(boardId))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestDeleteCheckList({payload}) {
    try {
        const {id, cardId} = payload
        const [items] = yield select(state => [state.actionPlanDetail.items])

        yield call(api.delete, `${cardId}/checklists/${id}`)

        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestCreateTask({payload}) {
    try {
        const {cheklistId, description, cardId} = payload
        const [items] = yield select(state => [state.actionPlanDetail.items])

        yield call(api.post, `${cheklistId}/tasks`, {description})

        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))


    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestDeleteTask({payload}) {
    try {
        const {cheklistId, id, cardId} = payload
        const [items] = yield select(state => [state.actionPlanDetail.items])
        debugger
        yield call(api.delete, `${cheklistId}/tasks/${id}`)

        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* updateInnerTask({payload}) {
    try {
        const {cheklistId, description, id, cardId} = payload
        const [items] = yield select(state => [state.actionPlanDetail.items])
        
        yield call(api.put, `${cheklistId}/tasks/${id}`, {description})

        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

function* requestChangeTaskStatus({payload}) {
    try {
        const {completed, id, cardId} = payload
        const [items] = yield select(state => [state.actionPlanDetail.items])

        yield call(api.put, `tasks/mark_as_completed/${id}`, {completed})

        yield put(handleOpenCardActionPlan({listId: findListid(cardId, items), cardId}))
    } catch (e) {
        genericError()
        console.log(e)
    }
}

export function* actionPlanDetailSaga() {
    return yield all([
        takeEvery(loadrequestBoard.type, requestBoard),
        takeEvery(loadActionPlanData.type, requestActionPlanData),
        takeEvery(changeActionPlanCardPosition.type, requestChangeCardPosition),
        takeEvery(createNewCardActionPlan.type, requestCreateNewCardActionPlan),
        takeEvery(deleteCardActionPlan.type, requestDeleteCardActionPlan),
        takeEvery(handleOpenCardActionPlan.type, requestDetailCardActionPlan),
        takeEvery(handleAddNewCheckList.type, requestAddNewCheckList),
        takeEvery(handleUpdateCheckList.type, requestUpdateCheckList),
        takeEvery(handleAddTag.type, requestAddTag),
        takeEvery(fetchTags.type, requestTags),
        takeEvery(handleAddUser.type, requestAddUser),
        takeEvery(deleteTag.type, requestDeleteTag),
        takeEvery(removeTag.type, requestRemoveTag),
        takeEvery(updateTag.type, requestUpdateTag),
        takeEvery(handleNewCommentRequest.type, requestNewComment),
        takeEvery(handleNewReply.type, requestNewReply),
        takeEvery(editComment.type, requestEditComment),
        takeEvery(deleteComment.type, requestDeleteComment),
        takeEvery(editDescription.type, requestEditDescription),
        takeEvery(deleteChecklist.type, requestDeleteCheckList),
        takeEvery(createTask.type, requestCreateTask),
        takeEvery(deleteTask.type, requestDeleteTask),
        takeEvery(changeTask.type, requestChangeTaskStatus),
        takeEvery(updateTask.type, updateInnerTask),
        takeEvery(copyCard.type, requestCopyCard),
    ])
}