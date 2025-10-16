<template>
  <div class="signup-container" role="main">
    <div class="signup-box" aria-labelledby="signup-title">
      <h2 id="signup-title">Criar uma nova conta</h2>
      <p>É rápido e fácil.</p>

      <form @submit.prevent="handleSubmit" aria-label="Formulário de criação de conta">
        <!-- Nome e Sobrenome -->
        <div class="name-fields">
          <input type="text" placeholder="Nome" v-model="form.firstName" required />
          <input type="text" placeholder="Sobrenome" v-model="form.lastName" required />
        </div>

        <!-- Data de nascimento -->
        <div class="birthdate">
          <label for="birth-day">Data de nascimento</label>
          <div class="birth-selects">
            <select id="birth-day" v-model="form.birthDate.day" aria-label="Dia de nascimento">
              <option v-for="d in 31" :key="d">{{ d }}</option>
            </select>

            <select id="birth-month" v-model="form.birthDate.month" aria-label="Mês de nascimento">
              <option v-for="(m, i) in calend.meses" :key="i" :value="i + 1">{{ m }}</option>
            </select>

            <select id="birth-year" v-model="form.birthDate.year" aria-label="Ano de nascimento">
              <option v-for="a in calend.anos" :key="a">{{ a }}</option>
            </select>
          </div>
        </div>
          <h2>TESTE</h2>
        <!-- Gênero -->
        <fieldset class="gender">
          <legend>Gênero</legend>
          <div class="options-box">
            <label class="radio-box" for="gender-female">
              Feminino
              <input id="gender-female" type="radio" value="FEMALE" v-model="form.gender" />
            </label>
            <label class="radio-box" for="gender-male">
              Masculino
              <input id="gender-male" type="radio" value="MALE" v-model="form.gender" />
            </label>
            <label class="radio-box" for="gender-other">
              Outro
              <input id="gender-other" type="radio" value="OTHER" v-model="form.gender" />
            </label>
          </div>
        </fieldset>

        <!-- Tipo de conta -->
        <fieldset class="account-type">
          <legend>Tipo de conta</legend>
          <div class="options-box">
            <label class="radio-box" for="role-normal">
              Usuário Comum
              <input id="role-normal" type="radio" value="NORMAL" v-model="form.role" />
            </label>
            <label class="radio-box" for="role-pro">
              Profissional
              <input id="role-pro" type="radio" value="PROFESSIONAL" v-model="form.role" />
            </label>
          </div>
        </fieldset>

        <!-- Contato e senha -->
        <label for="email" class="sr-only">Email</label>
        <input id="email" type="email" placeholder="Email" v-model="form.email" required aria-required="true" />

        <label for="password" class="sr-only">Senha</label>
        <input id="password" type="password" placeholder="Senha" v-model="form.password" required aria-required="true" />

        <button type="submit" class="signup-btn">Cadastre-se</button>
      </form>

      <a href="/" class="login-link" @click="goHome">Já tem uma conta?</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/signupStore'

const store = useStore()

const form = ref({
  firstName: '',
  lastName: '',
  birthDate: { day: 1, month: 1, year: new Date().getFullYear() },
  gender: 'OTHER',
  role: 'NORMAL',
  email: '',
  password: '',
  imageUrl: '' 
})

const calend = ref({
  meses: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
  anos: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
})

async function handleSubmit() {
  const formData = form.value
  const formattedBirthDate = `${formData.birthDate.year}-${String(formData.birthDate.month).padStart(2, '0')}-${String(formData.birthDate.day).padStart(2, '0')}`;
  const  userToCreate = {
    ...formData,
    birthDate: formattedBirthDate
  }
  await store.createProfile(userToCreate)
  form.value = {
    firstName: '', 
    lastName: '', 
    birthDate: { day: 1, month: 1, year: new Date().getFullYear() }, 
    gender: '',
    role: 'NORMAL',
    email: '',
    password: '',
    imageUrl: ''
  }
}
</script>


<style scoped>
/* Texto oculto apenas para leitores de tela */
.sr-only {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 20px;
}

.signup-box {
  background-color: #fff;
  padding: 35px 40px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;
  font-family: Arial, sans-serif;
}

.signup-box h2 {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  color: #1c1e21;
  margin-bottom: 4px;
}

.signup-box p {
  text-align: center;
  color: #606770;
  margin-bottom: 20px;
  font-size: 14px;
}

.name-fields {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 11px 12px;
  margin-top: 6px;
  border: 1px solid #ccd0d5;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;
  color: #1c1e21;
  background-color: #fff;
}

input:focus, select:focus {
  border-color: #1877f2;
  box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
}

.birth-selects {
  display: flex;
  gap: 8px;
}

.gender, .account-type {
  margin-top: 15px;
}

.options-box {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 6px;
}

.radio-box {
  flex: 1;
  border: 1px solid #ccd0d5;
  border-radius: 8px;
  background-color: #f5f6f700;
  padding: 10px 12px;
  font-size: 14px;
  color: #1c1e21;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.radio-box input {
  margin-left: 6px;
  accent-color: #1877f2;
}

.radio-box:hover {
  background-color: #e4e6eb;
}

.radio-box:focus-within {
  outline: 2px solid #1877f2;
  outline-offset: 2px;
}

.signup-btn {
  width: 100%;
  background-color: #42b72a;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.signup-btn:hover {
  background-color: #36a420;
}

.signup-btn:focus {
  outline: 3px solid #1c1e21;
  outline-offset: 2px;
}

.signup-btn:active {
  transform: scale(0.98);
}

.login-link {
  display: block;
  text-align: center;
  margin-top: 18px;
  color: #1877f2;
  font-size: 14px;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>