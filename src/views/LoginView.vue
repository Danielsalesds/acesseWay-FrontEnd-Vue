<template>
  <div class="login-container">
    <div class="login-box">
      
      <!-- Formulário de login -->
      <form class="login-form" @submit.prevent="login">
        <input 
          type="text" 
          v-model="form.email"
          placeholder="Email ou telefone" 
        />
        <input 
          type="password"
          v-model="form.password"
          placeholder="Senha" 
        />
        <button type="submit" class="login-btn">Entrar</button>
        <a href="#" class="forgot-password">Esqueceu a senha?</a>
      </form>

      <hr />
      <h2>TESTE</h2>

      <!-- Criar nova conta -->
      <button class="signup-btn" @click="Signup">Criar nova conta</button>

      <!-- Texto adicional -->
      <p>
        Crie uma <strong>Página</strong> para uma celebridade, uma marca ou uma empresa.
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import  {useAuthStore} from '@/stores/loginStore'

  const store = useAuthStore()
  const router = useRouter()
  
  const form = ref({
    email:'',
    password:''
  })
  

  async function login() {
    
    await store.login(form.value);

    router.push('/home')

    form.value = {
      email : '',
      password : ''
    }
    
  }

  // Funções de navegação

  const Signup = () => {
    router.push('/Signup')
  }
</script>

<style scoped>
/* Container centralizado */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

/* Box branco */
.login-box {
  background-color: #fff;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 360px;
  text-align: center;
}

/* Inputs */
.login-box input[type="text"],
.login-box input[type="password"] {
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
  background: linear-gradient(90deg, #1877f2, #0f62d0);
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
  color: #1877f2;
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
  width: 100%;
  background: linear-gradient(90deg, #1fa866, #177946);
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.signup-btn:hover {
  background-color: #36a420;
}

/* Texto adicional */
.login-box p {
  font-size: 13px;
  color: #606770;
  margin-top: 20px;
}
</style>
