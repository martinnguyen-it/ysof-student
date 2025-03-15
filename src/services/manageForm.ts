import { EManageFormType, IManageFormInResponse } from '@/domain/manageForm'
import { API_LIST } from '@/constants/index'
import { get } from './HTTPService'

export const getManageForm = (
  type: EManageFormType
): Promise<IManageFormInResponse> =>
  get(API_LIST.manageForm, { params: { type } })
