import { useMutation } from '@tanstack/react-query'
import { IStudentMeInResponse, IUpdateMe } from '@/domain/student'
import { updateInfoStudent, updateAvatar } from '@/services/student'
import { toast } from 'react-toastify'

export const useUpdateMe = (onSuccess: (data: IStudentMeInResponse) => void) =>
  useMutation({
    mutationFn: (data: IUpdateMe) => updateInfoStudent(data),
    onSuccess,
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })

export const useUpdateAvatar = () =>
  useMutation({
    mutationFn: (file: File) => {
      return updateAvatar(file)
    },
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })
