import { IconLayoutDashboard } from '@tabler/icons-react'
import { UserOutlined } from '@ant-design/icons'
import { ScrollText } from 'lucide-react'
import {
  AbsentIcon,
  LessonIcon,
  RegisterIcon,
  SubjectEvaluationIcon,
} from '@/assets/svg'
import { type NavItem } from '../types'

export const sidebarData: NavItem[] = [
  {
    title: 'Bảng tin',
    url: '/',
    icon: IconLayoutDashboard,
  },
  {
    title: 'Danh sách học viên',
    icon: UserOutlined,
    url: '/danh-sach-hoc-vien',
  },
  {
    title: 'Danh sách chủ đề',
    icon: LessonIcon,
    url: '/danh-sach-chu-de',
  },
  {
    title: 'Điểm danh',
    icon: ScrollText,
    url: '/diem-danh',
  },
  {
    title: 'Lượng giá',
    icon: SubjectEvaluationIcon,
    url: '/luong-gia',
    requiredCurrent: true,
  },
  {
    title: 'Xin nghỉ phép',
    icon: AbsentIcon,
    url: '/xin-nghi-phep',
    requiredCurrent: true,
  },
  // {
  //   title: 'Giảng viên',
  //   url: '/giang-vien',
  //   icon: SolutionOutlined,
  // },
  {
    title: 'Đăng ký môn học',
    icon: RegisterIcon,
    url: '/dang-ky-hoc',
    requiredCurrent: true,
  },
]
