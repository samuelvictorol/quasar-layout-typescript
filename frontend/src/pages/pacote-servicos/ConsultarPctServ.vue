<template>
    <q-page>
        <section class="panel-white column q-mx-lg q-pa-md q-mt-sm">
            <h1 class="text-h5">Consultar Pacotes de Serviços</h1>
            <div class="trace q-mt-md q-mb-lg"></div>
            <div class="wrapper-row row no-wrap q-mb-sm">
                <q-input outlined v-model="nomePctServ" label="Nome do Pacote de Serviço" />
                <q-select outlined v-model="tipoPessoa" :options="tipoPessoaOptions" label="Tipo de Pessoa" />
                <q-input class="datepicker" outlined v-model="dataInicial" :rules="['date']">
                    <h1 v-if="dataInicial == null" class="label-datepicker">Data Inicial</h1>
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="dataInicial">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input class="datepicker" outlined v-model="dataFinal" :rules="['date']">
                    <h1 v-if="dataFinal == null" class="label-datepicker">Data Final</h1>
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="dataFinal">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                <q-select outlined v-model="statusRegistro" :options="statusRegistroOptions" label="Status Registro" />
                <q-select outlined v-model="statusPacote" :options="statusPacoteOptions" label="Status Pacote" />
                <q-select outlined v-model="periodicidade" :options="periodicidadeOptions" label="Periodicidade" />
            </div>
            <div class="row q-gutter-sm q-mb-md">
                <q-btn class="btn-green" icon="search" @click="consultar" label="Consultar" />
                <q-btn class="btn-yellow" icon="add" @click="incluir" label="Incluir" />
                <q-btn class="btn-clear" @click="limpar" label="Limpar" />
                <q-btn class="btn-blue" icon="star" @click="limpar" label="Pacotes em Destaque"/>
            </div>
        </section>
        <section class="panel-white column q-mx-lg q-pa-md q-mt-lg">
            <div class="row panel-title justify-between items-center">
                <h1 class="text-h5">Pacotes de Serviços</h1>
                <q-select class="btn-export" outlined v-model="exportar" :options="exportarOptions">
                    <template v-slot:prepend>
                        <q-icon :name="fasDownload" />
                    </template>
                </q-select>
            </div>
        </section>
    </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { fasDownload } from '@quasar/extras/fontawesome-v5'

const exportar = ref('Exportar Arquivos')
const nomePctServ = ref('')
const tipoPessoa = ref(null)
const statusRegistro = ref(null)
const statusPacote = ref(null)
const periodicidade = ref(null)
const dataInicial = ref(null)
const dataFinal = ref(null)

const tipoPessoaOptions = ['op1', 'op2', 'op3']
const statusRegistroOptions = ['op1', 'op2', 'op3']
const statusPacoteOptions = ['op1', 'op2', 'op3']
const periodicidadeOptions = ['op1', 'op2', 'op3']
const exportarOptions = ['op1', 'op2', 'op3']

function consultar () {
    const consultarObject = {
        nomePctServ: nomePctServ.value,
        tipoPessoa: tipoPessoa.value,
        statusRegistro: statusRegistro.value,
        statusPacote: statusPacote.value,
        periodicidade: periodicidade.value,
        dataInicial: dataInicial.value,
        dataFinal: dataFinal.value
    }
    alert(JSON.stringify(consultarObject))
}

function limpar () {
    nomePctServ.value = ''
    tipoPessoa.value = null
    statusRegistro.value = null
    statusPacote.value = null
    periodicidade.value = null
    dataInicial.value = null
    dataFinal.value = null
}

function incluir () {
  alert('incluiu')
}

</script>
<style>
.datepicker{
    width: 12%;
    color: #000;
    position: relative;
}
.label-datepicker{
    width: 10rem;
    font-size: 16px;
    font-weight: 400;
    position: absolute;
    top: -19px;
    left: 0px;
    color: #6B6B6B;
}

</style>