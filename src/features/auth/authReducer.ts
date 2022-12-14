import { cardsApi, LoginDataType, RecoveryPasswordType } from '../../api/cards-api'
import { AppThunk } from '../../app/store'
import { profileAC, ShowProfileEmailAC } from '../profile/profileReducer'

const InitialState = {
  isLoggedIn: false as boolean,
  error: '' as string,
}

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setError>

export const authReducer = (state: typeof InitialState = InitialState, action: AuthActionsType) => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
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
export const setError = (message: string) => {
  return {
    type: 'LOGIN/SET-ERROR',
    message,
  } as const
}
export const LoginTC =
  (data: LoginDataType): AppThunk =>
  dispatch => {
    cardsApi
      .login(data)
      .then(res => {
        console.log(res)
        dispatch(setIsLoggedInAC(true))
        dispatch(ShowProfileEmailAC(res.data.email))
        dispatch(profileAC({ name: res.data.name, avatar: '' }))
      })
      .catch(error => {
        console.log(error.message)
        dispatch(setError(error.message))
      })
  }
export const logOutTC = (): AppThunk => dispatch => {
  cardsApi.logOut().then(res => {
    console.log(res.data)
    dispatch(setIsLoggedInAC(false))
  })
}
export const passwordRecoveryTC =
  (data: RecoveryPasswordType): AppThunk =>
  dispatch => {
    cardsApi.recoveryPassword(data).then(res => console.log(res))
  }
