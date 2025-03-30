import { useMutation } from '@tanstack/react-query'
import { IChangePassword } from '@/domain/auth/type'
import { updatePassword } from '@/services/auth'
import { toast } from 'react-toastify'

export const useUpdatePassword = (onSuccess: () => void) =>
  useMutation({
    mutationFn: (data: IChangePassword) => updatePassword(data),
    onSuccess,
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })
