<template>
	<main 
		class="flex-1 flex flex-col"
		md="w-1/2"
		lg="w-1/3">
		<header class="p-4">
			<h1 class="text-2xl font-bold">Welcome back,</h1>
			<p class="text-base text-stone-700">Login to your account to complete your daily goals.</p>
		</header>
		<div class="flex-1 flex flex-col space-y-2 p-4">
			<div class="input">
				<UnoIcon class="i-mdi:email-outline text-2xl" />
				<input 
					class="p-3" 
					placeholder="Email" />
			</div>
			<p class="text-sm text-stone-500">We'll send you a magic link email. Check your spam if you can't see email in your inbox.</p>
		</div>
		<footer class="flex flex-col p-4">
        <button class="btn btn-primary">Continue</button>
    </footer>
	</main>
</template>
