import { ISubjectAbsentInResponse } from '@domain/subjectAbsent'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getListSubjectAbsentsMe, getSubjectAbsentBySubjectId } from '@src/services/subjectAbsent'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useGetListSubjectAbsentsMe = () => {
  const query = useQuery<ISubjectAbsentInResponse[], Error>({
    queryKey: ['getListSubjectAbsentsMe'],
    queryFn: () => getListSubjectAbsentsMe(),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}

export interface IQueryGetSubjectAbsentBySubjectId extends Partial<UseQueryOptions<ISubjectAbsentInResponse, Error>> {
  id: string
  isToastError: boolean
}
export const useGetSubjectAbsentBySubjectId = ({ id, isToastError = true, ...props }: IQueryGetSubjectAbsentBySubjectId) => {
  const query = useQuery<ISubjectAbsentInResponse, Error>({
    queryKey: ['getSubjectAbsentBySubjectId', id],
    queryFn: () => getSubjectAbsentBySubjectId(id),
    ...props,
  })
  useQueryErrorToast(isToastError && query.isError, query?.error?.message!)
  return query
}
