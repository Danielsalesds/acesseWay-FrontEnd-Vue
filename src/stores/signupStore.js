import { defineStore } from 'pinia'
import { api } from '@/assets/api/axios'

export const useStore = defineStore('profile', {
  state: () => ({
    user: null,     // guarda o usuário criado (opcional)
    users:[],
    loading: false,
    error: null
  }),

  actions: {
    // 🔹 Criar novo perfil
    async createProfile(newUser) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post('https://auth-test-v7zw.onrender.com/auth', newUser,{ withCredentials: true })
        this.user = data || null
        console.log('Usuário cadastrado:', data)

      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao cadastrar perfil'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    // 🔹 Atualizar usuário pelo ID
    async updateProfile(userId, updatedData) {
        
        if (!userId) {
            console.error("ID do usuário não fornecido")
            return null
        }

        this.loading = true
        this.error = null
        try {
            // Atualiza no backend
            const { data } = await api.put(`/user/${userId}`, updatedData, { withCredentials: true })

            // Atualiza o estado local (opcional)
            if (this.user && this.user.id === userId) {
            this.user = { ...this.user, ...data.content }
            }

            console.log("Usuário atualizado com sucesso:", data.content)
            return data.content
        } catch (err) {
            this.error = err.response?.data?.message || "Erro ao atualizar usuário"
            console.error(err)
            return null
        } finally {
            this.loading = false
        }
    },

    // 🔹 Buscar usuário por ID
    async getUserById(userId) {
        if (!userId) return null
        // busca lista atualizada

        this.loading = true
        this.error = null
        try {
            // Busca no backend
            const { data } = await api.get(`/user/${userId}`)
            
            // Atualiza o estado local, se quiser
            this.user = data || null

            console.log('Usuário encontrado por ID:', this.user)
            return this.user
        } catch (err) {
            this.error = err.response?.data?.message || 'Erro ao buscar usuário'
            console.error(err)
            return null
        } finally {
            this.loading = false
        }
    },

      // 🔹 Buscar todos os perfis
    async getAllProfiles() {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get('/user')
        this.users = data.content || []
        console.log('Perfis encontrados-->>', this.users)
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao buscar perfis'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    //logar com usuario
    async logar(userLoad) {
        // validação de entrada
        if (!userLoad || !userLoad.email) {
            console.error("Dados de login inválidos:", userLoad);
            return;
        }

        // busca segura (evita undefined)
        const foundUser = this.users.find(
            p => p.email && p.email.toLowerCase() === userLoad.email.toLowerCase()
        );

        if (foundUser) {
            this.user = foundUser;
            console.log("✅ Usuário encontrado:", foundUser);
        } else {
            console.log("❌ Usuário não encontrado");
        }
    },


    reset() {
      this.user = null
      this.error = null
    }
  }
})
