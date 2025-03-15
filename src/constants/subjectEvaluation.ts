import { EQualityValue, IQualityEvaluation } from '@/domain/subjectEvaluation'

export const OPTIONS_QUALITY_VALUE = Object.values(EQualityValue).map(
  (value) => ({ value, label: value })
)

export const EVALUATION_QUALITY: {
  key: keyof IQualityEvaluation
  label: string
}[] = [
  {
    key: 'focused_right_topic',
    label: 'Nội dung bài giảng và các thông tin tập trung vào đúng chủ đề',
  },
  {
    key: 'practical_content',
    label: 'Bài giảng được xây dựng với nội dung thực tiễn.',
  },
  {
    key: 'benefit_in_life',
    label:
      'Bài giảng giúp bạn có thêm định hướng và những giải pháp của cá nhân trong cuộc sống',
  },
  {
    key: 'duration',
    label: 'Thời lượng bài giảng phù hợp',
  },
  {
    key: 'method',
    label: 'Phương pháp trình bày bài giảng trực quan, sinh động.',
  },
]
