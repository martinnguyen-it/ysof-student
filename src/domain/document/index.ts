import { IPaginationAPI, IPaginationAPIParams, ISort } from '@/domain/common'

export interface IDocumentInResponse {
  file_id: string
  mimeType?: string
  name: string
  description?: string
  label?: string[]
  id: string
  season: number
  webViewLink: string
}

export interface IListDocumentInResponse {
  pagination: IPaginationAPI
  data: IDocumentInResponse[]
}

export interface IParamsGetListDocument extends IPaginationAPIParams, ISort {
  search?: string
  label?: string[]
  season?: number
  type?: EDocumentType
}

export enum EDocumentType {
  ANNUAL = 'annual',
  COMMON = 'common',
  INTERNAL = 'internal',
  STUDENT = 'student',
}

export enum EGoogleFileType {
  SPREAD_SHEET = 'spread_sheet',
  DOCUMENT = 'document',
}
