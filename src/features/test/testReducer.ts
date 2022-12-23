import { PingDataType, testApi } from '../../api/test-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'

let initialState = {
  currentPing: 0 as number,
}

export type TestActionsType = ReturnType<typeof testAC>

export const testReducer = (state: typeof initialState = initialState, action: TestActionsType) => {
  switch (action.type) {
    case 'TEST':
      return { state, currentPing: action.value }
    default:
      return state
  }
}

export const testAC = (value: number) => {
  return {
    type: 'TEST',
    value,
  } as const
}
export const testTC =
  (data: PingDataType): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    testApi.testPing(data).then(res => {
      dispatch(testAC(res.data.ping))
      dispatch(setAppStatus('successes'))
    })
  }
