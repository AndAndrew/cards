import { authApi } from '../api/auth-api'
import { setIsLoggedInAC } from '../features/auth/authReducer'
import { profileAC, showProfileEmailAC } from '../features/profile/profileReducer'

import { AppThunk } from './store'

const initialState = {
  appStatus: 'idle' as appStatusType,
  isInitialized: false as boolean,
}

export type appStatusType = 'idle' | 'successes' | 'failed' | 'loading'

export type AppReducerActionType =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof isInitializedAC>

export const appReducer = (
  state: typeof initialState = initialState,
  action: AppReducerActionType
) => {
  switch (action.type) {
    case 'APP/SET-APP-STATUS':
      return { ...state, appStatus: action.status }
    case 'APP/IS-INITIALIZED':
      return { ...state, isInitialized: action.value }
    default:
      return state
  }
}
export const setAppStatus = (status: appStatusType) => {
  return { type: 'APP/SET-APP-STATUS', status } as const
}
export const isInitializedAC = (value: boolean) => {
  return { type: 'APP/IS-INITIALIZED', value } as const
}
export const isInitializedTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus('loading'))
  authApi
    .me()
    .then(res => {
      dispatch(setIsLoggedInAC(true))
      dispatch(profileAC({ name: res.data.name, avatar: '', _id: res.data._id }))

      dispatch(showProfileEmailAC(res.data.email))
    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => {
      dispatch(isInitializedAC(true))
      dispatch(setAppStatus('successes'))
    })
}
