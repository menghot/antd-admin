import request from 'utils/request'
import { apiPrefix } from 'utils/config'

import api from './api'

const gen = params => {
  const paramsArray = params.split(' ')

  let url = paramsArray[0].includes('-')
    ? 'http://127.0.0.1:8080' + params
    : apiPrefix + params
  let method = 'GET'

  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = paramsArray[1].includes('-')
      ? 'http://127.0.0.1:8080' + paramsArray[1]
      : apiPrefix + paramsArray[1]
    //url = apiPrefix + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

APIFunction.queryWeather = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  })
}

export default APIFunction
