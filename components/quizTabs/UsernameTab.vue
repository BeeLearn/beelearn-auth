<script setup lang="ts">
  import { string } from "yup";
  import Api from "~/lib/api";

  type UsernameTabProps = {
		value: string | null,
	}

  type UsernameTabEmit = {
		(event: 'submit') : void,
  	(event: 'update:value', value: string | null): void,
	}

  const prop = defineProps<UsernameTabProps>();
  const emit = defineEmits<UsernameTabEmit>();

  const disabled = ref(true);
  const username = computed(() => prop.value);

  const usernameSchema = string().trim().min(3).required()
  .test(
    "username exist test", 
    "username already exists!", 
    async (value) => {
      if(value.trim().length < 3) return false;

      const { data } = await Api.instance.userProvider.usernameExist(value);
      return !data.exists;
    });

  watch(username, value => {
    usernameSchema.isValid(value)
    .then((state) => {
      disabled.value = !state;
    });
  
    emit('update:value', value);
  }, { immediate: true });
</script>
<template>
  <main class="flex-1 flex flex-col">
    <header class="flex flex-col space-y-4 text-center p-4">
      <p class="text-sm uppercase text-violet-700">profile</p>
 	    <div>
        <h1 class="text-2xl font-bold">Choose a username</h1>
        <p>Don't worry you can change this anytime in profile.</p>
      </div>
    </header>
   <div class="flex-1 flex flex-col p-4">
      <TextInput 
        :value="value"
        :use-keyup="true"
        :schema="usernameSchema"
        placeholder="Username"
        @update:value="value => $emit('update:value', value)">
        <template #prefix>
          <UnoIcon class="i-tabler:at text-xl" />
        </template>
      </TextInput>
    </div>
    <footer class="flex flex-col p-4">
      <button
        :disabled="disabled"
				class="btn btn-primary px-8"
				@click="$emit('submit')">
          <span class="flex-1">Continue</span>
          <UnoIcon class="i-tabler:arrow-right text-2xl" />
      </button>
    </footer>
  </main>
</template>

