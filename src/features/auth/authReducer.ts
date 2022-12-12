import { cardsApi, LoginDataType, RecoveryPasswordType } from '../../api/cards-api'
import { AppThunk } from '../../app/store'
import { profileAC, ShowProfileEmailAC } from '../profile/profileReducer'

const InitialState = {
  isLoggedIn: false as boolean,
}

export type AuthActionsType = ReturnType<typeof loginAC>

export const authReducer = (state: typeof InitialState = InitialState, action: AuthActionsType) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

export const loginAC = (value: boolean) => {
  return {
    type: 'LOGIN',
    value,
  } as const
}
export const LoginTC =
  (data: LoginDataType): AppThunk =>
  dispatch => {
    cardsApi.login(data).then(res => {
      console.log(res)
      dispatch(loginAC(true))
      dispatch(ShowProfileEmailAC(res.data.email))
      dispatch(profileAC({ name: res.data.name, avatar: '' }))
    })
  }
export const logOutTC = (): AppThunk => dispatch => {
  cardsApi.logOut().then(res => {
    console.log(res.data)
    dispatch(loginAC(false))
  })
}
export const passwordRecoveryTC =
  (data: RecoveryPasswordType): AppThunk =>
  dispatch => {
    cardsApi.recoveryPassword(data).then(res => console.log(res))
  }
