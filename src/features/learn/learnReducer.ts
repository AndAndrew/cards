import { cardsApi, CardsPackType, CardType } from '../../api/cards-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'

const initialState = {
  cards: [] as Array<CardType>,
  packName: '',
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 10,
  packUserId: '',
}

type InitialStateType = typeof initialState
export type CardsActionsType = ReturnType<typeof setCards> | ReturnType<typeof resetToDefault>

export const learnReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET_CARDS_PACK':
      return { ...action.cardPack }

    case 'CARDS/RESET_TO_DEFAULT':
      return initialState
    default:
      return state
  }
}
export const setCards = (cardPack: CardsPackType) =>
  ({ type: 'CARDS/SET_CARDS_PACK', cardPack } as const)
export const resetToDefault = () => ({ type: 'CARDS/RESET_TO_DEFAULT' } as const)

export const getCards =
  (id: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi
      .getCards(id)
      .then(res => dispatch(setCards(res.data)))
      .finally(() => dispatch(setAppStatus('successes')))
  }
