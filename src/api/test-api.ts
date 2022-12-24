import { instance } from './instance'

export const testApi = {
  testPing(data: PingDataType) {
    return instance.post<PingResponseType>('/ping', data)
  },
}

type PingResponseType = {
  ping: number
  backTime: number
  frontTime: number
  info: string
}

export type PingDataType = {
  frontTime: number
}
