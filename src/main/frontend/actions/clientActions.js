import ActionTypes from '../constants/actionTypes';

export const actionSetBrowserWidth = width => ({
    type: ActionTypes.SET_BROWSER_WIDTH,
    payload: { width }
});
