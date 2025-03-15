import { IEvaluationQuestionResponse } from '@/domain/subjectEvaluationQuestion'
import { API_LIST } from '@/constants/index'
import { get } from './HTTPService'

export const getSubjectEvaluationQuestions = (
  subjectId: string
): Promise<IEvaluationQuestionResponse> =>
  get(API_LIST.evaluationQuestion + '/' + subjectId)
