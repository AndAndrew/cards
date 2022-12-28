import {
  cardsApi,
  CardsPackType,
  CardEditType,
  CardType,
  GradeChangeType,
} from '../../api/cards-api'
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
export type CardsActionsType =
  | ReturnType<typeof setCardsPack>
  | ReturnType<typeof addCardAC>
  | ReturnType<typeof deleteCardAC>
  | ReturnType<typeof editCardAC>
  | ReturnType<typeof resetToDefault>

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET_CARDS_PACK':
      return { ...action.cardPack }
    case 'CARDS/ADD_CARD':
      return { ...state, cards: [action.card, ...state.cards] }
    case 'CARDS/DELETE_CARD':
      return { ...state, cards: state.cards.filter(card => card._id !== action.cardId) }
    case 'CARDS/EDIT_CARD':
      return {
        ...state,
        cards: state.cards.map(card => (card._id === action.card._id ? { ...action.card } : card)),
      }
    case 'CARDS/RESET_TO_DEFAULT':
      return initialState
    default:
      return state
  }
}

export const setCardsPack = (cardPack: CardsPackType) =>
  ({ type: 'CARDS/SET_CARDS_PACK', cardPack } as const)
export const addCardAC = (card: CardType) => ({ type: 'CARDS/ADD_CARD', card } as const)
export const deleteCardAC = (cardId: string) => ({ type: 'CARDS/DELETE_CARD', cardId } as const)
export const editCardAC = (card: CardType) => ({ type: 'CARDS/EDIT_CARD', card } as const)
export const resetToDefault = () => ({ type: 'CARDS/RESET_TO_DEFAULT' } as const)

export const getCards =
  (id: string, page: number, pageCount: number): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.getCards(id, page, pageCount).then(res => {
      dispatch(setCardsPack(res.data))

      dispatch(setAppStatus('successes'))
    })
  }

export const addCard =
  (data: CardType): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.addCard(data).then(res => {
      dispatch(addCardAC(res.data.newCard))
      dispatch(setAppStatus('successes'))
    })
  }
export const deleteCard =
  (cardId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.deleteCard(cardId).then(res => {
      dispatch(deleteCardAC(cardId))
      dispatch(setAppStatus('successes'))
    })
  }
export const editCard =
  (data: CardEditType): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.editCard(data).then(res => {
      dispatch(editCardAC(res.data.updatedCard))
      dispatch(setAppStatus('successes'))
    })
  }
export const changeGradeTC =
  (data: GradeChangeType): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.changeGrade(data).then(res => {
      dispatch(getCards(data.cardsPack_id, 2, 2))
      dispatch(setAppStatus('successes'))
    })
  }
