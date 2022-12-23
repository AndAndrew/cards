import { authApi, ProfileDataType } from '../../api/auth-api'
import { AppRootStateType, AppThunk } from '../../app/store'

const initialState = {
  name: '' as string,
  avatar: '' as string,
  email: '' as string,
  _id: '' as string,
}

export type ProfileActionsType =
  | ReturnType<typeof profileAC>
  | ReturnType<typeof showProfileEmailAC>

export const profileReducer = (
  state: typeof initialState = initialState,
  action: ProfileActionsType
) => {
  switch (action.type) {
    case 'PROFILE/CHANGE-NAME':
      return { ...state, ...action.data }
    case 'PROFILE/SHOW-EMAIL':
      return { ...state, email: action.email }
    default:
      return state
  }
}

export const profileAC = (data: ChangeProfileModelType) => {
  return { type: 'PROFILE/CHANGE-NAME', data } as const
}
export const showProfileEmailAC = (email: string) => {
  return { type: 'PROFILE/SHOW-EMAIL', email } as const
}

type ChangeProfileModelType = {
  name?: string
  avatar?: string
  _id?: string
}
export const ChangeProfileTC =
  (data: ChangeProfileModelType): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    const ProfileState = getState().profile
    const ApiModel: ProfileDataType = {
      name: ProfileState.name,
      avatar: ProfileState.avatar,
      ...data,
    }

    authApi.changeProfileData(ApiModel).then(res => {
      console.log(res)
      dispatch(profileAC(res.data.updatedUser))
    })
  }
