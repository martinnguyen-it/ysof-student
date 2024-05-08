import { IRegistrationInResponse, IRegistrationPayload } from '@domain/registration'
import { get, post } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getSubjectRegistration = async (): Promise<IRegistrationInResponse | null> => {
  const response = await get({
    url: API_LIST.registration,
  })
  return response?.data
}

export const postSubjectRegistration = async (data: IRegistrationPayload): Promise<IRegistrationInResponse | null> => {
  const response = await post({
    url: API_LIST.registration,
    data,
  })
  return response?.data
}
