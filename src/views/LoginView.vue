<template>
  <div class="login-container">
    <div class="logo">
      <Image src="/Icon.png" alt="Logo da AcessWay: um mapa com um símbolo de acessibilidade no centro." width="200" />
      <h1>AcessWay</h1>
      <h3>Conectando pessoas, quebrando barreiras.</h3>
    </div>

    <div class="login-box">
      <!-- Formulário de login -->
      <form class="login-form" @submit.prevent="login">


        <FloatLabel class="form-field">
          <InputText id="email" v-model="form.email" required />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel class="form-field">
          <InputText id="password" type="password" v-model="form.password" required />
          <label for="password">Senha</label>
        </FloatLabel>

        <Button type="submit" label="Entrar" class="login-btn" />

        <div v-if="store.loading" class="loader-overlay">
          <ProgressSpinner aria-label="Loading" />
        </div>

        <a href="#" class="forgot-password">Esqueceu a senha?</a>
      </form>
      <Divider />
      <div class="buttons">
        <Button label="Criar nova conta" severity="success" variant="outlined" @click="Signup" class="btn" />
        <Button label="Cadastrar minha empresa" icon="pi pi-briefcase" severity="info" variant="outlined"
          @click="businessSignup" class="business-btn" />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/loginStore'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import ProgressSpinner from 'primevue/progressspinner'
const store = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})


async function login() {

  await store.login(form.value);

  router.push('/home')

  form.value = {
    email: '',
    password: ''
  }

}

// Funções de navegação

const Signup = () => {
  router.push('/Signup')
}
const businessSignup = () =>{
  router.push({name:'businessSignup'})
}
</script>

<style>
body {
  /* background-color: #f0f2f5; */
  background-color: #18191a;
}
</style>
<style scoped>
.buttons{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.business-btn {
  width: 100% !important;
}

.btn {
  color: #81C784 !important;
  width: 100% !important;
}

.form-field {
  margin-bottom: 30px;
  display: block;
}

.form-field :deep(.p-inputtext) {
  width: 100%;
}

.logo h1 {
  margin: 0;
  color: #E4E6EB;
}

.logo h3 {
  margin: 0;
  margin-bottom: 20px;
  color: #E4E6EB;
}

.logo Image {
  margin: 0;
}

/* Container centralizado */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-color: #f0f2f5; */
  background-color: #18191a;
}

.login-box {
  /* background-color: #fff; */
  background-color: #242424;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 360px;
  text-align: center;
  border: 2px solid #333;
  border-radius: 8px;
}

/* Inputs */
.login-box .native-input {
  width: 90%;
  padding: 12px 15px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.login-box input[type="text"]:focus,
.login-box input[type="password"]:focus {
  border-color: #1877f2;
  box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
}

/* Botão Entrar */
.login-btn {
  width: 100%;
  color: white;
  /* background: linear-gradient(90deg, #1877f2, #0f62d0); */
  background-color: #0d47a1;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  transition: background-color 0.2s;
}

.login-btn:hover {
  background-color: #adc3e6;
}

/* Esqueceu a senha */
.forgot-password {
  display: block;
  font-size: 13px;
  /* color: #1877f2; */
  /* color: #0d47a1; */
  color: #64B5F6;
  text-decoration: none;
  margin-bottom: 20px;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* Linha horizontal */
.login-box hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

/* Botão criar nova conta */
.signup-btn {
  /* color: white; */
  color: #1B5E20;
  width: 100%;
  /* background: linear-gradient(90deg, #1fa866, #177946); */
  background-color: white;
  font-weight: bold;
  padding: 12px;
  border: 2px solid #1B5E20;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.signup-btn:hover {
  /* background-color: #36a420; */
  background-color: rgba(27, 94, 32, 0.1);
}

.signup-btn:focus {
  outline: none;
  /* Remove o padrão do navegador */
  box-shadow: 0 0 0 3px rgba(27, 94, 32, 0.4);
  /* Brilho sutil */
}

/* Texto adicional */
.login-box p {
  font-size: 13px;
  color: #606770;
  margin-top: 20px;
}

.loader-overlay {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
