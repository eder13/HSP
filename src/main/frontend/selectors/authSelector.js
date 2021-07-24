import { createSelector } from 'reselect';

export const selectLoggedIn = createSelector(
    (state) => state.user,
    (user) => user.isLoggedIn
);

export const selectUser = createSelector(
    (state) => state.user,
    (user) => user.username
);

export const selectUserId = createSelector(
    (state) => state.user,
    (user) => user.id
);
