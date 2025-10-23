//login
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null,

  }),

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('https://auth-test-v7zw.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      if (!res.ok) throw new Error('Login inválido')

      const data = await res.json()

      //this.user = data || null // guarda o usuário criado (apenas se precisar exibir algo)
      console.log('Usuário Logado:', data)

      this.token = data.token
      
      localStorage.setItem('token', data.token)
      // Buscar os dados do usuário logo após logar
      await this.getUserProfile()


      } catch (error) {
        this.error = 'Erro ao tentar fazer login!'
        
      }finally{
        this.loading = false
      }

    },
    async getUserProfile() {
      if (!this.token) throw new Error('Sem token, faça login primeiro.')

      const res = await fetch('https://user-ms-yb1o.onrender.com/user', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      })
      console.log('Com token!', this.token)
      const data = await res.json()
      this.user = data.content
      console.log('User: ', this.user)
    },


    logout() {
      this.token = null
      localStorage.removeItem('token')
      this.user = null
      this.error = null
    }
  }
})

