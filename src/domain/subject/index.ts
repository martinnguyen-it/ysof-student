import { ISort } from '@domain/common'
import { IDocumentInResponse } from '@domain/document'
import { ILecturerInResponse } from '@domain/lecturer'

export interface ISubjectInResponse {
  title: string
  start_at: string
  subdivision: string
  code: string
  question_url?: string
  abstract?: string
  documents_url?: string[]
  id: string
  lecturer: ILecturerInResponse
  season: number
  status: ESubjectStatus
  attachments: IDocumentInResponse[]
}

export interface ICreateSubject {
  title: string
  start_at: string
  subdivision: string
  code: string
  question_url?: string
  zoom?: IZoomInfo
  documents_url?: string[]
  lecturer: string
  abstract?: string
}

export interface IUpdateSubject extends Partial<ICreateSubject> {}

export interface IParamsGetListSubject extends ISort {
  search?: string
  season?: number
  subdivision?: string
  status?: ESubjectStatus
}

export interface IZoomInfo {
  meeting_id?: number
  pass_code?: string
  link?: string
}

export enum ESubjectStatus {
  INIT = 'init',
  SENT_NOTIFICATION = 'sent_notification',
  SENT_EVALUATION = 'sent_evaluation',
  CLOSE_EVALUATION = 'close_evaluation',
  COMPLETED = 'completed',
}
