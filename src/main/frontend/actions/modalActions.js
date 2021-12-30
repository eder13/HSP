import ActionTypes from '../constants/actionTypes';

export const actionSetModal = data => ({
    type: ActionTypes.SET_MODAL_ACTIVE,
    payload: { ...data }
});

export const actionResetModal = () => ({
    type: ActionTypes.RESET_MODAL
});
