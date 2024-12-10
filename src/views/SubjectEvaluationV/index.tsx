import { Button, Divider, Form, Input, InputNumber, Radio, Spin } from 'antd'

import { FC, ReactNode, useEffect, useMemo } from 'react'
import { isEmpty, map, size } from 'lodash'
import dayjs from 'dayjs'
import { EManageFormStatus, EManageFormType } from '@domain/manageForm'
import { EVALUATION_QUALITY } from '@constants/subjectEvaluation'
import { EQualityValue } from '@domain/subjectEvaluation'
import { toast } from 'react-toastify'
import InputByType from '@components/InputByType'
import { useGetManageForm } from '@src/apis/manageForm/useQueryManageForm'
import { useGetSubjectDetail } from '@src/apis/subject/useQuerySubject'
import { useGetSubjectEvaluationBySubjectId } from '@src/apis/subjectEvaluation/useQuerySubjectEvaluation'
import { useCreateSubjectEvaluation, useUpdateSubjectEvaluation } from '@src/apis/subjectEvaluation/useMutationSubjectEvaluation'
import { useGetSubjectEvaluationQuestions } from '@src/apis/subjectEvaluationQuestion/useQuerySubjectEvaluationQuestion'

const SubjectEvaluationV: FC = () => {
  const [form] = Form.useForm()

  const { data: dataForm, isFetched, isLoading: isLoadingManageForm } = useGetManageForm(EManageFormType.SUBJECT_EVALUATION)
  const { data: dataSubject, isLoading: isLoadingSubject } = useGetSubjectDetail(
    dataForm?.data?.subject_id,
    isFetched && dataForm?.status !== EManageFormStatus.CLOSED && !!dataForm?.data?.subject_id,
  )
  const { data: dataSubjectEvaluation, isLoading: isLoadingEvaluation } = useGetSubjectEvaluationBySubjectId({
    subjectId: dataForm?.data?.subject_id,
    enabled: isFetched && dataForm?.status !== EManageFormStatus.CLOSED && !!dataForm?.data?.subject_id,
    isToastError: false,
    retry: 1,
  })
  const { data: dataSubjectEvaluationQuestions, isLoading: isLoadingEvaluationQuestions } = useGetSubjectEvaluationQuestions({
    subjectId: dataForm?.data?.subject_id,
    enabled: isFetched && dataForm?.status !== EManageFormStatus.CLOSED && !!dataForm?.data?.subject_id,
    isToastError: false,
  })

  const isUpdateForm = !!dataSubjectEvaluation

  useEffect(() => {
    if (!isEmpty(dataSubjectEvaluation)) {
      form.setFieldsValue(dataSubjectEvaluation)
    }
  }, [dataSubjectEvaluation])

  const onSuccess = () => {
    if (isUpdateForm) toast.success('Sửa thành công')
    else toast.success('Thêm thành công')
  }

  const { mutate: mutateCreate, isPending: isPendingCreate } = useCreateSubjectEvaluation(onSuccess)
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateSubjectEvaluation(onSuccess)

  const onSubmit = async () => {
    try {
      await form.validateFields()
      const data = form.getFieldsValue()
      if (isUpdateForm) {
        mutateUpdate({ subjectId: dataSubject?.id || '', data })
      } else {
        mutateCreate({ subjectId: dataSubject?.id || '', data })
      }
    } catch {
      /* empty */
    }
  }
  const element: ReactNode = useMemo(() => {
    switch (dataForm?.status) {
      case undefined:
      case EManageFormStatus.INACTIVE:
        return (
          <div className='mt-4 w-full rounded-xl bg-white p-6 shadow-lg'>
            <div className='text-center text-xl font-medium'>Form chưa được mở</div>
          </div>
        )
      case EManageFormStatus.CLOSED:
        return (
          <div className='mt-4 rounded-xl bg-white p-6 shadow-lg'>
            <div className='text-center text-xl font-medium'>Form đã được đóng</div>
          </div>
        )
      case EManageFormStatus.ACTIVE:
        return (
          <div className='flex w-full justify-center'>
            <div className='rounded-xl bg-white px-10 py-6 shadow-lg lg:w-10/12 xl:w-[70%]'>
              <div className='flex justify-center text-2xl font-bold'>{dataSubject?.code} - LƯỢNG GIÁ MÔN HỌC</div>
              <div className='mt-5'>
                Chủ đề: <span className='font-medium uppercase'>{dataSubject?.title}</span>
                <br />
                Giảng Viên:{' '}
                <span className='font-medium italic'>
                  {dataSubject?.lecturer?.title ? dataSubject?.lecturer.title + ' ' : ''}
                  {dataSubject?.lecturer?.holy_name ? dataSubject?.lecturer.holy_name + ' ' : ''}
                  {dataSubject?.lecturer.full_name}
                </span>
                <br />
                Hạn nộp: 23h59 - Thứ hai, ngày {dayjs(dataSubject?.start_at).add(2, 'day').format('DD/MM/YYYY')}
                <br />
                <br />
                Mong bạn làm lượng giá bằng cả trái tim,
                <br />
                Ban Học Vụ YSOF
              </div>
              <Divider />
              <Form layout='vertical' form={form} name='form-subject-evaluation'>
                <div className='mb-1 text-sm'>1. Bạn đánh giá như thế nào về chất lượng của bài giảng hôm nay?</div>
                <div className='ml-6'>
                  {EVALUATION_QUALITY.map((item) => (
                    <Form.Item
                      name={['quality', item.key]}
                      key={item.key}
                      label={item.label}
                      rules={[
                        {
                          required: true,
                          message: 'Trường này không được để trống',
                        },
                      ]}
                    >
                      <Radio.Group className='flex flex-col md:flex-row'>
                        {Object.values(EQualityValue).map((val, idx) => (
                          <Radio key={item.key + idx} value={val}>
                            {val}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  ))}
                </div>
                <Form.Item
                  name={'most_resonated'}
                  label={'2. Hãy nêu điều làm bạn tâm đắc nhất trong buổi học.'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này không được để trống',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  name={'invited'}
                  label={'3. Từ những điều tâm đắc trên, bạn được mời gọi làm gì?'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này không được để trống',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  name={'feedback_lecturer'}
                  label={'4. Mời bạn gửi đến giảng viên những tâm tình/chia sẻ của mình tại đây nhé:'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này không được để trống',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  name={'satisfied'}
                  label={'5. Mức độ hài lòng chung của bạn đối với lớp học hôm nay?'}
                  rules={[
                    {
                      required: true,

                      message: 'Trường này không được để trống',
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} min={1} max={10} placeholder='Đánh giá trên thang điểm 10' />
                </Form.Item>
                <Form.Item
                  name={'feedback_admin'}
                  label={'6. Bạn có ý kiến gì cho BTC để góp phần cải thiện chất lượng lớp học ở các buổi học tiếp theo không? (VD: Về MC, các hoạt động,...)'}
                >
                  <Input.TextArea />
                </Form.Item>
                {size(dataSubjectEvaluationQuestions?.questions) && map(dataSubjectEvaluationQuestions?.questions, (item, idx) => <InputByType key={idx} index={idx} {...item} />)}
              </Form>
              <Button type='primary' onClick={onSubmit} loading={isPendingCreate || isPendingUpdate}>
                {isUpdateForm ? 'Sửa' : 'Gửi'}
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }, [dataForm, isUpdateForm, dataSubject, dataSubjectEvaluationQuestions])

  return (
    <div className='m-2 md:m-6'>
      {isLoadingManageForm || isLoadingSubject || isLoadingEvaluation || isLoadingEvaluationQuestions ? (
        <div className='mt-20 flex justify-center'>
          <Spin size='large' />
        </div>
      ) : (
        element
      )}
    </div>
  )
}

export default SubjectEvaluationV
