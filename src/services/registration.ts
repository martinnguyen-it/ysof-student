import { IRegistrationInResponse, IRegistrationPayload } from '@domain/registration'
import { get, post } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getSubjectRegistration = (): Promise<IRegistrationInResponse | null> => get(API_LIST.registration)

export const postSubjectRegistration = (data: IRegistrationPayload): Promise<IRegistrationInResponse> => post(API_LIST.registration, data)
