import { IPaginationAPI, IPaginationAPIParams, ISort } from '@domain/common'

export interface ILecturerInResponse {
  title: string
  holy_name?: string
  full_name: string
  information?: string
  id: string
  avatar?: string
}

export interface IListLecturerInResponse {
  pagination: IPaginationAPI
  data: ILecturerInResponse[]
}
export interface IParamsGetListLecturer extends IPaginationAPIParams, ISort {
  search?: string
}
