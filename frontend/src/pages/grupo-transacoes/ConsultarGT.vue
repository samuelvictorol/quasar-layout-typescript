<template>
    <q-page>
        <section class="panel-white column q-mx-lg q-pa-md q-mt-sm">
            <h1 class="text-h5">Consultar Grupo de Transação</h1>
            <div class="trace q-mt-md q-mb-lg"></div>
            <div class="wrapper-row row no-wrap q-mb-sm">
                <q-select outlined v-model="categoriaGrupo" :options="categoriaGrupoOptions" label="Categoria do Grupo" />
                <q-input outlined v-model="nomeGrupo" label="Nome do Grupo" />
                <q-select outlined v-model="statusGrupo" :options="statusGrupoOptions" label="Status do Grupo" />
            </div>
            <div class="row q-gutter-sm q-my-md">
                <q-btn class="btn-green" icon="search" @click="consultar" label="Consultar" />
                <q-btn class="btn-yellow" icon="add" @click="incluir" label="Incluir" />
                <q-btn class="btn-clear" @click="limpar" label="Limpar" />
            </div>
        </section>
        <section class="panel-white column q-mx-lg q-pa-md q-mt-lg">
           <div class="row panel-title justify-between items-center">
            <h1 class="text-h5">Grupos de Transação</h1>
                <q-select class="btn-export" outlined v-model="exportar" :options="exportarOptions">
                    <template v-slot:prepend>
                    <q-icon :name="fasDownload" />
                    </template>
                </q-select>
           </div>
           <div class="trace q-mt-md q-mb-lg"></div>
            <q-table
              class="q-mb-md"
              flat bordered
              :rows="rows"
              :columns="columns"
              row-key="name"
              :pagination="initialPagination"
            >
            <template v-slot:header="props">
              <q-tr class="bg-header-table" :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="text-green"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
          </q-table>
        </section>
    </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { fasDownload } from '@quasar/extras/fontawesome-v5'
import { useRouter } from 'vue-router'

const router = useRouter()

const categoriaGrupo = ref(null)
const nomeGrupo = ref('')
const statusGrupo = ref(null)
const exportar = ref('Exportar Arquivos')

const categoriaGrupoOptions= [ 'op1', 'op2', 'op3']
const statusGrupoOptions = [ 'op1', 'op2', 'op3' ]
const exportarOptions = [ 'PDF', 'XLS', 'HTML' ]

function consultar () {
    const consultarObject = {
        categoriaGrupo: categoriaGrupo.value,
        nomeGrupo: nomeGrupo.value,
        statusGrupo: statusGrupo.value
    }
    alert(JSON.stringify(consultarObject))
}

function incluir () {
    router.push('incluir-gptransacao')
}

function limpar () {
    nomeGrupo.value = ''
    categoriaGrupo.value = null
    statusGrupo.value = null
}

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Categoria do Grupo',
    align: 'left',
    field: (row: any) => row.name,
    format: (val: any) => `${val}`,
    sortable: true
  },
  { name: 'nomeGrupo', align: 'left', label: 'Nome do Grupo', field: 'calories', sortable: true },
  { name: 'statusGrupo', label: 'Status Grupo', align:'right', field: 'calcium', sortable: true, sort: (a: any, b:any) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'acoes', label: 'Ações', field: 'iron', sortable: true, sort: (a:any, b:any) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  }
]
const initialPagination = {
        sortBy: 'desc',
        descending: false,
        page: 2,
        rowsPerPage: 3
}
</script>
<style>

</style>