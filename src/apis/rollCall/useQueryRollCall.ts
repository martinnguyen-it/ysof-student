import { useQuery } from '@tanstack/react-query'
import { IRollCallMeResponse } from '@/domain/rollCall'
import { getRollCallMe } from '@/services/rollCall'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

export const useGetRollCallMe = (season?: number) => {
  const query = useQuery<IRollCallMeResponse, Error>({
    queryKey: ['getRollCallMe', season],
    queryFn: () => getRollCallMe(season),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}
