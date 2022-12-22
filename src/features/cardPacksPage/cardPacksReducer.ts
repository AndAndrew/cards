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
export type CardPacksActionsType =
  | ReturnType<typeof setCardPacks>
  | ReturnType<typeof addPack>
  | ReturnType<typeof deletePack>

export const cardPacksReducer = (
  state: InitialStateType = initialState,
  action: CardPacksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET_PACKS':
      return { ...state, cardPacks: [...action.packs] }
    case 'PACKS/ADD_PACK':
      return { ...state, cardPacks: [action.pack, ...state.cardPacks] }
    case 'PACKS/DELETE_PACK':
      return { ...state, cardPacks: state.cardPacks.filter(pack => pack._id !== action.packId) }
    default:
      return state
  }
}

export const setCardPacks = (packs: Array<PackType>) =>
  ({ type: 'PACKS/SET_PACKS', packs } as const)
export const addPack = (pack: PackType) => ({ type: 'PACKS/ADD_PACK', pack } as const)
export const deletePack = (packId: string) => ({ type: 'PACKS/DELETE_PACK', packId } as const)

export const getCardPacks =
  (id?: string, page?: number, pageCount?: number): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.getPacks(id, page, pageCount).then(res => {
      dispatch(setCardPacks(res.data.cardPacks))
      dispatch(setAppStatus('idle'))
    })
  }
export const addCardPack =
  (name?: string, deckCover?: string, isPrivate?: boolean): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.addPack(name, deckCover, isPrivate).then(res => {
      dispatch(addPack(res.data.newCardsPack))
      dispatch(setAppStatus('idle'))
    })
  }
export const deleteCardPack =
  (packId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    cardsApi.deletePack(packId).then(res => {
      console.log(res)
      dispatch(deletePack(res.data.deletedCardsPack._id))
      dispatch(setAppStatus('idle'))
    })
  }
