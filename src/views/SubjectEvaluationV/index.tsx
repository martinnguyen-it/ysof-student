import { FC, ReactNode, useEffect, useMemo } from 'react'
import { useGetManageForm } from '@/apis/manageForm/useQueryManageForm'
import { useGetSubjectDetail } from '@/apis/subject/useQuerySubject'
import { useGetSubjectEvaluationBySubjectId } from '@/apis/subjectEvaluation/useQuerySubjectEvaluation'
import { useGetSubjectEvaluationQuestions } from '@/apis/subjectEvaluationQuestion/useQuerySubjectEvaluationQuestion'
import { EManageFormStatus, EManageFormType } from '@/domain/manageForm'
import { Button, Spin } from 'antd'
import { isEmpty } from 'lodash'
import EvaluationForm from './components/EvaluationForm'
import SubjectHeader from './components/SubjectHeader'
import { useEvaluationForm } from './hooks/useEvaluationForm'

const SubjectEvaluationV: FC = () => {
  const {
    data: dataForm,
    isFetched,
    isLoading: isLoadingManageForm,
  } = useGetManageForm(EManageFormType.SUBJECT_EVALUATION)
  const { data: dataSubject, isLoading: isLoadingSubject } =
    useGetSubjectDetail(
      dataForm?.data?.subject_id,
      isFetched &&
        dataForm?.status !== EManageFormStatus.CLOSED &&
        !!dataForm?.data?.subject_id
    )
  const { data: dataSubjectEvaluation, isLoading: isLoadingEvaluation } =
    useGetSubjectEvaluationBySubjectId({
      subjectId: dataForm?.data?.subject_id,
      enabled:
        isFetched &&
        dataForm?.status !== EManageFormStatus.CLOSED &&
        !!dataForm?.data?.subject_id,
      isToastError: false,
      retry: 1,
    })
  const {
    data: dataSubjectEvaluationQuestions,
    isLoading: isLoadingEvaluationQuestions,
  } = useGetSubjectEvaluationQuestions({
    subjectId: dataForm?.data?.subject_id,
    enabled:
      isFetched &&
      dataForm?.status !== EManageFormStatus.CLOSED &&
      !!dataForm?.data?.subject_id,
    isToastError: false,
  })

  const { form, isUpdateForm, isPending, onSubmit } = useEvaluationForm(
    dataForm?.data?.subject_id || '',
    dataSubjectEvaluation
  )

  useEffect(() => {
    if (!isEmpty(dataSubjectEvaluation)) {
      form.setFieldsValue(dataSubjectEvaluation)
    }
  }, [dataSubjectEvaluation])
  const element: ReactNode = useMemo(() => {
    switch (dataForm?.status) {
      case undefined:
      case EManageFormStatus.INACTIVE:
        return (
          <div className='mt-4 w-full rounded-xl bg-white p-6 shadow-lg'>
            <div className='text-center text-xl font-medium'>
              Form chưa được mở
            </div>
          </div>
        )
      case EManageFormStatus.CLOSED:
        return (
          <div className='mt-4 rounded-xl bg-white p-6 shadow-lg'>
            <div className='text-center text-xl font-medium'>
              Form đã được đóng
            </div>
          </div>
        )
      case EManageFormStatus.ACTIVE:
        return (
          <div className='flex w-full justify-center'>
            <div className='rounded-xl bg-white px-10 py-6 shadow-lg lg:w-10/12 xl:w-[70%]'>
              {dataSubject && <SubjectHeader subject={dataSubject} />}
              <EvaluationForm
                form={form}
                questions={dataSubjectEvaluationQuestions?.questions}
              />
              <Button
                type='primary'
                color='green'
                loading={isPending}
                onClick={onSubmit}
              >
                {isUpdateForm ? 'Sửa' : 'Gửi'}
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }, [dataForm, dataSubject, form, isPending, isUpdateForm, onSubmit])

  return isLoadingManageForm ||
    isLoadingSubject ||
    isLoadingEvaluation ||
    isLoadingEvaluationQuestions ? (
    <div className='mt-20 flex w-full justify-center'>
      <Spin size='large' />
    </div>
  ) : (
    element
  )
}

export default SubjectEvaluationV
