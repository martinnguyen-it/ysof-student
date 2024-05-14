import { Button, Divider, Form, Input, Spin } from 'antd'

import { FC, ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'
import { ISubjectInResponse } from '@domain/subject'
import { getSubjectDetail } from '@src/services/subject'
import { EManageFormStatus, EManageFormType } from '@domain/manageForm'
import { getManageForm } from '@src/services/manageForm'
import { toast } from 'react-toastify'
import { createSubjectAbsent, deleteSubjectAbsent, getSubjectAbsentNotHandler, updateSubjectAbsent } from '@src/services/subjectAbsent'
import { ISubjectAbsentInResponse } from '@domain/subjectAbsent'

const SubjectEvaluationV: FC = () => {
  const [form] = Form.useForm()
  const [subject, setSubject] = useState<ISubjectInResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
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
          const dataUpdate = await getSubjectAbsentNotHandler(resForm.data.subject_id)
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
      let res: ISubjectAbsentInResponse
      if (isUpdateForm) {
        res = await updateSubjectAbsent(subject?.id || 'id', data)
        if (!isEmpty(res)) {
          toast.success('Sửa thành công')
          setReloadData()
        }
      } else {
        res = await createSubjectAbsent(subject?.id || 'id', data)
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

  const onDeleteAbsent = async () => {
    setIsLoadingDelete(true)
    if (subject) {
      try {
        const res = await deleteSubjectAbsent(subject.id)
        if (res) {
          toast.success('Xóa thành công')
          form.resetFields()
          setIsUpdateForm(false)
        }
      } catch (error) {
        setIsLoadingDelete(false)
      }
    } else {
      toast.error('Môn học không hợp lệ')
    }
    setIsLoadingDelete(false)
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
              <div className='flex justify-center text-2xl font-bold'>FORM NGHỈ PHÉP BUỔI HỌC {subject?.code}</div>
              <div className='mt-5'>
                Chủ đề: <span className='font-medium uppercase'>{subject?.title}</span>
                <br />
                Giảng Viên:{' '}
                <span className='font-medium italic'>
                  {subject?.lecturer?.title ? subject?.lecturer.title + ' ' : ''}
                  {subject?.lecturer?.holy_name ? subject?.lecturer.holy_name + ' ' : ''}
                  {subject?.lecturer.full_name}
                </span>
                <div className='mt-3 flex flex-col gap-1 text-sm'>
                  <p>
                    Nếu bạn cần xin nghỉ buổi học này, vui lòng điền form nghỉ phép để giúp BTC dễ dàng ghi nhận đầy đủ, cũng như hiểu được lý do bạn không thể sắp xếp tham dự buổi
                    học.
                  </p>
                  <p>Lưu ý:</p>
                  <p>1. Cách thức xin nghỉ học có phép hợp lệ là bằng cách điền form này. Mọi cách thức khác đều không hợp lệ.</p>
                  <p>
                    2. Hạn chót tiếp nhận: <span className='font-medium'>12 giờ trưa thứ 7 ngày {subject ? dayjs(subject.start_at).format('DD-MM-YYYY') : null}</span>. Sau thời
                    gian này, form sẽ tự động đóng lại và BTC không ghi nhận thêm. Vì thế, các bạn cần chủ động sắp xếp thời gian để điền form.
                  </p>
                  <p>
                    3. Trong trường hợp bạn đã điền form nhưng sau đó có thể sắp xếp để tham dự buổi học, vui lòng báo lại cho BTC qua mail{' '}
                    <a href='mailto:ysofsj@gmail.com' className='text-blue-500 underline'>
                      ysofsj@gmail.com
                    </a>
                    .
                  </p>
                  <p>4. Nếu có sai sót, lỗi trong quá trình gửi form, vui lòng báo lại cho BTC kiểm tra.</p>
                  <p>5. BTC sẽ xem xét lý do của bạn và chỉ ghi nhận bạn có phép khi lý do của bạn chính đáng.</p>
                  <p>Trong Chúa,</p>
                  <p>Ban Kỷ Luật YSOF</p>
                </div>
              </div>
              <Divider />
              <Form layout='vertical' form={form} name='form-subject-absent'>
                <Form.Item
                  name={'reason'}
                  label={'Bạn có thể chia sẻ cho BTC biết lý do bạn không thể tham dự buổi học này không?'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này không được để trống',
                    },
                  ]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Form>
              <div className='flex gap-3'>
                <Button type='primary' className={`${isUpdateForm ? 'bg-green-600 hover:!bg-green-500/80' : ''}`} onClick={onSubmit} loading={isLoadingSubmit}>
                  {isUpdateForm ? 'Sửa' : 'Gửi'}
                </Button>
                {isUpdateForm ? (
                  <Button type='primary' className='!bg-red-600 hover:!bg-red-600/80' onClick={onDeleteAbsent} loading={isLoadingDelete}>
                    Xóa
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }, [statusForm, isUpdateForm, subject])

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
