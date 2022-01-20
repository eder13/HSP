import ActionTypes from '../constants/actionTypes';

const modal = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SET_MODAL_ACTIVE: {
            return {
                ...action.payload
            };
        }

        case ActionTypes.DISMISS_MODAL: {
            const { modalInstance } = payload;
            modalInstance.hide();
            return {};
        }

        case ActionTypes.RESET_MODAL: {
            return {};
        }

        default:
            return state;
    }
};

export default modal;
