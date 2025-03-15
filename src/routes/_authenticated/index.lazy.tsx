import { createLazyFileRoute } from '@tanstack/react-router'
import Dashboard from '@/views/dashboard'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: Dashboard,
})
