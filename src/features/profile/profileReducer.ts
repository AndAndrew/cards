import { cardsApi, ProfileDataType } from '../../api/cards-api'
import { AppRootStateType, AppThunk } from '../../app/store'

const initialState = {
  name: '' as string,
  avatar: '' as string,
  email: '' as string,
}

export type ProfileActionsType =
  | ReturnType<typeof profileAC>
  | ReturnType<typeof ShowProfileEmailAC>

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
export const ShowProfileEmailAC = (email: string) => {
  return { type: 'PROFILE/SHOW-EMAIL', email } as const
}

type ChangeProfileModelType = {
  name?: string
  avatar?: string
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

    cardsApi.changeProfileData(ApiModel).then(res => {
      console.log(res)
      dispatch(profileAC(res.data.updatedUser))
    })
  }
