import axios from 'axios'

import { instance } from './instance'

export const cardsApi = {
  getPacksData(params?: ParamsPacksType) {
    return instance.get('cards/pack', { params })
  },
  addPack(name?: string, deckCover?: string, isPrivate?: boolean) {
    return instance.post('cards/pack', {
      cardsPack: { name: name, deckCover: deckCover, private: isPrivate },
    })
  },
  deletePack(packId: string) {
    return instance.delete(`/cards/pack?id=${packId}`)
  },
  editPack<T>(packId: string, value: T) {
    return instance.put('cards/pack', { cardsPack: { _id: packId, ...value } })
  },
  getCards(cardsPack_id: string, page?: number, pageCount?: number, sortPacks?: string) {
    return axios
      .create({
        baseURL: 'https://neko-back.herokuapp.com/2.0/',
        withCredentials: true,
        params: {
          cardsPack_id,
          page,
          pageCount,
          sortPacks,
        },
      })
      .get<CardsPackType>('cards/card')
  },
  addCard(cardsPack_id: string, question?: string, answer?: string) {
    return instance.post('cards/card', {
      card: { cardsPack_id: cardsPack_id, question: question, answer: answer },
    })
  },
  deleteCard(cardId: string) {
    return instance.delete(`/cards/card?id=${cardId}`)
  },
  editCard<T>(cardId: string, data: T) {
    return instance.put('cards/card', { card: { _id: cardId, ...data } })
  },
}

export type ParamsPacksType = {
  page?: number
  pageCount?: number
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  user_id?: string
  block?: boolean
}

export type PacksType = {
  cardPacks: Array<PackType>
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
}

export type CardsPackType = {
  cards: Array<CardType>
  packName: string
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
