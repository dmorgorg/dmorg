---
    title: How I Coded This Site - II  
    date: "2022-06-29"
    # categories:
    # - SvelteKit
    # - markdown
    # - coding
    # layout: false
---

<script>
    import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
</script>



<h1>Layouts, Pages, Miscellany</h1>

## More Styling

I'm adding more styling to `app.scss`. Substitute with your own as you desire:

```css
/* src/lib/styles/app.scss */

:root {
    --primary: #5D7F69;
    --secondary: #E4D8B7;
}

html {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.35;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

body {
    margin: 0;
    padding: 0;
}

main {
    /* I want main to be full width so that the scrollbar 
    is on the right edge but still want the content to be 
    narrower and centered */
    padding: 0 calc(50vw - 19em);
    overflow-y: auto;
    background-attachment: fixed;
    padding-bottom: 3em;

    /* main will fade towards the top and bottom */
    -webkit-mask-image: linear-gradient(to bottom, transparent 0, 
            red 5%, red 95%, transparent 100%);
    mask-image: linear-gradient(to bottom, transparent 1%, 
            red 5%, red 95%, transparent 99%);
}

h1,
h2,
h3 {
    color: var(--primary);
}

h1 {
    text-decoration: underline;
}

h2 {
    font-style: italic;
}

h3 {
    font-variant: small-caps;
}

.right {
    float: right;
}
.left {
    float: left;
}

/* styling for prism in markdown files */
/* inline code (single backtick) in md files */
p code,
li code {
    font-size: 1.2em;
    padding: 0.25em;
    padding-top: 0;
    padding-bottom: 0.0125em;
    border-radius: 3px;
    font-weight: bolder;
    letter-spacing: -0.005in;
    white-space: nowrap;
    background: #ddd;
}

blockquote {
    border-left: .5em solid var(--primary);
    padding: 0.35em 1em;
    font-size: 85%;
    background-color: #ddd;
    margin-right: 0;

    pre code[class*="language-"] {
        font-size: 0.9em;
    }
}

pre code[class*="language-"] {
    font-size: 1.1em;
}

/* fenced code blocks */
pre[class*="language-"] {
    overflow: auto;
    border-radius: 0.375em;
    background: #ddd;
}

/* width */
main::-webkit-scrollbar {
    width: 1em;
}

/* Track */
main::-webkit-scrollbar-track {
    background: var(--primary);
    background: var(--secondary);
    // padding: 0 2px;
    width: 1em;
}

/* Handle */
main::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 0.5em;
    border: 4px solid var(--secondary);
    

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
    border: 2px solid var(--secondary);
}

* {
    scrollbar-width: auto;
    /* "auto" or "thin" */
    scrollbar-color: var(--primary) var(--secondary);
    /* scroll thumb and track */
}

```

We want this as default styling in all (or most) of our pages so let up import the file into our layout file.

## Svelte Layout File



Sveltekit uses a layout file, `__layout.svelte`, as a template for content to be wrapped around pages. Layout files act as a parent component and are useful for items (like headers, navigation, footers, default styling) that you'd like on all (or most) pages. Create the file in `src/routes/__layout.svelte`. (The exact name of the file, `__layout.svelte`, is required.)

```svelte
<!-- src/routes/__layout.svelte -->
<script>
    import '$lib/styles/app.scss';
</script>

<div class="container">
    <header>the page header</header>

    <main>
        <slot />
    </main>

    <footer>&copy; 2022</footer>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
    }   
</style>
```

Notice that 'the page header' and the copyright have been added to the page. They will be present on every page in `routes`. The content, our original skeleton application from `src/routes/index.js` is inserted into the layout where the `<slot>` tag is.

Also, the styling in this file is plain `css`. If it were `scss`, then the opening tag should be altered to `<style lang='scss'>`.

Navigate to `localhost:3000/test` to see the styling, header and footer applied to the `test.md` page.

![skeleton with layout](../images/howTo/skeleton2.png)

The styling is imported into the layout file so will be present in every page. We can remove that import now from `index.js`.

## Header and Footer Components

Although not absolutely necessary, it is good style to separate the header and footer out into their own componts.

### Header Component

Make a header component: under `lib`, create a `components` directory and a `Header.svelte` file in `components`.

```svelte
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

		a {
			&:link {
				text-decoration: none;
				color: var(--secondary);
				font-weight: bold;
			}

			&:visited {
				color: var(--secondary);
			}
		}
	}
</style>
```

Now, in `__layout.svelte` add

```svelte
<style>
    ...
    import Header from '$lib/components/Header.svelte';
</style>
```

and replace the line: 

```svelte
<header>the page header</header>
```

with the line:

```svelte
 <Header title='Dmorg.Org' subtitle='Life and Other Misadventures' />
```

### Footer Component

The footer component, `src/lib/components/Footer.svelte` is:

```svelte
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
```

Import the component into the layout file and amend the footer tag accordingly:

```svelte
<script>
    ...
    import Footer from '$lib/components/Footer.svelte';
</script>

...

<Footer copy="Dave Morgan" year="2022" />

...
```

To edit the name of the site and/or the description requires delving into the code of the header component. Similarly for the footer. It makes sense to extract these details to a configuration file.

## Configuration File

Create `configuration.js` in the `lib` directory.

```js
// src/lib/configuration.js

export const blogTitle = 'Dmorg.Org';
export const blogSubTitle = 'Travels and Other Misadventures';
export const blogFooterCopyright = 'Dave Morgan';

```

This will necessitate some changes to our layout file:

```svelte
<!-- src/routes/__layout.svelte -->
<script>
	import '$lib/styles/app.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import { blogTitle, blogSubTitle, blogFooterCopyright } from '$lib/configuration.js';

	let title = blogTitle;
	let subtitle = blogSubTitle;
	let copy = blogFooterCopyright;
	let year = 2022;
</script>

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
```

## Utilities File

Rather than hard code the year, we can automate this. Create a file `utils.js` in the `lib` directory:

```js
// /src/lib/utils.js

export const currentYear = () => {
    const d = new Date();
    return d.getFullYear();
};
```

and edit `__layout.svelte` to look like this:

```svelte
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
```

## Layout Files for Markdown



`mdsvex`'s approach to layout files is flexible, with no naming convention constraints. Call your layout file what you will. Mine will be `_post.svelte` (the underscore indicates a private file without content of its own and that is not routable.)

Create a folder `src/routes/blog/` and move all your `.md` files to it. While you're at it, create a few new markdown files to work with. Add the layout file `_post.svelte` to this directory. If we 'name' the layout the same as the directory it's in (blog, in this case), then the layout file will be used automatically for `.md` pages in this directory.

> We can also specify the layout with `layout: blog` in the markdown frontmatter. <br/>
> Or 'turn off' the layout with  `layout: false` in the markdown frontmatter.

To name the layout, edit `mdsvex()` in `svelte.config.js` as shown:

```js
...
mdsvex({							
    extensions: ['.md'],
    layout: {
        blog: 'src/routes/blog/_post.svelte'
    }
})
...
```



```svelte
<!-- src/routes/blog/_post.svelte -->
<script>
	export let title = "my post";
	export let date ="2013-02-29";
</script>

<div class="post">
	<h1>{title}</h1>

	<slot />

	<div class="published">This post published on {date}</div>
</div>

<style>
    .published {
        font-style: italic;
        float: right;
    }
</style>
```

Properties from the markdown frontmatter are available as component props, which is both useful and powerful. Note that dates are simpler to use as strings to avoid additional formatting requirements. 

We could also use a nested Svelte layout, i.e. add a `__layout.svelte` to the `blog` directory. This will extend the `__layout.svelte` file in the parent `routes` directory.


## About Page

Create a simple about page, `about.md`, in `routes`:

```markdown
---
    date: "22-07-04"
    title: About
---
<!-- src/routes/about.md -->

### Stuff About Me

* Occasional Cyclist
* Opportunistic Photographer
* Unrepentant Geek
* Inveterate Nomad
* Terminal Cynic
```

and view it at `localhost:3000/about`. Note that the md layout is not applied to this since it is not in the `blog` folder. (We can tell because the `title` isn't displayed.) If you wish to apply the md layout, add `layout: blog` to the file's frontmatter.










<div class="vert2em" />
<div class="left">Back to <a href="./HOWTO-I"> How I Coded This Site - I</a></div>
<div class="right">On to&nbsp;<a href="./HOWTO-III"> How I Coded This Site - III</a></div>
<div class="clear"/>

