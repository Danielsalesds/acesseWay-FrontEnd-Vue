<template>
  <div>
    <!-- Caixa inicial estilo Facebook -->
    <div class="post-input" @click="openModal = true">
      <img :src="user.imageUrl" alt="profile" class="profile-pic" />
      <div class="input-placeholder">No que você está pensando, {{user.firstName}}?</div>
    </div>

    <!-- Modal -->
    <div v-if="openModal" class="modal-overlay" @click.self="openModal = false">
      <div class="modal">
        <!-- Cabeçalho -->
        <div class="modal-header">
          <h2>Criar post</h2>
          <button class="close-btn" @click="openModal = false">×</button>
        </div>

        <!-- Corpo -->
        <div class="modal-body">
          <div class="user-info">
            <img :src="user.imageUrl" alt="profile" class="profile-pic" />
            <div>
              <p class="username">{{user.firstName}}</p>
              <button class="privacy-btn">Público</button>
            </div>
          </div>

          <textarea
            v-model="postText"
            :placeholder="`No que você está pensando, ${user.firstName}?`"
          ></textarea>

          <div class="add-section">
            <p>Adicionar ao post</p>
            <div class="icons">
              <!-- Botão da câmera -->
            <button @click="triggerFileInput">📷</button>

            <!-- Input escondido -->
            <input
                type="file"
                ref="fileInput"
                accept="image/*,video/*"
                style="display: none"
                @change="handleFileChange"
            />
              <button>😊</button>
              <button>📍</button>
            </div>
          </div>
        </div>

        <!-- Rodapé -->
        <div class="modal-footer">
          <button
            class="publish-btn"
            :class="{ disabled: !postText.trim() }"
            :disabled="!postText.trim()"
            @click="publishPost"
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/stores/loginStore'
import { usePostStore } from '@/stores/postStore' // ✅ importa o store de posts

const postStores = usePostStore()
const store = useAuthStore()
const user = store.user

const openModal = ref(false);
const postText = ref("");
const fileInput = ref(null)
const selectedFile = ref(null)

// Quando o usuário escolhe um arquivo
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
  selectedFile.value = file
  console.log('Arquivo selecionado:', file)
}

const triggerFileInput = () => {
  fileInput.value.click() //  dispara o input oculto
}

// publicar o post
const publishPost = async () => {
  if (!postText.value.trim()) return

// Gerar data atual no formato ISO
  const dataAtual = new Date().toISOString()

  const newPost = {
    conteudo: postText.value,
    imagemUrl: null,
    videoUrl: null,
    dataCriacao: dataAtual
  }
  // Se o usuário selecionou um arquivo, define o tipo
  if (selectedFile.value) {
    const file = selectedFile.value
    if (file.type.startsWith("image/")) {
      newPost.imagemUrl = URL.createObjectURL(file)
    } else if (file.type.startsWith("video/")) {
      newPost.videoUrl = URL.createObjectURL(file)
    }
  }

  // Se quiser futuramente enviar imagem, você pode usar FormData aqui
  await postStores.createPost(user.id, newPost)

  // Limpa tudo após publicar
  postText.value = ""
  selectedFile.value = null
  openModal.value = false
}


</script>

<style scoped>
/* ----- Caixa inicial ----- */
.post-input {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #242526;
  color: #b0b3b8;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.post-input:hover {
  background-color: #3a3b3c;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.input-placeholder {
  background-color: #3a3b3c;
  padding: 8px 14px;
  border-radius: 24px;
  flex: 1;
  color: #b0b3b8;
}

/* ----- Modal Overlay ----- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

/* ----- Modal Box ----- */
.modal {
  background-color: #242526;
  color: white;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}

/* ----- Cabeçalho ----- */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3a3b3c;
  padding: 14px 16px;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  color: #b0b3b8;
  font-size: 24px;
  cursor: pointer;
}

.close-btn:hover {
  color: white;
}

/* ----- Corpo ----- */
.modal-body {
  padding: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.username {
  font-weight: bold;
}

.privacy-btn {
  background-color: #3a3b3c;
  border: none;
  border-radius: 6px;
  padding: 2px 8px;
  color: #b0b3b8;
  font-size: 12px;
  cursor: pointer;
}

textarea {
  width: 100%;
  background: none;
  border: none;
  resize: none;
  outline: none;
  color: white;
  font-size: 16px;
  min-height: 80px;
  margin-bottom: 16px;
}

/* ----- Adicionar ao post ----- */
.add-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #3a3b3c;
  border-radius: 10px;
  padding: 8px 12px;
  color: #b0b3b8;
}

.icons button {
  background: none;
  border: none;
  font-size: 18px;
  margin-left: 8px;
  cursor: pointer;
}

.icons button:hover {
  transform: scale(1.1);
}

/* ----- Rodapé ----- */
.modal-footer {
  padding: 12px 16px;
}

.publish-btn {
  width: 100%;
  background-color: #2374e1;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.publish-btn:hover {
  background-color: #166fe5;
}

.publish-btn.disabled {
  background-color: #3a3b3c;
  color: #777;
  cursor: not-allowed;
}
</style>
