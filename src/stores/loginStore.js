import { defineStore } from 'pinia'
import { useUserStore } from './user' // 🔹 importa o store de usuário

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    token: null,       // não precisa pegar do localStorage manualmente
    userId: null,      // armazenaremos só o id do usuário
    role: null
  }),

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('https://acessway.onrender.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })
        if (!res.ok) throw new Error('Login inválido')

        const data = await res.json()
        console.log('resposta da api:', data)

        this.token = data.token
        this.userId = data.id
        this.role = data.role

        // Buscar os dados do usuário logo após logar
        //await this.getUserProfile(data.id)

        //  Também salva no user store
        const userStore = useUserStore()
        userStore.setUser({
          id: data.id,
          email: data.email,
          role: data.role
        })

        console.log('Usuário salvo no userStore:', userStore)

      } catch (error) {
        this.error = 'Erro ao tentar fazer login!'
      } finally {
        this.loading = false
      }
    },

    async getUserProfile(userId) {
      if (!this.token) throw new Error('Sem token, faça login primeiro.')

      const res = await fetch(`https://acessway.onrender.com/user/${userId}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json()
      this.user = data
      console.log('User restaurado:>>>', this.user)
    },

    logout() {
      const userStore = useUserStore()
      userStore.clearUser() // 🔹 limpa também o user store

      this.token = null
      this.user = null
      this.userId = null
      this.error = null
      this.role = null
    }
  },

  // Persistência automática usando plugin
  persist: {
    paths: ['token', 'userId', 'role'] // salva o token e o id do usuário e a role
  }
})
