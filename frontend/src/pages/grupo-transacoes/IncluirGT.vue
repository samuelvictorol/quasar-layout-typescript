<template>
<q-page>
<!-- MENU -->
    <section class="menu q-ml-lg">
        <div class="row">
            <div class="incluirgp-menu-item-selected">
                DADOS DO GRUPO
            </div>
            <div class="incluirgp-menu-item">
                TRANSAÇÕES
            </div>
        </div>
    </section>
<!-- TELA DADODS DO GRUPO -->
    <section v-if="menu.dadosgrupo" class="panel-white column q-mx-lg q-pa-md">
        <h1 class="text-h6">Dados Gerais do Grupo de Transação</h1>
        <div class="row q-gutter-sm q-mt-sm q-mb-md">
            <q-select v-model="categoriaGrupo" :options="categoriaGrupoOptions" label="Categoria do Grupo" />
            <q-input v-model="nomeGrupo" label="Nome do Grupo" placeholder="Digite aqui" />
            <div class="toggle-wrapper">
                <label class="toggle-label">Status do Grupo</label>
                <div class="row items-center">
                    <q-toggle
                    color="green"
                    class="q-pt-sm"
                    v-model="statusGrupo"
                    size="md"
                    />
                    <span class="q-pt-xs" :style="{ color: statusGrupo ? '#569f00' : '#45403e' }">
                        <strong>{{ statusGrupo ? 'Ativado' : 'Desativado' }}</strong>
                    </span>
                </div>
            </div>
        </div>
        <div class="column">
            <label class="q-ml-sm q-mt-md">Tipo de Pessoa</label>
            <div class="checkboxes-wrapper row items-center">
                <q-checkbox style="width: 10rem" v-model="tipoPessoa.pj" @click="checkboxTipoPessoa('pj')" label="Pessoa Jurídica" color="teal" />
                <q-checkbox v-model="tipoPessoa.pf" @click="checkboxTipoPessoa('pf')" label="Pessoa Física" color="teal" />
            </div>
            <label class="q-ml-sm q-mt-md">Tipo de Conta</label>
            <div class="checkboxes-wrapper row items-center">
                <q-checkbox style="width: 10rem" v-model="tipoConta.cc" @click="checkboxTipoConta('cc')" label="Conta Corrente" color="teal" />
                <q-checkbox v-model="tipoConta.cj" @click="checkboxTipoConta('cj')" label="Conta Poupança" color="teal" />
            </div>
        </div>
    </section>
<!-- TELA TRANSAÇÕES -->
<section v-if="menu.transacoes" class="panel-white column q-mx-lg q-pa-md">
    <q-input class="q-mt-md" filled v-model="nomeGrupo" label="Nome do Grupo de Transação" readonly />
    <h1 class="text-h6 q-py-md">Incluir transações ao Grupo</h1>
    <div class="row q-gutter-sm">
        <q-btn class="btn-yellow" icon="add" label="Incluir Via Seleção" />
        <q-btn class="btn-yellow" icon="add" label="Incluir Via Texto/CSV" />
    </div>
    <q-table
        class="q-mb-md q-mt-lg"
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
        class="text-green">
            {{ col.label }}
        </q-th>
        </q-tr>
    </template>
    </q-table>
</section>
<!-- BOTÕES VOLTAR/AVANÇAR -->
    <section class="panel-white q-mx-lg">
        <div class="row q-gutter-sm q-pt-xs q-pl-md q-pb-md">
            <q-btn class="btn-clear" label="Voltar" />
            <q-btn class="btn-green" @click="incluir" label="Avançar" />
        </div>
    </section>
</q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar';

const $q = useQuasar()

const menu = ref({
    dadosgrupo: true,
    transacoes: false,
})

const categoriaGrupo = ref(null)
const nomeGrupo = ref('')
const statusGrupo = ref(true)
const tipoPessoa = ref({
    pf: false,
    pj: false,
})
const tipoConta = ref({
    cj: false,
    cc: false
})

function checkboxTipoPessoa (tipo: string) {
    if (tipo == 'pf'){
        tipoPessoa.value.pf = true
        tipoPessoa.value.pj = false
    } else {
        tipoPessoa.value.pf = false
        tipoPessoa.value.pj = true
    }
}

function checkboxTipoConta (tipo: string) {
    if (tipo == 'cc'){
        tipoConta.value.cc = true
        tipoConta.value.cj = false
    } else {
        tipoConta.value.cc = false
        tipoConta.value.cj = true
    }
}

const categoriaGrupoOptions = ['op1', 'op2', 'op3']
const notify = (text: string) => {
    $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: text,
          position: 'top'
        })
}

// tabela
const incluir = () => {
    if(tipoPessoa.value.pf == false && tipoPessoa.value.pj == false ) {
        notify('Você deve selecionar ao menos um tipo de pessoa!')
        return 
    } else if(tipoConta.value.cj == false && tipoConta.value.cc == false) {
        notify('Você deve selecionar ao menos um tipo de conta!')
        return 
    }
    // Obejto a ser passado na requisição
    let dadosGrupoObject = {
        categoriaGrupo: categoriaGrupo.value,
        nomeGrupo: nomeGrupo.value,
        statusGrupo: statusGrupo.value,
        tipoPessoa: tipoPessoa.value.pf == true ? 'Pessoa Física': 'Pessoa Jurídica',
        tipoConta: tipoConta.value.cc == true ? 'Conta Corrente' : 'Conta Poupança'
    }
    if(validaObject(dadosGrupoObject, 1) && menu.value.dadosgrupo ) {
        menu.value.dadosgrupo = false
        menu.value.transacoes = true
        return
    }
    alert('INCLUIU')
}

const validaObject = (incluirObject: any, tela: number) => {
    if(
        incluirObject.categoriaGrupo == null || incluirObject.nomeGrupo == '' ||
        incluirObject.tipoPessoa == null || incluirObject.tipoConta == null 
    ){
        notify('Preencha todos os Campos')
        return false
    }
    return true
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
.incluirgp-menu-item-selected{
    padding: 1.4rem 0rem;
    background-color: #fff;
    border-left: 4px solid #278428;
    color: #278428;
}
.incluirgp-menu-item{
    background-color: #ced4da;
    border-left: 4px solid #ffffff;
    color: #495057;
}

.incluirgp-menu-item-selected, .incluirgp-menu-item {
    padding: 1.2rem 0rem;
    width: 14rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

</style>