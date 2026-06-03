<template>
    <button :class="['btn', `btn-${variant}`, { 'btn-loading': loading }]" :disabled="disabled || loading"
        @click="$emit('click')">
        <span v-if="loading">載入中...</span>
        <slot v-else />
    </button>
</template>

<script setup lang="ts">
defineProps<{
    variant?: 'primary' | 'danger' | 'secondary'
    loading?: boolean
    disabled?: boolean
}>()

defineEmits<{
    click: []
}>()
</script>

<style scoped>
.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: opacity 0.2s;
}

.btn:hover {
    opacity: 0.85;
}

.btn-primary {
    background: #4f46e5;
    color: white;
}

.btn-danger {
    background: #ef4444;
    color: white;
}

.btn-secondary {
    background: #e5e7eb;
    color: #374151;
}

.btn-loading {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn:disabled {
    cursor: not-allowed;
}
</style>