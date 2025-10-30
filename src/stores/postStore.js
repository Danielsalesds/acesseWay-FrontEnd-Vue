import { defineStore } from 'pinia'
import { api } from '@/assets/api/axios'
import { useAuthStore as userProfileStore } from './loginStore'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    authorsCache: {},
    loading: false,
    error: null
  }),
  actions: {

    //  Criar post
    async createPost(userId, newPost) {
      this.loading = true
      this.error = null

      const profileStore = userProfileStore()
      //Verificar se user esta carregado se não carrega-lo no store
      if (!profileStore.user) {
        await profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }
      try {
        //adicionar ID do autor do post
        const postWithAuthor = { ...newPost, autorId: userId}
        const { data } = await api.post('https://post-ms.onrender.com/api/posts', postWithAuthor)

        //  Atualizar cache de autores
        this.authorsCache = this.authorsCache || {}
        const autorNome = `${profileStore.user.firstName || ''} ${profileStore.user.lastName || ''}`.trim()
        this.authorsCache[userId] = {
          nome: autorNome || 'Usuário sem nome',
          fotoUrl: profileStore.user.fotoUrl || 'https://via.placeholder.com/40'
        }

        //  Adicionar o post já enriquecido com o nome
        const enrichedPost = { ...data, 
          autorNome: this.authorsCache[userId].nome,
          autorFoto: this.authorsCache[userId].fotoUrl 
        }
        this.posts.push(enrichedPost)
        this.posts.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))


        //this.posts = data || []
        //this.posts.push(data)

        console.log('Post cadastrado:', data)
        this.loading = false

      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao cadastrar Post'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    // Lista de posts (com cache de autores)
    async postGetAll() {
      this.loading = true
      this.error = null

      const profileStore = userProfileStore()
      if (!profileStore.user) {
        await profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }

      try {
        // 1️⃣ Buscar posts e ordenar por data (mais recente primeiro)
        const { data } = await api.get('https://post-ms.onrender.com/api/posts')
        const sortedPosts = data.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))

        // 2️⃣ Enriquecer os posts com informações do autor
        const enrichedPosts = await Promise.all(
          sortedPosts.map(async (post) => {
            // Tenta pegar info do cache
            let autorInfo = this.authorsCache[post.autorId]

            // Se não existir no cache, buscar na API
            if (!autorInfo) {
              try {
                const { data: userData } = await api.get(
                  `https://user-ms-yb1o.onrender.com/user/${post.autorId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${profileStore.token}`
                    }
                  }
                )

                autorInfo = {
                  nome: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Usuário sem nome',
                  fotoUrl: userData.imageUrl || 'https://via.placeholder.com/40'
                }

                // Salva no cache
                this.authorsCache[post.autorId] = autorInfo
              } catch (err) {
                console.warn(`Erro ao buscar autor ${post.autorId}`, err)
                 autorInfo = {
                  nome: 'Usuário desconhecido',
                  fotoUrl: 'https://via.placeholder.com/40'
                }
                this.authorsCache[post.autorId] = autorInfo
              }
            }

            // Retorna o post enriquecido com nome e foto
            return {
              ...post,
              autorNome: autorInfo.nome,
              autorFoto: autorInfo.fotoUrl
            }
          })
        )

        // 3️⃣ Atualiza os posts já enriquecidos
        this.posts = enrichedPosts
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao carregar posts'
        console.error('Erro ao carregar posts:', err)
      } finally {
        this.loading = false
      }
    },

   //lista de posts
    async getAllPosts() {
      this.loading = true
      this.error = null
      const profileStore = userProfileStore()
      //Verificar se user esta carregado se não carrega-lo no store
      if (!profileStore.user) {
        await profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }
      try {
      const { data } = await api.get('https://post-ms.onrender.com/api/posts')
      this.posts = data
      console.log('post:  ', data)
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao cadastrar Post'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    //likes de users
    async likePost(postId) {
      this.loading = true
      this.error = null

      const profileStore = userProfileStore()
      //Verificar se user esta carregado se não carrega-lo no store
      if (!profileStore.user) {
        profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }
       const userId = profileStore.userId
      try {
        await api.post(`https://post-ms.onrender.com/api/posts/${postId}/curtir?usuarioId=${userId}`)
        await this.getAllPosts()
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao cadastrar Post'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
  
})
