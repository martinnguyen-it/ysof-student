import { Button, Checkbox, GetProp, Spin } from 'antd'

import { FC, ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import { isArray, isEmpty, isEqual, size } from 'lodash'
import dayjs from 'dayjs'
import { ISubjectInResponse } from '@domain/subject'
import { getListSubjects } from '@src/services/subject'
import { useRecoilValue } from 'recoil'
import { currentSeasonState } from '@atom/seasonAtom'
import { EManageFormStatus, EManageFormType, IManageFormInResponse } from '@domain/manageForm'
import { getManageForm } from '@src/services/manageForm'
import { getSubjectRegistration, postSubjectRegistration } from '@src/services/registration'
import { toast } from 'react-toastify'

const SubjectRegistrationV: FC = () => {
  const [listSubject, setListSubject] = useState<ISubjectInResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [dataForm, setDataForm] = useState<IManageFormInResponse>()
  const [isUpdateForm, setIsUpdateForm] = useState(false)
  const currentSeason = useRecoilValue(currentSeasonState)
  const [value, setValue] = useState<string[]>([])
  const [initValue, setInitValue] = useState<string[]>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>()
  const [reloadData, setReloadData] = useReducer((prev) => !prev, false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const resForm = await getManageForm(EManageFormType.SUBJECT_REGISTRATION)
      const resSubjectRegistration = await getSubjectRegistration()
      const resSubjects = await getListSubjects({ season: currentSeason?.season || undefined })
      if (!isEmpty(resForm)) setDataForm(resForm)
      if (resSubjectRegistration) {
        setIsUpdateForm(true)
        setValue(resSubjectRegistration.subjects_registration)
        setInitValue(resSubjectRegistration.subjects_registration)
      }
      if (!isEmpty(resSubjects) || isArray(resSubjects)) setListSubject(resSubjects)

      setIsLoading(false)
    })()
  }, [currentSeason, reloadData])

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    setValue(checkedValues as string[])
  }

  const onSubmit = async () => {
    // if (size(value) < 15) {
    //   setError('Bạn phải đăng ký ít nhất 15 chủ đề.')
    //   return
    // }
    setIsLoadingSubmit(true)
    const res = await postSubjectRegistration({ subjects: value })
    if (!isEmpty(res)) {
      toast.success('Đăng ký thành công')
      setReloadData()
    }
    setIsLoadingSubmit(false)
  }

  const element: ReactNode = useMemo(() => {
    switch (dataForm?.status) {
      case undefined:
      case EManageFormStatus.INACTIVE:
        return (
          <div className='mt-4 rounded-xl bg-white p-6 shadow-lg'>
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
          <>
            <div className='rounded-xl bg-white p-6 shadow-lg'>
              <div className='flex justify-center text-2xl font-bold'>ĐĂNG KÝ MÔN HỌC - YSOF {currentSeason?.academic_year}</div>
              <div className='mt-4 px-10'>
                <p dangerouslySetInnerHTML={{ __html: dataForm?.data?.content }} />
                Nếu gặp trở ngại với đường link đăng ký môn học, bạn hãy phản hồi với chúng tôi qua địa chỉ email YSOF:{' '}
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
              <div className='text-center text-lg font-medium'>Vui lòng chọn môn học bạn muốn đăng ký</div>
              <div className='text-center italic'>Lưu ý: Bạn phải chọn tối thiểu 15 chủ đề</div>
              <div className='mt-5 flex justify-center'>
                <Checkbox.Group className='flex max-w-5xl flex-col gap-2' value={value} onChange={onChange}>
                  {size(listSubject) > 0 &&
                    listSubject.map((item) => (
                      <Checkbox className='text-base' value={item.id} key={item.id}>
                        <span className='break-words'>
                          {dayjs(item.start_at).format('DD-MM-YYYY')} - {item.code} - {item.title}
                        </span>
                      </Checkbox>
                    ))}
                  {error && size(value) < 15 ? <p className='text-red-500'>{error}</p> : null}

                  <div>
                    <Button disabled={isEqual(initValue, value)} loading={isLoadingSubmit} className='mt-2' onClick={onSubmit} type='primary'>
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
  }, [dataForm, value, error])

  return (
    <div className='mx-6 mt-6 min-h-[calc(100vh-96px)]'>
      {isLoading ? (
        <div className='mt-20 flex w-full justify-center'>
          <Spin size='large' />
        </div>
      ) : (
        element
      )}
    </div>
  )
}

export default SubjectRegistrationV
