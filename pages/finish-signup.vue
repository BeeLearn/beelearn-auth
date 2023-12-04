<script setup lang="ts">
	import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
	const route = useRoute();
	const router = useRouter();

	const error = ref<string>();

	onMounted(() => {
		const auth = getAuth();
		if (isSignInWithEmailLink(auth, window.location.href)) {
			let email = window.localStorage.getItem('emailForSignIn');
			if (!email) {
				router.replace({
					path: "/",
					query: { redirect: window.location.href }
				});

				return;
			}

			signInWithEmailLink(auth, email, window.location.href)
				.then(result => {
					/// Todo
				})
				.catch((err) => {
					error.value = err.message;
				});
			return;
		}

		router.replace("/");
	});
</script>
<template>
	<main class="m-auto flex flex-col text-center items-center justify-center space-y-6 p-8">
		<div 
			class="w-12 h-12 flex items-center justify-center rounded-xl"
			:class="error ? 'bg-red-500' : 'bg-violet-700 animate-bounce'">
				<UnoIcon class="i-mdi:magic text-xl text-white" />
		</div>
		<div v-if="error">
			<h1 class="text-2xl font-extrabold">Invalid magic link</h1>
			<p class="text-stone-700">Try Refresh page or generate another link by logging in again!</p>
			<NuxtLink 
				to="/"
				class="text-violet-700 text-base block p-2">Home</NuxtLink>
		</div>
		<div
			v-else 
			class="w-8 h-8 border-3 border-violet-700 border-t-transparent animate-spin rounded-full" />
	</main>
</template>