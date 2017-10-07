# reidmitchell.net

These are the files for my personal website, which you can see live at [reidmitchell.net](http://reidmitchell.net).

If you're curious, I'm using [Hugo]https://gohugo.io/) to build the site files (which are located in the `/docs` folder, where GitHub pages looks to serve them). I'm writing most of the content in [Markdown](http://commonmark.org/) and the styles in [Sass](http://sass-lang.com/).

If you'd like to build this site locally, you can follow these steps:

1. Make sure you have Hugo installed. Check out the [installation instructions](https://gohugo.io/getting-started/installing/).

2. Clone this repository to a local directory like this:

```bash
git clone https://github.com/reid47/website.git some-directory
```

3. Navigate to the local directory and build the site:

```bash
cd some-directory
hugo
```

This will generate all of the website files and put them in the `/docs` directory.

4. You can use `hugo server` to start a local server while developing the site. Hugo will watch the files
for changes and reload the pages in your browser automatically.
