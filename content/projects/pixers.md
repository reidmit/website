---
title: Pixers
description: A generative art project in JavaScript
date: 2015-01-03
tags:
  - javascript
  - generative art
  - canvas
---

Pixers is a tool for creating [generative art](https://en.wikipedia.org/wiki/Generative_art), pixel-by-pixel. You define a few parameters (color palette, number of pixers, etc.) and let the pixers draw you a picture. Even when using the same settings, no two pixer drawings are alike. [Try it out!](http://pixers.reidmitchell.net/)

Here's how I described it when I first made it:

> Pixers are tiny (1px by 1px) creatures. They move completely randomly. To start, each pixer is randomly assigned a color from the chosen color palette.

> When a pixer passes over a blank pixel, the pixel takes on the pixer’s color. When a pixer passes over a colored pixel, the color of the pixel and the color of the pixer are averaged. Both pixel and pixer take on this average color. The pixel remains, but the pixer keeps moving, blending colors together.

By following those simple rules, pixers come together to make really beautiful, unique pieces:

![a pixer-generated drawing](/pixers/pixers1.png)

Pixers is powered by JavaScript and the HTML5 canvas. This project holds a special place in my heart because it was my first substantial JavaScript project. Before this, I had messed around with jQuery a little bit, but I had never done anything this complex. But I had this idea, tackled it, and produced something that was a lot of fun to play with (and still is!).

I shared the link with friends and enjoyed seeing the drawings they made. For me, it was the first time that writing non-HTML code felt _fun_ and _creative_ – so unlike the C and Java that I was learning in my CS courses at the time. It opened my eyes to another side of programming.

The code can be found [here](https://github.com/reid47/pixers). It is somewhat messy, but I have mostly resisted the urge to clean it up. I like that it reflects where I was at the time.

Here are some more pixer-drawn images that I like:

![another pixer-generated drawing](/pixers/pixers2.png)

![yet another pixer-generated drawing](/pixers/pixers3.png)

![yet another pixer-generated drawing](/pixers/pixers4.png)
