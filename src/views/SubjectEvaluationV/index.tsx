import { Button, Divider, Form, Input, InputNumber, Radio, Spin } from 'antd'

import { FC, ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import { isEmpty, map } from 'lodash'
import dayjs from 'dayjs'
import { ISubjectInResponse } from '@domain/subject'
import { getSubjectDetail } from '@src/services/subject'
import { EManageFormStatus, EManageFormType } from '@domain/manageForm'
import { getManageForm } from '@src/services/manageForm'
import { EVALUATION_QUALITY } from '@constants/subjectEvaluation'
import { EQualityValue, ISubjectEvaluationInResponse } from '@domain/subjectEvaluation'
import { createSubjectEvaluation, getSubjectEvaluationNotHandler, updateSubjectEvaluation } from '@src/services/subjectEvaluation'
import { toast } from 'react-toastify'
import { getSubjectEvaluationQuestionsNotHandler } from '@src/services/subjectEvaluationQuestion'
import { IEvaluationQuestionItem } from '@domain/subjectEvaluationQuestion'
import InputByType from '@components/InputByType'

const SubjectEvaluationV: FC = () => {
  const [form] = Form.useForm()
  const [subject, setSubject] = useState<ISubjectInResponse>()
  const [subjectEvaluationQuestion, setSubjectEvaluationQuestion] = useState<IEvaluationQuestionItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [statusForm, setStatusForm] = useState<EManageFormStatus>()
  const [isUpdateForm, setIsUpdateForm] = useState(false)
  const [reloadData, setReloadData] = useReducer((prev) => !prev, false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const resForm = await getManageForm(EManageFormType.SUBJECT_EVALUATION)
      if (!isEmpty(resForm)) {
        setStatusForm(resForm.status)
        if (resForm?.data && resForm?.data?.subject_id) {
          const resSubject = await getSubjectDetail(resForm.data.subject_id)
          if (!isEmpty(resSubject)) setSubject(resSubject)
          const resEvaluationQuestions = await getSubjectEvaluationQuestionsNotHandler(resForm.data.subject_id)
          if (!isEmpty(resEvaluationQuestions)) setSubjectEvaluationQuestion(resEvaluationQuestions.questions)
          const dataUpdate = await getSubjectEvaluationNotHandler(resForm.data.subject_id)
          if (!isEmpty(dataUpdate)) {
            form.setFieldsValue(dataUpdate)
            setIsUpdateForm(true)
          }
        }
      }

      setIsLoading(false)
    })()
  }, [reloadData])

  const onSubmit = async () => {
    setIsLoadingSubmit(true)
    try {
      await form.validateFields()
      const data = form.getFieldsValue()
      console.log('🚀 ~ onSubmit ~ data:', data)
      let res: ISubjectEvaluationInResponse
      if (isUpdateForm) {
        res = await updateSubjectEvaluation(subject?.id || 'id', data)
        if (!isEmpty(res)) {
          toast.success('Sửa thành công')
          setReloadData()
        }
      } else {
        res = await createSubjectEvaluation(subject?.id || 'id', data)
        if (!isEmpty(res)) {
          toast.success('Thêm thành công')
          setReloadData()
        }
      }
    } catch (error) {
      setIsLoadingSubmit(false)
    }
    setIsLoadingSubmit(false)
  }

  const element: ReactNode = useMemo(() => {
    switch (statusForm) {
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
              <div className='flex justify-center text-2xl font-bold'>{subject?.code} - LƯỢNG GIÁ MÔN HỌC</div>
              <div className='mt-5'>
                Chủ đề: <span className='font-medium uppercase'>{subject?.title}</span>
                <br />
                Giảng Viên:{' '}
                <span className='font-medium italic'>
                  {subject?.lecturer?.title ? subject?.lecturer.title + ' ' : ''}
                  {subject?.lecturer?.holy_name ? subject?.lecturer.holy_name + ' ' : ''}
                  {subject?.lecturer.full_name}
                </span>
                <br />
                Hạn nộp: 23h59 - Thứ hai, ngày {dayjs(subject?.start_at).add(2, 'day').format('DD/MM/YYYY')}
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
                {map(subjectEvaluationQuestion, (item, idx) => (
                  <InputByType key={idx} index={idx} {...item} />
                ))}
              </Form>
              <Button type='primary' onClick={onSubmit} loading={isLoadingSubmit}>
                {isUpdateForm ? 'Sửa' : 'Gửi'}
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }, [statusForm, isUpdateForm, subject, subjectEvaluationQuestion])

  return (
    <div className='m-2 md:m-6'>
      {isLoading ? (
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
