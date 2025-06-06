import { useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { useGetCurrentSeason } from '@/apis/season/useQuerySeason'
import { useGetMe } from '@/apis/student/useQueryStudent'
import { accessTokenState, userInfoState } from '@/atom/authAtom'
import { currentSeasonState, selectSeasonState } from '@/atom/seasonAtom'
import { isEmpty } from 'lodash'
import { useRecoilState } from 'recoil'
import { getRecoil } from 'recoil-nexus'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { sidebarData } from '@/components/layout/data/sidebar-data'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const accessToken = getRecoil(accessTokenState)
    if (!accessToken) {
      throw redirect({
        to: '/dang-nhap',
        search: {
          backUrl: location.pathname === '/' ? undefined : location.pathname,
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [currentSeason, setCurrentSeason] = useRecoilState(currentSeasonState)
  const [selectSeason, setSelectSeason] = useRecoilState(selectSeasonState)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { data: dataUser, isFetched, isSuccess } = useGetMe()
  const { data: dataCurrentSeason } = useGetCurrentSeason(
    isFetched && isSuccess
  )

  useEffect(() => {
    if (!isEmpty(dataUser)) setUserInfo(dataUser)
  }, [dataUser])

  useEffect(() => {
    if (!isEmpty(dataCurrentSeason)) setCurrentSeason(dataCurrentSeason)
  }, [dataCurrentSeason])

  useEffect(() => {
    if (userInfo && !selectSeason) {
      setSelectSeason(
        userInfo.seasons_info[userInfo.seasons_info.length - 1].season
      )
    }
  }, [userInfo, currentSeason])

  useEffect(() => {
    let requiredCurrent = false

    for (const val of sidebarData) {
      if ('items' in val) {
        const target = val.items.find((x) => x.url === pathname)
        if (target) {
          requiredCurrent = !!target?.requiredCurrent
          break
        }
      } else {
        if (val.url === pathname) {
          requiredCurrent = !!val?.requiredCurrent
          break
        }
      }
    }

    if (
      requiredCurrent &&
      selectSeason &&
      currentSeason &&
      selectSeason !== currentSeason?.season
    ) {
      navigate({ to: '/' })
    }
  }, [selectSeason])

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SkipToMain />
      <AppSidebar />
      <div
        id='content'
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'transition-[width] duration-200 ease-linear',
          'flex flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
        )}
      >
        <Header>
          <div className='ml-auto flex items-center gap-4'>
            <ProfileDropdown />
          </div>
        </Header>
        <div className='min-h-[calc(100vh-64px)] bg-[#d8ecef42] p-6'>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}
