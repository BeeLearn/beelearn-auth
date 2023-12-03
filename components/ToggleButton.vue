<script setup lang="ts">
type ToggleButtonProps = {
	name?: string,
	value: boolean,
	type?: "checkbox" | "radio" | "hiddenCheckbox" | "hiddenRadio",
}

type ToggleButtonEmit = {
	(event: 'update:value', value: boolean): void,
}

defineEmits<ToggleButtonEmit>();
const props = defineProps<ToggleButtonProps>();

const isInputHidden = computed(() => props.type?.includes('hidden'));
const inputType = computed(() => ['checkbox', 'hiddenCheckbox'].includes(props.type ?? 'checkbox') ? 'checkbox' : 'radio');
</script>
<template>
	<div
	  :aria-pressed="value" 
	  @click="$emit('update:value', !value)">
		<div class="flex-1 flex space-x-2 items-center">
			<slot />
		</div>
		<input 
			v-if="!isInputHidden"
			:name="name" 
			:type="inputType" 
			v-bind:checked="value" />
	</div>
</template>
