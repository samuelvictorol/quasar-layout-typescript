<template>
    <div id="login-page">
      <div id="login-wrapper">
      <div class="logo">
        <img id="img-logo" src="src/assets/imgs/logo-login.png" alt="Banco da Amazônia">
      </div>
      <div id="header-login" class="">
        <img id="img-header" src="src/assets/imgs/header-title.png" alt="Sistema de Tarifas">
      </div>
      <div class="trace-yellow"></div>
      <q-form class="q-px-xl q-py-lg"  @submit="login()">
        <q-input v-model="username" class="q-mt-md" label="Usuário"></q-input>
        <q-input v-model="password" label="Senha" type="password"></q-input>
        <q-btn class="q-mt-lg q-mb-md" flat type="submit" label="Entrar"></q-btn>
      </q-form>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/authStore';

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

function login () {
  if( username.value == 'admin' && password.value == 'admin' ) {
    authStore.login()
    router.push({ name: 'inicio' })
  } else {
    $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Usuário ou senha inválidos',
          position: 'top'
        })
  }
}
</script>
<style scoped>
#login-page {
  background-color: #fff;
  background-image: url('src/assets/imgs/login-background.png');
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

#login-wrapper {
  position: relative;
  background-color: #fff;
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1rem rgba(0,0,0,0.5);
}

.logo{
  position: absolute;
  top: -7.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

#img-logo{
  border-radius: 20px;
  width: 75%;
}

#header-login {
  background-color: #449d44;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
}

#img-header {
  width: 50%;
  height: 30%;
}

.q-form{
  background-color: #fff;
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.q-input{
  background-color: #efefef;
  width: 100%;
}

.q-input:first-child{
  margin-bottom: 1.5rem;
}

.q-btn {
  color: #868e96;
  background-color: #ced4da;
  transition: all 0.2s ease-in-out;
}
.q-btn:hover {
  color: #fff;
  background-color: #868e96;
}

h1 {
  color: red;
  font-size: 2rem;
}
</style>