import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
interface Repository {
  label: string;
  value: string;
}

//create axios instance
const api = axios.create({
});
type JsonData = {
  code: number,
  data: Repository[]
}

export type GetRequest = AxiosRequestConfig

export interface Return<JsonData, Error>
  extends Pick<
  SWRResponse<AxiosResponse<JsonData>, AxiosError<Error>>,
  'isValidating' | 'mutate' | 'error'
  > {
  data: JsonData | undefined
  response: AxiosResponse<JsonData> | undefined
  requestKey: string
}

export interface Config<JsonData = unknown, Error = unknown>
  extends Omit<
  SWRConfiguration<AxiosResponse<JsonData>, AxiosError<Error>>,
  'fallbackData'
  > {
  fallbackData?: JsonData
}
//ajax request 
export default function useRequest<Error = unknown>(
  request: GetRequest,
  { fallbackData, ...config }: Config<JsonData, Error> = {}
): Return<JsonData, Error> {
  //if development use mock data
  if (process.env.NODE_ENV === "development") {
    request.url += ".mock"
  }
  const requestKey = request && JSON.stringify(request);

  const { data: response, error, isValidating, mutate } = useSWR<
    AxiosResponse<JsonData>,
    AxiosError<Error>
  >(requestKey, () => api(request), {
    ...config,
    fallbackData: fallbackData && {
      status: 200,
      statusText: 'InitialData',
      config: request,
      headers: {},
      data: fallbackData
    }
  })
  // if(response?.data.code !==0){ //handler request error
  //     throw  "request wrong!"
  // }
  return {
    data: response?.data,
    requestKey,
    response,
    error,
    isValidating,
    mutate
  }
}