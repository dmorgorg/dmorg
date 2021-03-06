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

## A New Blog Directory

Create a directory `blog` in the `src` directory. This is outside the `routes` so we cannot navigate directly to this directory.

```markdown
---
    title: this is the `hello.md` title
    date: "2001-12-31"
---
<!-- src/blog/hello.md -->

<style>
    * {
        margin: 0 auto;
        text-align: center;
    }
</style>

`hello md`
```

Edit `src/routes/blog/[slug].svelte` to look as follows:

```svelte
<!-- src/routes/blog/[slug].svelte -->
<script context="module">
	export async function load({ params }) {
		const BlogPost = await import('../../blog/hello.md');
		
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
```

So, if the file shown in the `url` does not exist (e.g. `localhost:3000/blog/post142`), `[slug].svelte` is used and imports our newly created `src/blog/hello.md` file. And, as long as `BlogPost` has a leading uppercase letter ('B'), magically a `<BlogPost />` component is created behind the scenes (I haven't found the documentation for this!) and the contents of `hello.md` are rendered:

<div>
    <img src="../images/howTo/sluggardly2.png" sveltekit prefetch alt="slug" />
</div>

> Replace `BlogPost` with `blogpost`, or any variable with a lower case initial letter, and the code will break.
>
> It is not necessary for both `blog` directories to have the same name but if they are named differently it is necessary to specify `layout: blog` in the frontmatter of `hello.md`
>
> A separate folder for posts outside the routes folder is a tidy way to proceed






















<div class="vert2em" />
<div class="left">Back to <a href="./HOWTO-II"> How I Coded This Site - II</a></div>
<div class="right">On to&nbsp;<a href="./HOWTO-III"> How I Coded This Site - IV</a></div>
<div class="clear"/>

