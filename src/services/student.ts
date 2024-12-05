import { IStudentInResponse, IListStudentInResponse, IParamsGetListStudent, IStudentMeInResponse } from '@domain/student'
import { get } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getMe = (): Promise<IStudentMeInResponse> => {
  return get(API_LIST.getMe)
}

export const getListStudents = (params?: IParamsGetListStudent): Promise<IListStudentInResponse> => {
  return get(API_LIST.student, { params })
}

export const getStudentDetail = (id: string): Promise<IStudentInResponse> => {
  return get(API_LIST.student + '/' + id)
}
