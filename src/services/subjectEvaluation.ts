import { accessTokenState } from '@atom/authAtom'
import { get, post, patch, serverErrorDataToString } from './HTTPService'
import { API_CONFIG, API_LIST } from '@constants/index'
import { ICreateSubjectEvaluation, ISubjectEvaluationInResponse, IUpdateSubjectEvaluation } from '@domain/subjectEvaluation'
import axios, { AxiosError } from 'axios'
import { getRecoil } from 'recoil-nexus'
import { toast } from 'react-toastify'

export const getListSubjectEvaluationsMe = async (): Promise<ISubjectEvaluationInResponse[]> => {
  const response = await get({
    url: API_LIST.evaluation,
  })
  return response?.data
}

export const getSubjectEvaluationNotHandler = async (subjectId: string): Promise<ISubjectEvaluationInResponse | undefined> => {
  const accessToken = getRecoil(accessTokenState)
  try {
    const response = await axios({
      method: 'get',
      url: API_CONFIG.HOST + API_LIST.evaluation + '/' + subjectId,
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

export const getSubjectEvaluationBySubjectId = async (subjectId: string): Promise<ISubjectEvaluationInResponse> => {
  const response = await get({
    url: API_LIST.evaluation + '/' + subjectId,
  })
  return response?.data
}

export const createSubjectEvaluation = async (subjectId: string, data: ICreateSubjectEvaluation): Promise<ISubjectEvaluationInResponse> => {
  const response = await post({
    url: API_LIST.evaluation + '/' + subjectId,
    data,
  })
  return response?.data
}

export const updateSubjectEvaluation = async (subjectId: string, data: IUpdateSubjectEvaluation): Promise<ISubjectEvaluationInResponse> => {
  const response = await patch({
    url: API_LIST.evaluation + '/' + subjectId,
    data,
  })
  return response?.data
}
