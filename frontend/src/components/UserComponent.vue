<template>
<div id="user-modal">
    <div class="row  q-pt-md items-center justify-center q-gutter-lg">
        <img src="src/assets/icons/user.svg" alt="ícone perfil" id="profile-modal-icon">
        <div class="column">
            <p>Nome Sobrenome do Usuário</p>
            <q-select v-model="nomeAgencia" :options="nomeAgenciaOptions"/>
        </div>
    </div>
    <div style="gap:45px" class="q-py-md row items-center justify-center">
            <p id="sessao-text">Sua sessão expira em: <strong>HH:MM:SS</strong></p>
            <q-btn class="btn-yellow" label="Sair" @click="logout"/>
    </div>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

const nomeAgenciaOptions = [ '000 - Nome da Agência', '002 - Agencia 002', '003 - Agencia 003' ]
const nomeAgencia = ref(nomeAgenciaOptions[0])

function logout() {
    authStore.logout()
    router.push({name: 'login'})
}

</script>
<style>
#user-modal {
    border-radius: 6px;
    position: absolute;
    top: 48px;
    right: 35px;
    width: 420px;
    background-color: #fff;
    color: #000;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}
#user-modal > .row > .column > p {
    font-size: 16px;
    font-weight: 600;
}

#profile-modal-icon {
    width: 70px;
    height: 80px;
}
#sessao-text{
    font-size: 16px;
    color:  #278428;
}

</style>