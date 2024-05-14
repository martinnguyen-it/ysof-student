import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import { AbsentIcon, SubjectEvaluationIcon, LessonIcon, RegisterIcon } from '@components/assets/svg'
import { IRouter } from '@domain/app'

export const API_CONFIG = {
  isLoggingEnable: false,
  timeout: 600000,
  unauthorizedErrorCode: 401,
  HOST: process.env.REACT_APP_BASE_URL || 'http://localhost:8000',
}

export const VN_TIMEZONE = 'Asia/Ho_Chi_Minh'

export const PAGE_SIZE_OPTIONS_DEFAULT = [10, 20, 50, 100, 300]

export const DEFAULT_TABLE_PAGINATION = {
  total: 0,
  totalPages: 1,
  pageIndex: 0,
  pageSize: 50,
}

export const DEFAULT_GET_LIST_QUERY = {
  pageIndex: 0,
  pageSize: 50,
}

export const API_LIST = {
  auth: {
    login: '/api/v1/student/auth/login',
  },
  getMe: '/api/v1/student/students/me',
  season: '/api/v1/seasons',
  document: '/api/v1/documents',
  generalTask: '/api/v1/general-tasks',
  lecturer: '/api/v1/student/lecturers',
  subject: '/api/v1/student/subjects',
  evaluation: '/api/v1/student/subjects/evaluations',
  evaluationQuestion: '/api/v1/student/subjects/evaluation-questions',
  student: '/api/v1/student/students',
  registration: '/api/v1/student/subjects/registration',
  manageForm: '/api/v1/manage-form',
}

export const ROUTES_SIDEBAR: IRouter[] = [
  {
    name: 'Bảng tin',
    path: '/',
    icon: DashboardOutlined,
  },
  // {
  //   name: 'Tài liệu',
  //   path: '/tai-lieu',
  //   icon: FileTextOutlined,
  // },
  {
    name: 'Danh sách học viên',
    icon: UserOutlined,
    path: '/danh-sach-hoc-vien',
  },
  {
    name: 'Danh sách chủ đề',
    icon: LessonIcon,
    path: '/danh-sach-chu-de',
  },
  {
    name: 'Lượng giá',
    icon: SubjectEvaluationIcon,
    path: '/luong-gia',
  },
  {
    name: 'Xin nghỉ phép',
    icon: AbsentIcon,
    path: '/xin-nghi-phep',
  },
  {
    name: 'Đăng ký môn học',
    icon: RegisterIcon,
    path: '/dang-ky-hoc',
  },
]
