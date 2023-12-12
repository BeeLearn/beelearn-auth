<script setup lang="ts">
    const userStore = useUserStore();
    const isLoading = computed(() => userStore.loading);
</script>
<template>
    <main class="fixed inset-0 flex flex-col bg-slate-50 overflow-y-scroll">
        <header class="bg-white p-2 shadow">
            <div class="flex space-x-2 items-center">
                <div class="w-8 h-8 flex items-center bg-violet-700 rounded-md">
                    <UnoIcon class="i-mdi:bee text-4xl text-white" />
                </div>
                <p class="text-xl font-extrabold text-violet-700">BeeLearn</p>
            </div>
        </header>
        <div
            v-if="isLoading" 
            class="m-auto w-8 h-8 border-3 border-t-transparent border-violet-700 animate-spin rounded-full">
        </div>
        <div
            v-else
            class="flex-1 flex flex-col items-center overflow-y-scroll">
            <slot />
        </div>
    </main>
</template>