import ActionTypes from './../constants/actionTypes';

export const actionSetUser = (isLoggedIn, user) => {
    return {
        type: ActionTypes.STORE_USER_INFO,
        payload: { isLoggedIn, username: user },
    };
};

