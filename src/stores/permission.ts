import { defineStore } from "pinia";
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";

type PermissionKey = "canCreate" | "canEdit" | "canDelete" | "canManageUsers";

interface UserPermission {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
}

export const usePermissionStore = defineStore("permission", () => {
  const permissions = reactive<Record<number, UserPermission>>({});

  function initPermissions() {
    const userStore = useUserStore();
    userStore.users.forEach((user) => {
      if (!permissions[user.id]) {
        permissions[user.id] = {
          canCreate: true,
          canEdit: true,
          canDelete: user.role === "admin",
          canManageUsers: user.role === "admin",
        };
      }
    });
  }

  function getPermission(userId: number, key: PermissionKey): boolean {
    return permissions[userId]?.[key] ?? false;
  }

  function togglePermission(userId: number, key: PermissionKey) {
    if (permissions[userId]) {
      permissions[userId][key] = !permissions[userId][key];
    }
  }

  return { permissions, initPermissions, getPermission, togglePermission };
});
