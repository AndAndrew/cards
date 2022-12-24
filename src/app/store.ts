import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/auth/authReducer'
import { CardsActionsType, cardsReducer } from '../features/cards/cardsReducer'
import { CardPacksActionsType, packsReducer } from '../features/packs/packsReducer'
import { ProfileActionsType, profileReducer } from '../features/profile/profileReducer'
import { TestActionsType, testReducer } from '../features/test/testReducer'

import { appReducer, AppReducerActionType } from './appReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  test: testReducer,
  appStatus: appReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
  | ProfileActionsType
  | AuthActionsType
  | TestActionsType
  | AppReducerActionType
  | CardsActionsType
  | CardPacksActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  AppActionsType
>
