import { IPaginationAPIParams, ISort } from '@domain/common'
import { ISeasonResponse } from '@domain/season'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getCurrentSeason, getListSeasons } from '@src/services/season'
import { useQuery } from '@tanstack/react-query'

export const useGetListSeasons = (params?: IPaginationAPIParams & ISort) => {
  const query = useQuery<ISeasonResponse[], Error>({
    queryKey: ['getListSeasons', params],
    queryFn: () => getListSeasons(params),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}

export const useGetCurrentSeason = (enabled = true) => {
  const query = useQuery<ISeasonResponse, Error>({
    queryKey: ['getCurrentSeason'],
    queryFn: () => getCurrentSeason(),
    enabled,
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}
