import LoginV from '@views/auth/LoginV'
import { generateRouteElements, IRoute } from './utils'
import ResetPasswordV from '@views/auth/ForgotPasswordV'
import ForgotPasswordV from '@views/auth/ForgotPasswordV'
import DashboardV from '@views/DashboardV'
import Layout from '@components/Layout'
import DocumentV from '@views/DocumentV'
import LecturerV from '@views/LecturerV'
import SubjectV from '@views/SubjectV'
import StudentV from '@views/StudentV'
import SubjectRegistrationV from '@views/SubjectRegistrationV'
// import { withLoading } from '@src/hocs/withLoading.hoc'

// const DashboardPage = withLoading(DashboardV)

export const routes: IRoute[] = [
  //   // {
  //   //   path: '/',
  //   //   element: <HomeScreen />,
  //   //   requiredLogin: false,
  //   //   Layout: DashboardLayout,
  //   // },
  {
    path: '/',
    element: <DashboardV />,
    requiredLogin: true,
    Layout: Layout,
  },
  {
    path: '/tai-lieu',
    element: <DocumentV />,
    requiredLogin: true,
    Layout: Layout,
  },
  {
    path: '/giang-vien',
    element: <LecturerV />,
    requiredLogin: true,
    Layout: Layout,
  },
  {
    path: '/chu-de/danh-sach-chu-de',
    element: <SubjectV />,
    requiredLogin: true,
    Layout: Layout,
  },
  {
    path: '/danh-sach-hoc-vien',
    element: <StudentV />,
    requiredLogin: true,
    Layout: Layout,
  },
  {
    path: '/dang-ky-hoc',
    element: <SubjectRegistrationV />,
    requiredLogin: true,
    Layout: Layout,
  },
  {
    path: '*',
    element: <DashboardV />,
    requiredLogin: true,
    Layout: Layout,
  },
  {
    path: '/auth/login',
    element: <LoginV />,
    requiredLogin: false,
  },
  {
    path: '/auth/reset-password',
    element: <ResetPasswordV />,
    requiredLogin: false,
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPasswordV />,
    requiredLogin: false,
  },
]

export const routesElm = generateRouteElements(routes)
