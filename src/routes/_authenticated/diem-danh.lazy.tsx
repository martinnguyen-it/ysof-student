import { createLazyFileRoute } from '@tanstack/react-router'
import RollCallV from '@/views/RollCallV'

export const Route = createLazyFileRoute('/_authenticated/diem-danh')({
  component: RollCallV,
})
