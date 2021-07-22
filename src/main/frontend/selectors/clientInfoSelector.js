import { createSelector } from 'reselect';

// TODO: Define 992 as MOBILE_NAVBAR_BREAKPOINT
export const selectIsMobileNavbar = createSelector(
    state => state.clientSystemInfo,
    clientSystemInfo => clientSystemInfo.width < 992
);
