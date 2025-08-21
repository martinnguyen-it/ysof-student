import { useEffect } from 'react'
import { useUpdateMe } from '@/apis/student/useMutationStudent'
import { userInfoState } from '@/atom/authAtom'
import { IStudentMeInResponse } from '@/domain/student'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

const UpdateInfo = () => {
  const [form] = Form.useForm()

  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const onSuccessUpdateMe = (data: IStudentMeInResponse) => {
    toast.success('Cập nhật thành công.')
    setUserInfo(data)
  }

  const { mutate: mutateUpdateMe, isPending: isLoadingUpdate } =
    useUpdateMe(onSuccessUpdateMe)

  const handleSubmit = async () => {
    try {
      await form.validateFields()
      const data = form.getFieldsValue()
      mutateUpdateMe(data)
    } catch {
      /* empty */
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...userInfo,
      date_of_birth: undefined,
      date_of_birth_temp: userInfo?.date_of_birth
        ? dayjs(userInfo.date_of_birth, 'YYYY-MM-DD')
        : undefined,
    })
  }, [userInfo])

  return (
    <Form layout='vertical' form={form} name='form-update-info'>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3'>
        <Form.Item
          label='Tên thánh'
          name='holy_name'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên thánh',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name='full_name'
          label='Họ và tên'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email',
            },
            {
              type: 'email',
              message: 'Email không đúng định dạng',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name='date_of_birth_temp'
          label='Ngày sinh'
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
        >
          <DatePicker
            format='DD/MM/YYYY'
            placeholder='DD/MM/YYYY'
            disabled
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label='Giới tính'
          name='sex'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn giới tính',
            },
          ]}
        >
          <Select placeholder='Chọn giới tính'>
            <Select.Option value='Nam'>Nam</Select.Option>
            <Select.Option value='Nữ'>Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Địa chỉ'
          name='origin_address'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ',
            },
          ]}
        >
          <Input placeholder='Nhập địa chỉ' />
        </Form.Item>
        <Form.Item
          label='Giáo phận'
          name='diocese'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giáo phận',
            },
          ]}
        >
          <Input placeholder='Nhập giáo phận' />
        </Form.Item>
        <Form.Item
          label='Số điện thoại'
          name='phone_number'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại',
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Số điện thoại không hợp lệ',
            },
          ]}
        >
          <Input placeholder='Nhập số điện thoại' />
        </Form.Item>
        <Form.Item
          label='Trình độ học vấn'
          name='education'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập trình độ học vấn',
            },
          ]}
        >
          <Input placeholder='Nhập trình độ học vấn' />
        </Form.Item>
        <Form.Item
          label='Nghề nghiệp'
          name='job'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nghề nghiệp',
            },
          ]}
        >
          <Input placeholder='Nhập nghề nghiệp' />
        </Form.Item>
      </div>
      <div className='flex justify-end'>
        <Button type='primary' onClick={handleSubmit} loading={isLoadingUpdate}>
          Cập nhật
        </Button>
      </div>
    </Form>
  )
}

export default UpdateInfo
