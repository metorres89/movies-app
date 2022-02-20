import axios from 'axios'

const apiProtocol = process.env.REACT_APP_BACK_API_HTTP_PROTOCOL
const apiDomain = process.env.REACT_APP_BACK_API_DOMAIN
const apiPort = process.env.REACT_APP_BACK_API_PORT
const apiBaseUri = process.env.REACT_APP_BACK_API_BASE_URI

const axiosApi = axios.create({
    baseURL: `${apiProtocol}://${apiDomain}:${apiPort}${apiBaseUri}`,
})

export const insertMovie = payload => axiosApi.post('/movie', payload)
export const getAllMovies = () => axiosApi.get('/movie')
export const updateMovieById = (id, payload) => axiosApi.put(`/movie/${id}`, payload)
export const deleteMovieById = id => axiosApi.delete(`/movie/${id}`)
export const getMovieById = id => axiosApi.get(`/movie/${id}`)

const api = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById
}

export default api