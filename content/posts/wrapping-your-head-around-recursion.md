---
title: Wrapping your head around recursion
date: 2017-11-15T05:17:36.000Z
type: post
tags:
  - recursion
  - computer science
---

Let's start with an analogy.

Imagine you're standing in a long line of people waiting for something on a very foggy day. It's so foggy that nobody in line can see further than one person ahead of them and one person behind them. You certainly can't see the beginning of the line. But you're growing impatient, so you would like to know your position in the line. **Are you 5<sup>th</sup> or 500<sup>th</sup>?**

You figure you'll ask the person in front of you for their position. Whatever they are, you can just add one to it to get your position! So you ask, but they have the same problem as you: they do not know their position, and they cannot see past the person ahead of them. They tell you: "Hold on, let me ask the person in front of me."

This process repeats. Each person is unable to give an answer and asks the person in front of them for help. Finally, the the very first person in line is asked. **The first person is the only one in the whole line who can immediately give an answer.** "I'm number one!", they say.

With this answer, the second person in line has enough information to figure out that they are in position two. So person two turns back and says, "I'm number two." The third person then has enough information to figure out their position. One-by-one, from the beginning of the line going backwards, people become able to figure out their own position.

Eventually, the person in front of you turns back to you and says, "Sorry for the wait. I'm number *n*!" And finally, you have enough information to know that you are number *n + 1*.

## An explanation

This analogy illustrates the key components of recursion:

1. There is a **question** that cannot be answered without asking the same question again and again until the base case is reached.

2. There is a **base case**: some condition that allows for the question to be answered immediately, without asking it again.

In our analogy, the **question** is "What position are you in line? I'm whatever you are, plus one." (asked by a person to the person in front of them).

The **base case** occurs when the first person is reached; this person doesn't need to repeat the question. They can immediately say, "I'm number one!".

Thus, to set up a recursive problem correctly, we need to make sure we are asking the right question and that we have identified the right base case. To make this clearer, let's look at what happens when we ask the *wrong* question and choose the *wrong* base case.

## Asking the wrong question

Imagine you are in the same predicament described above, and again you want to figure out your position in the line. But instead of asking the person in front of you for their position, you ask the person *behind* you: "What is your position in line? I'm whatever you are, minus one."

This might seem like a reasonable plan at first. Just like before, the person you ask doesn't have an answer immediately. So they turn to the person behind them, and the question makes its way all the way to the end of the line. But what happens when the last person gets asked? "Uhh... I'm last?"

The last person in line does not have enough information to determine their position in line. "Last" is not helpful; you wanted numbers to work with! This means that nobody in that chain of question-askers will be able to determine their position.

So what happened here? By going backwards instead of forwards, you got to the wrong base case! A proper base case means that the question can be answered immediately. But in this case, "I'm last" is not really an answer to the question we asked. By contrast, when you asked the question forwards, your base case (the first person) was able to give a solid, numerical answer: one. Based on that, every other person who was asked was able to give a solid, numerical answer, and then you were able to answer your question.

## Conclusion

So far, we haven't discussed any code or math. That's because recursion is a more general concept that exists outside of these areas. It can often be applied to math and code, and it can be useful in solving these types of problems, but I find it easier to first understand it on a non-technical level.

Maybe in a future post, I'll dig into how this concept plays out in the realm of code.

*Acknowledgements: I did not invent this analogy myself. I adapted it from one that was first told to me by a friend, who heard it from her computer science professor ([John Sun](https://www.cmc.edu/academic/faculty/profile/john-sun)). I just found this analogy so helpful, I wanted to share it with the world.*
