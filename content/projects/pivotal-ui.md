---
title: Pivotal UI
description: Design system & component library for Pivotal
date: 2019-04-01
tags:
  - react
  - css
  - design systems
---

For the first year and a half of my job at Pivotal, I worked on the team that maintained Pivotal UI, the company's design system and component library.

The library is open source, written in React and CSS, and can be found [on GitHub](https://github.com/pivotal-cf/pivotal-ui). The documentation, plus examples of the components in use, can be found in our [style guide](https://styleguide.pivotal.io/).

This was such a fun project to work on, and I cannot overstate how much I learned.

![screenshot Pivotal UI style guide](/images/pivotal-ui.png)

## Learning to build and use a design system

Prior to joining Pivotal, I had done a lot of front-end web development in HTML and CSS, but I had never worked with React.

On this team, I got to hit the ground running as both an author and a consumer of our library (since my team also maintained a React app that used the design system). I learned what design systems are, why they're useful, and how hard it can be to drive usage and consistency across lots of teams with different requirements and priorities.

I got to work with other teams that were building UIs to help them use our components and to figure out how to improve the library to better meet their needs.

I got to explore how to write content in a way that was detailed enough to be useful without being overly verbose or hard to understand.

Perhaps most importantly, I got to think hard about **interfaces**, not just in terms of UIs, but in terms of what the library was allowing and disallowing its consumers to do: _What props should this component take? Should this component be exported? To what extent should our default styles be overridable? When do we build a new library component for a team's use case rather than ask them to build it themselves in their codebase?_

These kinds of questions are applicable in so many contexts, at so many levels of abstraction, and I continue to grapple with them on a daily basis.

## Redesigning the style guide

The style guide, the primary documentation for the library, is another React app. We hoped other teams would go there first to get their questions answered, and we were constantly looking for feedback and iterating to improve it. Plus, it was sort of the public face of Pivotal UI, so we wanted to make it look good!

During my time on the team, we redesigned and rebuilt the style guide several times. You can check out [some old versions](https://styleguide.pivotal.io/about/versions/), if you're curious.

The current version uses [Gatsby](https://gatsbyjs.org), a React framework which allowed us to cut down considerably on custom [webpack](https://webpack.js.org/) configuration and focus more on the content and the design. It also gave us lots of performance improvements (almost) for free via build-time static rendering and code splitting. Try comparing the load times of the oldest version and the current version – the difference is very noticeable!

Although I have now moved on to another team, meaning my priorities are mostly elsewhere, I'm still following the project closely. I'm excited to see where it goes next!
