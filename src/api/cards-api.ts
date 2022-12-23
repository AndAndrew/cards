import axios from 'axios'
import { useParams } from 'react-router-dom'

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  // process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:7542/2.0/'
  //   : 'https://neko-back.herokuapp.com/2.0/',

  withCredentials: true,
})
export const testApi = {
  testPing(data: PingDataType) {
    return instance.post<PingResponseType>('/ping', data)
  },
}
export const cardsApi = {
  getPacks(packsUserId?: string, page?: number, pageCount?: number) {
    return axios
      .create({
        baseURL: 'https://neko-back.herokuapp.com/2.0/',
        withCredentials: true,
        params: {
          packsUserId,
          page,
          pageCount,
        },
      })
      .get('cards/pack')
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

  getCards(cardsPack_id: string, page?: number, pageCount?: number) {
    return axios
      .create({
        baseURL: 'https://neko-back.herokuapp.com/2.0/',
        withCredentials: true,
        params: {
          cardsPack_id,
          page,
          pageCount,
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

  changeProfileData(data: ProfileDataType) {
    return instance.put<{ updatedUser: ProfileDataType; error?: string }>('/auth/me', data)
  },
  login(data: LoginDataType) {
    return instance.post<LoginResponseType>('/auth/login', data)
  },
  logOut() {
    return instance.delete<{ info: string; error: string }>('/auth/me')
  },
  recoveryPassword(data: RecoveryPasswordType) {
    return instance.post<{ info: string; error: string }>('/auth/forgot', data)
  },
  createNewPassword(data: CreateNewPasswordType) {
    return instance.post<{ info: string; error: string }>('/auth/set-new-password', data)
  },
  me() {
    return instance.post<LoginResponseType>('/auth/me')
  },
  register(data: RegisterDataType) {
    return instance.post<{ updatedUser: RegisterResponseType; error?: string }>(
      '/auth/register',
      data
    )
  },
}

type RegisterResponseType = {
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  rememberMe: boolean
  updated: string
  verified: boolean
  _v: number
  _id: string
}
type LoginResponseType = {
  avatar: string
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  rememberMe: boolean
  token: string
  tokenDeathTime: number
  updated: string
  verified: boolean
  __v: number
  _id: string
}

export type ProfileDataType = {
  name: string
  avatar: string
}
export type RecoveryPasswordType = {
  email: string // кому восстанавливать пароль
  from: string // можно указать разработчика фронта)
  message: string // хтмп-письмо, вместо $token$ бэк вставит токен
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
export type RegisterDataType = {
  email: string
  password: string
}
export type PingDataType = {
  frontTime: number
}
type PingResponseType = {
  ping: number
  backTime: number
  frontTime: number
  info: string
}
export type CreateNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}

export type PacksType = {
  cardPacks: Array<PackType>
  cardPacksTotalCount: number
  // количество колод
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
