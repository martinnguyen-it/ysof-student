import { ISubjectInResponse, IParamsGetListSubject } from '@domain/subject'
import { get } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getListSubjects = (params?: IParamsGetListSubject): Promise<ISubjectInResponse[]> => get(API_LIST.subject, { params })

export const getSubjectDetail = (id: string): Promise<ISubjectInResponse> => get(API_LIST.subject + '/' + id)
