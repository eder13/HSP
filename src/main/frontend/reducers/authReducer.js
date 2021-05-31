import ActionTypes from '../constants/actionTypes';

const userData = (state = { isLoggedIn: false, username: '', id: -1}, action) => {
    switch (action.type) {
        case ActionTypes.STORE_USER_INFO: {
            const { isLoggedIn, username, id } = action.payload;

            return {
                ...state,
                isLoggedIn,
                username,
                id
            };
        }
        default: {
            return state;
        }
    }
};

export default userData;
