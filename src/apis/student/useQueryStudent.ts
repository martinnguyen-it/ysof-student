import { IListStudentInResponse, IParamsGetListStudent, IStudentInResponse, IStudentMeInResponse } from '@domain/student'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getListStudents, getMe, getStudentDetail } from '@src/services/student'
import { useQuery } from '@tanstack/react-query'

export const useGetListStudents = (params?: IParamsGetListStudent) => {
  const query = useQuery<IListStudentInResponse, Error>({
    queryKey: ['getListStudents', params],
    queryFn: () => getListStudents(params),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}

export const useGetMe = () => {
  const query = useQuery<IStudentMeInResponse, Error>({
    queryKey: ['getMe'],
    queryFn: () => getMe(),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}

export const useGetStudentDetail = (id: string) => {
  const query = useQuery<IStudentInResponse, Error>({
    queryKey: ['getStudentDetail', id],
    queryFn: () => getStudentDetail(id),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}
