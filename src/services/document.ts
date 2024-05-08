import { IDocumentInResponse, IListDocumentInResponse, IParamsGetListDocument } from '@domain/document'
import { get } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getListDocuments = async (params?: IParamsGetListDocument): Promise<IListDocumentInResponse> => {
  const response = await get({
    url: API_LIST.document,
    data: params,
  })
  return response?.data
}

export const getDocumentDetail = async (id: string): Promise<IDocumentInResponse> => {
  const response = await get({
    url: API_LIST.document + '/' + id,
  })
  return response?.data
}
