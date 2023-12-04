<script setup lang="ts">
	import { string } from "yup";

	export type Name = {
		firstName: string,
		lastName: string,
	}

	type NameTabProps = {
		value: Partial<Name> | null,
	}

	type NameTabEmit = {
		(event: 'submit'): Promise<void>,
		(event: 'update:value', value: Partial<Name>): void,
	}

	defineEmits<NameTabEmit>();
	const prop = defineProps<NameTabProps>();

	const nameSchema = string().min(2).required();
	const disabled = computed(() => {
		console.log(prop.value)
		return !(nameSchema.isValidSync(prop.value?.firstName) && nameSchema.isValidSync(prop.value?.lastName));
	});
</script>
<template>
	<main class="flex-1 flex flex-col">
		<header class="flex flex-col space-y-4 text-center">
			<p class="text-sm uppercase text-violet-700">profile</p>
			<div>
				<h1 class="text-2xl font-bold">Your legal name</h1>
				<p class="text-slate-700">Let us and others know your name.</p>
			</div>
		</header>
		<div class="flex-1 flex flex-col p-4">
			<div 
				class="flex flex-col space-y-4" 
				md="flex-row flex-wrap">
				<TextInput
					:value="value?.firstName"
					:schema="nameSchema"
					placeholder="First name"
					@keyup="event => {
						const value = (event.currentTarget as HTMLInputElement).value;
						$emit('update:value', { firstName: value });
					}">
					<template #prefix>
						<UnoIcon class="i-mdi:account text-xl" />
					</template>
				</TextInput>
				<TextInput 
					:value="value?.lastName"
					:schema="nameSchema"
					placeholder="Last name"
					@keyup="event => { 
						const value = (event.currentTarget as HTMLInputElement).value;
						$emit('update:value', { lastName: value });
					}">
					<template #prefix>
						<UnoIcon class="i-mdi:account text-xl" />
					</template>
				</TextInput>
			</div>
		</div>
		<footer class="flex flex-col p-4">
			<button 
				:disabled="disabled"
				class="btn btn-primary items-center" 
				@click="$emit('submit')">
				<span class="flex-1">Next</span>
				<UnoIcon class="i-tabler:arrow-right text-xl" />
			</button>
		</footer>
	</main>
</template>
<style scoped>
	.text__input {
		@apply flex-1 flex space-x-2 items-center border bg-white px-2 rounded-md;
	}
</style>