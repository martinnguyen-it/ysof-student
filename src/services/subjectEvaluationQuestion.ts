import { IEvaluationQuestionResponse } from '@domain/subjectEvaluationQuestion'
import { get } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getSubjectEvaluationQuestions = (subjectId: string): Promise<IEvaluationQuestionResponse> => get(API_LIST.evaluationQuestion + '/' + subjectId)
