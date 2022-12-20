import { cardsApi, PackType } from '../../api/cards-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'

const initialState = {
  cardPacks: [] as Array<PackType>,
  cardPacksTotalCount: 0 as number,
  maxCardsCount: 0 as number,
  minCardsCount: 0 as number,
  page: 1 as number,
  pageCount: 10 as number,
}

export const cardPacksReducer = (
  state: InitialStateType = initialState,
  action: CardPacksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET_PACKS':
      return { ...state, cardPacks: [...action.packs] }
    case 'PACKS/SET_PACKS_TOTAL_COUNT':
      return { ...state, cardPacksTotalCount: action.packsTotalCount }
    case 'PACKS/SET_PAGE_COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'PACKS/SET_PAGE_NUMBER':
      return { ...state, page: action.page }
    default:
      return state
  }
}

export const setCardPacksAC = (packs: Array<PackType>) =>
  ({ type: 'PACKS/SET_PACKS', packs } as const)

export const setPacksTotalCountAC = (packsTotalCount: number) =>
  ({ type: 'PACKS/SET_PACKS_TOTAL_COUNT', packsTotalCount } as const)

export const setPacksPageCountAC = (pageCount: number) =>
  ({ type: 'PACKS/SET_PAGE_COUNT', pageCount } as const)

export const setPacksPageNumberAC = (page: number) =>
  ({ type: 'PACKS/SET_PAGE_NUMBER', page } as const)

export const getCardPacks =
  (id?: string, page?: number, pageCount?: number): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.getPacks(id, page, pageCount).then(res => {
      dispatch(setCardPacksAC(res.data.cardPacks))
      dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount))
      dispatch(setPacksPageCountAC(res.data.pageCount))
      dispatch(setPacksPageNumberAC(res.data.page))
      dispatch(setAppStatus('idle'))
    })
  }

type InitialStateType = typeof initialState
type setCardPacksACType = ReturnType<typeof setCardPacksAC>
type setPacksTotalCountACType = ReturnType<typeof setPacksTotalCountAC>
type setPacksPageCountACType = ReturnType<typeof setPacksPageCountAC>
type setPacksPageNumberACType = ReturnType<typeof setPacksPageNumberAC>
export type CardPacksActionsType =
  | setCardPacksACType
  | setPacksTotalCountACType
  | setPacksPageCountACType
  | setPacksPageNumberACType
