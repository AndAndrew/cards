import { instance } from './instance'

export const authApi = {
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

export type CreateNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}
