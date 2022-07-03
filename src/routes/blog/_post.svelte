<!-- src/routes/_post.svelte -->
<script>
	export let title;
	export let date;
</script>

<div class="post">
	<h1>{title}</h1>

	<slot />

	<div class="published">This post published on {date}</div>
	
</div>

<style>
    .published {
        font-style: italic;
        text-align: right;
		margin-top: 2em;
		padding-bottom: 2em;
		/* font-size: 90%;
		color: var(--primary); */
    }
</style>
