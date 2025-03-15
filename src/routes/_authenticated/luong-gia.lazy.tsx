import { createLazyFileRoute } from '@tanstack/react-router'
import SubjectEvaluationV from '@/views/SubjectEvaluationV'

export const Route = createLazyFileRoute('/_authenticated/luong-gia')({
  component: SubjectEvaluationV,
})
