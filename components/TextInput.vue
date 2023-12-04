<script setup lang="ts">
	import type { Schema, ValidationError } from "yup";

	type TextInputProps = {
		schema: Schema,
		value?: string | null,
		placeholder?: string,
		type?: "text" | "email",
		useKeyup?: boolean,
	}

	type TextInputEmits = {
		(event: 'keyup', ev: KeyboardEvent): void,
		(event: 'update:value', value: any): void,
	}

	const emit = defineEmits<TextInputEmits>();
	const prop = defineProps<TextInputProps>();

	const error = ref<string>();
	let timer: number | undefined = undefined;

	const handleEvent = function (event: Event) {
		if(prop.useKeyup && event.type !== "keyup") return;
		
		const value = (event.target as HTMLInputElement).value;
		emit('update:value', value);
		prop.schema.validate(value)
			.then(() => error.value = undefined)
			.catch(({ message }: ValidationError) => error.value = message);
	}

	const onKeyup = function(event: KeyboardEvent){
		if(prop.useKeyup){
			window.clearTimeout(timer);

			timer = window.setTimeout(() => {
				handleEvent(event);
			}, 500);
		}

		emit('keyup', event);
	}
</script>
<template>
	<div class="flex flex-col space-y-0.5">
		<div 
			class="input"
			:aria-invalid="error !== null">
			<slot name="prefix" />
			<input 
				class="p-3" 
				:value="value"
				:placeholder="placeholder" 
				@blur="handleEvent" 
				@change="handleEvent"
				@keyup="onKeyup" />
			<slot name="suffix" />
		</div>
		<p
			v-if="error"
			class="text-sm text-red-500 first-letter:uppercase">{{ error }}</p>
	</div>
</template>
