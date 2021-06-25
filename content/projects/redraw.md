---
title: Redraw
description: A pixel art drawing tool
date: 2017-12-27
tags:
  - javascript
  - react
  - canvas
---

Redraw is a tool for making pixel art. [Try it out!](https://redraw.reidmitchell.net/)

The code is all [on GitHub](https://github.com/reidmit/redraw). It's written in React and uses the HTML5 canvas for drawing.

![screenshot of Redraw app](/images/redraw.png)

I started this project during a vacation at home. I was getting nostalgic for all the time I used to spend making drawings in MS Paint. I no longer have a Windows computer, so I went looking for a browser-based replacement. I found [JsPaint](https://jspaint.app), which is an amazing recreation of the old version of Paint that I loved. And I found [Make 8-Bit Art](https://make8bitart.com/), which is a pixel art tool like this one.

After spending a bunch of time playing with and admiring these apps, I got the urge to build my own. I wanted to see how I could make React work with the `canvas` element. It was turning out well, so I kept adding features, and now it's a fairly polished little app!

You can cut/copy/paste, undo/redo, zoom, save a selected part of your drawing, choose colors with the eyedropper tool, and more. Your canvas is saved in local storage, so you can pick up where you left off after refreshing or navigating away from the page. And you can save as either PNG or SVG. As a fun test, I drew all the icons you see on the buttons using the app itself.

[Give it a shot](https://redraw.reidmitchell.net/). I'd love to see any drawings you make it with it!
