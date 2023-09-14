<template>
    <div class="modal">
        <div class="modal-header modal-copia-cola">
            <h1 class="text-h6 q-pa-md text-white">Incluir Transações Via Copia/Cola</h1>
            <div class="trace-yellow"></div>
        </div>
        <div class="modal-body column modal-copia-cola">
            <p class="q-pa-md bold">Para incluir as Transações cole os Códigos no campo abaixo, separando por vírgula:</p>
            <p class="low-opacity q-pl-md">Códigos da Transação *</p>
            <div class="q-px-md q-pt-sm q-pb-md">
                <q-input
                v-model="codigos"
                rounded
                placeholder="00020936, 00020937, 00020938, 00020939, 00020940, 00020941"
                autogrow
                />
            </div>
            <div class="row q-gutter-sm q-pl-md q-mb-md">
                <q-btn class="btn-clear" @click="fecharModal()" label="Cancelar" />
                <q-btn class="btn-green" @click="fecharModal()" label="Incluir" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const codigos = ref('')
const emits = defineEmits(['fechar-modal'])

function fecharModal () {
    emits('fechar-modal')
}

</script>
<style>
.modal-copia-cola {
    width: 800px;
}
.q-textarea {
    padding-left: 6px;
    border: 1px solid black;
    border-radius: 5px;
}
</style>