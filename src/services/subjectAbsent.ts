import { accessTokenState } from '@atom/authAtom'
import { del, get, patch, post, serverErrorDataToString } from './HTTPService'
import { API_CONFIG, API_LIST } from '@constants/index'
import { ICreateSubjectAbsent, ISubjectAbsentInResponse } from '@domain/subjectAbsent'
import axios, { AxiosError } from 'axios'
import { getRecoil } from 'recoil-nexus'
import { toast } from 'react-toastify'

export const getListSubjectAbsentsMe = async (): Promise<ISubjectAbsentInResponse[]> => {
  const response = await get({
    url: API_LIST.absent,
  })
  return response?.data
}

export const getSubjectAbsentNotHandler = async (subjectId: string): Promise<ISubjectAbsentInResponse | undefined> => {
  const accessToken = getRecoil(accessTokenState)
  try {
    const response = await axios({
      method: 'get',
      url: API_CONFIG.HOST + API_LIST.absent + '/' + subjectId,
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

export const getSubjectAbsentBySubjectId = async (subjectId: string): Promise<ISubjectAbsentInResponse> => {
  const response = await get({
    url: API_LIST.absent + '/' + subjectId,
  })
  return response?.data
}

export const createSubjectAbsent = async (subjectId: string, data: ICreateSubjectAbsent): Promise<ISubjectAbsentInResponse> => {
  const response = await post({
    url: API_LIST.absent + '/' + subjectId,
    data,
  })
  return response?.data
}

export const updateSubjectAbsent = async (subjectId: string, data: ICreateSubjectAbsent): Promise<ISubjectAbsentInResponse> => {
  const response = await patch({
    url: API_LIST.absent + '/' + subjectId,
    data,
  })
  return response?.data
}

export const deleteSubjectAbsent = async (subjectId: string) => {
  const response = await del({
    url: API_LIST.absent + '/' + subjectId,
  })
  return response?.data
}
