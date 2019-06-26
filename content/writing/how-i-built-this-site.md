---
title: How I built this site
date: 2017-10-08T15:21:51-07:00
tags:
  - web design
  - hugo
  - sass
  - meta
---

I'm fascinated by the different technologies, languages, and methods people use to build websites. When I see a website I admire, I often spend time digging to see how it was built. So, I wanted to share the details behind how this site is made.

There are tons of great options out there for this kind of thing, all with different strengths: [Wordpress](https://wordpress.org/), [Jekyll](https://jekyllrb.com/), [Hexo](https://hexo.io/), to name just a few. I've spent far too much time debating which of these was right for me; at one point, I even had a version of my website written in [my own templating language](https://github.com/reid47/omelet).

Eventually, I realized that in order to make a decision and stick with it, my choice would need to be based on some criteria beyond just what technology seemed cool to me at the moment. So here's what I came up with:

1. It should be very easy for me to write, edit, and publish new content. If this becomes a chore, I won't end up doing it as often as I want to.

2. I should have complete control over the way the site looks, and I should be able to start with a barebones version of the site that looks okay and then gradually improve the design later.

3. It should be completely free (except for the domain name cost), and it should be based on open-source technologies.

4. It shouldn't need any server-side rendering or complex routing. It should just be a bunch of static files that I can easily test locally and (if necessary) quickly pick up and move to another hosting platform.

With these in mind, and after several years of experimenting, I finally settled on the following.

## Using Hugo to structure the site

I'm using the static site generator [Hugo](https://gohugo.io/) to structure the files that make up the site, and to build the final HTML pages out of a bunch of templates and Markdown files. There are many static site generators out there, but Hugo has some very cool features that distinguish it from the rest:

- It's really fast when building and rebuilding your site, and its built-in server lets you run your site locally and reload your pages whenever anything changes. This makes developing quick, easy, and fun.

- It provides some shortcode extensions that you can use directly from your Markdown files. My main hesitation when getting started with Markdown was that its syntax gets less clean and simple when you want to include more than basic text content. Hugo's authors seem to agree with this, and shortcodes are an awesome solution. See the [documentation](https://gohugo.io/content-management/shortcodes/).

- It's quite straightforward to build your own theme from scratch, and the documentation for creating themes is great. This gives me the flexibility I wanted when it comes to the way my site looks. And although I'm using my own custom theme, there are also lots of great [community-built themes](https://themes.gohugo.io/) out there.

## Using Sass and Gulp to help with styling

One thing that Hugo does *not* do for you is give you a way to do transformations on assets like CSS files when including them in your generated site. Hugo will happily copy any static files you have in your `/static` folder into your finished site, but it doesn't really have a plugin system or anything to help you do much with these files. However, it doesn't get in the way of you implementing your own way of transforming these files, so this isn't a major downside in my opinion.

In my case, I wanted to be able to write the styles for my site in [Sass/SCSS](https://sass-lang.com/) and have these SCSS files converted into plain CSS before they were copied into my `/docs` folder.

I'm doing this using [Gulp](https://gulpjs.com/) and the [node-sass](https://www.npmjs.com/package/node-sass) Node module. Gulp watches my `.scss` files for changes and uses node-sass to convert them into `.css` files that get put in my `/static` folder. Hugo is watching the `/static` folder for changes, and when these `.css` files get created or updated, the changes get copied into my `/docs` folder. This means that I have to have two terminal windows open while developing my site locally: one running the Gulp task, and one running the Hugo server.

This setup works so well that I can just minimize these terminal windows and forget about them. I just edit the SCSS and HTML files in my text editor, and my site automatically reloads before I can even switch over to the browser to see the changes!

For a great tutorial on setting this up, check out [this one](https://danbahrami.io/articles/building-a-production-website-with-hugo-and-gulp-js/), which I used to get started. You might also try to [clone my repo and build this site locally](https://github.com/reid47/website/blob/master/README.md).

## Using GitHub Pages for hosting

As is common with many static sites, I'm hosting this site using [GitHub Pages](https://pages.github.com/). This is super easy to set up if you're already familiar with GitHub, and it means my website is version-controlled (so I can always track the changes I make over time and go back to previous versions, if necessary!). When I need to make a change, I just edit the files locally, commit the changes, and do `git push` to push my changes to the GitHub repo. GitHub Pages then automatically updates my site accordingly.

If you'd like to see what this looks like in practice, check out the [GitHub repo for this website](https://github.com/reid47/website). The raw text content lives in the `/content` directory, the styles and templates live in the `/themes` directory, and the generated files live in the `/docs` directory.

## Conclusion

And that's it! I realize that this probably seems over-engineered; there are certainly simpler ways to make a website. I'm not claiming that mine is the best solution out there. The most important thing is that it's reliable, it's easy to make changes now that I've set it up, and it's fast. It lets me focus my energy on things that I'd rather be thinking about, like content and design. I'm extremely happy so far!