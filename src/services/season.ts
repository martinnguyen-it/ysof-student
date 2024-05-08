import { get } from './HTTPService'
import { API_LIST } from '@constants/index'
import { IPaginationAPIParams, ISort } from '@domain/common'
import { ISeasonResponse } from '@domain/season'

export const getListSeasons = async (params?: IPaginationAPIParams & ISort): Promise<ISeasonResponse[]> => {
  const response = await get({
    url: API_LIST.season,
    data: params,
  })
  return response?.data
}

export const getCurrentSeason = async (): Promise<ISeasonResponse> => {
  const response = await get({
    url: API_LIST.season + '/current',
  })
  return response?.data
}
