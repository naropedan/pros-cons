import * as actionTypes from '../actions/action-types/prosCons';

const initialState = {
    prosList: [
        {
            id: 1,
            title: 'aaa'
        },
        {
            id: 2,
            title: 'bbb'
        },
        {
            id: 3,
            title: 'ccc'
        }
    ],
    consList: [
        {
            id: 1,
            title: 'ddd'
        },
        {
            id: 2,
            title: 'eee'
        },
        {
            id: 3,
            title: 'fff'
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SORT_PROS_LIST_WITH_DRAG: {
            const {payload: {dragIndex, hoverIndex}} = action;
            const prosList = dragItem([...state.prosList], dragIndex, hoverIndex);

            return {
                ...state,
                prosList
            };
        }

        case actionTypes.SORT_CONS_LIST_WITH_DRAG: {
            const {payload: {dragIndex, hoverIndex}} = action;
            const consList = dragItem([...state.consList], dragIndex, hoverIndex);

            return {
                ...state,
                consList
            };
        }

        case actionTypes.CREATE_PROS_ITEM: {
            const {payload: {title}} = action;
            const prosList = [...state.prosList];

            prosList.push({
                id: prosList.length + 1,
                title
            });

            return {
                ...state,
                prosList
            };
        }

        case actionTypes.CREATE_CONS_ITEM: {
            const {payload: {title}} = action;
            const consList = [...state.consList];

            consList.push({
                id: consList.length + 1,
                title
            });

            return {
                ...state,
                consList
            };
        }

        case actionTypes.EDIT_PROS_TITLE: {
            const {payload: {title, index}} = action;
            const prosList = [...state.prosList];

            prosList[index].title = title;

            return {
                ...state,
                prosList
            };
        }

        case actionTypes.EDIT_CONS_TITLE: {
            const {payload: {title, index}} = action;
            const consList = [...state.consList];

            consList[index].title = title;

            return {
                ...state,
                consList
            };
        }

        default:
            return state;
    }
}

const dragItem = (items, dragIndex, hoverIndex) => {
    const removedItem = items.splice(dragIndex, 1)[0];

    items.splice(hoverIndex, 0, removedItem);

    return items;
};