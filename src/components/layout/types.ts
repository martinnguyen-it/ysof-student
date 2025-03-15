import { LinkProps } from '@tanstack/react-router'

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
  requiredCurrent?: boolean
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: LinkProps['to']
}

type NavItem = NavCollapsible | NavLink

export type { NavCollapsible, NavItem, NavLink }
