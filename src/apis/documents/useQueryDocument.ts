import { useQuery } from '@tanstack/react-query'
import {
  IDocumentInResponse,
  IListDocumentInResponse,
  IParamsGetListDocument,
} from '@/domain/document'
import { getDocumentDetail, getListDocuments } from '@/services/document'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

export const useGetListDocuments = (params: IParamsGetListDocument) => {
  const query = useQuery<IListDocumentInResponse, Error>({
    queryKey: ['getListDocuments', params],
    queryFn: () => getListDocuments(params),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)

  return query
}

export const useGetDocumentDetail = (id: string) => {
  const query = useQuery<IDocumentInResponse, Error>({
    queryKey: ['getDocumentDetail', id],
    queryFn: () => getDocumentDetail(id),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)

  return query
}
