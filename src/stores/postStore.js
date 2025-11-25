import { defineStore } from 'pinia'
import { api } from '@/assets/api/axios'
import { useAuthStore as userProfileStore } from './loginStore'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    authorsCache: {},
    authorsCacheComment: {},
    loading: false,
    error: null
  }),
  actions: {

    //  Criar post
    async createPost(userId, newPost, imageFile) {
      this.loading = true
      this.error = null
      let finalImageUrl = null;

      const profileStore = userProfileStore()
      //Verificar se user esta carregado se não carrega-lo no store
      if (!profileStore.user) {
        await profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }
      try {
        //adicionar ID do autor do post
        if (imageFile) {
          let formData = new FormData()
          formData.append("file", imageFile)
          let response = await fetch("https://acessway.onrender.com/api/upload", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${profileStore.token}`,
            },
            body: formData
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro no upload: ${response.status} - ${errorText}`);
          }

          // 4. Pega o resultado
          let cloudinaryUrl = await response.json();
          finalImageUrl= cloudinaryUrl.url;
        }


        const postWithAuthor = { ...newPost, autorId: userId, imagemUrl: finalImageUrl }
        const { data } = await api.post('https://acessway.onrender.com/api/posts', postWithAuthor)

        //  Atualizar cache de autores
        this.authorsCache = this.authorsCache || {}
        const autorNome = `${profileStore.user.firstName || ''} ${profileStore.user.lastName || ''}`.trim()
        this.authorsCache[userId] = {
          nome: autorNome || 'Usuário sem nome',
          fotoUrl: profileStore.user.fotoUrl || 'https://via.placeholder.com/40'
        }

        //  Adicionar o post já enriquecido com o nome
        const enrichedPost = {
          ...data,
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
    //>>>>>>listar post com com autor de post e comentarios
    async postGetAllCp() {
      this.loading = true
      this.error = null

      const profileStore = userProfileStore()

      if (!profileStore.user) {
        await profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }

      try {
        //  Buscar posts e ordenar por data (mais recente primeiro)
        const { data } = await api.get('https://acessway.onrender.com/api/posts')
        const sortedPosts = data.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))

        //  Enriquecer posts e comentários com nome/foto do autor
        const enrichedPosts = await Promise.all(
          sortedPosts.map(async (post) => {
            // Autor do Post
            let autorInfo = this.authorsCache[post.autorId]

            if (!autorInfo) {
              try {
                const { data: userData } = await api.get(
                  `https://acessway.onrender.com/user/${post.autorId}`,
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

            //  Autores dos Comentários
            const enrichedComments = await Promise.all(
              (post.comentario || []).map(async (comment) => {
                let commentAuthor = this.authorsCacheComment[comment.usuarioId]

                // Se o autor do comentário não estiver no cache, buscar na API
                if (!commentAuthor) {
                  try {
                    const { data: commentUser } = await api.get(
                      `https://acessway.onrender.com/user/${comment.usuarioId}`,
                      {
                        headers: {
                          Authorization: `Bearer ${profileStore.token}`
                        }
                      }
                    )

                    commentAuthor = {
                      nome: `${commentUser.firstName || ''} ${commentUser.lastName || ''}`.trim() || 'Usuário sem nome',
                      fotoUrl: commentUser.imageUrl || 'https://via.placeholder.com/40'
                    }

                    // salva no cache de autores de comentários
                    this.authorsCacheComment[comment.usuarioId] = commentAuthor
                  } catch (err) {
                    console.warn(`Erro ao buscar autor do comentário ${comment.usuarioId}`, err)
                    commentAuthor = {
                      nome: 'Usuário desconhecido',
                      fotoUrl: 'https://via.placeholder.com/40'
                    }
                    this.authorsCacheComment[comment.usuarioId] = commentAuthor
                  }
                }

                // Retorna o comentário enriquecido
                return {
                  ...comment,
                  autorNome: commentAuthor.nome,
                  autorFoto: commentAuthor.fotoUrl
                }
              })
            )

            // Retorna o post enriquecido

            return {
              ...post,
              autorNome: autorInfo.nome,
              autorFoto: autorInfo.fotoUrl,
              comentario: enrichedComments
            }
          })
        )

        // Atualiza o estado com os posts já enriquecidos
        this.posts = enrichedPosts
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao carregar posts'
        console.error('Erro ao carregar posts:', err)
      } finally {
        this.loading = false
      }
    },

    // Lista de posts (com cache de autores)>>>>>>>>>>
    async postGetAllTeste() {
      this.loading = true
      this.error = null

      const profileStore = userProfileStore()
      if (!profileStore.user) {
        await profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }

      try {
        // 1️ Buscar posts e ordenar por data (mais recente primeiro)
        const { data } = await api.get('https://acessway.onrender.com/api/posts')
        const sortedPosts = data.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))

        // 2️ Enriquecer os posts com informações do autor
        const enrichedPosts = await Promise.all(
          sortedPosts.map(async (post) => {
            // Tenta pegar info do cache
            let autorInfo = this.authorsCache[post.autorId]

            // Se não existir no cache, buscar na API
            if (!autorInfo) {
              try {
                const { data: userData } = await api.get(
                  `https://acessway.onrender.com/user/${post.autorId}`,
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

        // 3️ Atualiza os posts já enriquecidos
        this.posts = enrichedPosts
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao carregar posts'
        console.error('Erro ao carregar posts:', err)
      } finally {
        this.loading = false
      }
    },
    // Adicionar comentário a um post
    async comentarPost(postId, texto) {
      this.loading = true
      this.error = null

      const profileStore = userProfileStore()

      // Garantir que o usuário está logado e carregado
      if (!profileStore.user) {
        await profileStore.getUserProfile()
        if (!profileStore.userId) {
          console.error("Usuário não logado!")
          this.loading = false
          return
        }
      }

      try {
        // Montar o payload completo
        const payload = {
          usuarioId: profileStore.userId,
          texto,
          data: new Date().toISOString()
        }

        // Fazer a requisição
        const { data } = await api.post(
          `https://acessway.onrender.com/api/posts/${postId}/comentar`,
          payload
        )

        // Montar info do autor logado
        const autorInfo = {
          nome:
            `${profileStore.user.firstName || ''} ${profileStore.user.lastName || ''}`.trim() ||
            'Usuário sem nome',
          fotoUrl:
            profileStore.user.imageUrl ||
            profileStore.user.fotoUrl ||
            'https://via.placeholder.com/40'
        }

        // Atualiza o cache de autores de comentários
        if (!this.authorsCacheComment) {
          this.authorsCacheComment = {}
        }
        this.authorsCacheComment[profileStore.userId] = autorInfo

        // Cria o comentário enriquecido
        // Cria o comentário enriquecido
        const enrichedComment = {
          ...data,
          texto, // garante que o texto do comentário esteja presente
          autorNome: autorInfo.nome,
          autorFoto: autorInfo.fotoUrl,
          data: data.data || new Date().toISOString()
        }

        // Atualiza localmente o post sem recarregar tudo
        const postIndex = this.posts.findIndex((p) => p.id === postId)
        if (postIndex !== -1) {
          const post = this.posts[postIndex]
          //const novosComentarios = [...(post.comentario || []), enrichedComment]
          const novosComentarios = [...(post.comentario || []), enrichedComment]
            .sort((a, b) => new Date(a.data) - new Date(b.data))


          // Força reatividade substituindo o objeto
          this.posts[postIndex] = { ...post, comentario: novosComentarios }
        }

        console.log('Comentário adicionado:', enrichedComment)
        return enrichedComment // <- retorna para uso futuro (opcional)

      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao adicionar comentário'
        console.error('Erro ao comentar:', err)
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
        const { data } = await api.get('https://acessway.onrender.com/api/posts')
        this.posts = data
        console.log('post:  ', data)
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao cadastrar Post'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    //deletar post
    async deletePost(postId) {
      this.loading = true
      this.error = null

      try {
        await api.delete(`https://acessway.onrender.com/api/posts/${postId}`)

        // Remove localmente
        this.posts = this.posts.filter(p => p.id !== postId)

        console.log("Post removido:", postId)

      } catch (err) {
        this.error = err.response?.data?.message || "Erro ao excluir post"
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    //reportar post
    async reportPost({ postId, reason }) {
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
        await api.post(
          `https://acessway.onrender.com/api/posts/${postId}/report`,
          {
            reason,
            data: new Date().toISOString()
          }
        )

        alert("Denúncia enviada!")

      } catch (err) {
        this.error = err.response?.data?.message || "Erro ao denunciar post"
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

      if (!profileStore.user) {
        await profileStore.getUserProfile()
        console.error("Usuário não logado!")
        return
      }

      const userId = profileStore.user?.id

      try {
        await api.post(`https://acessway.onrender.com/api/posts/${postId}/curtir?usuarioId=${userId}`)

        // Atualiza o post localmente sem precisar recarregar tudo
        const post = this.posts.find(p => p.id === postId)
        if (post) {
          post.curtido = !post.curtido  // alterna o estado (curtido / não curtido)
          post.curtidas += post.curtido ? 1 : -1 // ajusta o número de curtidas
        }
        //await this.postGetAllCp() // ou this.getAllPosts(), dependendo do nome correto
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao curtir o post'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }

})
