import ActionTypes from '../constants/actionTypes';

const userData = (state = { isLoggedIn: false, username: '' }, action) => {
    switch (action.type) {
        case ActionTypes.STORE_USER_INFO: {
            const { isLoggedIn, username } = action.payload;

            return {
                ...state,
                isLoggedIn,
                username,
            };
        }
        default: {
            return state;
        }
    }
};

export default userData;
