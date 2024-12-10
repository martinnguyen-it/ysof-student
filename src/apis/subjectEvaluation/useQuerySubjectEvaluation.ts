import { ISubjectEvaluationInResponse } from '@domain/subjectEvaluation'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getListSubjectEvaluationsMe, getSubjectEvaluationBySubjectId } from '@src/services/subjectEvaluation'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useGetListSubjectEvaluationsMe = () => {
  const query = useQuery<ISubjectEvaluationInResponse[], Error>({
    queryKey: ['getListSubjectEvaluationsMe'],
    queryFn: () => getListSubjectEvaluationsMe(),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}

export interface IQueryGetSubjectEvaluationBySubjectId extends Partial<UseQueryOptions<ISubjectEvaluationInResponse, Error>> {
  subjectId: string
  isToastError?: boolean
}
export const useGetSubjectEvaluationBySubjectId = ({ subjectId, isToastError = true, ...props }: IQueryGetSubjectEvaluationBySubjectId) => {
  const query = useQuery<ISubjectEvaluationInResponse, Error>({
    queryKey: ['getSubjectEvaluationBySubjectId', subjectId],
    queryFn: () => getSubjectEvaluationBySubjectId(subjectId),
    ...props,
  })
  useQueryErrorToast(isToastError && query.isError, query?.error?.message!)
  return query
}
