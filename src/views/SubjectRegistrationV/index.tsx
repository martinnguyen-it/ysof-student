import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { useGetManageForm } from '@/apis/manageForm/useQueryManageForm'
import { usePostSubjectRegistration } from '@/apis/registration/useMutationRegistration'
import { useGetSubjectRegistration } from '@/apis/registration/useQueryRegistration'
import { useGetListSubjects } from '@/apis/subject/useQuerySubject'
import { currentSeasonState } from '@/atom/seasonAtom'
import { EManageFormStatus, EManageFormType } from '@/domain/manageForm'
import { Button, Checkbox, GetProp, Spin } from 'antd'
import dayjs from 'dayjs'
import { isEqual, size } from 'lodash'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

const SubjectRegistrationV: FC = () => {
  const currentSeason = useRecoilValue(currentSeasonState)
  const [value, setValue] = useState<string[]>([])
  const [initValue, setInitValue] = useState<string[]>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>()

  const {
    data: dataForm,
    isFetched,
    isLoading: isLoadingManageForm,
  } = useGetManageForm(EManageFormType.SUBJECT_REGISTRATION)
  const { data: listSubjects, isLoading: isLoadingSubject } =
    useGetListSubjects({ season: currentSeason?.season })
  const { data: dataSubjectRegistration, isLoading: isLoadingRegistration } =
    useGetSubjectRegistration(isFetched)

  useEffect(() => {
    if (dataSubjectRegistration) {
      setValue(dataSubjectRegistration.subjects_registration)
      setInitValue(dataSubjectRegistration.subjects_registration)
    }
  }, [currentSeason])

  const isUpdateForm = !!dataSubjectRegistration

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    setValue(checkedValues as string[])
  }

  const onSuccess = () => {
    setInitValue(value)
    toast.success('Đăng ký thành công')
  }

  const { mutate, isPending } = usePostSubjectRegistration(onSuccess)

  const onSubmit = async () => {
    // if (size(value) < 15) {
    //   setError('Bạn phải đăng ký ít nhất 15 chủ đề.')
    //   return
    // }

    mutate({ subjects: value })
  }

  const element: ReactNode = useMemo(() => {
    switch (dataForm?.status) {
      case undefined:
      case EManageFormStatus.INACTIVE:
        return (
          <div className='mt-4 rounded-xl bg-white p-6 shadow-lg'>
            <div className='text-center text-xl font-medium'>
              Form chưa được mở
            </div>
          </div>
        )
      case EManageFormStatus.CLOSED:
        return (
          <>
            <div className='mt-4 rounded-xl bg-white p-6 shadow-lg'>
              <div className='text-center text-xl font-medium'>
                Form đã được đóng
              </div>
            </div>
            <div className='mt-4 rounded-xl bg-white p-6 shadow-lg'>
              <div className='text-center text-lg font-medium'>
                Đây là danh sách chủ đề bạn đã đăng ký
              </div>
              <div className='flex justify-center'>
                <div className='mt-5'>
                  {listSubjects &&
                    size(listSubjects) > 0 &&
                    listSubjects.map((item) => (
                      <p className='mb-1 break-words' key={item.id}>
                        <span className='italic'>
                          {dayjs(item.start_at).format('DD-MM-YYYY')}
                        </span>{' '}
                        - {item.code} - {item.title}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </>
        )
      case EManageFormStatus.ACTIVE:
        return (
          <>
            <div className='rounded-xl bg-white p-6 shadow-lg'>
              <div className='flex justify-center text-2xl font-bold'>
                ĐĂNG KÝ MÔN HỌC - YSOF {currentSeason?.academic_year}
              </div>
              <div className='mt-4 px-10'>
                <p
                  dangerouslySetInnerHTML={{ __html: dataForm?.data?.content }}
                />
                Nếu gặp trở ngại với đường link đăng ký môn học, bạn hãy phản
                hồi với chúng tôi qua địa chỉ email YSOF:{' '}
                <a className='text-blue-500' href='mailto:ysofsj@gmail.com'>
                  ysofsj@gmail.com
                </a>
                <br />
                <br />
                Trân trọng,
                <br />
                BTC YSOF.
              </div>
            </div>
            <div className='mt-4 rounded-xl bg-white p-6 shadow-lg'>
              <div className='text-center text-lg font-medium'>
                Vui lòng chọn môn học bạn muốn đăng ký
              </div>
              <div className='text-center italic'>
                Lưu ý: Bạn phải chọn tối thiểu 15 chủ đề
              </div>
              <div className='mt-5 flex justify-center'>
                <Checkbox.Group
                  className='flex max-w-5xl flex-col gap-2'
                  value={value}
                  onChange={onChange}
                >
                  {listSubjects &&
                    size(listSubjects) > 0 &&
                    listSubjects.map((item) => (
                      <Checkbox
                        className='text-base'
                        value={item.id}
                        key={item.id}
                      >
                        <span className='break-words'>
                          {dayjs(item.start_at).format('DD-MM-YYYY')} -{' '}
                          {item.code} - {item.title}
                        </span>
                      </Checkbox>
                    ))}
                  {error && size(value) < 15 ? (
                    <p className='text-red-500'>{error}</p>
                  ) : null}

                  <div>
                    <Button
                      disabled={isEqual(initValue, value)}
                      loading={isPending}
                      className='mt-2'
                      onClick={onSubmit}
                      type='primary'
                    >
                      {isUpdateForm ? 'Sửa đăng ký' : 'Đăng ký'}
                    </Button>
                  </div>
                </Checkbox.Group>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }, [dataForm, value, error, initValue, listSubjects])

  return isLoadingManageForm && isLoadingSubject && isLoadingRegistration ? (
    <div className='mt-20 flex w-full justify-center'>
      <Spin size='large' />
    </div>
  ) : (
    element
  )
}

export default SubjectRegistrationV
