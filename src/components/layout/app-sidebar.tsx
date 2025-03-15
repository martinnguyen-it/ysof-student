import { useMemo } from 'react'
import { userInfoState } from '@/atom/authAtom'
import { selectSeasonState } from '@/atom/seasonAtom'
import { Select } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { sidebarData } from './data/sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = useRecoilValue(userInfoState)
  const [selectSeason, setSelectSeason] = useRecoilState(selectSeasonState)

  const { open } = useSidebar()

  const optionSeasons = useMemo(() => {
    if (userInfo) {
      return userInfo.seasons_info.map((item) => ({
        value: item.season,
        label: item.season,
      }))
    }
  }, [userInfo])

  const handleChangeSeason = (val: string) => {
    setSelectSeason(Number(val))
  }
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <div
          className={cn(
            'mt-2 flex w-full items-center justify-center text-sidebar-accent-foreground md:mt-0',
            open && 'gap-2'
          )}
        >
          <img alt='' className='size-8 rounded-md' src='/logo128.png' />
          <p className='truncate font-semibold'>YSOF</p>
        </div>
        <div
          className={cn(
            'h-12 items-center justify-center gap-4',
            open ? 'flex' : 'mx-auto'
          )}
        >
          {open ? <span className='font-bold'>MÙA</span> : null}
          <Select
            value={(selectSeason && String(selectSeason)) || ''}
            style={{ width: 40, textAlign: 'center' }}
            onChange={handleChangeSeason}
            options={optionSeasons}
            suffixIcon={null}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className='gap-0'>
        {sidebarData.map((props) => (
          <NavGroup key={props.title} item={props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
