import { FC, ReactNode, useMemo } from 'react'
import {
  EEvaluationQuestionType,
  IEvaluationQuestionItem,
} from '@/domain/subjectEvaluationQuestion'
import { Checkbox, Form, Input, Radio } from 'antd'
import { isArray } from 'lodash'

interface IProps extends IEvaluationQuestionItem {
  index: number
}

const InputByType: FC<IProps> = ({ type, title, index, answers }) => {
  const input: ReactNode = useMemo(() => {
    switch (type) {
      case EEvaluationQuestionType.TEXT:
        return <Input.TextArea />
      case EEvaluationQuestionType.RADIO:
        return isArray(answers) ? (
          <Radio.Group>
            {answers.map((val, idx) => (
              <Radio key={new Date().toISOString() + idx} value={val}>
                {val}
              </Radio>
            ))}
          </Radio.Group>
        ) : (
          <></>
        )
      case EEvaluationQuestionType.CHECKBOX:
        return isArray(answers) ? (
          <Checkbox.Group>
            {answers.map((val, idx) => (
              <Checkbox key={new Date().toISOString() + idx} value={val}>
                {val}
              </Checkbox>
            ))}
          </Checkbox.Group>
        ) : (
          <></>
        )
      default:
        return <></>
    }
  }, [type])

  return (
    <Form.Item
      name={['answers', index]}
      label={`${index + 7}. ${title}`}
      rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
    >
      {input}
    </Form.Item>
  )
}

export default InputByType
