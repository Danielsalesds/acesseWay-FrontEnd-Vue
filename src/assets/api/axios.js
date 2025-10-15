// src/api/axios.js
import axios from 'axios'

export const api = axios.create({
  baseURL: '/api', // URL do seu backend
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true // se futuramente usar cookies de sessão
})

// Interceptor opcional para log global de erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
