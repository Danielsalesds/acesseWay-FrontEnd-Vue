<template>
  <div class="signup-container" role="main">
    <div class="signup-box" aria-labelledby="signup-title">
      <h2 id="signup-title">Criar uma nova conta</h2>
      <p>É rápido e fácil.</p>

      <form @submit.prevent="handleSubmit" aria-label="Formulário de criação de conta">
        <!-- Nome e Sobrenome -->
        <div class="name-fields">
          <FloatLabel class="form-field">
            <InputText id="firstName" v-model="form.firstName" required aria-required="true" />
            <label for="firstName">Nome</label>
          </FloatLabel>
          <FloatLabel class="form-field">
            <InputText id="lastName" v-model="form.lastName" required aria-required="true" />
            <label for="lastName">Sobrenome</label>
          </FloatLabel>
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

        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 16px;">
          <span>Gênero</span>
          <SelectButton v-model="form.gender" :options="genderOptions" optionLabel="label" optionValue="value" />
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 16px;">
          <span>Tipo da conta</span>
          <SelectButton v-model="form.role" :options="roleOptions" optionLabel="label" optionValue="value"
            class="custom-select" />
        </div>

        <FloatLabel class="form-field" style="margin-top: 30px; margin-bottom: 30px;">
          <InputText id="email" v-model="form.email" required aria-required="true" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel class="form-field">
          <InputText id="password" type="password" v-model="form.password" required aria-required="true" />
          <label for="password">Senha</label>
        </FloatLabel>

        <Button type="submit" class="signup-btn" label="Cadastre-se"/>
      </form>
      <div v-if="store.loading" class="loader-overlay">
        <ProgressSpinner aria-label="Loading" />
      </div>
      <a href="/" class="login-link" @click="goHome">Já tem uma conta?</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/signupStore'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import SelectButton from 'primevue/selectbutton';
import ProgressSpinner from 'primevue/progressspinner'
// import InputMask from 'primevue/inputmask';
import { useRouter } from 'vue-router';
const router = useRouter();


const store = useStore()
const roleOptions = ref([
  { label: 'Comum', value: 'NORMAL' },
  { label: 'Profissional', value: 'PROFESSIONAL' },
  // { label: 'Empresa', value: 'COMPANY' }
]);
const genderOptions = ref([
  { label: 'Masculino', value: 'MALE' },
  { label: 'Feminino', value: 'FEMALE' },
  { label: 'Outro', value: 'OTHER' }
]);
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
  meses: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  anos: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
})

async function handleSubmit() {
  const formData = form.value
  const formattedBirthDate = `${formData.birthDate.year}-${String(formData.birthDate.month).padStart(2, '0')}-${String(formData.birthDate.day).padStart(2, '0')}`;
  const userToCreate = {
    ...formData,
    birthDate: formattedBirthDate
  }
  try {
    await store.createProfile(userToCreate)
    setTimeout(() => {
      router.push({ name: 'login' }); // Ou o path: '/login'
    }, 1500);
  } catch (error) {
    console.log(error);
  }


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
.w-full { width: 100%; }
.mt-4 { margin-top: 1.5rem; }
.sr-only {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

:deep(.custom-select .p-button.p-highlight) {
  background-color: #0d47a1 !important;
  border-color: #0d47a1 !important;
  color: #ffffff !important;
}

.form-field :deep(.p-inputtext) {
  width: 100%;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #18191a;
  /* background: #eef1f5; */
  min-height: 100vh;
  padding: 20px;
}

.signup-box {
  /* background: #ffffff; */
  background-color: #242424;
  border: 2px solid #333;
  /* Uma borda sutil ajuda a definir o card */
  border-radius: 8px;
  padding: 40px 45px;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
  width: 100%; 
  max-width: 500px;
  transition: all .2s ease;
}

.signup-box:hover {
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.08);
}

.signup-box h2 {
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  /* color: #1c1e21; */
  color: #E4E6EB;
  margin-bottom: 6px;
}

.signup-box p {
  text-align: center;
  /* color: #6f7280; */
  color: #B0B3B8;
  margin-bottom: 22px;
  font-size: 15px;
}

.name-fields {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  margin-top: 40px;
}


select {
  width: 100%;
  padding: 13px 14px;
  margin-top: 6px;
  border: 1px solid #d8dbe2;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  background: #000000;
  transition: all 0.25s ease;
}

input:focus,
select:focus {
  border-color: #1877f2;
  background: #000000;
  box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.20);
}

.birth-selects {
  display: flex;
  gap: 10px;
}

.gender,
.account-type {
  margin-top: 18px;
  margin-bottom: 30px;
}

.gender legend,
.account-type legend {
  font-weight: 600;
  /* color: #1c1e21; */
  color: #E4E6EB;
  margin-bottom: 6px;
}

label,
span {
  color: #E4E6EB;
}

.options-box {
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
}

.radio-box {
  flex: 1;
  border: 1px solid #d8dbe2;
  border-radius: 10px;
  background: #fafafa;
  padding: 12px 14px;
  font-size: 14px;
  color: #1c1e21;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all .2s ease;
  font-weight: 500;
}

.radio-box:hover {
  background: #f2f4f7;
  border-color: #b6b9c3;
}

.radio-box input {
  margin-left: 10px;
  accent-color: #1877f2;
  width: 18px;
  height: 18px;
}

.radio-box:has(input:checked) {
  background: #eaf3ff;
  border-color: #1877f2;
  color: #1877f2;
  font-weight: 600;
}

.signup-btn {
  width: 100%;
  color: white;
  background-color: #0d47a1;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 25px;
  transition: background-color 0.2s;
}


.signup-btn:active {
  transform: scale(0.97);
}

.login-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  /* color: #1877f2; */
  color: #64B5F6;
  font-size: 15px;
  text-decoration: none;
  transition: opacity .2s ease;
}

.login-link:hover {
  opacity: 0.8;
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
@media (max-width: 480px) {
    .signup-box {
        padding: 20px;
    }
    
    .name-fields {
        flex-direction: column;
    }
}
</style>