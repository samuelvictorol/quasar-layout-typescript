import { useAuthStore } from 'src/stores/authStore';
import { RouteRecordRaw } from 'vue-router';
import { useBreadcrumbStore } from 'src/stores/breadcrumbStore';


const isAuthenticatedGuard = () => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    return true
  } else {
    return false
  }
}
const setBreadcrumb = (pathName: string, childName: string) => {
  if(!isAuthenticatedGuard) {
    return false
  }
  useBreadcrumbStore().setBreadcrumb(pathName)
  if(childName != ''){
    useBreadcrumbStore().pullBreadcrumbChild(childName)
  }
  return true
}

const pullChild = (childName: string) => {
  useBreadcrumbStore().pullBreadcrumbChild(childName)
}

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'login',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/',
    name: 'mainlayout',
    beforeEnter: isAuthenticatedGuard,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'inicio', beforeEnter: () => { setBreadcrumb('inicio', '') } , path: '/inicio', component: () => import('pages/IndexPage.vue') },
      { name: 'gptransacao', beforeEnter: () => { setBreadcrumb('tarifas', 'Grupos de Transação') }, path: '/gptransacao', component: () => import('pages/grupo-transacoes/ConsultarGT.vue') },
      { name: 'incluir-gptransacao', beforeEnter: () => { pullChild('Incluir') }, path: '/incluir-gptransacao', component: () => import('pages/grupo-transacoes/IncluirGT.vue') },
      { name: 'pacoteservico', beforeEnter: () => { setBreadcrumb('tarifas', 'Pacotes de Serviços') } , path: '/pacoteservico', component: () => import('pages/pacote-servicos/ConsultarPctServ.vue') },
      { name: 'parametros-tecnicos', beforeEnter: () => { setBreadcrumb('parametros', 'Parâmetros Técnicos') } , path: '/parametros-tecnicos', component: () => import('pages/parametros/ConsultarParametrosTecnicos.vue') },
      { name: 'parametros-negociais', beforeEnter: () => { setBreadcrumb('parametros', 'Parâmetros Negociais') } , path: '/parametros-negociais', component: () => import('pages/parametros/ConsultarParametrosNegociais.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
