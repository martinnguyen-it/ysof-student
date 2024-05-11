import { IStudentInResponse, IListStudentInResponse, IParamsGetListStudent } from '@domain/student'
import { get } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getMe = async (): Promise<IStudentInResponse> => {
  const response = await get({
    url: API_LIST.getMe,
  })
  return response?.data
}

export const getListStudents = async (params?: IParamsGetListStudent): Promise<IListStudentInResponse> => {
  const response = await get({
    url: API_LIST.student,
    data: params,
  })
  return response?.data
}

export const getStudentDetail = async (id: string): Promise<IStudentInResponse> => {
  const response = await get({
    url: API_LIST.student + '/' + id,
  })
  return response?.data
}
