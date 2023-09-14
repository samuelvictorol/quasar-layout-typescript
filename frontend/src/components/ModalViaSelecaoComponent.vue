<template>
<div class="modal">
    <div class="modal-header modal-selecao">
        <h1 class="text-h6 q-pa-md text-white">Incluir Transações</h1>
        <div class="trace-yellow"></div>
    </div>
    <div class="modal-body column modal-selecao">
        <p class="q-pl-md q-pt-sm">Filtrar por</p>
        <div class="filtros-wrapper row no-wrap q-gutter-md q-px-md items-end">
            <q-input class="filtro-selecao" placeholder="Buscar Transação..." v-model="transacao" label="Transação" />
            <q-input class="filtro-selecao" placeholder="Buscar Código..." v-model="codTransacao" label="Código da Transação" />
            <q-btn class="btn-yellow"   label="Filtrar" />
        </div>
        <p class="q-pl-md q-py-md low-opacity">Selecionar as Transações*</p>
        <div class="q-px-md table-wrapper q-mb-md">
            <q-table
              class="q-pt-sm"
              flat bordered
              dense
              :rows="rows"
              :columns="columns"
              row-key="name"
              :selected-rows-label="getSelectedString"
              selection="multiple"
              separator="none"
              :rows-per-page-options="[5]"
              v-model:selected="selected"
            />
        </div>
        <div class="row q-gutter-sm q-pl-md q-mb-md">
            <q-btn class="btn-clear" @click="fecharModal()" label="Voltar" />
            <q-btn class="btn-green" @click="fecharModal()" label="Incluir" />
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const transacao = ref('')
const codTransacao = ref('')
const selected = ref([])

const emit = defineEmits(['fechar-modal'])

function fecharModal () {
  emit('fechar-modal')
}

function getSelectedString () {
    return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
}

const columns = [
  { name: 'transacoesDisponiveis', align: 'left', label: 'Transações Disponíveis', field: 'transacoesDisponiveis', sortable: true },
  { name: 'codTransacao', align: 'right', label: 'Código da Transação', field: 'codTransacao', sortable: true },
]

const rows = [
  {
    name: 'transacoesDisponiveis',
    transacoesDisponiveis: 'Saques em Terminal - Conta Corrente PF',
    codTransacao: '00020936',
  },
  {
    name: 'transacoesDisponiveis',
    transacoesDisponiveis: 'Saques em Terminal - Conta Corrente PJ',
    codTransacao: '00028436',
  },
  {
    name: 'transacoesDisponiveis',
    transacoesDisponiveis: 'Transferência DOC',
    codTransacao: '00031933',
  },
  {
    name: 'transacoesDisponiveis',
    transacoesDisponiveis: 'Transferência DOC',
    codTransacao: '00031933',
  },
  {
    name: 'transacoesDisponiveis',
    transacoesDisponiveis: 'Transferência TED',
    codTransacao: '00021341',
  },
  {
    name: 'transacoesDisponiveis',
    transacoesDisponiveis: 'Transferência PIX',
    codTransacao: '00034133',
  },
]
</script>
<style>
.modal-selecao {
    width: 750px;
}

.filtro-selecao {
    width: 40%;
}

</style>