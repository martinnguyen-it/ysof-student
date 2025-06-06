import { FC } from 'react'
import { useGetRollCallMe } from '@/apis/rollCall/useQueryRollCall'
import { selectSeasonState } from '@/atom/seasonAtom'
import {
  EAbsentType,
  EResultRollCall,
  ISubjectRollCall,
} from '@/domain/rollCall'
import Table, { ColumnsType } from 'antd/es/table'
import { useRecoilValue } from 'recoil'
import { getRollCallResultBgColor } from '@/lib/utils'
import { EResultRollCallDetail } from '@/constants/rollCall'

const RollCallV: FC = () => {
  const season = useRecoilValue(selectSeasonState)

  const { data, isLoading } = useGetRollCallMe(season)

  const columns: ColumnsType<ISubjectRollCall> = [
    {
      title: 'Chủ đề',
      dataIndex: ['subject', 'code'],
      key: 'code',
      render: (_: string, record: ISubjectRollCall) =>
        record.subject.code + ' - ' + record.subject.title,
    },
    {
      title: 'Zoom',
      dataIndex: 'attend_zoom',
      align: 'center',
      key: 'attend_zoom',
      render: (attend_zoom: boolean) => (attend_zoom ? 'x' : '-'),
      onCell: (record: ISubjectRollCall) => {
        return {
          className: getRollCallResultBgColor(record.result),
        }
      },
    },
    {
      title: 'Lượng giá',
      dataIndex: 'evaluation',
      key: 'evaluation',
      align: 'center',
      render: (evaluation: boolean, record: ISubjectRollCall) =>
        evaluation
          ? 'x'
          : record.absent_type === EAbsentType.NO_EVALUATION
            ? 'P'
            : '-',
      onCell: (record: ISubjectRollCall) => {
        return {
          className: getRollCallResultBgColor(record.result),
        }
      },
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      align: 'center',
      onCell: (record: ISubjectRollCall) => {
        return {
          className: getRollCallResultBgColor(record.result),
        }
      },
      render: (result: EResultRollCall) =>
        result ? EResultRollCallDetail[result] : '-',
    },
  ]

  return (
    <>
      <div className='mb-4'>
        <div>
          <span>Số chủ đề đã đăng ký: </span>
          <span>{data?.subject_registered}</span>
        </div>
        <div>
          <span>Số chủ đề đã hoàn thành: </span>
          <span>{data?.subject_completed}</span>
        </div>
        <div>
          <span>Số chủ đề không hoàn thành: </span>
          <span>{data?.subject_not_completed}</span>
        </div>
      </div>

      <Table
        showSorterTooltip={{ target: 'sorter-icon' }}
        columns={columns}
        className='text-wrap'
        rowKey='id'
        pagination={false}
        dataSource={data?.subjects || []}
        loading={isLoading}
        scroll={{ x: 1200 }}
        bordered
      />
    </>
  )
}

export default RollCallV
