<script setup lang="ts">
    const router = useRouter();
    const userStore = useUserStore();

    onMounted(() => {
        if(userStore.user === null) router.replace('/');
    });
</script>
<template>
    <QuizPage />
</template>
