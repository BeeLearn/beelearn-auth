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
		<header class="flex flex-col text-center p-4">
			<h1 class="text-2xl font-bold">
				<span class="text-violet-700">Begin your career path</span> with BeeLearn
			</h1>
			<p class="text-base text-stone-700">Enter your email to create a personal account</p>
		</header>
		<form 
			class="flex-1 flex flex-col space-y-8 p-4"
			@submit.prevent="onSubmit">
			<div class="flex-1 flex flex-col space-y-4">
				<TextInput 
					placeholder="Email" 
					v-model:value="email" 
					:schema="emailSchema">
					<template #prefix>
						<UnoIcon class="i-mdi:email-outline text-2xl" />
					</template>
				</TextInput>
				<small class="text-xs text-stone-500">
					By continuing you indicate that you've read and agree to our
					<a>Terms & Conditions</a>, <a>Privacy Policy</a> and <a>Subscription Policy</a>.
				</small>
			</div>
			<SubmitButton 
				:loading="isLoading"
				:disabled="!emailSchema.isValidSync(email)"
				class="btn btn-primary">
				Continue
			</SubmitButton>
		</form>
		<footer class="flex space-x-2 items-center justify-center text-center p-4">
			<p>Already an account?</p>
			<NuxtLink
				to="/"
				class="underline text-violet-700">login.</NuxtLink>
		</footer>
	</main>
</template>
<style scoped>
	a {
		@apply underline underline-stone-700;
	}
</style>
