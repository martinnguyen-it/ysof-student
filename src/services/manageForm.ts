import { get } from './HTTPService'
import { API_LIST } from '@constants/index'
import { EManageFormType, IManageFormInResponse } from '@domain/manageForm'

export const getManageForm = async (type: EManageFormType): Promise<IManageFormInResponse> => {
  const response = await get({
    url: API_LIST.manageForm,
    data: { type },
  })
  return response?.data
}
