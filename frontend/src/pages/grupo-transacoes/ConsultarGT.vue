<template>
    <q-page>
        <section class="panel-white column q-mx-lg q-pa-md q-mt-sm">
            <h1 class="text-h5">Consultar Grupo de Transação</h1>
            <div class="trace q-mt-md q-mb-lg"></div>
            <div class="wrapper-row row no-wrap q-mb-sm">
                <q-select outlined v-model="categoriaGrupo" :options="categoriaGrupoOptions" label="Categoria do Grupo" />
                <q-select outlined v-model="tipoGrupo" :options="tipoGrupoOptions" label="Tipo do Grupo" />
                <q-input outlined v-model="nomeGrupo" label="Nome do Grupo" />
                <q-select outlined v-model="statusRegistro" :options="statusRegistroOptions" label="Status Registro" />
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
const tipoGrupo = ref(null)
const nomeGrupo = ref('')
const statusRegistro = ref(null)
const statusGrupo = ref(null)
const exportar = ref('Exportar Arquivos')

const categoriaGrupoOptions= [ 'op1', 'op2', 'op3']
const tipoGrupoOptions = [ 'op1', 'op2', 'op3']
const statusGrupoOptions = [ 'op1', 'op2', 'op3' ]
const statusRegistroOptions = [ 'op1', 'op2', 'op3' ]
const exportarOptions = [ 'PDF', 'XLS', 'HTML' ]

function consultar () {
    const consultarObject = {
        categoriaGrupo: categoriaGrupo.value,
        tipoGrupo: tipoGrupo.value,
        nomeGrupo: nomeGrupo.value,
        statusRegistro: statusRegistro.value,
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
    statusRegistro.value = null
    tipoGrupo.value = null 
}

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: any) => row.name,
    format: (val: any) => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a: any, b:any) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a:any, b:any) => parseInt(a, 10) - parseInt(b, 10) }
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
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
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