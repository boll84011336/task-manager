<template>
    <div class="p-6">
        <div class="mb-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">使用者管理</h2>
            <div class="flex items-center justify-between">
                <input v-model="userStore.searchQuery" type="text" placeholder="搜尋姓名或 Email..."
                    class="w-80 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
                <button @click="openCreate"
                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                    + 新增使用者
                </button>
            </div>
        </div>

        <!-- Loading -->
        <BaseLoading v-if="loading" />

        <!-- Table -->
        <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <table class="w-full text-sm">
                <thead class="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-left">
                    <tr>
                        <th class="px-6 py-3 font-medium">#</th>
                        <th class="px-6 py-3 font-medium">姓名</th>
                        <th class="px-6 py-3 font-medium">Email</th>
                        <th class="px-6 py-3 font-medium">角色</th>
                        <th class="px-6 py-3 font-medium">操作</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="(user, index) in userStore.paginatedUsers" :key="user.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td class="px-6 py-4 text-gray-400 dark:text-gray-500">{{ (userStore.currentPage - 1) *
                            userStore.pageSize + index
                            + 1 }}</td>
                        <td class="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">{{ user.name }}</td>
                        <td class="px-6 py-4 text-gray-500 dark:text-gray-400">{{ user.email }}</td>
                        <td class="px-6 py-4">
                            <span
                                :class="user.role === 'admin' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'"
                                class="px-2 py-1 rounded-full text-xs font-medium">
                                {{ user.role }}
                            </span>
                        </td>
                        <td class="px-6 py-4 flex gap-3">
                            <button @click="openEdit(user)"
                                class="text-indigo-600 dark:text-indigo-400 hover:underline">編輯</button>
                            <button @click="handleDelete(user.id)"
                                class="text-red-500 dark:text-red-400 hover:underline">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 空狀態 -->
            <div v-if="userStore.paginatedUsers.length === 0" class="text-center py-16 text-gray-400">
                <p class="text-4xl mb-3">👤</p>
                <p class="text-sm">沒有使用者</p>
            </div>
        </div>

        <!-- 分頁 -->
        <div v-if="!loading" class="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span>共 {{ userStore.filteredUsers.length }} 筆</span>
            <div class="flex gap-2">
                <button @click="userStore.currentPage--" :disabled="userStore.currentPage === 1"
                    class="px-4 py-1.5 rounded-lg border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold">
                    上一頁
                </button>
                <span class="px-3 py-1 text-sm text-gray-700 dark:text-gray-200">{{ userStore.currentPage }} / {{
                    userStore.totalPages }}</span>
                <button @click="userStore.currentPage++" :disabled="userStore.currentPage === userStore.totalPages"
                    class="px-4 py-1.5 rounded-lg border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold">
                    下一頁
                </button>
            </div>
        </div>

        <!-- Modal -->
        <UserModal v-if="showModal" :user="editingUser" @close="closeModal" @submit="handleSubmit" />

        <ConfirmModal v-if="showConfirm" title="刪除使用者" message="確定要刪除這個使用者嗎？此操作無法復原。" @confirm="confirmDelete"
            @cancel="cancelDelete" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import type { User } from '../../types'
import UserModal from './components/UserModal.vue'
import BaseLoading from '../../components/base/BaseLoading.vue'
import ConfirmModal from '../../components/base/ConfirmModal.vue'


const userStore = useUserStore()

const showModal = ref(false)
const editingUser = ref<User | undefined>(undefined)
const loading = ref(false)
const showConfirm = ref(false)
const deletingId = ref<number | null>(null)

async function initUsers() {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 600))
    loading.value = false
}

onMounted(() => {
    initUsers()
})


function openCreate() {
    editingUser.value = undefined
    showModal.value = true
}

function openEdit(user: User) {
    editingUser.value = user
    showModal.value = true
}

function closeModal() {
    showModal.value = false
    editingUser.value = undefined
}

function handleSubmit(form: Omit<User, 'id'>) {
    if (editingUser.value) {
        userStore.updateUser(editingUser.value.id, form)
    } else {
        userStore.addUser(form)
    }
    closeModal()
}

function handleDelete(id: number) {
    deletingId.value = id
    showConfirm.value = true
}

function confirmDelete() {
    if (deletingId.value !== null) {
        userStore.deleteUser(deletingId.value)
    }
    showConfirm.value = false
    deletingId.value = null
}

function cancelDelete() {
    showConfirm.value = false
    deletingId.value = null
}
</script>