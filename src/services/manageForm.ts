import { get } from './HTTPService'
import { API_LIST } from '@constants/index'
import { EManageFormType, IManageFormInResponse } from '@domain/manageForm'

export const getManageForm = (type: EManageFormType): Promise<IManageFormInResponse> => get(API_LIST.manageForm, { params: { type } })
