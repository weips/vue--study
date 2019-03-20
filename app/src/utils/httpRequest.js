import axios from 'axios'

function httpRequest (options) {
  let { method = 'GET', url, data, params } = options
  return axios({
    method,
    url,
    data,
    params
  })
}

export default httpRequest
