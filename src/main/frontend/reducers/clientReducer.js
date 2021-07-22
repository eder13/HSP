import ActionTypes from "../constants/actionTypes";

const clientSystemInfo = (state = { width: -1 }, action) => {
    switch (action.type) {
        case ActionTypes.SET_BROWSER_WIDTH:
            return {
                ...state,
                width: action.payload.width
            }
        default:
            return state;
    }
}

export default clientSystemInfo;
