import { ESort, IOpenFormWithMode } from '@domain/common'
import { Input, Select } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import type { TableProps } from 'antd'

import { FC, useState } from 'react'
import { isArray } from 'lodash'
import dayjs from 'dayjs'
import { ESubjectStatus, ISubjectInResponse } from '@domain/subject'
import { ESubjectStatusDetail, OPTIONS_SUBDIVISION, OPTIONS_SUBJECT_STATUS } from '@constants/subject'
import ModalView from './ModalView'
import { useRecoilValue } from 'recoil'
import { selectSeasonState } from '@atom/seasonAtom'
import { useGetListSubjects } from '@src/apis/subject/useQuerySubject'

const SubjectV: FC = () => {
  const [openForm, setOpenForm] = useState<IOpenFormWithMode<ISubjectInResponse>>({ active: false, mode: 'view' })

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ESubjectStatus>()
  const [subdivision, setSubdivision] = useState<string>()
  const [sort, setSort] = useState<ESort>()
  const [sortBy, setSortBy] = useState<string>()
  const season = useRecoilValue(selectSeasonState)

  const { data, isLoading } = useGetListSubjects({ search, subdivision, status, sort, sort_by: sortBy, season })

  const columns: ColumnsType<ISubjectInResponse> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '60px',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Mã chủ đề',
      dataIndex: 'code',
      sorter: true,
      width: '120px',
      key: 'code',
    },
    {
      title: 'Tên chủ đề',
      dataIndex: 'title',
      sorter: true,
      key: 'title',
    },
    {
      title: 'Phân môn',
      dataIndex: 'subdivision',
      sorter: true,
      key: 'subdivision',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'lecturer',
      key: 'lecturer',
      render: (_, record) => (
        <p className='text-wrap font-medium text-blue-500'>
          {record.lecturer?.title ? record.lecturer.title + ' ' : ''}
          {record.lecturer?.holy_name ? record.lecturer.holy_name + ' ' : ''}
          {record.lecturer.full_name}
        </p>
      ),
    },
    {
      title: 'Ngày học',
      dataIndex: 'start_at',
      key: 'start_at',
      sorter: true,
      render: (_, record) => <>{dayjs(record.start_at).format('DD-MM-YYYY')}</>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (text: ESubjectStatus) => ESubjectStatusDetail[text],
    },
  ]

  const onSearch = (val: string) => {
    setSearch(val)
  }
  const onChangSubdivision = (val: string) => {
    setSubdivision(val)
  }
  const onChangeStatus = (val: ESubjectStatus) => {
    setStatus(val)
  }

  const handleTableChange: TableProps<ISubjectInResponse>['onChange'] = (_pagination, _filters, sorter) => {
    if (!isArray(sorter) && sorter?.order) {
      setSort(sorter.order as ESort)
      setSortBy(sorter.field as string)
    } else {
      setSort(undefined)
      setSortBy(undefined)
    }
  }

  return (
    <div className='min-h-[calc(100vh-48px)] bg-[#d8ecef42] p-6 shadow-lg'>
      <div className='mb-4 flex flex-wrap gap-3'>
        <Input.Search className='w-60' placeholder='Tìm kiếm' size='large' onSearch={onSearch} allowClear />
        <Select
          className='w-60'
          size='large'
          placeholder='Lọc theo phân môn'
          onChange={onChangSubdivision}
          value={subdivision}
          options={OPTIONS_SUBDIVISION}
          allowClear
          maxTagCount='responsive'
        />
        <Select
          className='w-60'
          size='large'
          placeholder='Lọc theo trạng thái'
          onChange={onChangeStatus}
          value={status}
          options={OPTIONS_SUBJECT_STATUS}
          allowClear
          maxTagCount='responsive'
        />
      </div>

      <Table
        showSorterTooltip={{ target: 'sorter-icon' }}
        onChange={handleTableChange}
        columns={columns}
        className='text-wrap'
        rowKey='id'
        pagination={false}
        dataSource={data}
        loading={isLoading}
        scroll={{ x: 1200 }}
        bordered
        onRow={(record) => {
          return {
            onClick: () => {
              setOpenForm({ active: true, mode: 'view', item: record })
            },
          }
        }}
      />
      {openForm.active && openForm.mode === 'view' && <ModalView open={openForm} setOpen={setOpenForm} />}
    </div>
  )
}

export default SubjectV
