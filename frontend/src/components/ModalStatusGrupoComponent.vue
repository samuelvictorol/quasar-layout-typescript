<template>
    <div class="modal">
        <div class="modal-header">
            <h1 class="text-h6 q-pa-md text-white">Desativar Grupo de Transação</h1>
            <div class="trace-yellow"></div>
    </div>
    <div class="modal-body">
        <p class="q-pa-md">Deseja desativar o "{{ props.row.nomeGrupo }}"?</p>
        <div class="row justify-center q-gutter-md q-mb-md">
            <q-btn class="btn-negative" label="Não" @click="fecharModal" />
            <q-btn class="btn-green" label="Sim" @click="alterarStatus" />
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    row: Object,
});

const emit = defineEmits(['fechar-modal', 'alterar-status']);

function fecharModal() {
    emit('fechar-modal');
}

function alterarStatus() {
    emit('alterar-status', props.row);
}
</script>
<style>
.modal-header, .modal-body {
    width: 450px;
}
</style>
