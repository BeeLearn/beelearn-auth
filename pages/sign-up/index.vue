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
        <div class="flex-1 flex flex-col space-y-4 p-4">
            <div class="input">
                <UnoIcon class="i-mdi:email-outline text-2xl" />
                <input 
                    class="p-3"
                    placeholder="Email" />
            </div>
            <small class="text-xs text-stone-500">
                By continuing you indicate that you've read and agree to our 
                <a>Terms & Conditions</a>, <a>Privacy Policy</a> and <a>Subscription Policy</a>.
            </small>
        </div>
        <footer class="flex flex-col p-4">
            <button class="btn btn-primary">Continue</button>
        </footer>
    </main>
</template>
<style scoped>
    a {
        @apply underline underline-stone-700;
    }
</style>