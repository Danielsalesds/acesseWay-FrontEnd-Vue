<template>
  <section class="edit-profile" aria-labelledby="profile-title">
    <div class="edit-card">
      <h1 id="profile-title">Editar Perfil</h1>
      <p class="subtitle">Atualize suas informações pessoais abaixo</p>

      <form @submit.prevent="handleUpdate" aria-label="Formulário de edição de perfil">
        <!-- Foto do perfil -->
        <div class="profile-pic">
          <img v-if="previewUrl" :src="previewUrl" alt="">
          <img v-else-if="form.imageUrl" :src="form.imageUrl" alt="Foto de perfil do usuário" />
          <img v-else :src="defaultImage" />
          <div class="file-input">
            <label for="image-upload" class="upload-label">
              <i class="fas fa-camera"></i> Alterar foto
            </label>
            <input id="image-upload" type="file" accept="image/*" @change="handleImage" />
          </div>
        </div>

        <!-- Nome -->
        <!-- <div class="form-group">
          <label for="firstName">Nome</label>
          <input id="firstName" type="text" v-model="form.firstName" required placeholder="Digite seu nome"
            aria-required="true" />
        </div>

        <div class="form-group">
          <label for="lastName">Sobrenome</label>
          <input id="lastName" type="text" v-model="form.lastName" required placeholder="Digite seu sobrenome"
            aria-required="true" />
        </div> -->
        <FloatLabel class="name-fields">
          <InputText id="firstName" v-model="form.firstName" required aria-required="true" />
          <label for="firstName">Nome</label>
        </FloatLabel>
        <FloatLabel class="name-fields">
          <InputText id="lastName" v-model="form.lastName" required aria-required="true" />
          <label for="lastName">Sobrenome</label>
        </FloatLabel>

        <!-- Data de nascimento -->
        <div class="form-group">
          <label>Data de nascimento</label>
          <div class="birth-selects">
            <select v-model="form.birthDate.day" aria-label="Dia de nascimento">
              <option v-for="d in 31" :key="d">{{ d }}</option>
            </select>
            <select v-model="form.birthDate.month" aria-label="Mês de nascimento">
              <option v-for="(m, i) in calend.meses" :key="i" :value="i + 1">{{ m }}</option>
            </select>
            <select v-model="form.birthDate.year" aria-label="Ano de nascimento">
              <option v-for="a in calend.anos" :key="a">{{ a }}</option>
            </select>
          </div>
        </div>

        <!-- Gênero -->
        <!-- <fieldset class="form-group">
          <legend>Gênero</legend>
          <div class="radio-group">
            <label>
              <input type="radio" value="FEMALE" v-model="form.gender" />
              Feminino
            </label>
            <label>
              <input type="radio" value="MALE" v-model="form.gender" />
              Masculino
            </label>
            <label>
              <input type="radio" value="OTHER" v-model="form.gender" />
              Outro
            </label>
          </div>
        </fieldset> -->


        <!-- Tipo de conta -->
        <!-- <fieldset class="form-group">
          <legend>Tipo de conta</legend>
          <div class="radio-group">
            <label>
              <input type="radio" value="NORMAL" v-model="form.role" />
              Usuário Comum
            </label>
            <label>
              <input type="radio" value="PROFESSIONAL" v-model="form.role" />
              Profissional
            </label>
          </div>
        </fieldset> -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 16px;">
          <span>Gênero</span>
          <SelectButton v-model="form.gender" :options="genderOptions" optionLabel="label" optionValue="value" />
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 16px;">
          <span>Tipo da conta</span>
          <SelectButton v-model="form.role" :options="roleOptions" optionLabel="label" optionValue="value"
            class="custom-select" />
        </div>
        <!-- <InputText id="email" type="email" v-model="form.email" disabled /> -->
        <FloatLabel class="name-fields">
          <InputText id="email" v-model="form.email" disabled />
          <label for="email">Email</label>
        </FloatLabel>

        <FloatLabel class="name-fields" style="display: none;">
          <InputText id="id" v-model="form.id" disabled />
          <label for="id">Id (Não editável)</label>
        </FloatLabel>

        <!-- <FloatLabel class="name-fields">
          <InputText id="password" type="password" disabled />
          <label for="password">Senha (Não editável)</label>
        </FloatLabel> -->


        <!-- Campos bloqueados -->
        <!-- <div class="form-group disabled-fields">
          <label for="email">Email (não editável)</label>
          <input id="email" type="email" v-model="form.email" disabled />
        </div>
        <div class="form-group disabled-fields" style="display: none;">
          <label for="text">ID (não editável)</label>
          <input id="id" type="text" v-model="form.id" disabled />
        </div>

        <div class="form-group disabled-fields">
          <label for="password">Senha (não editável)</label>
          <input id="password" type="password" value="********" disabled />
        </div> -->

        <!-- <button type="submit" class="save-btn">Salvar alterações</button> -->
        <Button type="submit" label="Salvar alterações" class="save-btn" />
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/loginStore'
import { useStore } from '@/stores/signupStore'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import SelectButton from 'primevue/selectbutton'

const router = useRouter()

const storeUser = useStore()
const store = useAuthStore()


const defaultImage = 'https://placehold.net/avatar.png'

const calend = ref({
  meses: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  anos: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
})
const previewUrl = ref(null);
const form = ref({
  id: '',
  firstName: '',
  lastName: '',
  birthDate: { day: 1, month: 1, year: new Date().getFullYear() },
  gender: 'OTHER',
  role: 'NORMAL',
  email: '',
  imageUrl: ''
})
// route.params.id
onMounted(async () => {
  const user = store.user
  if (user) {
    const [year, month, day] = user.birthDate.split('-').map(Number)
    form.value = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: { day, month, year },
      gender: user.gender,
      role: user.role,
      email: user.email,
      imageUrl: user.imageUrl || ''
    }
  }
})

function handleImage(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.imageUrl = file

    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
    }
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function handleUpdate() {
  const { day, month, year } = form.value.birthDate
  const birthDateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const payload = {
    ...form.value,
    birthDate: birthDateString
  }

  await storeUser.updateProfile(store.userId, payload)
  alert('Perfil atualizado com sucesso!')
  router.push('/home')

}
const roleOptions = ref([
  { label: 'Comum', value: 'NORMAL' },
  { label: 'Profissional', value: 'PROFESSIONAL' },
  { label: 'Empresa', value: 'COMPANY' }
]);
const genderOptions = ref([
  { label: 'Masculino', value: 'MALE' },
  { label: 'Feminino', value: 'FEMALE' },
  { label: 'Outro', value: 'OTHER' }
]);
</script>
<style>
body {
  background-color: #18191a;
}
</style>
<style scoped>
.name-fields {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  margin-top: 40px;
}

.name-fields :deep(.p-inputtext) {
  width: 100%;
}

.edit-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-color: #f0f2f5; */
  background-color: #18191a;
  padding: 20px;
}

.edit-card {
  /* background-color: #fff; */
  background-color: #242424;
  border: 2px solid #333;
  border-radius: 8px;
  /* border-radius: 14px; */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 40px 45px;
  width: 420px;
  max-width: 95%;
  font-family: 'Inter', Arial, sans-serif;
  /* color: #1c1e21; */
  color: #E4E6EB;
}

h1 {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  /* color: #1c1e21; */
  margin-bottom: 8px;
  color: #E4E6EB;
}

.subtitle {
  text-align: center;
  color: #B0B3B8;
  font-size: 14px;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 16px;
}

/* .form-group label {
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
  color: #E4E6EB;
} */

/* input, */
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccd0d5;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.2s, box-shadow 0.2s;
  /* color: #1c1e21; */
  color: #E4E6EB;
}

input:focus,
select:focus {
  border-color: #1877f2;
  box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
  outline: none;
}

.birth-selects {
  display: flex;
  /* margin: 16px; */
  margin-top: 10px;
  gap: 8px;
}

.radio-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* .radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
} */

.disabled-fields input {
  background-color: #f5f6f7;
  color: #7a7d81;
  cursor: not-allowed;
}

/* .save-btn {
  width: 100%;
  background-color: #42b72a;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 700;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.save-btn:hover {
  background-color: #36a420;
} */
.save-btn {
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

.save-btn:hover {
  background-color: #adc3e6;
}

.save-btn:focus {
  outline: 3px solid #1c1e21;
  outline-offset: 2px;
}

.save-btn:active {
  transform: scale(0.98);
}

/* Upload da imagem */
.profile-pic {
  text-align: center;
  margin-bottom: 25px;
}

.profile-pic img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  /* border: 3px solid #1877f2; */
  border: 3px solid #64B5F6;
}

.upload-label {
  display: inline-block;
  margin-top: 10px;
  /* color: #1877f2; */
  color: #64B5F6;
  cursor: pointer;
  font-size: 14px;
}

.upload-label:hover {
  text-decoration: underline;
}

.file-input input {
  display: none;
}

</style>
