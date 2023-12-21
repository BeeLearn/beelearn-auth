<script setup lang="ts">
	import type { Category } from '~/lib/api/models/category.model';

	type InterestTabProps = {
		value: Category[],
	};

	type InterestTabEmit = {
		(event: "submit"): void,
		(event: 'update:value', value: Category[]): void,
	};

	const categoryStore = useCategoryStore();

	defineEmits<InterestTabEmit>();

	const props = defineProps<InterestTabProps>();

	const interests = ref(new Set<Category>(props.value));

	const nextUrl = computed(() => categoryStore.next);
	const categories = computed(() => categoryStore.categories);
	const isLoading = computed(() => categoryStore.isLoading);

	const loadMore = async function(){
		await categoryStore.fetchNextCategories(nextUrl.value!);
	}

	useAsyncData(async () => {
		if(categoryStore.loading === "idle")
			await categoryStore.fetchCategories();
	});
</script>
<template>
	<main class="flex-1 flex flex-col space-y-8 overflow-y-scroll">
		<header class="flex flex-col space-y-2 text-center">
			<p class="text-sm text-violet-700">PROFILE</p>
			<div>
				<h1 class="text-2xl font-bold">Choose your learning path or interest</h1>
				<p class="text-slate-700">This choice won't limit your experience.</p>
			</div>
		</header>
		<div class="flex-1 flex flex-col space-y-3 px-4 overflow-y-scroll">
			<div 
				v-if="isLoading"
				class="m-auto w-8 h-8 progress progress-primary"></div>
			<ToggleButton 
				v-else
				v-for="category in categories" 
				:key="category.id" 
				class="toggle__button"
				:value="interests.has(category)" 
				@update:value="state => {
					if (state) interests.add(category)
					else interests.delete(category);
					$emit('update:value', Array.from(interests.values()));
				}">
				<img 
					:src="category.icon" 
					class="w-8 h-8" />
				<p>{{ category.name }}</p>
			</ToggleButton>
			<LoadMore
				v-if="nextUrl"
				:on-load-more="loadMore" />
		</div>
		<footer class="flex flex-col p-4 static bottom-0">
			<button 
				:disabled="interests.size < 1" 
				class="btn btn-primary items-center" 
				@click="$emit('submit')">
				<span class="flex-1">Next</span>
				<UnoIcon class="i-tabler:arrow-right text-xl" />
			</button>
		</footer>
	</main>
</template>
