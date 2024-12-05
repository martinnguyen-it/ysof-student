import { EManageFormType, IManageFormInResponse } from '@domain/manageForm'
import { useQueryErrorToast } from '@src/hooks/useQueryErrorToast'
import { getManageForm } from '@src/services/manageForm'
import { useQuery } from '@tanstack/react-query'

export const useGetManageForm = (type: EManageFormType) => {
  const query = useQuery<IManageFormInResponse, Error>({
    queryKey: ['getManageForm', type],
    queryFn: () => getManageForm(type),
  })
  useQueryErrorToast(query.isError, query?.error?.message!)
  return query
}
