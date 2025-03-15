import { ILoginRequest, ILoginResponse } from '@/domain/auth/type'
import { API_LIST } from '@/constants/index'
import { post } from './HTTPService'

export const APILogin = ({
  email,
  password,
}: ILoginRequest): Promise<ILoginResponse> => {
  return post(API_LIST.auth.login, { email, password })
}
