---
title: Asyncronous coffee-making with JavaScript
date: 2018-10-01T12:23:47.000Z
tags:
  - javascript
  - promises
---

Asynchronous programming comes up a lot when you hear about JavaScript. You may have heard about **callbacks**, **promises**, or **`async`/`await`**. These were things that took me a _long_ time to grasp. Even well into writing JavaScript every day at my job, I wasn't fully comfortable with my understanding. In this post, I want to share how I've learned to think about asynchronous programming: what it means, why it's useful, and how it's implemented in JavaScript.

## Defining some terms

If you've never heard the word "asynchronous," that's okay, too! Let's start by defining it's opposite, "synchronous."

A **synchronous** series of events is one that happens in a clearly defined order. Only one event ever happens at a time, and the next event does not start until the previous event has finished.

In contrast, an **asynchronous** series of events may have multiple events occurring at the same time. Events can start while other events are still happening, and the order in which events complete is generally unpredictable.

If these definitions don't make much sense yet, don't worry. These just give us a starting point. We will dig into them and provide some examples.

## Setting the scene

Imagine a coffee shop on a busy Saturday. There's a line of people extending out the door, and there's only one barista working behind the counter. Let's call her Sarah. For each customer, Sarah has to do it all: take the order, make the coffee, and give it to the customer.

In this scenario, the coffee shop is operating **synchronously**. There is exactly one thing happening at a time: whatever Sarah is doing! She cannot do multiple steps at the same time, since she's only one person.

Let's break down the steps that go into serving each customer at this coffee shop:

1. Take the customer's order
1. Fill a cup based on the order
1. Serve the cup to the customer
1. If there's a problem with any of the above steps, apologize to the customer

Now, let's try sketching this out in JavaScript:

```js
while (queue.length > 0) {
  const customer = queue.shift();
  handleCustomer(customer);
}

function handleCustomer(customer) {
  try {
    const order = takeOrder(customer);
    const cup = fillCup(order);
    serveCustomer(customer, cup);
  } catch (error) {
    apologizeToCustomer(customer, error);
  }
}
```

We have modeled this synchronous scenario as a simple `while` loop. While there are customers in the queue, take the first customer in the queue and go through each step for that customer. Sarah can only move on to the next customer when all steps have been completed for the current customer.

For Sarah, this has the downside of being inefficient: she would love to be able to serve more customers and keep the line moving quickly, but she just can't!

## Getting asynchronous

Now, imagine that it's the following week. Sarah's manager realized how stressful last week was, and now there are four total baristas on duty to handle the crowd.

Four baristas means that Sarah doesn't have to do everything herself. The steps required for each customer remain the same, but it's flexible who's doing each step and when. When a customer places an order, that customer can step aside and another customer can immediately place their order. In the meantime, other baristas are making and serving multiple orders at once.

Now, this coffee shop is operating **asynchronously**. Some things don't change: the steps are the same. But the order in which customer interactions complete may change: if some customers are only asking for water, they may receive their drink quicker than a customer who wanted a cappucino.

That last point is important: if a particular order is slow for some reason (maybe they wanted almond milk, which is kept in the back room), other orders are **not blocked** by it. Other baristas can continue working while one of them runs to the back room. In the synchronous example, the whole line would have to wait for Sarah to go get the almond milk for the person at the front.

This is good news for Sarah, but it becomes a little trickier to mode this scenario in JavaScript. Let's explore a few ways.

### Using callbacks

The oldest way that people did asynchronous programming in JavaScript was using **callbacks**. This refers to the pattern of passing a function (the callback) as an argument to an asynchronous function. When the asynchronous function completes, it will call the callback function with the result.

Here's what it looks like:

```js
while (queue.length > 0) {
  const customer = queue.shift();
  handleCustomer(customer);
}

function handleCustomer(customer) {
  takeOrder(customer, (order) => {
    fillCup(order, (cup) => {
      serveCustomer(customer, cup);
    });
  });
}
```

Previously, our `takeOrder` function received a `customer` as an argument and returned an `order`. This made sense when `takeOrder` was always performed by the same person, so we had to block the rest of the loop until `takeOrder` was done.

But now, with multiple baristas, we know that `takeOrder` is asynchronous. It should not block the whole loop. We achieve that by moving the following steps into nested callback functions. Now, `takeOrder` does not actually return a value: instead, it passes it's "return value" (the `order`) as an argument to its callback. The same applies for `fillCup`.

By using asynchronous functions with callbacks, we can make sure that the sequence of events is still the same for each customer (`takeOrder`, then `fillCup`, then `serveCustomer`), but all the baristas can be busy working on orders at the same time.

### Using callbacks with error handling

If you were looking closely, however, you may notice that the previous code was missing something that we had in the synchronous example: error handling. In synchronous code, this is simple to do with a `try`/`catch`. But with callbacks, it gets harder. For example, this **will not work**:

```js
while (queue.length > 0) {
  const customer = queue.shift();
  handleCustomer(customer);
}

function handleCustomer(customer) {
  try {
    takeOrder(customer, (order) => {
      fillCup(order, (cup) => {
        serveCustomer(customer, cup);
      });
    });
  } catch (err) {
    apologizeToCustomer(customer, error);
  }
}
```

The reason this doesn't work is that, as we said, our asynchronous functions are non-blocking. The call to `takeOrder` returns instantly, well before all of the steps are really complete for this customer. The steps are all **scheduled** to be done asynchronously, at some point in the future, but not done yet. This means that if any of these scheduled steps throws an error, it will happen outside of our `try`, and it will escape our `catch`.

So, how do we handle errors with callbacks if the functions are scheduled for some time in the future and cannot be caught? The most common pattern looks something like this:

```js
while (queue.length > 0) {
  const customer = queue.shift();
  handleCustomer(customer);
}

function handleCustomer(customer) {
  takeOrder(customer, (error, order) => {
    if (error) {
      apologizeToCustomer(customer, error);
      return;
    }

    fillCup(order, (error, cup) => {
      if (error) {
        apologizeToCustomer(customer, error);
        return;
      }

      serveCustomer(customer, cup);
    });
  });
}
```

Now, each callback function expects two arguments: an error from the previous step, and the "return value" from the previous step. If the error is defined, it means something went wrong, so we `apologizeToCustomer` and return early, without calling the next function in the sequence.

Just like asynchronous functions using callbacks **do not return any values**, they also **do not throw any errors**. Instead, they just pass these things into their callback function to be handled at the next step.

But, as you may have noticed, this code looks quite a bit more complicated than what we had before. Lots of people in the JavaScript world felt this way, so they came up with another way to do asynchronous programming.

### Using promises

In JavaScript, a promise (or `Promise`, if you're referring to the built-in class) is a more elegant way of representing work that is scheduled to happen in the future.

With callbacks, we saw that asynchronous functions did not return any values. In this new way of doing things, **asynchronous functions return promises**. Let's look at some code:

```js
while (queue.length > 0) {
  const customer = queue.shift();
  handleCustomer(customer);
}

function handleCustomer(customer) {
  takeOrder(customer)
    .then(order => fillCup(order))
    .then(cup => serveCustomer(customer, cup))
    .catch(error => apologizeToCustomer(customer, error));
}
```

Here, `takeOrder` receives a `customer` as an argument, and returns a promise for an `order`. It doesn't return an `order` on its own, though, since the step does not complete immediately. Instead, we know that eventually the step will produce an `order` that we want to use at the next step.

The returned promise is that "eventual `order`." To use the `order`, we call the `then` method on the promise and pass in a function to handle the eventual `order`. The `then` method also returns a promise, so we can keep **chaining** functions together. This is how we model a value being passed between asynchronous steps _at some point in the future_. We don't really know when these functions are going to run, but we can control what they do when they receive the output from the previous step.

Error handling becomes simpler with this concept of a "promise chain." At the end of the chain, we can tack on a `catch` handler, which dictates what do to if an error is thrown by any of the previous functions in the chain.

Since the chains of asynchronous work are scheduled for the future, the `while` loop gets through every customer without waiting for any of the orders to be complete. To return to our coffee shop, you can imagine if one barista stood at the counter and took _all the orders_ extremely quickly, one after another, and let the orders pile up beside him. Eventually, the baristas will complete the stack of orders, but the "loop" has already finished.

### Using `async`/`await`

The JavaScript world moves quickly and is constantly improving. A few years after promises became popular, people wanted a new way to write promise-based code that didn't look so different from synchronous code.

This is where the `async` and `await` keywords come into play. Callbacks and promises were just patterns that could be used in any old JavaScript, but `async` & `await` are new additions to the language syntax.

Let's see what it looks like:

```js
while (queue.length > 0) {
  const customer = queue.shift();
  handleCustomer(customer);
}

async function handleCustomer(customer) {
  try {
    const order = await takeOrder(customer);
    const cup = await fillCup(order);
    serveCustomer(customer, cup);
  } catch (error) {
    apologizeToCustomer(customer, error);
  }
}
```

Here, our `handleCustomer` function is marked with the `async` keyword. This means that we can use `await` inside of it (and that it automatically returns a promise). Inside an `async` function, we can write code that looks mostly the same as it did in the synchronous world.

However, when we make a call to a function that returns a promise, we can use `await` to "unwrap" the promise, and pull out the eventual value.

When we use this syntax, we can also go back to using `try`/`catch` for error handling! The JavaScript interpreter will do the hard work of tracking all the scheduled asynchronous work, and we can just write code that looks familiar.

## But when would I use this?

It's natural to wonder why any of this would be useful. Why introduce all this complexity to something that was originally so simple? It is definitely more complex, so we must be getting something in return.

There are places where asynchronous programming makes a lot of sense. In our coffee shop example, it didn't make sense for Sarah to be the only one handling all of those customers, since it meant that every customer had to wait for Sarah to complete all the steps for all the customers before them in order to

Likewise, **we often don't want to block the execution of our code** while we're waiting for some function to return. For example, on a page in a web app, we might make a request to an API to fetch the data for a graph. We don't know how long it will take for the request to finish, and we have more work to do. We have to render the rest of the page, maybe with an empty graph for now, and we want it to be interactive as soon as possible (so buttons work, and the page doesn't feel frozen). We want to say, "fill in the graph whenever we get the data, but keep doing everything else in the meantime." Asynchronous programming lets us do that.

This is especially important with things like network requests, since we can't be sure how long they will take: What if your internet connection is slow or flaky? Using asynchronous functions lets us schedule some work to be done whenever the request completes, but doesn't block the rest of our code on it.

## In conclusion

Asynchronous programming let us represent chains of scheduled future events. We can kick off a chain of events that does not block other events from happening, and we can have multiple chains of events executing simultaneously. This is hugely useful for keeping our code efficient.

In JavaScript, we can do this sort of thing with callbacks, promises, or `async`/`await`, depending on our preferences and the libraries we're using.

And in a busy coffee shop, we can do this by putting more baristas on duty and splitting up the work!