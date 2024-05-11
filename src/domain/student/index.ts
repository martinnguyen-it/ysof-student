import { IPaginationAPI, IPaginationAPIParams, ISort } from '@domain/common'

export interface IStudentInResponse {
  numerical_order: number
  group: number
  holy_name: string
  full_name: string
  email: string
  sex?: ESex
  diocese?: string
  phone_number?: string
  avatar?: string
  id: string
}
export interface IListStudentInResponse {
  pagination: IPaginationAPI
  data: IStudentInResponse[]
}

export interface IParamsGetListStudent extends IPaginationAPIParams, ISort {
  search?: string
  group?: number
}

export enum ESex {
  MALE = 'Nam',
  FEMALE = 'Nữ',
}
