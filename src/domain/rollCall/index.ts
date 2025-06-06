import { ISubjectShortInResponse } from '../subject'

export enum EAbsentType {
  NO_ATTEND = 'no_attend',
  NO_EVALUATION = 'no_evaluation',
}

export enum EResultRollCall {
  NO_COMPLETE = 'no_complete',
  COMPLETED = 'completed',
  ABSENT = 'absent',
}

export interface IRollCallMeResponse {
  subjects: ISubjectRollCall[]
  subject_completed: number
  subject_not_completed: number
  subject_registered: number
}

export interface ISubjectRollCall {
  subject: ISubjectShortInResponse
  attend_zoom: boolean
  evaluation: boolean
  absent_type?: EAbsentType
  result: EResultRollCall
}
