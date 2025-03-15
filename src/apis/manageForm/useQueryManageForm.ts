import { useQuery } from '@tanstack/react-query'
import { EManageFormType, IManageFormInResponse } from '@/domain/manageForm'
import { getManageForm } from '@/services/manageForm'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

export const useGetManageForm = (type: EManageFormType) => {
  const query = useQuery<IManageFormInResponse, Error>({
    queryKey: ['getManageForm', type],
    queryFn: () => getManageForm(type),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}
