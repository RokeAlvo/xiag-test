import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL

export const http = axios
export type HttpService = typeof http
export const routes = {
    poll: apiUrl + '/api/v1/poll'
}
