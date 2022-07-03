<!-- src/lib/components/Header.svelte  -->

<script>
    export let title = "";
    export let subtitle = "";
</script>

<header>
	<a href="/">
		{title} : : {subtitle}
	</a>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 150%;
		background-color: var(--primary);
        font-variant: small-caps;
        border-bottom: 5px solid var(--secondary);
        padding:1em 0.25em;
		margin-bottom: 1em;
        

		a {
			&:link {
				text-decoration: none;
				color: black;
				color: var(--secondary);
                font-weight: bold;
			}

			&:visited {
				color: black;
				color: var(--secondary);
			}
            
			
		}
	}
</style>

