import { cardsApi, PackType, ParamsPacksType } from '../../api/cards-api'
import { setAppStatus } from '../../app/appReducer'
import { AppThunk } from '../../app/store'

export const DEFAULT_MAX_CARDS_COUNT = 110
export const DEFAULT_MIN_CARDS_COUNT = 0

const initialState = {
  cardPacks: [] as Array<PackType>,
  page: 1,
  pageCount: 10,
  cardPacksTotalCount: 0,
  minCardsCount: DEFAULT_MIN_CARDS_COUNT,
  maxCardsCount: DEFAULT_MAX_CARDS_COUNT,
  token: '',
  tokenDeathTime: 0,
  packName: '',
  sortPacks: '',
  user_id: '',
  search: '',
  minMaxCardsCount: [DEFAULT_MIN_CARDS_COUNT, DEFAULT_MAX_CARDS_COUNT],
}

type InitialStateType = typeof initialState
export type CardPacksActionsType =
  | ReturnType<typeof setCardPacks>
  | ReturnType<typeof addPackAC>
  | ReturnType<typeof deletePackAC>
  | ReturnType<typeof editPackAC>

export const cardPacksReducer = (
  state: InitialStateType = initialState,
  action: CardPacksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS-DATA':
      return {
        ...state,
        ...action.data,
      }
    case 'PACKS/SET_PACKS':
      return { ...state, cardPacks: [...action.packs] }
    case 'PACKS/ADD_PACK':
      return { ...state, cardPacks: [action.pack, ...state.cardPacks] }
    case 'PACKS/DELETE_PACK':
      return { ...state, cardPacks: state.cardPacks.filter(pack => pack._id !== action.packId) }
    case 'PACKS/EDIT_PACK':
      return {
        ...state,
        cardPacks: state.cardPacks.map(pack =>
          pack._id === action.pack._id ? { ...action.pack } : pack
        ),
      }
    case 'PACKS/SET_PACKS_TOTAL_COUNT':
      return { ...state, cardPacksTotalCount: action.packsTotalCount }
    case 'PACKS/SET_PAGE_COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'PACKS/SET_PAGE_NUMBER':
      return { ...state, page: action.page }
    case 'PACKS/SET-PACKS-NAME':
      return { ...state, packName: action.packName }
    case 'PACKS/SET-USER-ID':
      return { ...state, user_id: action.user_id }
    case 'PACKS/SET-MIN-CARDS-COUNT':
      return { ...state, minMaxCardsCount: action.minMaxCardsCount }
    case 'PACKS/SET-SEARCH':
      return { ...state, search: action.search }
    case 'PACKS/SET-SORT-PACKS':
      return { ...state, sortPacks: action.sortPacks }
    default:
      return state
  }
}
export type PackDataResponseType = {
  cardPacks?: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export const setPacksDataAC = (data: PackDataResponseType) =>
  ({ type: 'PACKS/SET-PACKS-DATA', data } as const)

export const setCardPacksAC = (packs: Array<PackType>) =>
  ({ type: 'PACKS/SET_PACKS', packs } as const)
export const addPackAC = (pack: PackType) => ({ type: 'PACKS/ADD_PACK', pack } as const)
export const deletePackAC = (packId: string) => ({ type: 'PACKS/DELETE_PACK', packId } as const)
export const editPackAC = (pack: PackType) => ({ type: 'PACKS/EDIT_PACK', pack } as const)

export const setPacksTotalCountAC = (packsTotalCount: number) =>
  ({ type: 'PACKS/SET_PACKS_TOTAL_COUNT', packsTotalCount } as const)

export const setPacksPageCountAC = (pageCount: number) =>
  ({ type: 'PACKS/SET_PAGE_COUNT', pageCount } as const)

export const setPacksPageNumberAC = (page: number) =>
  ({ type: 'PACKS/SET_PAGE_NUMBER', page } as const)

export const setPackNameAC = (packName: string) =>
  ({ type: 'PACKS/SET-PACKS-NAME', packName } as const)

export const setUserIdAC = (user_id: string) => ({ type: 'PACKS/SET-USER-ID', user_id } as const)

export const setMinMaxCardsCountAC = (minMaxCardsCount: number[]) =>
  ({ type: 'PACKS/SET-MIN-CARDS-COUNT', minMaxCardsCount } as const)

export const setSearchAC = (search: string) => ({ type: 'PACKS/SET-SEARCH', search } as const)

export const setSortPacksAC = (sortPacks: string) =>
  ({ type: 'PACKS/SET-SORT-PACKS', sortPacks } as const)

export const setPacksDataTC = (): AppThunk => (dispatch, getState) => {
  const { pageCount, page, minMaxCardsCount, packName, sortPacks, user_id } = getState().packs

  const params: ParamsPacksType = {
    page,
    pageCount,
    packName,
    min: minMaxCardsCount[0],
    max: minMaxCardsCount[1],
    sortPacks,
    user_id,
  }

  dispatch(setAppStatus('loading'))
  cardsApi.getPacksData(params).then(res => {
    dispatch(setPacksDataAC(res.data))
    console.log(res.data)
    dispatch(setAppStatus('idle'))
  })
}
export const getCardPacks =
  (id?: string, page?: number, pageCount?: number): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.getPacks(id, page, pageCount).then(res => {
      dispatch(setCardPacks(res.data.cardPacks))
      dispatch(setAppStatus('idle'))
    })
  }
export const addPack =
  (name?: string, deckCover?: string, isPrivate?: boolean): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.addPack(name, deckCover, isPrivate).then(res => {
      dispatch(addPackAC(res.data.newCardsPack))
      dispatch(setAppStatus('idle'))
    })
  }
export const deletePack =
  (packId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.deletePack(packId).then(res => {
      dispatch(deletePackAC(res.data.deletedCardsPack._id))
      dispatch(setAppStatus('idle'))
    })
  }
export const editPack =
  <T>(packId: string, value: T): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.editPack<T>(packId, value).then(res => {
      dispatch(editPackAC(res.data.updatedCardsPack))
      dispatch(setAppStatus('idle'))
    })
  }

type InitialStateType = typeof initialState
type setCardPacksACType = ReturnType<typeof setCardPacksAC>
type setPacksTotalCountACType = ReturnType<typeof setPacksTotalCountAC>
type setPacksPageCountACType = ReturnType<typeof setPacksPageCountAC>
type setPacksPageNumberACType = ReturnType<typeof setPacksPageNumberAC>
type setPacksDataACType = ReturnType<typeof setPacksDataAC>
type setPackNameACType = ReturnType<typeof setPackNameAC>
type setUserIdACType = ReturnType<typeof setUserIdAC>
type setMinMaxCardsCountACType = ReturnType<typeof setMinMaxCardsCountAC>
type setSearchACType = ReturnType<typeof setSearchAC>
type setSortPacksACType = ReturnType<typeof setSortPacksAC>
export type CardPacksActionsType =
  | setCardPacksACType
  | setPacksTotalCountACType
  | setPacksPageCountACType
  | setPacksPageNumberACType
  | setPacksDataACType
  | setPackNameACType
  | setUserIdACType
  | setMinMaxCardsCountACType
  | setSearchACType
  | setSortPacksACType
