import { defineStore } from 'pinia';

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
  },
});
