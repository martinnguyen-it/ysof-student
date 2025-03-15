import {
  ICreateSubjectAbsent,
  ISubjectAbsentInResponse,
} from '@/domain/subjectAbsent'
import { API_LIST } from '@/constants/index'
import { del, get, patch, post } from './HTTPService'

export const getListSubjectAbsentsMe = (): Promise<
  ISubjectAbsentInResponse[]
> => get(API_LIST.absent)

export const getSubjectAbsentBySubjectId = (
  subjectId: string
): Promise<ISubjectAbsentInResponse> => get(API_LIST.absent + '/' + subjectId)

export const createSubjectAbsent = (
  subjectId: string,
  data: ICreateSubjectAbsent
): Promise<ISubjectAbsentInResponse> =>
  post(API_LIST.absent + '/' + subjectId, data)

export const updateSubjectAbsent = (
  subjectId: string,
  data: ICreateSubjectAbsent
): Promise<ISubjectAbsentInResponse> =>
  patch(API_LIST.absent + '/' + subjectId, data)

export const deleteSubjectAbsent = (subjectId: string) =>
  del(API_LIST.absent + '/' + subjectId)
