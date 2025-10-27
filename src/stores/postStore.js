import { defineStore } from 'pinia'
import { api } from '@/assets/api/axios'
import { useAuthStore as userProfileStore } from './loginStore'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
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
        profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }
      try {
        //adicionar ID do autor do post
        const postWithAuthor = { ...newPost, autorId: userId}
        this.posts.push(postWithAuthor)
        const { data } = await api.post('https://post-ms.onrender.com/api/posts', postWithAuthor,{ withCredentials: true })
        this.posts = data || null
        console.log('Post cadastrado:', data)

      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao cadastrar Post'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
   
    async getAllPosts() {
      const { data } = await api.get('https://post-ms.onrender.com/api/posts')
      this.posts = data
      console.log('post:  ', data)
    }
  }
})
