# reidmitchell.net

These are the files for my personal website, which you can see live at [reidmitchell.net](http://reidmitchell.net).

If you're curious, I'm using [Hugo](https://gohugo.io/) to build the site files (which are located in the `/docs` folder, where GitHub pages looks to serve them). I'm writing most of the content in [Markdown](http://commonmark.org/) and the styles in [Sass](http://sass-lang.com/), using Gulp to help with converting the Sass files to CSS.

If you'd like to build this site locally, you can follow these steps:

1. Make sure you have Hugo and Node.js installed. Check out the [Hugo installation instructions](https://gohugo.io/getting-started/installing/) and [Node.js installation instructions](https://nodejs.org/en/download/). You will also need either [Yarn](https://yarnpkg.com/lang/en/docs/install/) or [NPM](https://docs.npmjs.com/cli/install) installed. I'm using `yarn` in the examples below, but the equivalent `npm` commands are very similar.

2. Clone this repository to a local directory like this:

```bash
git clone https://github.com/reid47/website.git your-directory
```

3. Navigate to the local directory, run `yarn` to install all the Node dependencies, and then build the site:

```bash
cd some-directory
yarn
yarn run build
```

This will generate all of the website files and put them in the `/docs` directory.

4. As you're working on the site, you can also start a local server that will automatically reload the pages as you make changes to the site files:

```bash
yarn run watch
```

This will start a local server at `localhost:4747`.
