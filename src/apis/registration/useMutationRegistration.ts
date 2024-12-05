import { IRegistrationInResponse, IRegistrationPayload } from '@domain/registration'
import { postSubjectRegistration } from '@src/services/registration'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const usePostSubjectRegistration = (onSuccess: (data: IRegistrationInResponse) => void) =>
  useMutation({
    mutationFn: (data: IRegistrationPayload) => postSubjectRegistration(data),
    onSuccess,
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })
