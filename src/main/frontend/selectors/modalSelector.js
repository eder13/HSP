import { createSelector } from 'reselect';

export const selectModalActive = createSelector(
    state => state.modal,
    modal => Object.keys(modal).length > 0
);
