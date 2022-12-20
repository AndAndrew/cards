import { cardsApi, PackType } from '../../api/cards-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'

const initialState = {
  cardPacks: [] as Array<PackType>,
  cardPacksTotalCount: 0 as number,
  maxCardsCount: 0 as number,
  minCardsCount: 0 as number,
  page: 0 as number,
  pageCount: 0 as number,
}

type InitialStateType = typeof initialState
export type CardPacksActionsType = ReturnType<typeof setCardPacks>

export const cardPacksReducer = (
  state: InitialStateType = initialState,
  action: CardPacksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET_PACKS':
      return { ...state, cardPacks: [...action.packs] }
    default:
      return state
  }
}

export const setCardPacks = (packs: Array<PackType>) =>
  ({ type: 'PACKS/SET_PACKS', packs } as const)

export const getCardPacks =
  (id?: string, page?: number, pageCount?: number): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.getPacks(id, page, pageCount).then(res => {
      dispatch(setCardPacks(res.data.cardPacks))
      dispatch(setAppStatus('idle'))
    })
  }
