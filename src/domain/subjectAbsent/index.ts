import { ISubjectInEvaluation } from '@domain/subjectEvaluation'

export interface ICreateSubjectAbsent {
  reason: string
}

export interface ISubjectAbsentInResponse extends ICreateSubjectAbsent {
  created_at: Date
  updated_at: Date
  id: string
  subject: ISubjectInEvaluation
}
