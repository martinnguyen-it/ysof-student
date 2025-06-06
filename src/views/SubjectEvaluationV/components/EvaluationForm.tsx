import { FC } from 'react'
import { EQualityValue } from '@/domain/subjectEvaluation'
import { IEvaluationQuestionItem } from '@/domain/subjectEvaluationQuestion'
import { Form, FormInstance, Input, InputNumber, Radio } from 'antd'
import { map, size } from 'lodash'
import { EVALUATION_QUALITY } from '@/constants/subjectEvaluation'
import InputByType from '@/components/InputByType'

interface EvaluationFormProps {
  form: FormInstance<any>
  questions?: IEvaluationQuestionItem[]
}

const EvaluationForm: FC<EvaluationFormProps> = ({ form, questions }) => {
  return (
    <Form layout='vertical' form={form} name='form-subject-evaluation'>
      <div className='mb-1 text-sm'>
        1. Bạn đánh giá như thế nào về chất lượng của bài giảng hôm nay?
      </div>
      <div className='ml-6'>
        {EVALUATION_QUALITY.map((item) => (
          <Form.Item
            name={['quality', item.key]}
            key={item.key}
            label={item.label}
            rules={[
              {
                required: true,
                message: 'Trường này không được để trống',
              },
            ]}
          >
            <Radio.Group className='flex flex-col md:flex-row'>
              {Object.values(EQualityValue).map((val, idx) => (
                <Radio key={item.key + idx} value={val}>
                  {val}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ))}
      </div>
      <Form.Item
        name={'most_resonated'}
        label={'2. Hãy nêu điều làm bạn tâm đắc nhất trong buổi học.'}
        rules={[
          {
            required: true,
            message: 'Trường này không được để trống',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={'invited'}
        label={'3. Từ những điều tâm đắc trên, bạn được mời gọi làm gì?'}
        rules={[
          {
            required: true,
            message: 'Trường này không được để trống',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={'feedback_lecturer'}
        label={
          '4. Mời bạn gửi đến giảng viên những tâm tình/chia sẻ của mình tại đây nhé:'
        }
        rules={[
          {
            required: true,
            message: 'Trường này không được để trống',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={'satisfied'}
        label={'5. Mức độ hài lòng chung của bạn đối với lớp học hôm nay?'}
        rules={[
          {
            required: true,
            message: 'Trường này không được để trống',
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={1}
          max={10}
          placeholder='Đánh giá trên thang điểm 10'
        />
      </Form.Item>
      <Form.Item
        name={'feedback_admin'}
        label={
          '6. Bạn có ý kiến gì cho BTC để góp phần cải thiện chất lượng lớp học ở các buổi học tiếp theo không? (VD: Về MC, các hoạt động,...)'
        }
      >
        <Input.TextArea />
      </Form.Item>
      {!!size(questions) &&
        map(questions, (item, idx) => (
          <InputByType key={idx} index={idx} {...item} />
        ))}
    </Form>
  )
}

export default EvaluationForm
