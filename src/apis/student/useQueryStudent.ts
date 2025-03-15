import { useQuery } from '@tanstack/react-query'
import {
  IListStudentInResponse,
  IParamsGetListStudent,
  IStudentInResponse,
  IStudentMeInResponse,
} from '@/domain/student'
import { getListStudents, getMe, getStudentDetail } from '@/services/student'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

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
