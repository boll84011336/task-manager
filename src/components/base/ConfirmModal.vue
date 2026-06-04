<template>
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ title }}</h3>
            <p class="text-sm text-gray-500 mb-6">{{ message }}</p>
            <div class="flex gap-3 justify-end">
                <button @click="$emit('cancel')"
                    class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    取消
                </button>
                <button @click="$emit('confirm')"
                    class="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                    確定刪除
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    message: string
}>()

defineEmits<{
    confirm: []
    cancel: []
}>()
</script>