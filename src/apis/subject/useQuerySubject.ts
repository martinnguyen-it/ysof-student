import { useQuery } from '@tanstack/react-query'
import { IParamsGetListSubject, ISubjectInResponse } from '@/domain/subject'
import { getListSubjects, getSubjectDetail } from '@/services/subject'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

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
