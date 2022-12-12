import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/auth/authReducer'
import { ProfileActionsType, profileReducer } from '../features/profile/profileReducer'
import { TestActionsType, testReducer } from '../features/test/testReducer'

import { appReducer, AppReducerActionType } from './appReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  test: testReducer,
  appStatus: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
  | ProfileActionsType
  | AuthActionsType
  | TestActionsType
  | AppReducerActionType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  AppActionsType
>
