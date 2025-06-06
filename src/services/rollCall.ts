import { IRollCallMeResponse } from '@/domain/rollCall'
import { get } from './HTTPService'

export const getRollCallMe = (season?: number): Promise<IRollCallMeResponse> =>
  get('/api/v1/student/roll-call/me', { params: { season } })
