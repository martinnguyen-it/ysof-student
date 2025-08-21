export interface IPaginationAPIParams {
  page_index?: number
  page_size?: number
}

export interface ISort {
  sort?: ESort
  sort_by?: string
}

export enum ESort {
  ASCE = 'ascend',
  DESC = 'descend',
}

export interface IOpenFormWithMode<T> {
  item?: T
  active: boolean
  mode: 'view' | 'add' | 'update'
}

export interface IPaginationAPI {
  total: number
  page_index: number
  total_pages: number
}

export interface IBaseResponse {
  message: string
}
