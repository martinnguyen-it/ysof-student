import { IStudentInResponse } from '@domain/student'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  access_token: string
  user: IStudentInResponse
}
