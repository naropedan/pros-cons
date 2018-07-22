import * as actionTypes from '../action-types/prosCons';

export const sortProsListWithDrag = (payload) => ({
    type: actionTypes.SORT_PROS_LIST_WITH_DRAG,
    payload
});

export const sortConsListWithDrag = (payload) => ({
    type: actionTypes.SORT_CONS_LIST_WITH_DRAG,
    payload
});

export const createProsItem = (payload) => ({
    type: actionTypes.CREATE_PROS_ITEM,
    payload
});

export const createConsItem = (payload) => ({
    type: actionTypes.CREATE_CONS_ITEM,
    payload
});

export const editProsTitle = (payload) => ({
    type: actionTypes.EDIT_PROS_TITLE,
    payload
});

export const editConsTitle = (payload) => ({
    type: actionTypes.EDIT_CONS_TITLE,
    payload
});