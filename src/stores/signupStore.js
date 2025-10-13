import { defineStore } from 'pinia'

export const useStore = defineStore('profile', {
  state: () => ({
    user: null,     // guarda o usuário criado (opcional)
    loading: false,
    error: null
  }),

  actions: {
    async createProfile(newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('https://auth-test-v7zw.onrender.com/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        })

        if (!res.ok) throw new Error('Erro ao cadastrar perfil')

        const data = await res.json()
        this.user = data  // guarda o usuário criado (apenas se precisar exibir algo)
        console.log('Usuário cadastrado:', data)
      } catch (err) {
        this.error = 'Erro ao cadastrar perfil'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.user = null
      this.error = null
    }
  }
})
