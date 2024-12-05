import { ESort } from '@domain/common'
import { Input, Pagination, Select } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import type { TableProps } from 'antd'

import { FC, useEffect, useState } from 'react'
import { isArray, isEmpty } from 'lodash'
import { PAGE_SIZE_OPTIONS_DEFAULT } from '@constants/index'
import { IStudentInResponse } from '@domain/student'
import { useRecoilValue } from 'recoil'
import { selectSeasonState } from '@atom/seasonAtom'
import { useGetListStudents } from '@src/apis/student/useQueryStudent'
// import ModalView from './ModalView'

const StudentV: FC = () => {
  const initPaging = {
    current: 1,
    pageSize: 20,
  }
  const [tableQueries, setTableQueries] = useState(initPaging)
  const [paging, setPaging] = useState({ total: 0, current: 1 })
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<ESort>()
  const [sortBy, setSortBy] = useState<string | undefined>('group')
  const [group, setGroup] = useState<number>()
  const season = useRecoilValue(selectSeasonState)

  const { data, isLoading } = useGetListStudents({
    page_index: tableQueries.current,
    page_size: tableQueries.pageSize,
    search: search || undefined,
    sort,
    sort_by: sortBy,
    group,
    season,
  })

  useEffect(() => {
    setTableQueries(initPaging)
  }, [search])

  useEffect(() => {
    if (!isEmpty(data)) {
      setPaging({ current: data.pagination.page_index, total: data.pagination.total })
    }
  }, [data])

  const columns: ColumnsType<IStudentInResponse> = [
    {
      title: 'MSHV',
      dataIndex: ['season_info', 'numerical_order'],
      key: 'numerical_order',
      align: 'center',
      width: '80px',
      sorter: true,
      render: (text) => String(text).padStart(3, '0'),
    },
    {
      title: 'Nhóm',
      dataIndex: ['season_info', 'group'],
      align: 'center',
      key: 'group',
      sorter: true,
    },
    {
      title: 'Họ tên',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: true,
      render: (_, record: IStudentInResponse) => (
        <>
          {record.holy_name} {record.full_name}
        </>
      ),
    },
    {
      title: 'Giới tính',
      dataIndex: 'sex',
      key: 'sex',
      sorter: true,
    },
    {
      title: 'Giáo phận đang sinh hoạt',
      dataIndex: 'diocese',
      key: 'diocese',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
  ]

  const onChangePagination = (pageIndex: number, pageSize: number) => {
    setTableQueries({ current: pageIndex, pageSize })
  }

  const onSearch = (val: string) => {
    setSearch(val)
  }
  const onChangeGroup = (val: string) => {
    setGroup(val ? Number(val) : undefined)
  }

  const handleTableChange: TableProps<IStudentInResponse>['onChange'] = (_pagination, _filters, sorter) => {
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
          options={Array.from({ length: 15 }, (_, index) => ({
            value: String(index + 1),
            label: String(index + 1),
          }))}
          className='w-60'
          placeholder='Nhóm'
          size='large'
          onChange={onChangeGroup}
          showSearch
          allowClear
        />
      </div>

      <div className='flex items-center justify-between'>
        <Pagination
          className='mb-4'
          total={paging.total}
          showTotal={(total, range) => (
            <span className='font-medium'>
              {range[0]}-{range[1]} của {total}
            </span>
          )}
          pageSize={tableQueries.pageSize}
          current={tableQueries.current}
          pageSizeOptions={PAGE_SIZE_OPTIONS_DEFAULT}
          onChange={onChangePagination}
          locale={{ items_per_page: '/ trang', jump_to: 'Tới trang', page: '' }}
          showQuickJumper
          showSizeChanger
        />
      </div>
      <Table
        showSorterTooltip={{ target: 'sorter-icon' }}
        onChange={handleTableChange}
        columns={columns}
        className='text-wrap'
        rowKey='id'
        pagination={false}
        dataSource={data?.data || []}
        loading={isLoading}
        scroll={{ x: 1200 }}
        bordered
      />
    </div>
  )
}

export default StudentV
