import axios from 'axios'

const axiosApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMovie = payload => axiosApi.post('/movie', payload)
export const getAllMovies = () => axiosApi.get('/movies')
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