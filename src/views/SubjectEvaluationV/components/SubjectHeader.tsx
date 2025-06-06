import { FC } from 'react'
import { ISubjectInResponse } from '@/domain/subject'
import { Divider } from 'antd'
import dayjs from 'dayjs'

interface SubjectHeaderProps {
  subject: ISubjectInResponse
}

const SubjectHeader: FC<SubjectHeaderProps> = ({ subject }) => {
  return (
    <>
      <div className='flex justify-center text-2xl font-bold'>
        {subject?.code} - LƯỢNG GIÁ MÔN HỌC
      </div>
      <div className='mt-5'>
        Chủ đề: <span className='font-medium uppercase'>{subject?.title}</span>
        <br />
        Giảng Viên:{' '}
        <span className='font-medium italic'>
          {subject?.lecturer?.title ? subject?.lecturer.title + ' ' : ''}
          {subject?.lecturer?.holy_name
            ? subject?.lecturer.holy_name + ' '
            : ''}
          {subject?.lecturer.full_name}
        </span>
        <br />
        Hạn nộp: 23h59 - Thứ hai, ngày{' '}
        {dayjs(subject?.start_at).add(2, 'day').format('DD/MM/YYYY')}
        <br />
        <br />
        Mong bạn làm lượng giá bằng cả trái tim,
        <br />
        Ban Học Vụ YSOF
      </div>
      <Divider />
    </>
  )
}

export default SubjectHeader
