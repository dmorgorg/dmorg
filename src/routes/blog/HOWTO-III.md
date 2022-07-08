---
    title: How I Coded This Site - III  
    date: "2022-06-30"
    categories:
    - SvelteKit
    - markdown
    - coding
---

<script>
    import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
</script>

<h1 class = "subH1">Time For Some Blog Stuff</h1>

## Slug Page

Create the file `[slug].svelte` in `/src/routes/blog`, (Or `[id].svelte`, or a name of your choice within the square brackets.) 

```svelte
<!-- src/routes/blog/[slug].svelte -->

<h1>Slug Page</h1>

```

Navigate to `localhost:3000/blog/post42` (which <strong>doesn't</strong> exist!). The `<h1>` tag displaying the string "Slug Page" from `[slug].svelte` is visible. 

If we navigate to a page that <strong>does</strong> exist, we get that existing page. If we navigate to a page that <strong>doesn't</strong> exist, we get the slug page.

 Using the `load()` function, we can extract some information about this page:

 ```svelte
 <script context="module">
	export async function load(obj) {
		console.log({obj});		
		return {};
	}
</script>
<h1>Slug Page </h1>
```

which, when we navigate to the non-existent page `localhost:3000/blog/post42` shows, in the console, what information is retrievable from `obj` passed to `load()` (You may need to refresh the page.):

<div class="width65">
    <img src="../images/howTo/consoleA.png" sveltekit:prefetch alt="consoleA" />
</div>

More specifically, we can use `load()` like this:

```svelte
<script context="module">
	export async function load({ params, url }) {
		return {
			props: {
				slug: params.slug,
				pathname: url.pathname
			}
		};
	}
</script>

<script>    
	export let slug;
	export let pathname;
</script>

<h1>Slug Page </h1>

<div class="center">with slug: <strong>{slug}</strong>
            and pathname: <strong>{pathname}</strong></div>
```



Then, in the browser console we can see some of the properties of the `params` and `url` objects. (You may need to refresh the page again.)

<!-- <div class="width65">
    <img src="../images/howTo/console.png" sveltekit:prefetch alt="console" />
</div> -->

<!-- Properties (`params.slug` and `url.pathname` in this example) may be retrieved by returning them from the `load()` function: -->


<div class="width75">
    <img src="../images/howTo/sluggardly.png" sveltekit: prefetch alt="slug" />
</div>

Consult the SvelteKit documentation to learn more about the `load()` function. It is subject to breaking changes (as is most of SvelteKit); until recently, `page` was supported but there has been some rearrangement.

`<script context = "module">` runs "once when the module first evaluates". We can still have a regular `<script>` in the file; in fact, the regular script tags are needed to expose the props.




















<div class="vert2em" />
<div class="left">Back to <a href="./HOWTO-II"> How I Coded This Site - II</a></div>
<div class="right">On to&nbsp;<a href="./HOWTO-III"> How I Coded This Site - IV</a></div>
<div class="clear"/>

