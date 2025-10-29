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
        this.authorsCache[userId] = autorNome || 'Usuário sem nome'

        //  Adicionar o post já enriquecido com o nome
        const enrichedPost = { ...data, autorNome: this.authorsCache[userId] }
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
        const { data } = await api.get('https://post-ms.onrender.com/api/posts')
        this.posts = data.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))

        // Enriquecer os posts com o nome do autor, usando cache
        const enrichedPosts = await Promise.all(
          data.map(async (post) => {
            let autorNome = this.authorsCache[post.autorId]

            if (!autorNome) {
              try {
                const { data: userData } = await api.get(
                  `https://user-ms-yb1o.onrender.com/user/${post.autorId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${profileStore.token}`
                    }
                  }
                )
                autorNome = `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
                

                this.authorsCache[post.autorId] = autorNome
              } catch (err) {
                autorNome = 'Usuário desconhecido'
                console.warn(`Erro ao buscar autor ${post.autorId}`, err)
              }
            }

            return { ...post, autorNome }
          })
        )
        this.posts = enrichedPosts
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao carregar posts'
        console.error(err)
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
