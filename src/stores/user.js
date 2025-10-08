import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  // Armazena apenas os campos do UserResponseDto (sem password)
  state: () => ({
    id: null,
    firstName: '',
    lastName: '',
    birthDate: null,
    email: '',
    gender: '',
    role: 'NORMAL',
    imageUrl: ''
  }),
  actions: {
    setUser(userData) {
      const { id, firstName, lastName, birthDate, email, gender, role, imageUrl } = userData;
      Object.assign(this, { id, firstName, lastName, birthDate, email, gender, role, imageUrl });
    },
    clearUser() {
      Object.assign(this, {
        id: null,
        firstName: '',
        lastName: '',
        birthDate: null,
        email: '',
        gender: '',
        role: 'NORMAL',
        imageUrl: ''
      });
    }
  },
  // configuração do plugin de persistência do pinia-plugin-persistedstate:
  // 1) persist: true  -> persiste tudo (padrão localStorage)
  // 2) ou persist: { paths: [...] } -> persiste só os campos listados
  persist: {
    key: 'my-app-user',          // chave usada no storage
    storage: localStorage,       // localStorage por padrão
    paths: ['id','firstName','lastName','email','role','imageUrl','birthDate','gender']
  }
});
