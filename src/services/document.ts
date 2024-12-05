import { IDocumentInResponse, IListDocumentInResponse, IParamsGetListDocument } from '@domain/document'
import { get } from './HTTPService'
import { API_LIST } from '@constants/index'

export const getListDocuments = (params?: IParamsGetListDocument): Promise<IListDocumentInResponse> => {
  return get(API_LIST.document, { params })
}

export const getDocumentDetail = async (id: string): Promise<IDocumentInResponse> => {
  return get(API_LIST.document + '/' + id)
}
