import { ISubjectInResponse, IParamsGetListSubject } from '@domain/subject'
import { get } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getListSubjects = async (params?: IParamsGetListSubject): Promise<ISubjectInResponse[]> => {
  const response = await get({
    url: API_LIST.subject,
    data: params,
  })
  return response?.data
}

export const getSubjectDetail = async (id: string): Promise<ISubjectInResponse> => {
  const response = await get({
    url: API_LIST.subject + '/' + id,
  })
  return response?.data
}
