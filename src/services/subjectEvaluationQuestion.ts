import { get, serverErrorDataToString } from './HTTPService'
import { API_CONFIG, API_LIST } from '@constants/index'
import { getRecoil } from 'recoil-nexus'
import { accessTokenState } from '@atom/authAtom'
import axios, { AxiosError } from 'axios'
import { IEvaluationQuestionResponse } from '@domain/subjectEvaluationQuestion'
import { toast } from 'react-toastify'

export const getSubjectEvaluationQuestions = async (subjectId: string): Promise<IEvaluationQuestionResponse> => {
  const response = await get({
    url: API_LIST.evaluationQuestion + '/' + subjectId,
  })
  return response?.data
}

export const getSubjectEvaluationQuestionsNotHandler = async (subjectId: string): Promise<IEvaluationQuestionResponse | undefined> => {
  const accessToken = getRecoil(accessTokenState)
  try {
    const response = await axios({
      method: 'get',
      url: API_CONFIG.HOST + API_LIST.evaluationQuestion + '/' + subjectId,
      headers: { Authorization: 'Bearer ' + accessToken },
    })
    return response?.data
  } catch (e) {
    const error: any = e as AxiosError
    if (error?.response?.status !== 404) {
      let message
      if (error?.response) {
        message = serverErrorDataToString(error?.response?.data)
        if (message) {
          toast.error(message)
        }
      }
    }
  }
}
