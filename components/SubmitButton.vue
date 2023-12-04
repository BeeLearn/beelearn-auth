<script setup lang="ts">
	type SubmitButtonProps = {
		loading: boolean,
		disabled: boolean,
	};

	defineProps<SubmitButtonProps>();
</script>
<template>
  <button 
    type="submit"
    class="btn btn-primary"
		:disabled="disabled || loading">
		<div
			v-if="loading" 
			class="w-5 h-5 border-3 border-t-transparent border-white animate-spin rounded-full" />
		<slot v-else />
  </button>
</template>
