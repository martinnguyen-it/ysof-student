import { useQueryClient } from '@tanstack/react-query'
import {
  useCreateSubjectEvaluation,
  useUpdateSubjectEvaluation,
} from '@/apis/subjectEvaluation/useMutationSubjectEvaluation'
import { ISubjectEvaluationInResponse } from '@/domain/subjectEvaluation'
import { Form } from 'antd'
import { toast } from 'react-toastify'

export const useEvaluationForm = (
  subjectId: string,
  initialData?: ISubjectEvaluationInResponse
) => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const isUpdateForm = !!initialData

  const onSuccess = (data: ISubjectEvaluationInResponse) => {
    if (isUpdateForm) toast.success('Sửa thành công')
    else toast.success('Thêm thành công')
    queryClient.setQueryData(
      ['getSubjectEvaluationBySubjectId', subjectId],
      data
    )
  }

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    useCreateSubjectEvaluation(onSuccess)
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateSubjectEvaluation(onSuccess)

  const onSubmit = async () => {
    try {
      await form.validateFields()
      const data = form.getFieldsValue()
      if (isUpdateForm) {
        mutateUpdate({ subjectId, data })
      } else {
        mutateCreate({ subjectId, data })
      }
    } catch {}
  }

  return {
    form,
    isUpdateForm,
    isPending: isPendingCreate || isPendingUpdate,
    onSubmit,
  }
}
