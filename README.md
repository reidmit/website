# reidmitchell.net

These are the files for my personal website, which you can see live at [reidmitchell.net](http://reidmitchell.net).

If you're curious, I'm using [Hexo](https://hexo.io/) to build the site files (which are located in the /docs folder, where GitHub pages looks to serve them. I'm writing most of the content in [Markdown](http://commonmark.org/), the templates in [EJS](http://ejs.co/), and the styles in [Sass](http://sass-lang.com/).

If you'd like to build this site locally, you can do that like this:

```bash
git clone https://github.com/reid47/website.git some-directory

cd some-directory

npm install

hexo server --debug
```

This will start up a server at `localhost:4000`. It should listen for changes and rebuild/reload your pages automatically when it needs to.

To build all the static files and place them in the `/docs` folder, run this:

```bash
hexo generate --debug
```