import { ILecturerInResponse, IListLecturerInResponse, IParamsGetListLecturer } from '@domain/lecturer'
import { get } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getListLecturers = async (params?: IParamsGetListLecturer): Promise<IListLecturerInResponse> => {
  const response = await get({
    url: API_LIST.lecturer,
    data: params,
  })
  return response?.data
}

export const getLecturerDetail = async (id: string): Promise<ILecturerInResponse> => {
  const response = await get({
    url: API_LIST.lecturer + '/' + id,
  })
  return response?.data
}
