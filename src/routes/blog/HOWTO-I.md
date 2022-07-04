---
    title: How I Coded This Site - I  
    date: "2022-06-20"
    categories:
    - SvelteKit
    - markdown
    - coding
---

<script>
    import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
</script>


<h1 class = "subH1">Initial Project Setup</h1>

>**Assumptions**: You have a recent version of `node.js` installed on your computer (>=16.7 recommended), you have an account at [github.com](https://github.com) and you have an account at [render.com](https://render.com) (which will host your project). These are all free under certain conditions: your repository on Github is public and your site on Render is static.

## Full Disclosure!

There are several tutorials, on [YouTube](https://youtu.be) and elsewhere, for building a blog using SvelteKit. I studied the ones I liked and 'borrowed' freely from them; after all, that is what tutorials are for. Then why bother making a tutorial based on already existing tutorials? Primarily for my own benefit, to help my understanding and to have a record if I need to build another one quickly from scratch. Sure, I could clone the repo but I find it helpful to have the code fresh in my mind.

These are some that I found useful:
* [https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog)
* [Youtube tutorial by Webjeda](https://www.youtube.com/watch?v=sKKgT0SEioI&t=4s)
* [Learn SvelteKit While Building a Blog](https://www.udemy.com/course/sveltekit/learn/lecture/30192706?start=135#content). Note: this is a paid-for course from [Udemy](https://udemy.com). The price for Udemy courses are frequently steeply discounted - it's worth waiting for a sale.


## Initiate a SvelteKit project

In the terminal, initiate a SvelteKit project:

```bash
> npm init svelte@next myProjectName
```

Replace `myProjectName` with a project name of your choice. From the prompts, choose whether to load the demo app or a skeleton project, whether to include type-checking, prettier, etc. (I am choosing the skeleton project and declining everything except `prettier`.) 

`cd` into the project directory, install the project, open the project in your editor of choice (I'm using Visual Studio Code, you can install it from [here](https://code.visualstudio.com/)), start up the development server and display the project in your browser.

```bash
> cd blogProj
> npm i
> code .
> npm run dev -- --o
```

Now the project is open and running in your browser at `localhost:3000`, the default port for SvelteKit projects.

>If that post is not available, or if you prefer to use another, you can open in a different port using the command `> npm run dev -- --o --port 3300` where` 3300` is the port you’d like to use.

> You can make this change permanent for this project by editing the `package.json` file. Add the port specifier to the dev command: ` "dev": "svelte-kit dev --port 3300"`

You should see the home page of the SvelteKit skeleton app at `localhost:3000`

<div class="width50">
   <img src="../images/howTo/skeleton.png" alt="skeleton"  /> 
</div>






## Static Adapter

We are developing a static site so we need the correct adapter. First install the relevant package from the terminal prompt:

```bash
> npm i -D @sveltejs/adapter-static
```

This will be added to the `devDependencies` in `package.json`. Then, with your code editor, in file `svelte.config.js` replace the line:

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
```

with the line:
```js
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
```

We also need to add the prerender directive and set the default to true:

```js
// svelte.config.js

...

kit: {
    adapter: adapter(),
    prerender: {
        default: true,
    },
}

...
```

>After changes to `svelte.config.js` it is usually necessary to restart the development server. As we have a few more changes to make, we can hold off on this for now.


>[Github](https://github.com) is free for public repositories and [Render](https://render.com) is free to host static sites. [Vercel](https://vercel.com), [Netlify](https://netlify.com) and  [Github Pages](https://pages.github.com) are other considerations for free hosting.)

## Git Setup

### Remotely, on Github:

Navigate to your account on [github.com](https://github.com) and create a new empty repository for this project. I named my repository `dmorg` (for no particular reason except that it will eventually replace my existing Wordpress blog at [https://dmorg.org](https://dmorg.org)). The repository is at [https://github.com/dmorgorg/dmorg](https://github.com/dmorgorg/dmorg).

>**Note**: You can clone the current state of the repo with this command:
>```bash
> git clone git@github.com:dmorgorg/dmorg.git
>```
> Or follow along. As described in detail below!

> You don't need to use a versioning platform like [Github](https://github.com) but I do recommend it. I am using it for convenient access and for updating on the free hosting at [render.com](https://render.com).

### Locally:




The project is now on our local computer. We want this state of the local project to be pushed up to our repository on `github`. From the terminal, enter the following commands: 

```bash
> git init
> git status
> git add -A
> git commit -m "initial commit"
> git remote add origin git@github.com:dmorgorg/dmorg.git
> git branch -M main
> git push origin main
```

Of course, replace `dmorgorg/dmorg.git` with your own account name and repository. To push to Github, you may have to supply a username and password (if pushing over `https`). You will have to repeat this for every push so I recommend using `ssh` instead. 

Github has easy-to-follow instructions on how to set up `ssh` [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

### Remotely, on Github:

If everything works as it should, navigate to your github account and verify that you now have an up-to-date repository:

<div>
   <img src="../images/howTo/githubInit.png" alt="initial git commit"  /> 
</div>

## Deploy to Render

Now that we have git up and running, we can have the code pushed to git automatically (and freely!) deploy to `render.com`.

<!-- ### Locally:

Create the file `render.yaml` in the root of the project and add the following:
```yaml
# render.yaml
services:
  - type: web
    name: sveltekit-static
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: build
``` -->

### Locally

At the time of writing (June 2022), `render.com` uses a default node version of 14.17.0 and your SvelteKit build requires > 16.7.0.

Specify the version of node you want Render to use, as detailed [here](https://render.com/docs/node-version). I added the following `"engines": ...` to the bottom of my `package.json`: 

```json
// package.json
...
"type": "module",
"engines": {
	"node": ">=16.7"
}
```

Push this change to `github`:

```bash
> git status
> git add -A
> git commit -m "update package.json for node engine on render"
> git push origin main
```


### Remotely, on render.com:

Go to [render.com](https://render.com) and follow/search for instructions for a new static site. If it's your first visit, you will have to allow Render access to your Github account. 

From `dashboard.render.com`, follow `New + > Static Site` to see a list of your Github repos. Select the one you want (`dmorgorg/dmorg` in my case, where `dmorgorg` is my Github username and `dmorg` is the site I wish to host on Render).

Fill in a name for your site; it should be unique on Render because it will be part of your `url`. (Having said that, I have used a presumably non-unique name and Render appended some random characters to the name.) I used `dmorg` so my site `url` will be `dmorg.onrender.com`. Fill in the following:

* Build command is `npm install && npm run build`.
* Publish directory is `./build`.
* Branch will be `main`.

Then click on `Create Static Site` and wait a few minutes while the site builds. Now, code pushed to Github is automatically rebuilt and updated to the live site on Render. 

Sometimes the build breaks. In that case, run the build locally from the terminal for some debugging information:
```bash
> npm run build
```


## SASS

There are a number of options for using `css` in Sveltekit. A simple approach is to include your `app.css` file in a `src/lib/styles` folder (or wherever you choose) and then reference it from `app.html` like this:

```html
<!-- src/app.html -->
<!DOCTYPE html>
<html lang="en">
    <head>
        ...
        <link rel="stylesheet" href="app.css">
        ...
    </head>
    ...
```

Or, if you prefer `sass/scss`, you can put your `app.scss` file in a `src/lib/styles` folder and use `vscode`’s `Live Sass Compiler` extension to manage compiling your `scss` to `css` whenever you save your `scss` file.

SvelteKit can also import `sass` to a component. Also, components can also include their own styling, scoped to the currect component. I will import the more general styling (fonts, etc) and use components’ style tags for component-level styling.

First, install the `sass` and `svelte-preprocess` packages for node.

```bash
> npm i -D sass svelte-preprocess
```

 >This might not work with node version 16.x but switching to version 18.x solved my issue. If you can’t change your node version, try
 ```bash
 \> npm i -D node-sass svelte-preprocess
 ```

 Edit `svelte.config.js` to include the appropriate import and the preprocess directive:

```js
// svelte.config.js 
import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess'; // THIS IS NEW

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
		}
	},
	preprocess: [               // THIS IS NEW
		sveltePreprocess(),
	]
};

export default config;
```

Reboot the development server because changes have been made to `svelte.config.js`.

Create a directory structure: under `routes`, create a `lib` directory and a `styles` directory under that. Create `app.scss` (or whatever you want to call you styles file) in `src/routes/lib/styles/`. Add some styling of your choosing to this file:

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
    width: 60%;
    margin: 0 auto;
    padding: 0;

    h1 {
        color: red;
    }
}
```

Open `src/routes/index.svelte` which just contains the landing page content for the SvelteKit skeleton project:

```svelte
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
```

Import `src/lib/styles/app.scss` as follows:

```svelte

<script>
   import '$lib/styles/app.scss';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
```

Go to `localhost:3000` and, if all is working as it should, the default landing page will now show the styles specified in `app.scss`.

<div>
   <img src="../images/howTo/test2.png" alt="test2"  /> 
</div>







##  Markdown

### Installing Markdown

Install `mdsvex`, then modify `svelte.config.js` (Prism-themes is for syntax highlighting when using 'fenced code blocks' in markdown, as frequently used in this `HOWTO.md` document.):

```bash
npm i -D mdsvex prism-themes
```

```js
//  svelte.config.js

import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';            // THIS LINE ADDED

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
		},
	},
    
    extensions: ['.svelte', '.md'],         // THIS LINE ADDED

	preprocess: [
		sveltePreprocess(),
		mdsvex({			                // THIS LINE ADDED
		    extensions: ['.md'] 	        // THIS LINE ADDED
		}) 				                    // THIS LINE ADDED
	],
};

export default config;
```

By default, `mdsvex()` processes `.svx` files. Now it will process `.md` files.<br/> (Restart the server after making changes to `svelte.config.js`.)

> I have noticed recently that the server may restart automatically after changes to `src/svelte.config.js`

### Test the Markdown

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

<!-- this is a fenced code block inside a fenced block which doesn't 
display well in this HOWTO. One cannot nest fenced code blocks,
apparently. Or maybe I just don't know how. 
Looks fine in the rendered page, localhost:3000/test, though REMEMBER
 TO INSERT THE CLOSING 3 BACKTICKS below the bottom line! -->
```js
import { something } from 'javascript';
let fencedCodeBlock = 42;
// THREE BACKTICKS HERE
```

Then navigate to `localhost:3000/test` to verify results (I am using port 3300, not the default of 3000):

![localhost:3000/test](../images/howTo/test.png)

Great! We can now render markdown files to html and display them on our site.

<div class="vert2em" />
<!-- <div class="left">Back to <a href="./HOWTO-I"> How I Coded This Site - I</a></div> -->
<div class="right">On to&nbsp;<a href="./HOWTO-II"> How I Coded This Site - II</a></div>
<div class="clear"/>



