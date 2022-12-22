import { cardsApi, CardType } from '../../api/cards-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'

const initialState = {
  cards: [] as Array<CardType>,
}

type InitialStateType = typeof initialState
export type CardsActionsType = ReturnType<typeof setCardsPack>

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET_CARDS_PACK':
      return { ...state, cards: [...state.cards, ...action.cards] }
    default:
      return state
  }
}

export const setCardsPack = (cards: Array<CardType>) =>
  ({ type: 'CARDS/SET_CARDS_PACK', cards } as const)

export const getCards =
  (id: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.getCards(id).then(res => {
      dispatch(setCardsPack(res.data.cards))
      dispatch(setAppStatus('idle'))
    })
  }
