<!-- src/lib/components/Footer.svelte  -->
<script>
	export let copy = '';
	export let year = '';
</script>

<footer>&copy; {copy} &nbsp;{year}</footer>

<style lang="scss">
	footer {
		display: flex;
		justify-content: center;
		align-items: center;
        color: var(--secondary);
		background-color: var(--primary);
        padding: 0.25em;
		border-top: 3px solid var(--secondary);
		margin-top: 1em;
	}
</style>