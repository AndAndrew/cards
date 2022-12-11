let initialState: {} = {}

export type ProfileType = {}
export type ProfileActionsType = ReturnType<typeof profileAC>

export const profileReducer = (
  state: ProfileType = initialState,
  action: ProfileActionsType
): ProfileType => {
  switch (action.type) {
    case 'PROFILE':
      return state
    default:
      return state
  }
}

export const profileAC = () => {
  return {
    type: 'PROFILE',
  } as const
}
