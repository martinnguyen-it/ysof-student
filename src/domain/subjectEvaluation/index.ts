export interface ICreateSubjectEvaluation {
  quality: IQualityEvaluation
  most_resonated: string
  invited: string
  feedback_lecturer: string
  satisfied: number
  answers?: any[]
  feedback_admin?: string
}
export interface IUpdateSubjectEvaluation extends Partial<ICreateSubjectEvaluation> {}

export interface IQualityEvaluation {
  focused_right_topic: EQualityValue
  practical_content: EQualityValue
  benefit_in_life: EQualityValue
  duration: EQualityValue
  method: EQualityValue
}

export interface ISubjectEvaluationInResponse extends ICreateSubjectEvaluation {
  created_at: Date
  updated_at: Date
  id: string
  subject: ISubjectInEvaluation
}

export interface ILecturerInEvaluation {
  id: string
  title: string
  holy_name?: string
  full_name: string
}

export interface ISubjectInEvaluation {
  id: string
  title: string
  lecturer: ILecturerInEvaluation
  code: string
}

export enum EQualityValue {
  STRONGLY_DISAGREE = 'Hoàn toàn không đồng ý',
  DISAGREE = 'Không đồng ý',
  NEUTRAL = 'Trung lập',
  AGREE = 'Đồng ý',
  STRONGLY_AGREE = 'Hoàn toàn đồng ý',
}
