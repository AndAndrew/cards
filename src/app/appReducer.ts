const initialState = {
  appStatus: 'idle' as appStatusType,
}

export type appStatusType = 'idle' | 'successes' | 'failed' | 'loading'

export type AppReducerActionType = ReturnType<typeof setAppStatus>

export const appReducer = (
  state: typeof initialState = initialState,
  action: AppReducerActionType
) => {
  switch (action.type) {
    case 'APP/SET-APP-STATUS':
      return { ...state, appStatus: action.status }
    default:
      return state
  }
}
export const setAppStatus = (status: appStatusType) => {
  return { type: 'APP/SET-APP-STATUS', status } as const
}
