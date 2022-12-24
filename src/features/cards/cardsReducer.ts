import { cardsApi, CardType } from '../../api/cards-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'

const initialState = {
  cards: [] as Array<CardType>,
}

type InitialStateType = typeof initialState
export type CardsActionsType =
  | ReturnType<typeof setCardsPack>
  | ReturnType<typeof addCardAC>
  | ReturnType<typeof deleteCardAC>
  | ReturnType<typeof editCardAC>

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET_CARDS_PACK':
      return { cards: [...action.cards] }
    case 'CARDS/ADD_CARD':
      return { ...state, cards: [action.card, ...state.cards] }
    case 'CARDS/DELETE_CARD':
      return { ...state, cards: state.cards.filter(card => card._id !== action.cardId) }
    case 'CARDS/EDIT_CARD':
      return {
        ...state,
        cards: state.cards.map(card => (card._id === action.card._id ? { ...action.card } : card)),
      }
    default:
      return state
  }
}

export const setCardsPack = (cards: Array<CardType>) =>
  ({ type: 'CARDS/SET_CARDS_PACK', cards } as const)
export const addCardAC = (card: CardType) => ({ type: 'CARDS/ADD_CARD', card } as const)
export const deleteCardAC = (cardId: string) => ({ type: 'CARDS/DELETE_CARD', cardId } as const)
export const editCardAC = (card: CardType) => ({ type: 'CARDS/EDIT_CARD', card } as const)

export const getCards =
  (id: string, page: number, pageCount: number): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.getCards(id, page, pageCount).then(res => {
      dispatch(setCardsPack(res.data.cards))
      dispatch(setAppStatus('successes'))
    })
  }

export const addCard =
  (cardsPack_id: string, question?: string, answer?: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.addCard(cardsPack_id, question, answer).then(res => {
      dispatch(addCardAC(res.data.newCard))
      dispatch(setAppStatus('idle'))
    })
  }
export const deleteCard =
  (cardId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.deleteCard(cardId).then(res => {
      dispatch(deleteCardAC(cardId))
      dispatch(setAppStatus('idle'))
    })
  }
export const editCard =
  <T>(cardId: string, value: T): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.editCard<T>(cardId, value).then(res => {
      dispatch(editCardAC(res.data.updatedCard))
      dispatch(setAppStatus('idle'))
    })
  }
