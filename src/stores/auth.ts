import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));

  const isLoggedIn = computed(() => !!token.value);

  function login(userData: User, userToken: string) {
    user.value = userData;
    token.value = userToken;
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  function initAuth() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }
  }

  return { user, token, isLoggedIn, login, logout, initAuth };
});
