<template>
    <div class="panel-white column q-mx-lg q-pa-md q-mt-sm">
        <h1 class="text-h5">Consultar Parâmetros Negociais</h1>
        <div class="trace q-mt-md q-mb-lg"></div>
        <div class="wrapper-row row no-wrap q-mb-sm">
            <q-select outlined v-model="rotulo" :options="rotuloOptions" label="Rótulo" />
            <q-select outlined v-model="tipoGrupo" :options="tipoOptions" label="Tipo" />
            <q-input outlined v-model="valor" label="Valor" type="number" />
        </div>
        <div class="row q-gutter-sm q-my-md">
            <q-btn class="btn-green" icon="search" @click="consultar" label="Consultar" />
            <q-btn class="btn-clear" @click="limpar" label="Limpar" />
        </div>
    </div>
    <section class="panel-white column q-mx-lg q-pa-md q-mt-lg">
        <div class="row panel-title justify-between items-center">
         <h1 class="text-h5">Parâmetros</h1>
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
</template>
<script setup lang="ts">

</script>
<style>
</style>