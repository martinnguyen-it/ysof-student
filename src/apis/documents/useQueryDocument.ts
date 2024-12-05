import { IDocumentInResponse, IListDocumentInResponse, IParamsGetListDocument } from '@domain/document'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getDocumentDetail, getListDocuments } from '@src/services/document'
import { useQuery } from '@tanstack/react-query'

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
