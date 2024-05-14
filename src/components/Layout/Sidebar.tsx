import { appState } from '@atom/appAtom'
import { IAppState, IRouter } from '@domain/app'
import { map, size } from 'lodash'
import { MouseEvent, useCallback, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ROUTES_SIDEBAR } from '@constants/index'
import { CaretUpOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

const SidebarGroup = ({ menuItem, menuExpand, onExpandMenu }: { menuItem: IRouter; menuExpand?: string[]; onExpandMenu: (e: MouseEvent<HTMLLIElement>) => void }) => {
  const { isCollapseSidebar } = useRecoilValue(appState)
  const { pathname } = useLocation()
  const { name, children, path } = menuItem

  const isExpandGroup = useMemo(() => {
    return menuExpand && menuExpand.includes(path)
  }, [menuExpand, path])

  const isVisitedSubPage = useMemo(() => {
    return menuExpand && pathname.startsWith(path)
  }, [pathname])

  return (
    <>
      <Tooltip placement='rightBottom' title={name}>
        <li
          className={`group relative flex w-full items-center text-base font-normal ${
            isExpandGroup && isVisitedSubPage ? 'bg-[#E6F4FF] text-[#1677ff]' : 'text-black/60 hover:bg-[#E6F4FF] hover:text-[#1677ff] '
          }`}
          onClick={onExpandMenu}
          data-item={path}
        >
          <div className={`just flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-base`}>
            <div className='flex items-center'>
              <div className='w-5' title={name}>
                {menuItem.icon && <menuItem.icon />}
              </div>

              <span className={`text-md ml-3 whitespace-nowrap`}>{!isCollapseSidebar ? name : null}</span>
            </div>
            {!isCollapseSidebar ? (
              <span>
                <CaretUpOutlined className={`${isExpandGroup ? 'rotate-180 duration-700' : 'rotate-0 duration-700'}`} />
              </span>
            ) : null}
          </div>
        </li>
        {isExpandGroup && !isCollapseSidebar && <ul>{size(children) > 0 && map(children, (item: IRouter) => <SidebarItem key={item.name} menuItem={item} />)}</ul>}
      </Tooltip>
    </>
  )
}

const SidebarItem = ({ menuItem }: { menuItem: IRouter }) => {
  const { path, name } = menuItem
  const [{ isCollapseSidebar }, setAppState] = useRecoilState(appState)
  const { pathname } = useLocation()

  const isActive = useMemo(() => {
    return pathname === path
  }, [path, pathname])

  const redirectUrl = () => {
    setAppState((prev: IAppState) => ({ ...prev, menuActive: name }))
  }

  return (
    <>
      <Tooltip placement='rightBottom' title={name}>
        <li
          className={`group flex w-full items-center text-base font-normal text-black ${
            isActive && !isCollapseSidebar ? 'bg-[#E6F4FF] text-[#1677ff]' : 'text-gray-400 hover:bg-[#E6F4FF]'
          }`}
        >
          <Link
            to={path}
            onClick={redirectUrl}
            className={`relative flex min-h-[48px] w-full items-center px-4 py-3 text-base group-hover:text-[#1677ff] ${isActive ? 'text-[#1677ff]' : 'text-black/60'}`}
          >
            <div className='w-5' title={name}>
              {menuItem.icon && <menuItem.icon />}
            </div>
            {isActive && !isCollapseSidebar ? <div className='absolute right-0 h-full w-[4px] bg-[#5776bf]' /> : null}
            {!isCollapseSidebar ? <span className={`text-md ml-3 whitespace-nowrap ${isActive ? 'text-[#1677ff]' : ''}`}>{name}</span> : null}
          </Link>
        </li>
      </Tooltip>
    </>
  )
}

const Sidebar = () => {
  const [{ isCollapseSidebar }, setAppState] = useRecoilState(appState)
  const onShowSidebar = useCallback(() => {
    setAppState((prev: IAppState) => ({
      ...prev,
      isCollapseSidebar: !isCollapseSidebar,
    }))
  }, [isCollapseSidebar, setAppState])

  const [menuExpand, setMenuExpand] = useState<Set<string>>(new Set())

  const onExpandMenu = useCallback((e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    const path = e.currentTarget.getAttribute('data-item') || ''
    setMenuExpand((prev) => {
      if (prev.has(path)) prev.delete(path)
      else prev.add(path)
      return new Set(prev)
    })
  }, [])

  return (
    <div className='fixed z-10 h-full bg-white shadow-lg transition-all duration-200 ease-out'>
      <div className={`${isCollapseSidebar ? 'w-14' : 'w-60'}`}>
        <div className='flex h-12 items-center justify-center text-xl font-semibold text-black'>
          <Link
            onClick={() => {
              setAppState((prev) => ({ ...prev, menuActive: '' }))
            }}
            to='/'
            className='flex items-center gap-2'
          >
            <img alt='' className='size-8 rounded-md' src='/logo128.png' /> {!isCollapseSidebar ? 'YSOF' : null}
          </Link>
        </div>
        <ul className='max-h-[calc(100vh-146px)] overflow-auto border-gray-200'>
          <>
            {map(ROUTES_SIDEBAR, (route: IRouter) =>
              route.children ? (
                <SidebarGroup key={route.name} menuItem={route} onExpandMenu={onExpandMenu} menuExpand={Array.from(menuExpand)} />
              ) : (
                <SidebarItem key={route.name} menuItem={route} />
              ),
            )}
          </>
        </ul>
      </div>
      <div className='absolute bottom-0 w-full px-5 py-4'>
        <div className='flex justify-end'>
          <button onClick={onShowSidebar}>{isCollapseSidebar ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
