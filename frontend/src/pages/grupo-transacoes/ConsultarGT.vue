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
        <q-select class="btn-export text-white" outlined v-model="exportar" :options="exportarOptions">
          <template v-slot:prepend>
            <q-icon color="white" :name="fasDownload" />
          </template>
        </q-select>
      </div>
      <div class="trace q-mt-md q-mb-lg"></div>
      <q-table
        class="q-mb-md"
        flat
        bordered
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
        <template v-slot:body-cell-statusGrupo="props">
          <q-td :props="props">
            <q-toggle
              v-model="props.row.statusGrupo"
              :color="props.row.statusGrupo ? 'positive' : 'negative'"
              @click="atualizarStatusGrupo(props.row)"
            />
            <span :style="{ color: props.row.statusGrupo ? '#569f00' : '#45403e' }">
              <strong>{{ props.row.statusGrupo ? 'Ativado' : 'Desativado' }}</strong>
            </span>
          </q-td>
        </template>
        <template v-slot:body-cell-acoes="props">
          <q-td :props="props">
            <q-icon
              v-if="props.row.acoes === 'edit'"
              name="edit"
              class="cursor-pointer"
              size="sm"
              style="color:#69c495"
              @click="editarGrupo(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </section>
  </q-page>
  <ModalStatusGrupoComponent
    v-if="modalStatusGrupo"
    :row="selectedRow"
    @fechar-modal="fecharModal"
    @alterar-status="alterarStatus"
  ></ModalStatusGrupoComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fasDownload } from '@quasar/extras/fontawesome-v5'
import { useRouter } from 'vue-router'
import ModalStatusGrupoComponent from 'src/components/ModalStatusGrupoComponent.vue'

interface Row {
  id: number;
  name: string;
  nomeGrupo: string;
  statusGrupo: boolean;
  acoes: string;
}

const modalStatusGrupo = ref(false)
const selectedRow = ref<Row>();

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
    name: 'name',
    required: true,
    label: 'Categoria do Grupo',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'nomeGrupo',
    align: 'left',
    label: 'Nome do Grupo',
    field: 'nomeGrupo',
    sortable: true,
  },
  {
    name: 'statusGrupo',
    label: 'Status Grupo',
    align: 'left',
    field: 'statusGrupo',
    sortable: true,
  },
  {
    name: 'acoes',
    label: 'Ações',
    field: 'acoes',
  },
];

const rows = ref([
  {
    id: 1,
    name: 'Saque',
    nomeGrupo: 'Saques em Terminal - Conta Corrente PJ',
    statusGrupo: true,
    acoes: 'edit',
  },
  {
    id: 2,
    name: 'Saque',
    nomeGrupo: 'Saques em Terminal - Conta Corrente PF',
    statusGrupo: false,
    acoes: 'edit',
  },
  {
    id: 3,
    name: 'Saque',
    nomeGrupo: 'Saques Atendimento no Caixa - Conta Corrente - PF',
    statusGrupo: true,
    acoes: 'edit',
  },
  {
    id: 4,
    name: 'Saque',
    nomeGrupo: 'Saques em Terminal - Conta Corrente PF',
    statusGrupo: false,
    acoes: 'edit',
  },
  {
    id: 5,
    name: 'Transferência',
    nomeGrupo: 'Saques em Terminal - Conta Corrente PF',
    statusGrupo: true,
    acoes: 'edit',
  },
  {
    id: 6,
    name: 'Saque',
    nomeGrupo: 'Saques em Terminal - Conta Corrente PF',
    statusGrupo: true,
    acoes: 'edit',
  },
  {
    id: 7,
    name: 'Transferência',
    nomeGrupo: 'Saques em Terminal - Conta Corrente PF',
    statusGrupo: true,
    acoes: 'edit',
  },
  {
    id: 8,
    name: 'Saque',
    nomeGrupo: 'Saques em Terminal - Conta Corrente PF',
    statusGrupo: true,
    acoes: 'edit',
  },
  {
    id: 9,
    name: 'Saque',
    nomeGrupo: 'Saques em Terminal - Conta Corrente PF',
    statusGrupo: true,
    acoes: 'edit',
  }
])

const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 5
}

function editarGrupo(id: number) {
  alert('Alterar Grupo de id: ' + id)
}

function fecharModal() {
  modalStatusGrupo.value = false;
  selectedRow.value = {} as Row;
}

function alterarStatus(row: Row) {
    const rowIndex = rows.value.findIndex((r) => r.id === row.id);
    if (rowIndex !== -1) {
        rows.value[rowIndex].statusGrupo = !rows.value[rowIndex].statusGrupo;
    }
    modalStatusGrupo.value = false;
}

function atualizarStatusGrupo(row: Row) {
    row.statusGrupo = !row.statusGrupo;
    selectedRow.value = row;
    modalStatusGrupo.value = true;
}

</script>
<style>
#q-app > div > div.q-page-container > main > section.panel-white.column.q-mx-lg.q-pa-md.q-mt-lg > div.row.panel-title.justify-between.items-center > label > div > div > div.q-field__control-container.col.relative-position.row.no-wrap.q-anchor--skip > div > span {
  color: #fff;
}
</style>