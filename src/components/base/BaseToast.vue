<template>
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <TransitionGroup name="toast">
            <div v-for="toast in toasts" :key="toast.id" :class="[
                'px-4 py-3 rounded-lg shadow-lg text-sm font-medium  min-w-60 ',
                toast.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                    toast.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            ]">
                <span v-if="toast.type === 'success'">✅ </span>
                <span v-if="toast.type === 'error'">❌ </span>
                <span v-if="toast.type === 'warning'">⚠️ </span>
                {{ toast.message }}
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { useToast } from '../../composables/useToast'

const { toasts } = useToast()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>