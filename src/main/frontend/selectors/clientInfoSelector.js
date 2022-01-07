import { createSelector } from 'reselect';
import CLIENT_CONSTANTS from '../constants/clientConstants';

export const selectIsMobileNavbar = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width < CLIENT_CONSTANTS.MOBILE_NAVBAR_BREAKPOINT
);

export const selectIsMediaXS = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width >= CLIENT_CONSTANTS.XS && clientSystemInfo.width < CLIENT_CONSTANTS.SM
);

export const selectIsMediaSM = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width >= CLIENT_CONSTANTS.SM && clientSystemInfo.width < CLIENT_CONSTANTS.MD
);

export const selectIsMediaMD = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width >= CLIENT_CONSTANTS.MD && clientSystemInfo.width < CLIENT_CONSTANTS.LG
);

export const selectIsMediaLG = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width >= CLIENT_CONSTANTS.LG && clientSystemInfo.width < CLIENT_CONSTANTS.XL
);

export const selectIsMediaXL = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width >= CLIENT_CONSTANTS.XL && clientSystemInfo.width < CLIENT_CONSTANTS.XXL
);

export const selectIsMediaXXL = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width >= CLIENT_CONSTANTS.XXL
);
