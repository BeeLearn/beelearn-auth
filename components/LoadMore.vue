<script setup lang="ts">
  type LoadMoreProps = {
    onLoadMore: () => Promise<any>,
  }

  const prop = defineProps<LoadMoreProps>();

  const isLoading = ref(false);

  const loadMore = async function(){
    isLoading.value = true;
    await prop.onLoadMore()
    .finally(() => isLoading.value = false);
  }
</script>
<template>
  <button 
    :disabled="isLoading"
    class="btn btn-primary self-center w-32 py-2"
    @click="loadMore">
    <div 
      v-if="isLoading" 
      class="w-6 h-6 progress progress-inverse" />  
    <span v-else>Load More</span>
  </button>
</template>
