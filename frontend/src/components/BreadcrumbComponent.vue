<template>
    <div class="breadcrumb q-pl-lg q-pt-lg q-pb-md" v-if="breadcrumb.name != ''">
      <q-img :src="breadcrumb.icon" class="breadcrumb-icon" />
      <a>{{ breadcrumb.name }}</a>
      <a v-for="child in breadcrumb.childs" :key="child">>‎ ‎ {{ child }}</a>
    </div>
</template>
  
<script lang="ts">
import { useBreadcrumbStore } from 'src/stores/breadcrumbStore.js'
import { watch, ref } from 'vue'

export default {
  name: 'BreadcrumbComponent',
  setup () {
    const breadcrumbStore = useBreadcrumbStore()
    const breadcrumb = ref(breadcrumbStore.breadcrumb)

    watch(() => breadcrumbStore.breadcrumb, (newBreadcrumb) => {
      breadcrumb.value = newBreadcrumb
    })

    return {
      breadcrumb
    }
  }
}
</script>
  
<style>
.breadcrumb {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap:8px;
}
.breadcrumb-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
}
a {
    color: #278428;
    text-decoration: none;
    font-size: 16px;
}
a:last-child {
    font-weight: bolder;
}
</style>