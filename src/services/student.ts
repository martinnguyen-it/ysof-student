import {
  IStudentInResponse,
  IListStudentInResponse,
  IParamsGetListStudent,
  IStudentMeInResponse,
} from '@/domain/student'
import { IUpdateMe } from '@/domain/student'
import { API_LIST } from '@/constants/index'
import { get, put } from './HTTPService'

export const getMe = (): Promise<IStudentMeInResponse> => {
  return get(API_LIST.getMe)
}

export const getListStudents = (
  params?: IParamsGetListStudent
): Promise<IListStudentInResponse> => {
  return get(API_LIST.student, { params })
}

export const getStudentDetail = (id: string): Promise<IStudentInResponse> => {
  return get(API_LIST.student + '/' + id)
}

export const updateInfoStudent = (
  data: IUpdateMe
): Promise<IStudentMeInResponse> => {
  return put(API_LIST.me, data)
}

export const updateAvatar = (file: File): Promise<IStudentMeInResponse> => {
  const formData = new FormData()
  formData.append('image', file)
  return put(API_LIST.updateAvatar, formData)
}
