<script setup lang="ts">
	import { string } from "yup";
	import FirebaseProvider from "~/lib/firebase";

	const toast = useToast();

	const email = ref<string>();
	const isLoading = ref(false);

	const emailSchema = string().email().required();

	const onSubmit = async function(){
		isLoading.value = true;
		await FirebaseProvider.instance.sendSignInLinkToEmail(email.value!)
		.then(() => toast.success("Email link sent successfully"))
		.catch((error) => {
			let message;

			switch(error.code){
				case 'auth/network-request-failed':
					message = "Connect to the internet and try again!";
					break;
				default:
					message = error.message;
			}

			toast.error(message);
		})
		.finally(() => isLoading.value = false);
	}
</script>
<template>
	<main 
		class="flex-1 flex flex-col"
		md="w-1/2"
		lg="w-1/3">
		<header class="p-4">
			<h1 class="text-2xl font-bold">Welcome back,</h1>
			<p class="text-base text-stone-700">Login to your account to complete your daily goals.</p>
		</header>
		<form 
			class="flex-1 flex flex-col p-4"
			@submit.prevent="onSubmit">
			<div class="flex-1 flex flex-col space-y-2">
				<TextInput 
					placeholder="Email"
					v-model:value="email"
					:schema="emailSchema">
					<template #prefix>
						<UnoIcon class="i-mdi:email-outline text-2xl" />
					</template>
				</TextInput>
				<p class="text-sm text-stone-500">We'll send you a magic link email. Check your spam if you can't see email in your inbox.</p>
			</div>
			<SubmitButton 
				:loading="isLoading"
				:disabled="!emailSchema.isValidSync(email)"
				class="btn btn-primary">
				Continue
			</SubmitButton>
		</form>
		<footer class="flex space-x-2 items-center justify-center text-center p-4">
			<p>Don't have an account?</p>
			<NuxtLink
				to="/sign-up"
				class="underline text-violet-700">Create an account.</NuxtLink>
		</footer>
	</main>
</template>
