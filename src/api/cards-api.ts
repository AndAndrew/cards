import axios from 'axios'

export const instance = axios.create({
  baseURL:
    'https://neko-back.herokuapp.com/2.0/' /* process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',*/,
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : ,
  withCredentials: true,
})

export const testApi = {
  testPing(data: PingDataType) {
    return instance.post<PingResponceType>('/ping', data)
  },
}
export const cardsApi = {
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
export type PingDataType = {
  frontTime: number
}
type PingResponceType = {
  ping: number
  backTime: number
  frontTime: number
  info: string
}
