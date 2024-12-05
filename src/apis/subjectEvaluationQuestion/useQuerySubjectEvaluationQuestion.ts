import { IEvaluationQuestionResponse } from '@domain/subjectEvaluationQuestion'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getSubjectEvaluationQuestions } from '@src/services/subjectEvaluationQuestion'
import { useQuery } from '@tanstack/react-query'

export interface IQueryGetSubjectEvaluationQuestions {
  subjectId: string
  isToastError: boolean
  enabled: boolean
}
export const useGetSubjectEvaluationQuestions = ({ subjectId, isToastError = true, enabled = true }: IQueryGetSubjectEvaluationQuestions) => {
  const query = useQuery<IEvaluationQuestionResponse, Error>({
    queryKey: ['getSubjectEvaluationQuestions', subjectId],
    queryFn: () => getSubjectEvaluationQuestions(subjectId),
    enabled,
  })
  useQueryErrorToast(isToastError && query.isError, query?.error?.message!)
  return query
}
