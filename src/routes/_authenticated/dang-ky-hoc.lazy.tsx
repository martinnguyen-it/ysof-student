import { createLazyFileRoute } from '@tanstack/react-router'
import SubjectRegistrationV from '@/views/SubjectRegistrationV'

export const Route = createLazyFileRoute('/_authenticated/dang-ky-hoc')({
  component: SubjectRegistrationV,
})
