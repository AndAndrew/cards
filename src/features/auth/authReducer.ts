import {
  cardsApi,
  CreateNewPasswordType,
  LoginDataType,
  RecoveryPasswordType,
} from '../../api/cards-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'
import { profileAC, ShowProfileEmailAC } from '../profile/profileReducer'

const InitialState = {
  isLoggedIn: false as boolean,
  error: null as string | null,
  isMessageSent: false as boolean,
  isNewPasswordCorrect: false as boolean,
}

export type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setError>
  | ReturnType<typeof isMessagesentAC>
  | ReturnType<typeof isNewPasswordCorrectAC>

export const authReducer = (state: typeof InitialState = InitialState, action: AuthActionsType) => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'IS-MESSAGE-SENT':
      return { ...state, isMessageSent: action.value }
    case 'IS-NEW-PASSWORD-CORRECT':
      return { ...state, isNewPasswordCorrect: action.value }
    case 'LOGIN/SET-ERROR':
      return { ...state, error: action.message }
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
export const isMessagesentAC = (value: boolean) => {
  return {
    type: 'IS-MESSAGE-SENT',
    value,
  } as const
}
export const isNewPasswordCorrectAC = (value: boolean) => {
  return {
    type: 'IS-NEW-PASSWORD-CORRECT',
    value,
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
    cardsApi.recoveryPassword(data).then(res => {
      dispatch(isMessagesentAC(true))
      console.log(res)
    })
  }
export const NewPasswordTC =
  (data: CreateNewPasswordType): AppThunk =>
  dispatch => {
    cardsApi.createNewPassword(data).then(res => {
      dispatch(isNewPasswordCorrectAC(true))
      res.data
    })
  }
