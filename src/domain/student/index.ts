import { IPaginationAPI, IPaginationAPIParams, ISort } from '@/domain/common'

export interface IStudentInResponse {
  holy_name: string
  full_name: string
  email: string
  sex?: ESex
  diocese?: string
  phone_number?: string
  avatar?: string
  id: string
  season_info: IStudentSeasonInfo
}

export interface IStudentMeInResponse
  extends Omit<IStudentInResponse, 'season_info'> {
  date_of_birth?: string
  origin_address?: string
  education?: string
  job?: string
  seasons_info: IStudentSeasonInfo[]
}

export interface IUpdateMe {
  sex?: ESex
  diocese?: string
  phone_number?: string
  origin_address?: string
  education?: string
  job?: string
}

export interface IStudentSeasonInfo {
  numerical_order: number
  group: number
  season: number
}

export interface IListStudentInResponse {
  pagination: IPaginationAPI
  data: IStudentInResponse[]
}

export interface IParamsGetListStudent extends IPaginationAPIParams, ISort {
  search?: string
  group?: number
  season?: number
}

export enum ESex {
  MALE = 'Nam',
  FEMALE = 'Nữ',
}
