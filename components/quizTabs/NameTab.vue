<script setup lang="ts">
	import { string } from "yup";

	export type Name = {
		firstName: string | null,
		lastName: string | null,
	}

	type NameTabProps = {
		value: Name,
	}

	type NameTabEmit = {
		(event: 'submit', callback: () => void): Promise<void>,
		(event: 'update:value', value: Name): void,
	}

	const emit = defineEmits<NameTabEmit>();
	const prop = defineProps<NameTabProps>();

	const nameSchema = string().min(2).required();
	const disabled = computed(() => {
		return !(
			nameSchema.isValidSync(prop.value?.firstName) && 
			nameSchema.isValidSync(prop.value?.lastName));
	});

	const isLoading = ref(false);

	const onSubmit = function(){
		isLoading.value = true;
		return emit('submit', () => isLoading.value = false);
	}
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
						const val = (event.currentTarget as HTMLInputElement).value;
						$emit('update:value', { firstName: val, lastName: value.lastName });
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
						const val = (event.currentTarget as HTMLInputElement).value;
						$emit('update:value', { lastName: val, firstName: value.firstName });
					}">
					<template #prefix>
						<UnoIcon class="i-mdi:account text-xl" />
					</template>
				</TextInput>
			</div>
		</div>
		<footer class="flex flex-col p-4">
			<SubmitButton
				:loading="isLoading"
				:disabled="disabled"
				@click="onSubmit">
				<span>Continue</span>
			</SubmitButton>
		</footer>
	</main>
</template>
