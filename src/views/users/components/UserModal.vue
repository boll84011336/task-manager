<template>
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                {{ isEdit ? '編輯使用者' : '新增使用者' }}
            </h3>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">姓名</label>
                    <input v-model="form.name" type="text"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input v-model="form.email" type="email"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">角色</label>
                    <select v-model="form.role"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                    </select>
                </div>
            </div>

            <div v-if="errorMsg" class="mt-3 text-red-500 dark:text-red-400 text-sm">{{ errorMsg }}</div>

            <div class="flex gap-3 mt-6 justify-end">
                <button @click="$emit('close')"
                    class="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    取消
                </button>
                <button @click="handleSubmit"
                    class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                    {{ isEdit ? '儲存' : '新增' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '../../../types'

const props = defineProps<{
    user?: User
}>()

const emit = defineEmits<{
    close: []
    submit: [form: Omit<User, 'id'>]
}>()

const isEdit = !!props.user
const errorMsg = ref('')

const form = ref({
    name: props.user?.name ?? '',
    email: props.user?.email ?? '',
    role: props.user?.role ?? 'member' as 'admin' | 'member',
})

function handleSubmit() {
    if (!form.value.name || !form.value.email) {
        errorMsg.value = '請填寫所有必填欄位'
        return
    }
    emit('submit', { ...form.value })
}
</script>