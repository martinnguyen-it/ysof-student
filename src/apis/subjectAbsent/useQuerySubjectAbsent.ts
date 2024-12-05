import { ISubjectAbsentInResponse } from '@domain/subjectAbsent'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getListSubjectAbsentsMe, getSubjectAbsentBySubjectId } from '@src/services/subjectAbsent'
import { useQuery } from '@tanstack/react-query'

export const useGetListSubjectAbsentsMe = () => {
  const query = useQuery<ISubjectAbsentInResponse[], Error>({
    queryKey: ['getListSubjectAbsentsMe'],
    queryFn: () => getListSubjectAbsentsMe(),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}

export interface IQueryGetSubjectAbsentBySubjectId {
  id: string
  isToastError: boolean
  enabled: boolean
}
export const useGetSubjectAbsentBySubjectId = ({ id, isToastError = true, enabled = true }: IQueryGetSubjectAbsentBySubjectId) => {
  const query = useQuery<ISubjectAbsentInResponse, Error>({
    queryKey: ['getSubjectAbsentBySubjectId', id],
    queryFn: () => getSubjectAbsentBySubjectId(id),
    enabled,
    retry: 1,
  })
  useQueryErrorToast(isToastError && query.isError, query?.error?.message!)
  return query
}
