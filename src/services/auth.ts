import { ILoginRequest, ILoginResponse } from '@/domain/auth/type'
import { API_LIST } from '@/constants/index'
import { post } from './HTTPService'

export const APILogin = ({
  email,
  password,
}: ILoginRequest): Promise<ILoginResponse> => {
  const formData = new FormData()
  formData.append('username', email)
  formData.append('password', password)
  return post(API_LIST.auth.login, formData)
}
