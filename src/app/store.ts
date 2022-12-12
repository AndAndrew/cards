import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/auth/authReducer'
import { ProfileActionsType, profileReducer } from '../features/profile/profileReducer'
import { TestActionsType, testReducer } from '../features/test/testReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  test: testReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ProfileActionsType | AuthActionsType | TestActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  AppActionsType
>
