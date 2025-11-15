import { defineStore } from 'pinia'
import { api } from '@/assets/api/axios'
//import { useRouter } from 'vue-router' 
import { useAuthStore } from '@/stores/loginStore'
import axios from 'axios'


export const useStore = defineStore('profile', {
  state: () => ({
    user: null,     // guarda o usuário criado (opcional)
    users:[],
    loading: false,
    error: null,
    searchedName: "",
  }),

  actions: {
    //  Criar novo perfil
    async createProfile(newUser) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post('https://acessway.onrender.com/auth', newUser,{ withCredentials: true })
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
      const authStore = useAuthStore() //  acessa token do outro store
      //carregar useAuthStore 
      if (!authStore.user) {
        await authStore.getUserProfile(userId)
      }
      const token = authStore.token     // pega o token persistido
      this.user = authStore.user
      console.log("User antes: ", this.user )

      if (!userId) {
        console.error("ID do usuário não fornecido")
        return null
      }

      if (!token) {
        console.error("Token não encontrado, faça login novamente")
        return null
      }

      this.loading = true
      this.error = null
      
      try {
        console.log(">>>> ID do usuário =", userId)

        // Faz o Upload da imagem para o Cloudinary e atribui a url para o usuário que vai ser atualizado.
        let formData =  new FormData()
        formData.append("file",updatedData.imageUrl)
        let response = await axios.post("https://acessway.onrender.com/api/upload", formData,{
          headers: {
              Authorization: `Bearer ${token}`,
          }
        });
        let cloudinaryUrl = response.data
        updatedData.imageUrl = cloudinaryUrl.url


        //  Envia o token no header Authorization
        const { data } = await api.put(`/user/${userId}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // Atualiza o estado local (opcional)
        if (this.user && this.user.id === userId) {
          this.user = { ...this.user, ...data }
        }
        console.log("User Depois: ", this.user )
        authStore.user = { ...authStore.user, ...data }

        console.log("Usuário atualizado com sucesso:", "Só DATA: ", data)
        
        return data

      } catch (err) {
        this.error = err.response?.data?.message || "Erro ao atualizar usuário"
        console.error("Erro no update:", err)
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
      const name = this.searchedName
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get(`/user?name=${name}`)
        console.log( 'Searched: '+ this.searchedName)
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



