import { FC, useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useGetListDocuments } from '@/apis/documents/useQueryDocument'
import { ESort } from '@/domain/common'
import { EDocumentType, IDocumentInResponse } from '@/domain/document'
import { Avatar, Input, Pagination, Select, Tooltip } from 'antd'
import type { TableProps } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { isArray } from 'lodash'
import {
  EDocumentTypeDetail,
  OPTIONS_DOCUMENT_LABEL,
  OPTIONS_DOCUMENT_TYPE,
} from '@/constants/document'
import { PAGE_SIZE_OPTIONS_DEFAULT, VN_TIMEZONE } from '@/constants/index'

const DocumentV: FC = () => {
  const initPaging = {
    current: 1,
    pageSize: 20,
  }
  const [tableQueries, setTableQueries] = useState(initPaging)
  const [paging, setPaging] = useState({ total: 0, current: 1 })
  const [search, setSearch] = useState('')
  const [type, setType] = useState<EDocumentType>()
  const [label, setLabel] = useState<string[]>()
  const [sort, setSort] = useState<ESort>()
  const [sortBy, setSortBy] = useState<string>()

  useEffect(() => {
    setTableQueries(initPaging)
  }, [search])

  const { data, isLoading } = useGetListDocuments({
    page_index: tableQueries.current,
    page_size: tableQueries.pageSize,
    search,
    type,
    label,
    sort,
    sort_by: sortBy,
  })

  useEffect(() => {
    if (data) {
      setPaging({
        current: data.pagination.page_index,
        total: data.pagination.total,
      })
    }
  }, [data])

  const columns: ColumnsType<IDocumentInResponse> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '60px',
      render: (_text, _record, index) =>
        index + 1 + (paging.current - 1) * tableQueries.pageSize,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: true,
      key: 'name',
      width: '200px',
      render: (text, record: IDocumentInResponse) => {
        return (
          <Avatar.Group className='flex items-center'>
            <img
              className='mr-4 size-7 object-cover'
              src={`https://drive-thirdparty.googleusercontent.com/64/type/${record?.mimeType}`}
            ></img>
            <Tooltip placement='bottom' title='Nhấn vào đây để xem file'>
              <Link
                to={record.webViewLink}
                target='_blank'
                className='text-wrap font-medium text-blue-500'
              >
                {text}
              </Link>
            </Tooltip>
          </Avatar.Group>
        )
      },
    },
    {
      title: 'Loại tài liệu',
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      render: (text: EDocumentType) => EDocumentTypeDetail[text],
    },
    {
      title: 'Nhãn tài liệu',
      dataIndex: 'label',
      key: 'label',
      render: (text: string[]) => text.join(', '),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <span className='text-wrap italic'>{text}</span>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
      render: (text) => (
        <>{dayjs.utc(text).tz(VN_TIMEZONE).format('HH:mm DD-MM-YYYY')}</>
      ),
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: true,
      render: (text) => (
        <>{dayjs.utc(text).tz(VN_TIMEZONE).format('HH:mm DD-MM-YYYY')}</>
      ),
    },
  ]

  const onChangePagination = (pageIndex: number, pageSize: number) => {
    setTableQueries({ current: pageIndex, pageSize })
  }

  const onSearch = (val: string) => {
    setSearch(val)
  }
  const onChangType = (val: EDocumentType) => {
    setType(val)
  }
  const onChangeLabel = (val: string[]) => {
    setLabel(val)
  }

  const handleTableChange: TableProps<IDocumentInResponse>['onChange'] = (
    _pagination,
    _filters,
    sorter
  ) => {
    if (!isArray(sorter) && sorter?.order) {
      setSort(sorter.order as ESort)
      setSortBy(sorter.field as string)
    } else {
      setSort(undefined)
      setSortBy(undefined)
    }
  }

  return (
    <>
      <div className='mb-4 flex flex-wrap gap-3'>
        <Input.Search
          className='w-60'
          placeholder='Tìm kiếm'
          size='large'
          onSearch={onSearch}
          allowClear
        />
        <Select
          className='w-60'
          size='large'
          placeholder='Lọc theo loại'
          onChange={onChangType}
          value={type}
          options={OPTIONS_DOCUMENT_TYPE}
          allowClear
          maxTagCount='responsive'
        />
        <Select
          className='w-60'
          mode='multiple'
          size='large'
          placeholder='Lọc theo nhãn'
          onChange={onChangeLabel}
          value={label}
          options={OPTIONS_DOCUMENT_LABEL}
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
        dataSource={data?.data || []}
        loading={isLoading}
        scroll={{ x: 1500 }}
        bordered
      />
      <Pagination
        className='mt-4'
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
    </>
  )
}

export default DocumentV
