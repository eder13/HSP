import { createSelector } from 'reselect';
import CLIENT_CONSTANTS from '../constants/clientConstants';

export const selectIsMobileNavbar = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width < CLIENT_CONSTANTS.MOBILE_NAVBAR_BREAKPOINT
);

export const selectIsMobile = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width < CLIENT_CONSTANTS.BREAKPOINT_XS
);
