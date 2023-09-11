<template>
  <q-page class="q-pl-lg flex flex-start column">
    <h1 id="home-title" class="text-h3">Bem vindo ao Sistema de Tarifas</h1>
    <p class="text-h5 q-pt-sm">Gestão, acompanhamento e manutenção dos itens relacionados a tarifas do Banco da Amazônia</p>
    <div class="home-images">
      <div class="left">
        <div class="q-pr-md q-pt-md q-pb-md">
          <q-card class="my-card">
            <q-parallax
              src="src/assets/imgs/home-l1.png"
              :height="600"
            />
            <q-card-section >
              <div class="card-link text-h4" @click="navigate('pacoteservico')">Pacote de Serviços <img class="arrow-link" src="src/assets/icons/hm-imgArrow.svg" alt=""></div>
              <div class="card-link text-h4" @click="navigate('gptransacao')">Grupo de Transações <img class="arrow-link" src="src/assets/icons/hm-imgArrow.svg" alt=""></div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="right">
        <div class="q-pt-md">
          <q-card class="my-card">
            <q-parallax
              src="src/assets/imgs/home-r1.png"
              :height="290"
            />
            <q-card-section>
              <div class="card-link text-h4">Parâmetros <img class="arrow-link" src="src/assets/icons/hm-imgArrow.svg" alt=""></div>
            </q-card-section>
          </q-card>
        </div>
        <div>
          <q-card class="my-card">
            <q-parallax
              src="src/assets/imgs/home-r2.png"
              :height="290"
            />
            <q-card-section>
              <div class="card-link text-h4">Tarifas Avulsas <img class="arrow-link" src="src/assets/icons/hm-imgArrow.svg" alt=""></div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
B
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (path: string) => {
  router.push(path);
}

</script>

<style>
#home-title {
  font-weight: bold;
  color: #3ea51a;
}
.home-images {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.left, .right {
  width: 49%;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.my-card {
  position: relative;
}
.q-card__section.q-card__section--vert {
  position: absolute;
  width: 92%;
  bottom: 1rem;
  left: 1rem;
  background: transparent!important;
  background-color: rgba(0, 0, 255, 0)!important;
}
.card-link {
  cursor: pointer;
  color: #fff;
  padding-bottom: .2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ffffff58;
  transition: all .2s linear;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
}
.card-link:hover {
  opacity: .6;
}
.arrow-link {
  position: absolute;
  right: -.3rem
}
</style>