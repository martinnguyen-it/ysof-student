import { ICreateSubjectEvaluation, ISubjectEvaluationInResponse } from '@domain/subjectEvaluation'
import { createSubjectEvaluation, updateSubjectEvaluation } from '@src/services/subjectEvaluation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useCreateSubjectEvaluation = (onSuccess: (data: ISubjectEvaluationInResponse) => void) =>
  useMutation({
    mutationFn: (payload: { subjectId: string; data: ICreateSubjectEvaluation }) => createSubjectEvaluation(payload.subjectId, payload.data),
    onSuccess,
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })

export const useUpdateSubjectEvaluation = (onSuccess: (data: ISubjectEvaluationInResponse) => void) =>
  useMutation({
    mutationFn: (payload: { subjectId: string; data: ICreateSubjectEvaluation }) => updateSubjectEvaluation(payload.subjectId, payload.data),
    onSuccess,
    onError: (error: Error) => {
      const { message } = error
      toast.error(message)
    },
  })
