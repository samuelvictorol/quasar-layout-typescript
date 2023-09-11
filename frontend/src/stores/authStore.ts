import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

const $q = useQuasar()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login() {
        this.isAuthenticated = true;
    },
    logout() {
        this.isAuthenticated = false;
        setInterval( () => {
          $q.notify({
            color: 'yellow-5',
            textColor: 'white',
            message: 'Realizando Logout',
            position: 'top'
          })
      }, 2000)
  },
}
});
