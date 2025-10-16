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
        this.user = data
        console.log('Usuário cadastrado:', data)
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao cadastrar perfil'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
      // 🔹 Buscar todos os perfis
    async getAllProfiles() {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get('https://user-ms-yb1o.onrender.com/user')
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

        // busca lista atualizada
        await this.getAllProfiles();

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
