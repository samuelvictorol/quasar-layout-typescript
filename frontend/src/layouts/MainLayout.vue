<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="bg-green-9 text-white">
      <q-toolbar>
        <q-toolbar-title class="q-ml-sm">
          <q-avatar class="q-mr-xs">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <q-img
            src="src/assets/imgs/header-title.png"
            id="header-title"
          />
        </q-toolbar-title>
        <div class="q-mr-sm">
          <q-btn flat dense size="lg" icon="notifications" @click="toggleNotificationsModal" />
          <q-btn flat dense size="lg" icon="person" @click="toggleUserModal" />
          <q-btn flat dense size="lg" icon="keyboard_arrow_down"  @click="toggleUserModal" />
        </div>
      </q-toolbar>
      <div class="trace-yellow"></div>
      <NotificacaoComponent v-if="notificacao" @mouseleave="toggleNotificationsModal"/>
      <UserComponent v-if="user"/>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="350"
      :breakpoint="500"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section class="q-img-wrapper" @click="navigateMenu('inicio')" avatar>
              <q-img
                src="src/assets/icons/mn-inicio.svg"
                class="q-icon-menu"
              />
            </q-item-section>
            <q-item-section class="menu-item">
              <router-link class="router-link-menu" to="/inicio">Início</router-link>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="toggleSubMenu('tarifas')">
            <q-item-section class="q-img-wrapper" avatar>
              <q-img
                src="src/assets/icons/mn-tarifas.svg"
                class="q-icon-menu"
              />
            </q-item-section>
            <q-item-section class="menu-item">
              Tarifas
            </q-item-section>
            <img v-if="!miniState" class="arrow-down" src="src/assets/icons/arrow-down.svg" alt="abrir submenus tarifas">
          </q-item>
          <div id="submenu" v-if="smTarifas">
            <q-item clickable v-ripple>
              <q-item-section>
                <div >
                  <ul>
                    <li><router-link class="router-link" to="/gptransacao">Grupos de Transação</router-link></li>
                    <li><router-link class="router-link" to="/pacoteservico">Pacotes de Serviços</router-link></li>
                    <li><router-link class="router-link" to="/#">Tarifas Avulsas</router-link></li>
                    <li><router-link class="router-link" to="/#">Adesão à Pacote de Serviços</router-link></li>
                    <li><router-link class="router-link" to="/#">Personalizar Pacote de Serviços</router-link></li>
                    <li><router-link class="router-link" to="/#">Regra de Desconto da Personalização</router-link></li>
                  </ul>
                </div>
              </q-item-section>
            </q-item>
          </div>
          <q-item clickable v-ripple @click="toggleSubMenu('flexibilizacaoExtorno')">
            <q-item-section class="q-img-wrapper" avatar>
              <q-img
                src="src/assets/icons/mn-flex.svg"
                class="q-icon-menu"
              />
            </q-item-section>
            <q-item-section class="menu-item">
              Flexibilização e Extorno
            </q-item-section>
            <img v-if="!miniState" class="arrow-down" src="src/assets/icons/arrow-down.svg" alt="abrir submenus Flexibilização e Estorno">
          </q-item>
          <div v-if="smFlexibilizacaoExtorno">
            <q-item clickable v-ripple>
              <q-item-section>
                Submenu content for Flexibilização e Extorno
              </q-item-section>
            </q-item>
          </div>
          <q-item clickable v-ripple>
            <q-item-section class="q-img-wrapper" avatar>
              <q-img
                src="src/assets/icons/mn-inicio.svg"
                class="q-icon-menu"
              />
            </q-item-section>
            <q-item-section class="menu-item">
              Relatórios
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="toggleSubMenu('parametros')">
            <q-item-section class="q-img-wrapper" avatar>
              <q-img
                src="src/assets/icons/mn-parametros.svg"
                class="q-icon-menu"
              />
            </q-item-section>
            <q-item-section class="menu-item">
              Parâmetros
            </q-item-section>
            <img v-if="!miniState" class="arrow-down" src="src/assets/icons/arrow-down.svg" alt="abrir submenus Parâmetros">
          </q-item>
          <div id="submenu" v-if="smParametros">
            <q-item clickable v-ripple>
              <q-item-section>
                <div >
                  <ul>
                    <li><router-link class="router-link" to="/parametros-tecnicos">Parâmetros Técnicos</router-link></li>
                    <li><router-link class="router-link" to="/parametros-negociais">Parâmetros Negociais</router-link></li>
                  </ul>
                </div>
              </q-item-section>
            </q-item>
          </div>
          <q-item clickable v-ripple @click="toggleSubMenu('autorizacoes')">
            <q-item-section class="q-img-wrapper" avatar>
              <q-img
                src="src/assets/icons/mn-autorizacoes.svg"
                class="q-icon-menu"
              />
            </q-item-section>
            <q-item-section class="menu-item">
              Autorizações
            </q-item-section>
          </q-item>
          <div v-if="smAutorizacoes">
            <q-item clickable v-ripple>
              <q-item-section>
                Submenu content for Autorizações
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container @mouseenter="closeSubmenus()">
      <BreadcrumbComponent></BreadcrumbComponent>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import BreadcrumbComponent from 'src/components/BreadcrumbComponent.vue';
import NotificacaoComponent from 'src/components/NotificacaoComponent.vue';
import UserComponent from 'src/components/UserComponent.vue';

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)
const miniState = ref(false)

// header actions
const notificacao = ref(false)
const user = ref(false) 

// sm = sub menu
const smTarifas = ref(false)
const smFlexibilizacaoExtorno = ref(false)
const smParametros = ref(false)
const smAutorizacoes = ref(false)

function closeSubmenus () {
    smTarifas.value = false
    smFlexibilizacaoExtorno.value = false
    smParametros.value = false
    smAutorizacoes.value = false
}

function toggleSubMenu ( menu: string ) {
  switch ( menu ) {
    case 'tarifas':
      smTarifas.value =!smTarifas.value
      break
    case 'flexibilizacaoExtorno':
      smFlexibilizacaoExtorno.value =!smFlexibilizacaoExtorno.value
      break
    case 'parametros':
      smParametros.value =!smParametros.value
      break
    case 'autorizacoes':
      smAutorizacoes.value =!smAutorizacoes.value
      break
    default:
      return
  }
}
function navigateMenu ( menuItem: string ) {
  router.push(menuItem)
}
function toggleNotificationsModal () {
  notificacao.value = !notificacao.value
}
function toggleUserModal () {
  user.value = !user.value
}
function showDropdownMenu (){
  console.log('showDropdownMenu')
}
</script>

<style>
/*#header-logo {
  width: 30px;
  height: 30px;
  margin-left: 1rem;
}*/

.q-drawer {
  position:fixed!important;
}

#header-title{
  margin-left: 1rem;
  width: 200px;
}

.q-icon-menu {
  width: 50px!important;
  height: 30px!important;
}
.q-list {
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
}
.q-item {
  position: relative;
  transition: all 0.1s linear;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.q-item__section.column.q-item__section--side.justify-center.q-item__section--avatar.q-img-wrapper > div > div.q-img__container.absolute-full > img {
  object-fit: contain!important;
}

.menu-item {
  font-weight: bold;
}

.q-item:hover .menu-item {
  color: #278428;
}

.router-link-menu{
  color: rgb(32, 32, 32);
  text-decoration: none !important;
}

#submenu{
   background-color:  #dce2e2;
}

ul{
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .2rem;
}

.sm-item, .router-link {
  width: 100%;
  font-weight: normal!important;
  font-size: 1rem;
  color: #181818;
  text-decoration: none;
  list-style: none;
  padding-bottom: 0.2rem;
  transition: all 0.1s linear;
  border-bottom: 1px solid #ffffff00;
}

.sm-item:hover, .router-link:hover, .router-link-menu:hover{
  color: #016747!important;
  border-color:#016747!important;
}

.arrow-down {
  position: absolute;
  right: 1rem;
  top: 1.3rem;
  width: 20px;
  height: 20px;
  transition: all 0.1s linear;
}

</style>