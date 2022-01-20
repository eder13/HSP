import { createSelector } from 'reselect';

export const selectModalActive = createSelector(
    state => state.modal,
    modal => Object.keys(modal).length > 0
);

export const selectModalType = createSelector(
    state => state.modal,
    modal => (Object.keys(modal).length <= 0 ? undefined : modal.type)
);

export const selectModalData = createSelector(
    state => state.modal,
    modal => ({
        title: modal.title,
        id: modal.id
    })
);
