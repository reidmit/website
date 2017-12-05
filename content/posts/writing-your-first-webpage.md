---
title: "Writing your first webpage, pt. 1: HTML"
date: "2017-12-04T17:19:16-08:00"
type: post
tags:
  - html
  - beginner
  - web design
  - writing your first webpage
---

So, you want to build a website, but you don't know where to start.

Maybe you've heard something about HTML, but you aren't sure what it is. Maybe you've never heard of it. Either way, this post will help you get started building websites!

## What is a website?

A website is just a bunch of files, like the files on your computer. Each file is made up of some text that tells your browser (e.g. Chrome, Safari, Firefox) how to display your content.

To see what I mean, take a look at the text that makes up this website by right-clicking on this webpage and choosing "View page source" (or something similar). You'll see some code that looks kind of like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- head section -->
  </head>
  <body>
    <!-- body section -->
  </body>
</html>
```

This code is written in a language called **HTML**.

## What is HTML?

HTML is short for [Hypertext Markup Language](https://en.wikipedia.org/wiki/HTML). It's the language that powers every website on the internet. To start writing a website, we'll need to learn some HTML.

Writing HTML is pretty simple. Almost everything in HTML is an **element** that has **opening and closing tags**. An element called `tagName` would look like this:

```html
<tagName>something inside the tag</tagName>
```

The opening tag is `<tagName>`, and the closing tag is `</tagName>`. Everything between these two tags is considered the contents of the `tagName` element.

Sometimes, you will want to set certain **attributes** of a tag. This is a way of changing properties of an element that will not be displayed on the screen.

A single element can have multiple attributes at the same time. Here's an example of what attributes look like:

```html
<tagName attribute1="attribute 1 value" attribute2="attribute 2 value">
  something inside the tag
</tagName>
```

And that's pretty much it! If you can remember that, you have already mastered the hardest part of writing HTML. Now, let's start building your first webpage.

## Getting started

To begin, open up a text editor. If you don't have a preferred text editor, I recommend [Atom](https://atom.io/) or [Sublime Text](https://www.sublimetext.com/) (both available for free download), but you could even use something like Notepad (which comes with Windows) or Text Editor (which comes with Mac OS X).

Once you have your text editor ready, open it up and create a new file. **Copy the first HTML example from above and paste it into your new, empty file**.

Delete the text that says `<!-- head section -->` and `<!-- body section -->`. These were just examples.

Now, in between the `<body>` and `</body>` tags, write these words:

> **Hello, world! This is my website!**

At this point, your file should look something like this:

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    Hello, world! This is my website!
  </body>
</html>
```

Great! Let's see what your webpage looks like in your browser.

## Viewing your webpage

Save this new file as `hello-world.html` in a folder on your computer that you'll remember. (Actually, you can call the file whatever you want, but you will need the `.html` extension!)

Next, open up your favorite internet browser (probably whatever you're using to read this post). Use <kbd>CTRL</kbd> + <kbd>O</kbd> (on Windows) or <kbd>&#8984;</kbd> + <kbd>O</kbd> (on Mac OS X) to open a file to view in your browser.

Find the `.html` file that you just saved and open it. You should see the words you just typed: **Hello, world! This is my website!**

Congratulations! That's it! You just wrote a whole website and visited it in your browser!

## Experimenting

Of course, there is a lot more we can do at this point.

Go back to your text editor and change the text between the `body` tags to whatever you want. Save the file and refresh the page in your browser. You should see your new text displayed on the page.

Let's make a few additions to our webpage and explore more of what HTML can do.

Somewhere between your `body` tags, write this:

```html
<h1>This is some huge text!</h1>
```

Somewhere between your `head` tags, write this:

```html
<title>I love HTML</title>
```

And somewhere between your `body` tags again, write this:

```html
<a href="http://www.example.com">Click me</a>
```

Now, when you save and refresh the page in your browser, you should see that the `h1` tag gave you really large text, and that the `a` tag gave you a link! Note how we set the `href` attribute on the `a` tag to the URL of the website that we want to link to (`http://www.example.com`).

You should also see that the browser tab/window that your webpage lives in is now called **"I love HTML"**. This is what the `title` tag does.

There are lots of HTML tags out there that do different things. Try out `<button></button>`, `<textarea></textarea>`, or `<i></i>`. I encourage you to experiment with new tags and different combinations of tags!


A full list of tags can be found on [w3schools](https://www.w3schools.com/tags/default.asp), which also has a lot of great information about HTML in general.


## Looking ahead

We focused on HTML in this post, which is important to start with because it's the backbone of any website. But there's a lot more that we can do to make our websites look interesting once we learn CSS. Stay tuned for **part 2: CSS**,  coming soon!

You might also be wondering how you can share your new website with other people. At the moment, your website just lives on your computer, so there is no way for you to send them a link and have them open it up on their computer. However, look out for a future post where we'll explore how to put your website out into the wild for all to see!

**If you have any questions, please leave a comment below :)**
