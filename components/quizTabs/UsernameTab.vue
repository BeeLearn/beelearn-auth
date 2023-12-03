<script setup lang="ts">
    type UsernameTabProps = {
			value: string | null,
		}

    type UsernameTabEmit = {
			(event: 'submit') : void,
			(event: 'update:value', value: string): void,
		}

    defineEmits<UsernameTabEmit>();
    defineProps<UsernameTabProps>();
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
      <div class="input flex space-x-2 items-center border bg-white px-2 rounded-lg">
        <UnoIcon class="i-tabler:at text-xl" />
        <input
					:value="value"
          placeholder="Username" 
          class="flex-1 p-3"
					@keyup="event =>  $emit('update:value', (event.currentTarget as HTMLInputElement).value)"/>
      </div>
    </div>
    <footer class="flex flex-col p-4">
      <button
				class="btn btn-primary px-8"
				@click="$emit('submit')">
          <span class="flex-1">Continue</span>
          <UnoIcon class="i-tabler:arrow-right text-2xl" />
      </button>
    </footer>
  </main>
</template>
