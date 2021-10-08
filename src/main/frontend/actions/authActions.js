import ActionTypes from './../constants/actionTypes';

export const actionSetUser = (id, user, isLoggedIn) => {
    return {
        type: ActionTypes.STORE_USER_INFO,
        payload: { id, isLoggedIn, username: user }
    };
};
