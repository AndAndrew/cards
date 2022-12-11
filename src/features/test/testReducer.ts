let initialState: {} = {}

export type TestType = {}
export type TestActionsType = ReturnType<typeof testAC>

export const testReducer = (state: TestType = initialState, action: TestActionsType): TestType => {
  switch (action.type) {
    case 'TEST':
      return state
    default:
      return state
  }
}

export const testAC = () => {
  return {
    type: 'TEST',
  } as const
}
