import { Dispatch } from 'redux'

import {
  cardsApi,
  CreateNewPasswordType,
  LoginDataType,
  RecoveryPasswordType,
  RegisterDataType,
} from '../../api/cards-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'
import { profileAC, ShowProfileEmailAC } from '../profile/profileReducer'

const InitialState = {
  isLoggedIn: false as boolean,
  error: null as string | null,
  registered: false as boolean,
}

export type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setError>
  | ReturnType<typeof setIsRegisteredAC>

export const authReducer = (state: typeof InitialState = InitialState, action: AuthActionsType) => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'LOGIN/SET-ERROR':
      return { ...state, error: action.message }
    case 'REGISTERED/SET-IS-REGISTERED':
      return { ...state, registered: action.registered }
    default:
      return state
  }
}
export const setIsLoggedInAC = (value: boolean) => {
  return {
    type: 'LOGIN/SET-IS-LOGGED-IN',
    value,
  } as const
}
export const setError = (message: null | string) => {
  return {
    type: 'LOGIN/SET-ERROR',
    message,
  } as const
}
export const setIsRegisteredAC = (registered: boolean) => {
  return {
    type: 'REGISTERED/SET-IS-REGISTERED',
    registered,
  } as const
}
export const LoginTC =
  (data: LoginDataType): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi
      .login(data)
      .then(res => {
        console.log(res)
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatus('successes'))
        dispatch(ShowProfileEmailAC(res.data.email))
        dispatch(profileAC({ name: res.data.name, avatar: '' }))
      })
      .catch(error => {
        console.log(error.message)
        dispatch(setError(error.message))
      })
  }
export const logOutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus('loading'))
  cardsApi.logOut().then(res => {
    console.log(res.data)
    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatus('successes'))
  })
}
export const passwordRecoveryTC =
  (data: RecoveryPasswordType): AppThunk =>
  dispatch => {
    cardsApi.recoveryPassword(data).then(res => console.log(res))
  }
export const NewPasswordTC =
  (data: CreateNewPasswordType): AppThunk =>
  dispatch => {
    cardsApi.createNewPassword(data).then(res => res.data)
  }

export const registerTC = (data: RegisterDataType) => (dispatch: Dispatch) => {
  cardsApi
    .register(data)
    .then(res => {
      dispatch(setIsRegisteredAC(true))
    })
    .catch(error => {
      console.log(error.message)
      dispatch(setError(error.message))
    })
}
