import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    user: null,
    loading: false,
    error: null,
    token: null,       // não precisa pegar do localStorage manualmente
    userId: null       // armazenaremos só o id do usuário
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
        console.log('resposta da api:', data)

        this.token = data.token
        this.userId = data.id

        // Buscar os dados do usuário logo após logar
        //await this.getUserProfile(data.id)

      } catch (error) {
        this.error = 'Erro ao tentar fazer login!'
      } finally {
        this.loading = false
      }
    },

    async getUserProfile(userId) {
      if (!this.token) throw new Error('Sem token, faça login primeiro.')

      const res = await fetch(`https://user-ms-yb1o.onrender.com/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      })
      const data = await res.json()
      this.user = data
      console.log('User restaurado:>>>', this.user)
    },

    logout() {
      this.token = null
      this.user = null
      this.userId = null
      this.error = null
    }
  },

  // Persistência automática usando plugin
  persist: {
    paths: ['token', 'userId'] // ⚡ só salva o token e o id do usuário
  }
})
