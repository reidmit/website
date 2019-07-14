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

There are tons of great options out there for this kind of thing, all with different strengths: [Wordpress](https://wordpress.org/), [Jekyll](https://jekyllrb.com/), [Hexo](https://hexo.io/), [Gatsby](https://gatsbyjs.org), to name just a few. I've spent far too much time debating which of these was right for me. At one point, I even had a version of my website written in [my own templating language](https://github.com/reid47/omelet).

Eventually, I realized that in order to make a decision and stick with it, my choice would need to be based on some criteria beyond just what technology seemed cool to me at the moment. So here's what I came up with:

1. It should be very easy for me to write, edit, and publish new content. If this becomes a chore, I won't end up doing it as often as I want to.

2. I should have complete control over the way the site looks, and I should be able to start with a barebones version of the site that looks okay and then gradually improve the design later.

3. It should be completely free (except for the domain name cost), and it should be based on open-source technologies.

4. It shouldn't need any server-side rendering or complex routing. It should just be a bunch of static files that I can easily test locally and (if necessary) quickly pick up and move to another hosting platform.

With these in mind, and after several years of experimenting, I finally settled on the following.

## Using Hugo to structure the site

I'm using the static site generator [Hugo](https://gohugo.io/) to structure the files that make up the site, and to build the final HTML pages out of a bunch of templates and Markdown files. There are many static site generators out there, but Hugo has some very cool features that distinguish it from the rest:

- It's really fast when building and rebuilding your site, and its built-in server lets you run your site locally and reload your pages whenever anything changes. This makes developing quick, easy, and fun.

- It provides some shortcode extensions that you can use directly from your Markdown files. My main hesitation when getting started with Markdown was that its syntax gets less clean and simple when you want to include more than basic text content. Hugo's authors seem to agree with this, and shortcodes are a nice solution. See the [documentation](https://gohugo.io/content-management/shortcodes/).

- It's quite straightforward to build your own theme from scratch, and the documentation for creating themes is great. This gives me the flexibility I wanted when it comes to the way my site looks. And although I'm using my own custom theme, there are also lots of great [community-built themes](https://themes.gohugo.io/) out there.

## Using Sass for styling

Recent versions of Hugo come with built-in support for [Sass](https://sass-lang.com/). I really like writing Sass to generate my CSS files, rather than writing the CSS directly, mainly because it lets me use variables to keep all my settings (e.g. common colors) in one place. But Sass has a lot of other cool features that make it more powerful than plain CSS, so I recommend reading up on it if you haven't heard of it.

## Using GitHub Pages for hosting

As is common with many static sites, I'm hosting this site using [GitHub Pages](https://pages.github.com/). This is super easy to set up if you're already familiar with GitHub, and it means my website is version-controlled (so I can always track the changes I make over time and go back to previous versions, if necessary!).

My workflow now looks like this: When I need to make a change, I edit the files locally, commit the changes, and do `git push` to push my changes to GitHub. When I'm ready to publish the changes for all to see, I run a little [Bash script](https://github.com/reid47/website/blob/master/deploy.sh) I wrote to build the site and push all the changes to the `gh-pages` branch of the repository. This is where I've told GitHub to look for the files to power my GitHub Pages site.

If you'd like to see what this looks like in practice, check out the [GitHub repo for this website](https://github.com/reid47/website). The raw text content lives in the `/content` directory, the HTML templates live in the `/layouts` directory, and the Sass stylesheets live in the `/assets` directory. Generated files live in the [`gh-pages` branch](https://github.com/reid47/website/tree/gh-pages).

## Conclusion

And that's it! I realize that this probably seems over-engineered. There are certainly simpler ways to make a website. I'm not claiming that mine is the best solution out there. The most important thing is that it's reliable, it's easy to make changes now that I've set it up, and it's fast. It lets me focus my energy on things that I'd rather be thinking about, like content and design. I'm extremely happy so far!

> **Note (July 2019):** Since writing this post in 2017, I fell into the old trap and rebuilt my site three more times (using [Gatsby](https://www.gatsbyjs.org/) first, then plain HTML/CSS, and then landing back on Hugo). Hopefully this lasts!