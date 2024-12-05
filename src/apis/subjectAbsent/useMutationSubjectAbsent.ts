import { ICreateSubjectAbsent, ISubjectAbsentInResponse } from '@domain/subjectAbsent'
import { createSubjectAbsent, deleteSubjectAbsent, updateSubjectAbsent } from '@src/services/subjectAbsent'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useCreateSubjectAbsent = (onSuccess: (data: ISubjectAbsentInResponse) => void) =>
  useMutation({
    mutationFn: (payload: { subjectId: string; data: ICreateSubjectAbsent }) => createSubjectAbsent(payload.subjectId, payload.data),
    onSuccess,
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })

export const useUpdateSubjectAbsent = (onSuccess: (data: ISubjectAbsentInResponse) => void) =>
  useMutation({
    mutationFn: (payload: { subjectId: string; data: ICreateSubjectAbsent }) => updateSubjectAbsent(payload.subjectId, payload.data),
    onSuccess,
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })

export const useDeleteSubjectAbsent = (onSuccess: () => void) =>
  useMutation({
    mutationFn: (subjectId: string) => deleteSubjectAbsent(subjectId),
    onSuccess,
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })
