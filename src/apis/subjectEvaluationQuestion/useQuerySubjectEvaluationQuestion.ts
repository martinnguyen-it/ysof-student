import { IEvaluationQuestionResponse } from '@domain/subjectEvaluationQuestion'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getSubjectEvaluationQuestions } from '@src/services/subjectEvaluationQuestion'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export interface IQueryGetSubjectEvaluationQuestions extends Partial<UseQueryOptions<IEvaluationQuestionResponse, Error>> {
  subjectId: string
  isToastError?: boolean
}
export const useGetSubjectEvaluationQuestions = ({ subjectId, isToastError = true, ...props }: IQueryGetSubjectEvaluationQuestions) => {
  const query = useQuery<IEvaluationQuestionResponse, Error>({
    queryKey: ['getSubjectEvaluationQuestions', subjectId],
    queryFn: () => getSubjectEvaluationQuestions(subjectId),
    ...props,
  })
  useQueryErrorToast(isToastError && query.isError, query?.error?.message!)
  return query
}
