let initialState: {} = {}

export type AuthType = {}
export type AuthActionsType = ReturnType<typeof loginAC>

export const authReducer = (state: AuthType = initialState, action: AuthActionsType): AuthType => {
  switch (action.type) {
    case 'LOGIN':
      return state
    default:
      return state
  }
}

export const loginAC = () => {
  return {
    type: 'LOGIN',
  } as const
}
