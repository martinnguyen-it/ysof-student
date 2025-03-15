import {
  ICreateSubjectEvaluation,
  ISubjectEvaluationInResponse,
  IUpdateSubjectEvaluation,
} from '@/domain/subjectEvaluation'
import { API_LIST } from '@/constants/index'
import { get, post, patch } from './HTTPService'

export const getListSubjectEvaluationsMe = (): Promise<
  ISubjectEvaluationInResponse[]
> => get(API_LIST.evaluation)

export const getSubjectEvaluationBySubjectId = (
  subjectId: string
): Promise<ISubjectEvaluationInResponse> =>
  get(API_LIST.evaluation + '/' + subjectId)

export const createSubjectEvaluation = (
  subjectId: string,
  data: ICreateSubjectEvaluation
): Promise<ISubjectEvaluationInResponse> =>
  post(API_LIST.evaluation + '/' + subjectId, data)

export const updateSubjectEvaluation = (
  subjectId: string,
  data: IUpdateSubjectEvaluation
): Promise<ISubjectEvaluationInResponse> =>
  patch(API_LIST.evaluation + '/' + subjectId, data)
