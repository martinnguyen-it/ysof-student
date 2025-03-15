import { IStudentMeInResponse } from '@/domain/student'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  access_token: string
  user: IStudentMeInResponse
}
