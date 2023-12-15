<script setup lang="ts">
	import type { Goal } from '~/data/goals';
	import type { Gender } from '~/data/genders';
	import type { Category } from '~/lib/api/models/category.model';
	import type { Name } from '~/components/quizTabs/NameTab.vue';

	const router = useRouter();
	const toast = useToast();
	const route = useRoute();
	const userStore = useUserStore();
	const config = useRuntimeConfig();


	const name = ref<Name>({
		lastName: null,
		firstName: null,
	});
	const goal = ref<Goal | null>(null);
	const gender = ref<Gender | null>(null);
	const interests = ref<Category[]>([]);
	const username = ref<string | null>(null);

	onMounted(() => {
		if (userStore.user === null) router.replace('/');
	});

	const onSubmit = (callback: () => void) => {
		const payload = {
			username: username.value!,
			last_name: name.value.lastName!,
			first_name: name.value.firstName!,
			profile: {
				daily_streak_minutes: goal!.value?.value,
			},
			categories: {
				add: interests.value.map(interest => interest.id),
			},
			gender: gender.value!.name.toUpperCase(),
		};

		userStore.updateUser(payload)
			.then(() => {
				toast.success('Profile updated successfully');
				const redirect = route.query.redirect as string;
				if (redirect) window.location.replace(redirect);
				else window.location.replace(config.public.dashboardBaseUrl);
			})
			.catch(() => toast.error('An unexpected error occur. Try again!'))
			.finally(() => callback());
	}
</script>
<template>
	<QuizPage 
		v-model:goal="goal" 
		v-model:name="name" 
		v-model:gender="gender" 
		v-model:username="username"
		v-model:interests="interests"
		@submit="onSubmit" />
</template>
