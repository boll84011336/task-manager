import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types";
import { mockUsers } from "../api/mock";

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([...mockUsers]);
  const loading = ref(false);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);

  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    return users.value.filter(
      (u) =>
        u.name.includes(searchQuery.value) ||
        u.email.includes(searchQuery.value),
    );
  });

  const totalPages = computed(() =>
    Math.ceil(filteredUsers.value.length / pageSize.value),
  );

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return filteredUsers.value.slice(start, start + pageSize.value);
  });

  function addUser(user: Omit<User, "id">) {
    const newUser: User = {
      ...user,
      id: Date.now(),
    };
    users.value.push(newUser);
  }

  function updateUser(id: number, updates: Partial<User>) {
    const index = users.value.findIndex((u) => u.id === id);
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updates };
    }
  }

  function deleteUser(id: number) {
    users.value = users.value.filter((u) => u.id !== id);
  }

  return {
    users,
    loading,
    searchQuery,
    currentPage,
    pageSize,
    filteredUsers,
    totalPages,
    paginatedUsers,
    addUser,
    updateUser,
    deleteUser,
  };
});
