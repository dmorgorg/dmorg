<!-- src/routes/__layout.svelte -->
<script>
	import '$lib/styles/app.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { blogTitle, blogSubTitle, blogFooterCopyright } 
								from '$lib/configuration.js';
	import { currentYear } from '$lib/utils.js';	

	let title = blogTitle;
	let subtitle = blogSubTitle;
	let copy = blogFooterCopyright;
	let year = currentYear();
</script>

<svelte:head>
	<title>dmorg.org</title>
</svelte:head>

<div class="container">
	<Header {title} {subtitle} />

	<main>
		<slot />
	</main>

	<Footer {copy} {year} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
	}
</style>
