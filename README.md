<style type='text/css'>
    h1 {
        font-style: italic;
        text-decoration: underline;
    }
</style>

<script>
    import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
</script>

# Setting Up

**Assumptions**: You have a recent version of `node.js` installed on your computer (>=16.7 recommended), you have an account at `github.com` and an account at `render.com` (which will host your project). (Github is free for public repositories and Render is free to host static sites.)

### Remotely, on `github.com`:

Navigate to your account on Github and create a new empty repo for this project.

###Locally:

Initiate a svelte-kit project and open it in your editor. From the terminal prompt:

```bash
> npm init svelte@next dmorg
```
where `dmorg` is the name of your project. Choose whether to load the demo app or a skeleton project, whether to include type-checking, prettier, etc. (I generally say no to everything except prettier.) Then `cd` into the project directory, install the project and open the project in your editor of choice. (I'm using `vscode`.) Run the skeleton project in your browser.

```bash
> cd dmorg
> npm i
> code .
> npm run dev -- --o
```
Now the project is open and running at `localhost:3000`

We are developing a static site so we need the correct adapter. First install the relevant package from the terminal prompt:

```bash
> npm i -D @sveltejs/adapter-static
```

Then, with your code editor, in file `svelte.config.js` replace the line: 

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
```
with the line:
```js
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
```
In the same file, add the prerender directive:
```js
//svelte.config.js

...

kit: {
    adapter: adapter(),
    prerender: {
        default: true,
    },
}
```
For the site to be hosted on `render.com`, create file `render.yaml` in the root of the project and add the following:
```js
# render.yaml
services:
  - type: web
    name: sveltekit-static
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: build
```

Now, it's time to get the project on Github. My repo is named `dmorg`.

```bash
> git init
> git status
> git add -A
> git commit -m "initial commit"
> git remote add origin git@github.com:dmorgorg/dmorg.git
> git branch -M main
> git push -u origin main
```

To push to Github, you may have to supply a username and password (if pushing over `https`). You will have to repeat this for every push so I recommend using `ssh` instead. Github has easy to follow instructions on how to set this up.

### Remotely, on `render.com`:

Now, we'll set up the site live on Render. Go to `render.com` and follow/search for instructions for a new static site. If it's your first visit, you will have to allow Render access to your Github account. 

From `dashboard.render.com`, follow `New+ > Static Site` to see a list of your Github repos. Select the one you want (`dmorgorg/dmorg` in my case, where `dmorgorg` is my Github username and `dmorg` is the site I wish to host on Render).

Fill in a name for your site; it must be unique on Render because it will be part of your `url`. (I used `dmorg` so my site `url` is `dmorg.onrender.com`.) 
Build command is `npm install && npm run build`.
Publish directory is `./build`.
Branch will be `main`. 
Then click on `Create Static Site` and wait a few minutes while the site builds.

(This seems to duplicate information entered in `render.yaml` but I seemed to need it here too.)

At this point my build failed with a message that I need a version of node greater than 16.7. This message refers to the version of node running on Render (which, at time of writing, is 14.17.0). Specify the version of node you want Render to use, as detailed here: <https://render.com/docs/node-version>. I added the following `"engines":...` to the bottom of my `package.json`:

```json
...
"type": "module",
"engines": {
	"node": ">=16.7"
}
```

Now, your skeleton app should be visible and it's time to start developing your project. The advantage of running on Render (or other companies that offer static hosting for free such as Vercel, Netlify, ... ) is that pushing changes to Github easily deploys them to `dmorg.onrender.com`. It is also possible to point your custom domain `dmorg.org` to the Render site. This makes updating the site after changes a simple matter.

# Building a (Simple) Blog Site

This site will blog and nothing else.  Remove the skeleton app code from `src/routes/index.svelte` and add something to indicate that this is where blog posts will (eventually) be listed.

```html
<!-- src/routes/index.svelte -->
<h1>Posts</h1>
<p>My many misadventures...</p>
```

### Styling with `sass/scss`
 There are a number of options for using `css` in Sveltekit. A simple approach is to include your `app.css` file in the `static` folder and then reference it from `app.html` like this:

```html
<!-- src/app.html -->
...
<head>
    ...
    <link rel="stylesheet" href="app.css">
    ...
</head>
```

Or, if you like to use `sass/scss`, you can put your `app.scss` in the same `static` folder and use the `vscode` `Live Sass Compiler` extension to manage compiling your `scss` to `css` whenever you save your file. Sveltekit can also import `sass` to a component, and the component can also include its own styling that is scoped to the currect component. I will `import` the more general styling (fonts, etc) and use components' `style` tags for component-level styling. 

First, install the `sass` and `svelte-preprocess` packages for `node`. (Doesn't work with node version 16.x but switching to version 18.x solves the issue. If you can't change your node version, try `npm i -D node-sass`.)

```bash
> npm i -D sass svelte-preprocess
```
Now edit `svelte.config.js` to include `prerender`:
```js
// svelte.config.js 
...
    kit: {
        adapter: adapter(),
    },
    preprocess: [
		sveltePreprocess(),
	],   
    export default config;
}
```
Create a directory structure: under `routes`, create a `lib` directory and a `styles` directory under that. Create `app.scss` (or whatever you want to call you styles file) in `src/routes/lib/styles`. Add some styling of your choosing to this file:

```css
html {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
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
```

### Layout files
Sveltekit uses layout files, `__layout.svelte`, for content to be wrapped around pages in the current and sub directories. Layout files act as a parent component and are useful for items (like headers, navigation and footers) that should you'd like on all pages. Create a layout file in `src/routes/`:
```js
// src/routes/__layout.svelte
<script>
    import '$lib/styles/app.scss';
</script>

<div class="container">
    <header>this is the page header</header>

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
    main {
        width: 60%;
        margin: 0 auto;
    }
</style>
```

### Header and Footer Components

Now, every page (pages are components) further down the directory structure will have this import of global scope style, a header and the footer.

Let's make a header component: under `lib`, create a `components` directory and a `Header.svelte` file in `components`.
```html
<!-- src/lib/components/Header.svelte -->
<header>dmorg.org :: Misadventurous Times</header>

<style>
    header {
        display: flex;
        justify-content: center;
    }
</style>
```
While we're at it, we can create a footer component:
```html
<!-- src/lib/components/Footer.svelte -->
<footer>dmorg &copy;2022</footer>

<style>
    footer {
        display: flex;
        justify-content: center;
    }
</style>
```
Go back to `__layout.svelte` and import these components. Then replace the `<header>` and `<footer>` elements with their corresponding components. `__layout.svelte` should now look like this:

```js
// src/routes/__layout.svelte
<script>
    import '$lib/styles/app.scss';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<div class="container">
    <Header />

    <main>
        <slot />
    </main>

    <Footer />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
    }
    main {
        width: 60%;
        margin: 0 auto;
    }
</style>
```

### Using a Configuration File

There is a problem here: if we want to change the blog name or description, we need to know to go into the layout code to change it. Let's use a configuration file instead. In the `lib` directory, create `config.js` and add this content:
```js
// src/lib/config.js 
export const blogTitle = 'Freedom66';
export const blogSubTitle = 'Misadventurous Times';
export const blogFooterCredit = 'dave morgan';
```  

We can use a `utils.js` file to automate the year in `Footer.svelte`:

```js
// src/lib/utils.js
export const currentYear = () => {
    const d = new Date();
    return d.getFullYear();
};
```

Now, import `config.js`  and `utils.js` into  `__layout.svelte`. Add the following lines to the `<script>` tag and the `html`:
```html
// src/routes/__layout.svelte 
<script>
    import '$lib/styles/app.scss';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { blogTitle, blogSubTitle, blogFooterCredit } from '$lib/config.js';  //THIS LINE CHANGED
    import { currentYear} from '$lib/utils.js';     // THIS LINE CHANGED

</script>

<div class="container">
    <Header {blogTitle} {blogSubTitle} />   <!-- THIS LINE CHANGED -->
    
    <main>
        <slot />
    </main>

    <Footer {blogFooterCredit} {year} /> <!-- THIS LINE CHANGED -->
</div>
```
and update the Header and Footer components accordingly:
```html
<!-- src/lib/components/Header.svelte  -->
<script>
    export let blogTitle = 'dmorg.org'; // THIS LINE NEW
    export let blogSubTitle = 'my travels and other misadventures'; // THIS LINE NEW
</script>

<header>
    <div>{blogTitle} : : {blogSubTitle}</div> <!-- THIS LINE CHANGED-->
</header>

<style lang="scss">
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #666;
        color: #eee;

        div {
            padding: 1.5em 0.25em;
        }
    }
</style>
```


```html
 <!-- src/lib/components/Footer.svelte -->
 <script>
     export let blogFooterCredit = 'dmorg';
     export let year = '';
 </script>
<footer>{blogFooterCredit} &nbsp; &copy;{year}</footer>

<style>
    footer {
        display: flex;
        justify-content: center;
        padding: 0.5em;
        color: var(--primary-color);
    }
</style>
```



And now, we can edit the site header and footer through `config.js` instead of making changes in both components.
```js
// src/lib/config.js
export const config = {
    blogTitle: 'Freedom66',
    blogSubTitle: 'Misadventurous Times',
    blogFooterCredit: 'dave morgan' // THIS LINE ADDED
}
```
```html
<!-- src/routes/__layout.svelte -->
<script>
    import '$lib/styles/app.scss';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { config } from '$lib/config.js';

    let blogTitle = config.blogTitle;
    let blogSubTitle = config.blogSubTitle;
    let blogFooterCredit = config.blogFooterCredit; // THIS LINE CHANGED 
</script>

<div class="container">
    <Header {blogTitle} {blogSubTitle} />
    
    <main>
        <slot />
    </main>

    <Footer {blogFooterCredit} />  <!-- THIS LINE CHANGED -->
</div>

<style>
    ...
```
While we're at it, it's probably a good idea to move 'theme' styling out of the Header component to somewhere more central. Add the following variables to the top of `app.scss`:
```css
// src/lib/styles/app.scss 
// sass variables (to allow the use functions like scale, lighten on them)
$primary: #5D7F69;
$secondary: #E4D8B7;

:root {
    // css variables
    // this syntax is like a template literal in js but using # instead of $
    --primary-color: #{$primary};
    --secondary-color: #{$secondary};
}
...
```
and these changes to `Header.svelte`:
```html
<!-- src/lib/components/Header.svelte -->
... 
<style lang="scss">
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--secondary-color);      // THIS LINE CHANGED
        background-color: var(--primary-color);     // THIS LINE CHANGED
        
        div {
            ....
        }
    }
</style>
```

### Working with Markdown

Install `mdsvex`, then modify `svelte.config.js`:

```bash
npm i -D mdsvex prism-themes
```
```js
//  svelte.config.js

import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';                    // THIS LINE ADDEDD

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
		},
	},	
	preprocess: [
		sveltePreprocess(),
		mdsvex({			// THIS LINE ADDEDD
		    extensions: ['.md'] 	// THIS LINE ADDEDD
		}) 				// THIS LINE ADDEDD
	],
};

export default config;
```

By default, `mdsvex()` processes `.svx` files. Now it will process `.md` files. Restart the server after making changes to `svelte.config.js`.

Create a file `test.md` in the routes directory. Enter the following code:
```markdown
<!-- src/routes/test.md -->
---
    title: test
---

<script>
    import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
</script>


# This is just a {title} file

- containing
- an
- unordered list

and 

1. an
1. ordered
1. list

and 

```js
import { something } from 'javascript';
let answer = 42;
```















