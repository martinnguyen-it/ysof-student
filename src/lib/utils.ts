import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRollCallResultBgColor = (result?: string) => {
  if (!result) return '!bg-purple-100/30'
  if (result === 'completed') return ''
  if (result === 'no_complete') return '!bg-green-100/30'
  if (result === 'absent') return '!bg-yellow-100/30'
  return ''
}
