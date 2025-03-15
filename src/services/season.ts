import { IPaginationAPIParams, ISort } from '@/domain/common'
import { ISeasonResponse } from '@/domain/season'
import { API_LIST } from '@/constants/index'
import { get } from './HTTPService'

export const getListSeasons = (
  params?: IPaginationAPIParams & ISort
): Promise<ISeasonResponse[]> => {
  return get(API_LIST.season, { params })
}

export const getCurrentSeason = (): Promise<ISeasonResponse> => {
  return get(API_LIST.season + '/current')
}
