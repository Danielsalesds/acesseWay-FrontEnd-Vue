<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>Criar uma nova conta</h2>
      <p>É rápido e fácil.</p>

      <form @submit.prevent="handleSubmit">
        <!-- Nome e Sobrenome -->
        <div class="name-fields">
          <input type="text" placeholder="Nome" v-model="form.firstname" required />
          <input type="text" placeholder="Sobrenome" v-model="form.lastName" required />
        </div>

        <!-- Data de nascimento -->
        <div class="birthdate">
          <label>Data de nascimento</label>
          <div class="birth-selects">
            <select v-model="form.birthDate.day">
              <option v-for="d in 31" :key="d">{{ d }}</option>
            </select>
            <select v-model="form.birthDate.month">
              <option v-for="(m, i) in calend.meses" :key="i" :value="i + 1">{{ m }}</option>
            </select>
            <select v-model="form.birthDate.year">
              <option v-for="a in calend.anos" :key="a">{{ a }}</option>
            </select>
          </div>
        </div>

        <!-- Gênero -->
        <div class="gender">
          <label>Gênero</label>
          <div class="options-box">
            <label class="radio-box">
              Feminino
              <input type="radio" value="FEMALE" v-model="form.gender" />
            </label>
            <label class="radio-box">
              Masculino
              <input type="radio" value="MALE" v-model="form.gender" />
            </label>
            <label class="radio-box">
              Outro
              <input type="radio" value="OTHER" v-model="form.gender" />
            </label>
          </div>
        </div>

        <!-- Tipo de conta -->
        <div class="account-type">
          <label>Tipo de conta</label>
          <div class="options-box">
            <label class="radio-box">
              Usuário Comum
              <input type="radio" value="NORMAL" v-model="form.role" />
            </label>
            <label class="radio-box">
              Profissional
              <input type="radio" value="PROFESSIONAL" v-model="form.role" />
            </label>
            <label class="radio-box">
              Administrador
              <input type="radio" value="ADMIN" v-model="form.role" />
            </label>
          </div>
        </div>

        <!-- Contato e senha -->
        <input type="email" placeholder="Email" v-model="form.email" required />
        <input type="password" placeholder="Senha" v-model="form.password" required />

        <button type="submit" class="signup-btn">Cadastre-se</button>
      </form>

      <a href="/" class="login-link" @click="goHome">Já tem uma conta?</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import  {useStore} from '@/stores/signupStore'

const store = useStore()

const form = ref({
        firstname: '',
        lastName: '',
        birthDate: { day: 1, month: 1, year: new Date().getFullYear() },
        gender: 'OTHER',
        role: 'NORMAL',
        email: '',
        password: ''
      })
const calend = ref({
        meses: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
        anos: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
    })
async function handleSubmit() {
  await store.createProfile(form.value)
  form.value = {
     firstname: '', 
     lastName: '', 
     birthDate: { day: 1, month: 1, year: new Date().getFullYear() }, 
     gender: '',
    role: 'NORMAL',
    email: '',
    password: ''
     } // limpa o formulário
     calend.value = {
        meses: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
        anos: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
     }
}
      
  
  
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.signup-box {
  background: #fff;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 400px;
}

.signup-box h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 5px;
}

.signup-box p {
  text-align: center;
  color: #606770;
  margin-bottom: 15px;
}

.name-fields {
  display: flex;
  gap: 10px;
}

.name-fields input {
  flex: 1;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.birth-selects {
  display: flex;
  gap: 8px;
}

/* Seções */
.gender, .account-type {
  margin-top: 15px;
}

/* Caixas de opções estilo Facebook */
.options-box {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  gap: 8px;
}

.radio-box {
  flex: 1;
  border: 1px solid #ccd0d5;
  border-radius: 4px;
  background-color: #fff;
  padding: 8px 10px;
  font-size: 14px;
  color: #1c1e21;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.radio-box input {
  margin-left: 6px;
  accent-color: #1877f2;
}

.radio-box:hover {
  background-color: #f5f6f7;
}

.extra-fields {
  margin-top: 15px;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8px;
  font-size: 14px;
  color: #1877f2;
  cursor: pointer;
}

.upload-label input {
  margin-top: 4px;
}

.signup-btn {
  width: 100%;
  background-color: #42b72a;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  cursor: pointer;
}

.signup-btn:hover {
  background-color: #36a420;
}

.login-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #1877f2;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
