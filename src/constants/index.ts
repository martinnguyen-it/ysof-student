export const API_CONFIG = {
  isLoggingEnable: false,
  timeout: 600000,
  unauthorizedErrorCode: 401,
  HOST: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
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
  absent: '/api/v1/student/absent',
  evaluationQuestion: '/api/v1/student/subjects/evaluation-questions',
  student: '/api/v1/student/students',
  registration: '/api/v1/student/subjects/registration',
  manageForm: '/api/v1/manage-form',
}
