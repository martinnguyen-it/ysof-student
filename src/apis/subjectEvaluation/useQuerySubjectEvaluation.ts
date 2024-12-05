import { ISubjectEvaluationInResponse } from '@domain/subjectEvaluation'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getListSubjectEvaluationsMe, getSubjectEvaluationBySubjectId } from '@src/services/subjectEvaluation'
import { useQuery } from '@tanstack/react-query'

export const useGetListSubjectEvaluationsMe = () => {
  const query = useQuery<ISubjectEvaluationInResponse[], Error>({
    queryKey: ['getListSubjectEvaluationsMe'],
    queryFn: () => getListSubjectEvaluationsMe(),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}

export interface IQueryGetSubjectEvaluationBySubjectId {
  subjectId: string
  isToastError: boolean
  enabled: boolean
}
export const useGetSubjectEvaluationBySubjectId = ({ subjectId, isToastError = true, enabled = true }: IQueryGetSubjectEvaluationBySubjectId) => {
  const query = useQuery<ISubjectEvaluationInResponse, Error>({
    queryKey: ['getSubjectEvaluationBySubjectId', subjectId],
    queryFn: () => getSubjectEvaluationBySubjectId(subjectId),
    enabled,
    retry: 1,
  })
  useQueryErrorToast(isToastError && query.isError, query?.error?.message!)
  return query
}
