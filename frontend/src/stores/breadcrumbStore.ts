import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', {
  state: () => ({
    breadcrumb: {
      name: '',
      icon: '',
      childs: ['']  
    }
  }),
  actions: {
    setBreadcrumb (breadcrumbName:string) {
      const tempBreadcrumb = {
        name: '',
        icon: '',
        childs: ['']
      }
      tempBreadcrumb.childs = []
      switch (breadcrumbName) {
        case 'inicio':
          tempBreadcrumb.name = 'Início'
          tempBreadcrumb.icon = 'src/assets/icons/bd-inicio.svg'
          break
        case 'tarifas':
          tempBreadcrumb.name = 'Tarifas'
          tempBreadcrumb.icon = 'src/assets/icons/bd-tarifas.svg'
          break
        case 'parametros':
          tempBreadcrumb.name = 'Parâmetros'
          tempBreadcrumb.icon = 'src/assets/icons/bd-parametros.svg'
        default:
          break
      }
      this.breadcrumb = tempBreadcrumb
    },
    pullBreadcrumbChild (childName:string) {
      if(this.breadcrumb.childs[0] == '') {
        this.breadcrumb.childs = []
      }
      this.breadcrumb.childs.push(childName)
    }
  }
})