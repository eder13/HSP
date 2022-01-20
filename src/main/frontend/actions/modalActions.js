import ActionTypes from '../constants/actionTypes';

export const actionSetModal = data => ({
    type: ActionTypes.SET_MODAL_ACTIVE,
    payload: { ...data }
});

export const actionDismissModal = modalInstance => ({
    type: ActionTypes.DISMISS_MODAL,
    payload: { modalInstance }
});

export const actionResetModal = () => ({
    type: ActionTypes.RESET_MODAL
});
