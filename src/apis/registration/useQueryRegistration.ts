import { useQuery } from '@tanstack/react-query'
import { IRegistrationInResponse } from '@/domain/registration'
import { getSubjectRegistration } from '@/services/registration'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

export const useGetSubjectRegistration = (enabled = true) => {
  const query = useQuery<IRegistrationInResponse | null, Error>({
    queryKey: ['getSubjectRegistration'],
    queryFn: () => getSubjectRegistration(),
    enabled,
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}
