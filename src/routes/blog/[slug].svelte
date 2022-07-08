<script context="module">
	export async function load({ params }) {
		const BlogPost = await import('../../blogPosts/hello.md');
		
		return {
			props: {
				BlogPost: BlogPost.default,
				slug: params.slug
			}
		};
	}
</script>

<script>
	export let BlogPost;
</script>

<BlogPost />
