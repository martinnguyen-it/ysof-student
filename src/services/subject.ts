import { ISubjectInResponse, IParamsGetListSubject } from '@/domain/subject'
import { API_LIST } from '@/constants/index'
import { get } from './HTTPService'

export const getListSubjects = (
  params?: IParamsGetListSubject
): Promise<ISubjectInResponse[]> => get(API_LIST.subject, { params })

export const getSubjectDetail = (id: string): Promise<ISubjectInResponse> =>
  get(API_LIST.subject + '/' + id)
