<template>
<div id="notificacao-modal" class="q-py-sm">
<div id="modal-notificacao-title" class="q-px-sm q-py-md row no-wrap">
    <q-btn flat dense size="md" icon="notifications" />
    <h1 class="text-h6 bold">Notificações</h1>
</div>
<div class="trace"></div>
<!-- OPERADOR -->
<q-scroll-area style="height: 280px; max-width: 320px;">
<div id="op-notificacoes-wrapper " class="q-pt-sm column" v-for="notificacao in notificacoes" v-bind:key="notificacao.id">
    <div class="q-px-md op-notificacao columm">
        <div class="op-notificacoes">
            <div class="bold">
                {{ notificacao.title }}
            </div>
            <div class="op-notificacoes-item-header-data">
                <strong class="q-pr-sm">Conta:</strong>{{ notificacao.conta }}
            </div>
            <q-btn class="btn-green q-mt-sm q-mb-md" label="Ver Detalhes" />
        </div>
    </div>
    <div class="trace"></div>
</div>
</q-scroll-area>
</div>
</template>
<script setup lang="ts">
const notificacoes = [
    { id:1, title: 'Alteração de Grupo de Transação Aprovado', conta:'999.99939-3' },
    { id:1, title: 'Solicitação de Flexibilização Aprovada', conta:'909.499993' },
    { id:1, title: 'Alteração de Grupo de Transação Aprovado', conta:'999.999959-1' },
    { id:1, title: 'Solicitação de Flexibilização Aprovada', conta:'999.999943' },
    { id:1, title: 'Alteração de Grupo de Transação Aprovado', conta:'999.993199-9' },
]
</script>
<style>
#notificacao-modal {
    border-radius: 6px;
    position: absolute;
    top: 48px;
    right: 120px;
    width: 320px;
    background-color: #fff;
    color: #000;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}
#modal-notificacao-title{
    color: #ec9720!important;
    gap: .5rem;
    align-items: center;
}
</style>