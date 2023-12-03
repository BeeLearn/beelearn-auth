<script setup lang="ts">
    import genderList, { type Gender } from "@/data/genders";

    type GenderTabProps = {
        value: Gender | null, 
    }

    type GenderTabEmit = {
        (event: "submit") : void,
        (event: "update:value", value: Gender | null) : void,
    }

    defineEmits<GenderTabEmit>();
    defineProps<GenderTabProps>();

    const genders = ref(genderList);
</script>
<template>
    <div class="flex-1 flex flex-col space-y-8 ">
        <header class="flex flex-col text-center space-y-2">
            <p class="text-sm uppercase text-violet-700">profile</p>
            <div>
                <h1 class="text-2xl font-bold">Select your gender</h1>
                <p>Anyone can use and learn on beelearn.</p>
            </div>
        </header>
        <div class="flex-1 flex flex-col space-y-4 px-4">
            <ToggleButton
                v-for="gender, index in genders"
                :key="index"
                type="radio"
                name="gender"
                :value="gender.checked"
                @update:value="() => {
                    genders.forEach(element => {
                        if(element !== gender) element.checked = false;
                        gender.checked  = true;
                    });

                    $emit('update:value', gender);
                }"
                class="toggle__button">
                <span role="img">{{ gender.icon }}</span>
                <p>{{ gender.name }}</p>
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
    </div>
</template>
