<script setup lang="ts">
    import goalList, { type Goal } from "@/data/goals";

    type GoalTabProps = {
        value: Goal | null,
    }

    type GoalTabEmit = {
        (event: 'submit') : void,
        (event: 'update:value', value?: Goal | null) : void,
    }

    defineEmits <GoalTabEmit>();
    defineProps <GoalTabProps>();

    const goals = ref(goalList);
</script>
<template>
    <main class="flex flex-col flex-1">
        <header class="text-center p-4">
            <h1 class="text-2xl font-bold">Set your goal on timing</h1>
            <p class="text-slate-700">Pick the amount of time you will spend on beelearn daily</p>
        </header>
        <div class="flex-1 flex flex-col space-y-4 p-4">
            <ToggleButton 
                v-for="goal, index in goals"
                :key="index"
                :value="goal.checked"
                @update:value="() => {
                    goals.forEach(element => {
                        if(element !== goal) element.checked = false;
                        goal.checked = true;
                    });

                    $emit('update:value', goal);
                }"
                name="goal"
                type="hiddenRadio"
                class="toggle__button">
                <span role="img">{{ goal.icon }}</span>
                <p class="flex-1">{{ goal.name }}</p>
                <div class=" text-slate-500">{{ goal.valueText }}</div>
            </ToggleButton>
        </div>
        <footer class="flex flex-col p-4">
            <button
                :disabled="value === null" 
                class="btn btn-primary items-center"
                @click="$emit('submit')">
                <span class="flex-1">Next</span>
                <UnoIcon class="i-tabler:arrow-right text-xl" />
            </button>
        </footer>
    </main>
</template>
