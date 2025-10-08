<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>Criar uma nova conta</h2>
      <p>É rápido e fácil.</p>

      <form @submit.prevent="registerUser">

        <!-- Nome e Sobrenome -->
        <div class="name-fields">
          <input type="text" placeholder="Nome" v-model="form.nome" required />
          <input type="text" placeholder="Sobrenome" v-model="form.sobrenome" required />
        </div>

        <!-- Data de nascimento -->
        <div class="birthdate">
          <label>Data de nascimento</label>
          <div class="birth-selects">
            <select v-model="form.dia">
              <option v-for="d in 31" :key="d">{{ d }}</option>
            </select>
            <select v-model="form.mes">
              <option v-for="(m, i) in meses" :key="i" :value="m">{{ m }}</option>
            </select>
            <select v-model="form.ano">
              <option v-for="a in anos" :key="a">{{ a }}</option>
            </select>
          </div>
        </div>

        <!-- Gênero -->
        <div class="gender">
          <label>Gênero</label>
          <div class="options-box">
            <label class="radio-box">
              Feminino
              <input type="radio" value="Feminino" v-model="form.genero" />
            </label>
            <label class="radio-box">
              Masculino
              <input type="radio" value="Masculino" v-model="form.genero" />
            </label>
            <label class="radio-box">
              Personalizado
              <input type="radio" value="Personalizado" v-model="form.genero" />
            </label>
          </div>
        </div>

        <!-- Tipo de conta -->
        <div class="account-type">
          <label>Tipo de conta</label>
          <div class="options-box">
            <label class="radio-box">
              Usuário Comum
              <input type="radio" value="Comum" v-model="form.tipoConta" />
            </label>
            <label class="radio-box">
              Profissional
              <input type="radio" value="Profissional" v-model="form.tipoConta" />
            </label>
          </div>
        </div>

        <!-- Campos extras para profissionais -->
        <div v-if="form.tipoConta === 'Profissional'" class="extra-fields">
          <input type="text" placeholder="CPF ou CNPJ" v-model="form.documento" />
          <label class="upload-label">
            <span>Enviar certificado</span>
            <input type="file" @change="handleFileUpload" />
          </label>
        </div>

        <!-- Contato e senha -->
        <input type="text" placeholder="Celular ou email" v-model="form.contato" required />
        <input type="password" placeholder="Nova senha" v-model="form.senha" required />

        <button type="submit" class="signup-btn">Cadastre-se</button>
      </form>

      <a href="/" class="login-link" @click="goHome">Já tem uma conta?</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupView",
  data() {
    return {
      form: {
        nome: "",
        sobrenome: "",
        dia: 1,
        mes: "jan",
        ano: new Date().getFullYear(),
        genero: "",
        tipoConta: "Comum",
        documento: "",
        certificado: null,
        contato: "",
        senha: ""
      },
      meses: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
      anos: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
    };
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    handleFileUpload(event) {
      this.form.certificado = event.target.files[0];
    },
    registerUser() {
      console.log("Dados do formulário:", this.form);
      alert("Cadastro enviado!");
    }
  }
};
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
