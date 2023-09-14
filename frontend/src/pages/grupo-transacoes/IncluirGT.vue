<template>
<q-page>
<!-- MENU -->
    <section class="menu q-ml-lg">
        <div class="row">
            <div :class="menu.dadosgrupo ? 'incluirgp-menu-item-selected' : 'incluirgp-menu-item' ">
                DADOS DO GRUPO
            </div>
            <div :class="menu.transacoes ? 'incluirgp-menu-item-selected' : 'incluirgp-menu-item' ">
                TRANSAÇÕES
            </div>
        </div>
    </section>
<!-- TELA DADODS DO GRUPO -->
    <section v-if="menu.dadosgrupo" class="panel-white column q-mx-lg q-pa-md">
        <h1 class="text-h6">Dados Gerais do Grupo de Transação</h1>
        <div class="row q-gutter-sm q-mb-sm">
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
            <label class="q-mt-md low-opacity">Tipo de Pessoa *</label>
            <div class="checkboxes-wrapper row items-center">
                <q-checkbox style="width: 10rem" v-model="tipoPessoa.pj" @click="checkboxTipoPessoa('pj')" label="Pessoa Jurídica" color="teal" />
                <q-checkbox v-model="tipoPessoa.pf" @click="checkboxTipoPessoa('pf')" label="Pessoa Física" color="teal" />
            </div>
            <label class="q-mt-md low-opacity">Tipo de Conta *</label>
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
        <q-btn class="btn-yellow" @click="openModal('viaSelecao')" icon="add" label="Incluir Via Seleção" />
        <q-btn class="btn-yellow" @click="openModal('copiaCola')" icon="add" label="Incluir Via Copia/Cola" />
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
            <q-btn class="btn-clear" @click="voltar" label="Voltar" />
            <q-btn class="btn-green" @click="avancar" :label="menu.dadosgrupo ? 'Avançar' : 'Incluir Grupo'" />
        </div>
    </section>
    <ModalViaSelecaoComponent v-if="viaSelecao" @fechar-modal="fecharModal('viaSelecao')"></ModalViaSelecaoComponent>
    <ModalCopiaColaComponent v-if="copiaCola" @fechar-modal="fecharModal('copiaCola')"></ModalCopiaColaComponent>
</q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import ModalViaSelecaoComponent from 'src/components/ModalViaSelecaoComponent.vue';
import ModalCopiaColaComponent from 'src/components/ModalCopiaColaComponent.vue';
import { useRouter } from 'vue-router';

const $q = useQuasar()
const router = useRouter()

const menu = ref({
    dadosgrupo: true,
    transacoes: false,
})

// modais
const viaSelecao = ref(false)
const copiaCola = ref(false)

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

function openModal (modal: string) {
    switch (modal) {
        case 'viaSelecao':
            viaSelecao.value = true
            break
            case 'copiaCola':
                copiaCola.value = true
            break
    }
}

function fecharModal (modal: string) {
    switch (modal) {
        case 'viaSelecao':
            viaSelecao.value = false
            break
        case 'copiaCola':
            copiaCola.value = false
            break
    }
}

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

const voltar = () => {
    switch (menu.value.dadosgrupo) {
        case true:
                router.push('gptransacao')
            break
        case false:
            menu.value.dadosgrupo = true
            menu.value.transacoes = false
            break
    }
} 

const avancar = () => {
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
        tipoConta: tipoConta.value.cc == true ? 'Conta Corrente' : 'Conta Poupança',
        transacoes: 'A definir'
    }
    if(validaObject(dadosGrupoObject, 1) && menu.value.dadosgrupo ) {
        menu.value.dadosgrupo = false
        menu.value.transacoes = true
        return
    } else if (menu.value.transacoes && validaObject(dadosGrupoObject, 1)) {
        // adicionar verificacao da tela 2
        console.log(JSON.stringify(dadosGrupoObject))
        alert('Incluiu\nObjeto no Console')
    }

}

const validaObject = (incluirObject: any, _tela: number) => {
    if(
        incluirObject.categoriaGrupo == null || incluirObject.nomeGrupo == '' ||
        incluirObject.tipoPessoa == null || incluirObject.tipoConta == null 
    ){
        notify('Preencha todos os Campos')
        return false
    }
    // validar tela 2
    // else if( condicao verificar tela 2) {
        // return true
    // }
    return true
}

const columns = [
  { required: true, name: 'nomeTransacao', align: 'left', label: 'Nome da Transação', field: 'nomeTransacao', sortable: true },
  { name: 'codTransacao', label: 'Código da Transação', field: 'codTransacao', sortable: true },
  { name: 'acoes', label: 'Ações', field: 'acoes' },
]

const rows = [{}]

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