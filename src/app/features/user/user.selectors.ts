import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { attachPhoto } from './user.utils';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (userState: UserState) => {
    return userState.users.map(attachPhoto);
  }
);

export const selectUser = createSelector(
  selectUserState,
  (userState: UserState) => {
    return userState.user != null ? attachPhoto(userState.user) : null;
  }
);
