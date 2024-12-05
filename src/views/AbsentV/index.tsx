import { Button, Divider, Form, Input, Spin } from 'antd'

import { FC, ReactNode, useEffect, useMemo } from 'react'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'
import { EManageFormStatus, EManageFormType } from '@domain/manageForm'
import { toast } from 'react-toastify'
import { useGetManageForm } from '@src/apis/manageForm/useQueryManageForm'
import { useGetSubjectAbsentBySubjectId } from '@src/apis/subjectAbsent/useQuerySubjectAbsent'
import { useGetSubjectDetail } from '@src/apis/subject/useQuerySubject'
import { useCreateSubjectAbsent, useDeleteSubjectAbsent, useUpdateSubjectAbsent } from '@src/apis/subjectAbsent/useMutationSubjectAbsent'

const SubjectAbsentV: FC = () => {
  const [form] = Form.useForm()

  const { data: dataForm, isFetched, isLoading: isLoadingManageForm } = useGetManageForm(EManageFormType.SUBJECT_ABSENT)
  const { data: dataSubject, isLoading: isLoadingSubject } = useGetSubjectDetail(
    dataForm?.data?.subject_id,
    isFetched && dataForm?.status !== EManageFormStatus.CLOSED && !!dataForm?.data?.subject_id,
  )
  const { data: dataSubjectAbsent, isLoading: isLoadingAbsent } = useGetSubjectAbsentBySubjectId({
    id: dataForm?.data?.subject_id,
    enabled: isFetched && dataForm?.status !== EManageFormStatus.CLOSED && !!dataForm?.data?.subject_id,
    isToastError: false,
  })

  const isUpdateForm = !!dataSubjectAbsent

  useEffect(() => {
    if (!isEmpty(dataSubjectAbsent)) {
      form.setFieldsValue(dataSubjectAbsent)
    }
  }, [dataSubjectAbsent])

  const onSuccess = () => {
    if (isUpdateForm) toast.success('Sửa thành công')
    else toast.success('Thêm thành công')
  }

  const { mutate: mutateCreate, isPending: isPendingCreate } = useCreateSubjectAbsent(onSuccess)
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateSubjectAbsent(onSuccess)

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

  const onSuccessDelete = () => {
    toast.success('Xóa thành công')
    form.resetFields()
  }
  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteSubjectAbsent(onSuccessDelete)
  const onDeleteAbsent = () => {
    mutateDelete(dataSubject?.id || '')
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
              <div className='flex justify-center text-2xl font-bold'>FORM NGHỈ PHÉP BUỔI HỌC {dataSubject?.code}</div>
              <div className='mt-5'>
                Chủ đề: <span className='font-medium uppercase'>{dataSubject?.title}</span>
                <br />
                Giảng Viên:{' '}
                <span className='font-medium italic'>
                  {dataSubject?.lecturer?.title ? dataSubject?.lecturer.title + ' ' : ''}
                  {dataSubject?.lecturer?.holy_name ? dataSubject?.lecturer.holy_name + ' ' : ''}
                  {dataSubject?.lecturer.full_name}
                </span>
                <div className='mt-3 flex flex-col gap-1 text-sm'>
                  <p>
                    Nếu bạn cần xin nghỉ buổi học này, vui lòng điền form nghỉ phép để giúp BTC dễ dàng ghi nhận đầy đủ, cũng như hiểu được lý do bạn không thể sắp xếp tham dự buổi
                    học.
                  </p>
                  <p>Lưu ý:</p>
                  <p>1. Cách thức xin nghỉ học có phép hợp lệ là bằng cách điền form này. Mọi cách thức khác đều không hợp lệ.</p>
                  <p>
                    2. Hạn chót tiếp nhận: <span className='font-medium'>12 giờ trưa thứ 7 ngày {dataSubject ? dayjs(dataSubject.start_at).format('DD-MM-YYYY') : null}</span>. Sau
                    thời gian này, form sẽ tự động đóng lại và BTC không ghi nhận thêm. Vì thế, các bạn cần chủ động sắp xếp thời gian để điền form.
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
              <Form layout='vertical' form={form} name='form-dataSubject-absent'>
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
                <Button type='primary' className={`${isUpdateForm ? 'bg-green-600 hover:!bg-green-500/80' : ''}`} onClick={onSubmit} loading={isPendingCreate || isPendingUpdate}>
                  {isUpdateForm ? 'Sửa' : 'Gửi'}
                </Button>
                {isUpdateForm ? (
                  <Button type='primary' className='!bg-red-600 hover:!bg-red-600/80' onClick={onDeleteAbsent} loading={isPendingDelete}>
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
  }, [dataForm, isUpdateForm, dataSubject])

  return (
    <div className='m-2 md:m-6'>
      {isLoadingManageForm || isLoadingSubject || isLoadingAbsent ? (
        <div className='mt-20 flex justify-center'>
          <Spin size='large' />
        </div>
      ) : (
        element
      )}
    </div>
  )
}

export default SubjectAbsentV
