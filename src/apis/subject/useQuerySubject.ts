import { IParamsGetListSubject, ISubjectInResponse } from '@domain/subject'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getListSubjects, getSubjectDetail } from '@src/services/subject'
import { useQuery } from '@tanstack/react-query'

export const useGetListSubjects = (params?: IParamsGetListSubject) => {
  const query = useQuery<ISubjectInResponse[], Error>({
    queryKey: ['getListSubjects ', params],
    queryFn: () => getListSubjects(params),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}

export const useGetSubjectDetail = (id: string, enabled = true) => {
  const query = useQuery<ISubjectInResponse, Error>({
    queryKey: ['getSubjectDetail', id],
    queryFn: () => getSubjectDetail(id),
    enabled,
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}
