import {
  ILecturerInResponse,
  IListLecturerInResponse,
  IParamsGetListLecturer,
} from '@/domain/lecturer'
import { API_LIST } from '@/constants/index'
import { get } from './HTTPService'

export const getListLecturers = (
  params?: IParamsGetListLecturer
): Promise<IListLecturerInResponse> => get(API_LIST.lecturer, { params })

export const getLecturerDetail = (id: string): Promise<ILecturerInResponse> =>
  get(API_LIST.lecturer + '/' + id)
