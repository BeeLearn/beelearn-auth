<script setup lang="ts">
    type InterestTabProps = {
        value: any[],
    };

    type InterestTabEmit = {
        (event: "submit") : void,
        (event: 'update:value', value: any[]): void,
    };
    
    defineEmits<InterestTabEmit>();
    const props = defineProps<InterestTabProps>();

    const interests = ref(new Set(props.value));
</script>
<template>
    <main class="flex-1 flex flex-col space-y-8">
        <header class="flex flex-col space-y-2 text-center">
			<p class="text-sm text-violet-700">PROFILE</p>
            <div>
				<h1 class="text-2xl font-bold">Choose your learning path or interest</h1>
            	<p class="text-slate-700">This choice won't limit your experience.</p>
			</div>
        </header>
        <div class="flex-1 flex flex-col px-4">
            <ToggleButton
                class="toggle__button"
                :value="interests.has('')"
                @update:value="state => {
                    if(state) interests.add('') 
                    else interests.delete('');
                    $emit('update:value', Array.from(interests.values()));
                }">
                <img 
                    src="@/assets/illustrations/webpage.svg"
                    class="w-8 h-8" />
                <p>Web development</p>
            </ToggleButton>
        </div>
        <footer class="flex flex-col p-4">
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
