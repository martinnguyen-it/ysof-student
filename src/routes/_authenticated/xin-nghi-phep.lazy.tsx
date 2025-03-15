import { createLazyFileRoute } from '@tanstack/react-router'
import SubjectAbsentV from '@/views/AbsentV'

export const Route = createLazyFileRoute('/_authenticated/xin-nghi-phep')({
  component: SubjectAbsentV,
})
