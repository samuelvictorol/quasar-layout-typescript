import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

const $q = useQuasar()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: true,
  }),
  actions: {
    login() {
        this.isAuthenticated = true;
    },
    logout() {
        this.isAuthenticated = false;
      },
}
});
